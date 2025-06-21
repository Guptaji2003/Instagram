const express = require("express");
const postmodel = require("../model/postmodel");
const usermodel = require("../model/usermodel");
const isAuthenticated = require("../middleware/isAuthemticated");
const commentmodel = require("../model/commentmodel");
const messagemodel = require("../model/messagemodel");
const conversationmodel = require("../model/conversationmodel");
const path = require("path");
// const getReceiverSocketId = require("../socket/socket");
const router = express.Router();
const { getReceiverSocketId, io } =require("../socket/socket");
router.get("/all-message", async (req, res) => {
  const mes = await messagemodel
    .find()
    .populate({ path: "sender", select: "username" })
    .populate({ path: "receiver", select: "username" });

  res.json(mes);
});
router.post("/send-message/:id", isAuthenticated, async (req, res) => {
  const senderId = req.id;
  const receiverId = req.params.id;
  const { message } = req.body;
  let conversation = await conversationmodel.findOne({
    participants: { $all: [senderId, receiverId] },
  });
  if (!conversation) {
    conversation = new conversationmodel({
      participants: [senderId, receiverId],
      messages: [],
    });
  }

  const newmessage = new messagemodel({
    sender: senderId,
    receiver: receiverId,
    message,
  });
  if (newmessage) conversation.messages.push(newmessage._id);

  await newmessage.save();
  await conversation.save();

  const receiverSocketId = getReceiverSocketId(receiverId);
  if (receiverSocketId) {
    io.to(receiverSocketId).emit("newMessage", newmessage);
  }
  res.json({
    success: true,
    message: "Message sent successfully",
    newmessage: newmessage,
  });
});

router.get("/get-conversations/:id", isAuthenticated, async (req, res) => {
  const senderId = req.id;
  const receiverId = req.params.id;
  const conversation = await conversationmodel
    .findOne({
      participants: { $all: [senderId, receiverId] },
    })
    .populate({
      path: "messages",
      select: "sender receiver message updatedAt",
      // populate: { path: "sender", select: "username" },
    });
  if (!conversation) {
    return res.json({ success: true, message: [] });
  }
  return res.json({ success: true, message: conversation.messages });
});

module.exports = router;
