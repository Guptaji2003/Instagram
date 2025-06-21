const mongoose = require("mongoose");

const postschema = new mongoose.Schema({
  caption: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  location:{
    type: String,
    // required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  comments: [
    {
      
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      
    },
  ],
});

const postmodel = mongoose.model("Post", postschema);

module.exports = postmodel;
