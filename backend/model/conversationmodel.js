const mongoose = require("mongoose");

const conversationschema = new mongoose.Schema({
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
});

const conversationmodel = mongoose.model("Conversation", conversationschema);

module.exports = conversationmodel;
