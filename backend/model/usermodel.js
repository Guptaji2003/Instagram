const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender:{
    type: String,
    enum: ["male", "female"],
  },
  profileimage:{
    type: String,
    default: ""
  },
  bio:{
    type: String,
    default: ""
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  followings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  bookmark:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post"
  }]
  
});

const usermodel = mongoose.model("User", userschema);
module.exports = usermodel;
