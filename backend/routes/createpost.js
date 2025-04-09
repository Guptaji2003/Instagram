const express = require("express");
const postmodel = require("../model/postmodel");
const usermodel = require("../model/usermodel");
const isAuthenticated = require("../middleware/isAuthemticated");
const commentmodel = require("../model/commentmodel");
const upload = require("../server");
const { getReceiverSocketId, io } = require("../socket/socket");
const router = express.Router();

router.get("/allpost", isAuthenticated, async (req, res) => {
  try {
    const posts = await postmodel
      .find()
      .sort({ createdAt: -1 })
      .populate({ path: "author", select: "username profileimage" })
      .populate({
        path: "comments",
        sort: { createdAt: -1 },
        populate: {
          path: "author",
          select: "username profileimage",
        },
      });
    return res.status(200).json({
      posts,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
});

router.post(
  "/createpost",
  isAuthenticated,
  upload.single("photo"),
  async (req, res) => {
    const { caption, location, photo } = req.body;
    // const photo = req.file ? req.file.path.replace(/\\/g, "/") : null;
    // const photo = "mnvm";
    const authorId = req.id;
    const post = await postmodel.create({
      caption,
      photo,
      location,
      author: authorId,
    });
    await post.save();

    const user = await usermodel.findOne({ _id: authorId });
    user.posts.push(post._id);
    await user.save();

    res.json({
      message: "post create successfully",
      success: true,
      post,
      user,
    });
  }
);

router.get("/userposts", isAuthenticated, async (req, res) => {
  const userId = req.id;
  const userPosts = await postmodel.find({ author: userId });
  res.json(userPosts);
});

router.put("/updatepost/:id", isAuthenticated, async (req, res) => {
  const userId = req.id;
  const postId = req.params.id;
  const { caption } = req.body;
  const photo = req.file;
  const post = await postmodel.findById(postId);
  if (post.author == userId) {
    if (caption) updatedpost.caption = caption;
    if (photo) updatedpost.photo = photo;
    await updatedpost.save();

    return res.status(401).json({ message: " updated this post", post });
  } else {
    return res
      .status(401)
      .json({ message: "Unauthorized to update this post" });
  }
});

router.put("/like-dislike/:id", isAuthenticated, async (req, res) => {
  const userId = req.id;
  const postId = req.params.id;
  const post = await postmodel.findById({ _id: postId });
  if (post.likes.includes(userId)) {
    await post.updateOne({ $pull: { likes: userId } });
    await post.save();
    const posts = await postmodel
      .find()
      .sort({ createdAt: -1 })
      .populate({ path: "author", select: "username profileimage" })
      .populate({
        path: "comments",
        sort: { createdAt: -1 },
        populate: {
          path: "author",
          select: "username profilePicture",
        },
      });
      const user=await usermodel.find({_id:userId})
      if(post.author.toString() !== userId){
        // emit a notification event
        const notification = {
            type:'dislike',
            userId:userId,
            userDetails:user,
            postId,
            message:'Your post was disliked'
        }
        const postOwnerSocketId = getReceiverSocketId(post.author);
        io.to(postOwnerSocketId).emit('notification', notification);
    }
    return res.json({
      message: "You disliked this post",
      posts,
      success: true,
    });
  } else {
    await post.updateOne({ $push: { likes: userId } });
    await post.save();
    const posts = await postmodel
      .find()
      .sort({ createdAt: -1 })
      .populate({ path: "author", select: "username profileimage" })
      .populate({
        path: "comments",
        sort: { createdAt: -1 },
        populate: {
          path: "author",
          select: "username profilePicture",
        },
      });


      // const postOwnerId = post.author.toString();
      const user=await usermodel.find({_id:userId})
      if(post.author.toString() !== userId){
        // emit a notification event
        const notification = {
            type:'like',
            userId:userId,
            userDetails:user,
            postId,
            message:'Your post was liked'
        }
          const postOwnerSocketId = getReceiverSocketId(post.author);
          io.to(postOwnerSocketId).emit('notification', notification);
      }
    return res.json({ message: "You liked this post", posts, success: true });
  }
});

router.put("/comment/:id", isAuthenticated, async (req, res) => {
  const postId = req.params.id;
  const userId = req.id;
  const { text } = req.body;

  const comment = new commentmodel({
    text,
    post: postId,
    author: userId,
  });
  await comment.save();

  const post = await postmodel.findById({ _id: postId });
  await post.updateOne({ $push: { comments: comment } });
  await post.save();
  const posts = await postmodel
    .find()
    .sort({ createdAt: -1 })
    .populate({ path: "author", select: "username profileimage" })
    .populate({
      path: "comments",
      sort: { createdAt: -1 },
      populate: {
        path: "author",
        select: "username profileimage",
      },
    });
  res.json({ success: true, message: "comment posted", posts });
});

router.get("/allcomments", isAuthenticated, async (req, res) => {
  try {
    const comments = await commentmodel.find();
    return res.json({ message: "all comments of this post", comments });
  } catch (err) {
    console.log(err);
  }
});
router.get("/post-comments/:id", isAuthenticated, async (req, res) => {
  try {
    const postId = req.params.id;
    const comments = await commentmodel.find({ post: postId });
    return res.json({ message: "all comments of this post", comments });
  } catch (err) {
    console.log(err);
  }
});

router.delete("/delete-post/:id", isAuthenticated, async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.id;

    const post = await postmodel.findById(postId);
    if (post.author.toString() !== userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized to delete this post" });
    }
    await postmodel.findByIdAndDelete(postId);

    const user = await usermodel.findById(userId);
    await user.updateOne({ $pull: { posts: postId } });
    await user.save();

    await commentmodel.deleteMany({ post: postId });
    res.json({ success: true, message: "Post deleted successfully" });
  } catch (err) {
    console.log(err);
  }
});

router.put("/bookmark/:id", isAuthenticated, async (req, res) => {
  try {
    const postId = req.params.id;
    const authorId = req.id;

    const post = await postmodel.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ message: "Post not found", success: false });
    }

    let user = await usermodel.findById(authorId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    if (user.bookmark.includes(post._id)) {
      // Remove from bookmarks
      await usermodel.findByIdAndUpdate(authorId, {
        $pull: { bookmark: post._id },
      });
    } else {
      // Add to bookmarks
      await usermodel.findByIdAndUpdate(authorId, {
        $push: { bookmark: post._id },
      });
    }

    // Fetch updated user with populated bookmarks
    const updatedUser = await usermodel
      .findById(authorId)
      // .populate({
      //   path: "bookmark",
      //   populate: { path: "author", select: "username" },
      // });

    return res.status(200).json({
      type: user.bookmark.includes(post._id) ? "unsaved" : "saved",
      message: user.bookmark.includes(post._id)
        ? "Post removed from bookmark"
        : "Post bookmarked",
      success: true,
      user: updatedUser, // Send fully populated user
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", success: false });
  }
});

module.exports = router;
