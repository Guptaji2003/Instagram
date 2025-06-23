const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const usermodel = require("../model/usermodel");
const getDataUri = require("../db/datauri");
const cloudinary = require("../db/cloudinary");
const isAuthenticated = require("../middleware/isAuthemticated");

router.post("/register", async (req, res) => {
  const { name, email, username, password } = req.body;
  if (!name || !email || !username || !password) {
    return res.json({ error: "All fields are required", success: false });
  }
  const user = await usermodel.findOne({ email: email });
  if (user) {
    return res.json({ error: "email already exist", success: false });
  }
  const usernameexist = await usermodel.findOne({ username: username });
  if (usernameexist) {
    return res.json({ error: "Username already exist", success: false });
  }
  const hashedpassword = await bcrypt.hash(password, 10);
  const newuser = await usermodel.create({
    name,
    username,
    email,
    password: hashedpassword,
  });
  await newuser.save();
  return res.json({
    message: "Registered successfully",
    user: newuser,
    success: true,
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({ error: "All fields are required", success: false });
  }

  const user = await usermodel.findOne({ email: email });

  if (!user) {
    return res.json({ error: "Invalid email or password", success: false });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.json({ error: "Invalid email or password", success: false });
  }
  const token = jwt.sign({ userId: user._id }, process.env.jwt_secret, {
    expiresIn: "1d",
  });
  res
    .cookie("token", token, {
      httpOnly: true,
      sameSite: "None", // ✅ for cross-site cookies
      secure: true, // ✅ must be true on HTTPS (e.g., Render)
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    })
    .json({
      message: `Welcome back `,
      success: true,
      user,
      token,
    });
});

router.get("/alluser", async (req, res) => {
  const user = await usermodel.find();
  res.json(user);
});

router.get("/logout", (req, res) => {
  res
    .clearCookie("token")
    .json({ success: true, message: "Logged Out Successfully" });
});

router.get("/profile/:id", isAuthenticated, async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await usermodel
      .findById(userId)
      .populate({
        path: "posts",
        populate: { path: "author", select: "username" },
        createdAt: -1,
      })
      .populate({ path: "followers", select: "username name profileimage" })
      .populate({ path: "followings", select: "username name profileimage" })
      .populate({ path: "bookmark", select: "photo" });

    return res.status(200).json({
      user,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
});

router.put("/update-profile", isAuthenticated, async (req, res) => {
  try {
    const userId = req.id;
    const { name, bio, gender, username, image } = req.body;
    // const profilePicture = req.file;
    // let cloudResponse;

    // if (profilePicture) {
    //   const fileUri = getDataUri(profilePicture);
    //   cloudResponse = await cloudinary.uploader.upload(fileUri);
    // }

    const user = await usermodel.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });
    }
    if (name) user.name = name;
    if (username) user.username = username;
    if (bio) user.bio = bio;
    if (gender) user.gender = gender;
    if (image) user.profileimage = image;
    // if (profilePicture) user.profilePicture = cloudResponse.secure_url;

    await user.save();

    return res.status(200).json({
      message: "Profile updated.",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/suggested-users", isAuthenticated, async (req, res) => {
  try {
    const userId = req.id;

    const suggestedUsers = await usermodel.find({ _id: { $ne: userId } });
    if (!suggestedUsers || suggestedUsers.length == 0) {
      return res.status(404).json({ message: "Users not found." });
    }
    res.json({ success: true, users: suggestedUsers });
  } catch (e) {
    console.log(e);
  }
});

router.put("/follow/:id", isAuthenticated, async (req, res) => {
  try {
    const pulkit = req.id; // pulkit
    const ritik = req.params.id; // ritik
    if (pulkit === ritik) {
      return res.status(400).json({
        message: "You cannot follow/unfollow yourself",
        success: false,
      });
    }

    const user = await usermodel.findById(pulkit);
    const targetUser = await usermodel.findById(ritik);

    if (!user || !targetUser) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }
    const isFollowing = user.followings.includes(ritik);
    if (isFollowing) {
      // unfollow logic ayega
      await Promise.all([
        usermodel.updateOne({ _id: pulkit }, { $pull: { followings: ritik } }),
        usermodel.updateOne({ _id: ritik }, { $pull: { followers: pulkit } }),
      ]);
      const user = await usermodel.findById(pulkit);

      return res
        .status(200)
        .json({ message: "Unfollowed successfully", user, success: true });
    } else {
      // follow logic ayega
      await Promise.all([
        usermodel.updateOne({ _id: pulkit }, { $push: { followings: ritik } }),
        usermodel.updateOne({ _id: ritik }, { $push: { followers: pulkit } }),
      ]);
      const user = await usermodel.findById(pulkit);

      return res
        .status(200)
        .json({ message: "followed successfully", user, success: true });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
