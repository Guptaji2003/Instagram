import React, { useEffect, useState } from "react";
import { setMessages } from "../redux/chatSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const GetAllmessages = (id) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!id) return; // Prevent API call if no ID is passed

    const getMessages = async () => {
      try {
        const res = await axios.get(
          `http://localhost:7000/get-conversations/${id}`,
          { withCredentials: true }
        );

        if (res.data.success) {
          dispatch(setMessages(res.data.message)); // Store messages in Redux
        }
      } catch (e) {
        console.error("Error fetching messages:", e);
      }
    };

    getMessages();
  }, [id]);
};

export default GetAllmessages;
