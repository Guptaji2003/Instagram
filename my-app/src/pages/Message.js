import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/authSlice";
import axios from "axios";
import { setMessages } from "../redux/chatSlice";
import { toast } from "react-toastify";
import GetAllmessages from "../hooks/GetAllmessages";
import { Link } from "react-router-dom";
import IMG from "../assests/raamin-ka-74jERQtN1V4-unsplash.jpg";
import GetRTM from "../hooks/GetRTM";

const Message = () => {
  const backendurl=process.env.REACT_APP_API_URL;

  const [msg, setMsg] = useState("");
  const dispatch = useDispatch();
  const { suggestedUsers, selectedUser, user } = useSelector(
    (store) => store.auth
  );
  const { messages,onlineUsers } = useSelector((store) => store.chat);
  console.log(selectedUser);
  console.log(messages);

  // ✅ Correctly calling the custom hook
  GetAllmessages(selectedUser?._id);
  GetRTM();

  const sendMessage = async () => {
    if (!selectedUser) return;
    try {
      const res = await axios.post(
        `${backendurl}/send-message/${selectedUser?._id}`,
        { message: msg },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      dispatch(setMessages([...messages, res.data.newmessage]));
      // toast.success(res.data.message);
      setMsg("");
    } catch (e) {
      console.log(e);
    }
  };

  // useEffect(() => {
  //   dispatch(setSelectedUser(null));
  // }, []);

  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]); // Runs when messages update
  

  return (
    <div>
      <div className="bg-pink-300 h-182 flex items-center justify-center">
        <div className="w-full mt-20 max-w-4xl h-[90vh] bg-white /*shadow-lg*/ rounded-lg flex overflow-hidden">
          <div className="w-1/3 bg-pink-400 p-4 space-y-1 overflow-y-auto scrollbar-hide">
            <h2 className="text-lg font-bold mb-2">Friends</h2>
            {suggestedUsers.map((user) => (
              <div
                onClick={() => dispatch(setSelectedUser(user))}
                className="cursor-pointer p-3 border-b shadow bg-white rounded-lg  flex items-center gap-3 hover:bg-gray-300"
                key={user._id}
              >
                <div className="w-10 h-10 bg-gray-400 rounded-full">
                  <img
                    src={
                      user.profileimage.includes("data")
                        ? user.profileimage
                        : IMG
                    }
                    alt=""
                    className="rounded-full h-10 w-15"
                  />
                </div>
                <div className="flex flex-col">
                  <p className=" font-bold">{user.username}</p>
                  <p className="font-xs">{user.name}</p>
                </div>
              </div>
            ))}
          </div>
          {selectedUser && (
            <div className="w-2/3 flex flex-col">
              <Link to={`/profile/${selectedUser._id}`}>
                <div className="bg-pink-400 flex items-center gap-3 p-4 font-bold">
                  <div className="w-10 h-10 bg-gray-400 rounded-full">
                    <img
                      src={
                        selectedUser.profileimage.includes("data")
                          ? selectedUser.profileimage
                          : IMG
                      }
                      alt=""
                      className="rounded-full h-10 w-15"
                    />
                  </div>
                  <div className="flex flex-col">
                    <p>{selectedUser?.username}</p>
                    <p className="text-sm font-normal  px-1 w-10 flex justify-center items-center rounded-xl bg-white">{onlineUsers.includes(selectedUser?._id)?"online":"offline"}</p>
                  </div>
                </div>
              </Link>
              <div ref={chatContainerRef} className="flex-1 p-4 overflow-y-auto  bg-pink-100 scrollbar-hide">
                {messages?.length > 0 &&
                  messages?.map((msg, index) => (
                    // <div>{JSON.stringify(msg)}</div>
                    <div
                      key={index}
                      className={`flex ${
                        msg.sender === user?._id
                          ? "justify-end"
                          : "justify-start"
                      } gap-2 p-3`}
                    >
                      <div
                        className={` h-10    gap-1  justify-center items-center bg-${
                          msg.sender === user?._id ? "pink-500" : "gray-400"
                        } rounded-xl px-2`}
                      >
                        <span className="">{msg.message}</span>
                        <span className="text-gray-200 text-xs flex justify-end">
                          {msg?.updatedAt ? new Date(msg?.updatedAt).toLocaleTimeString(
                            "en-US",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            }
                          ):""}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="p-3 bg-white flex gap-2 border-t">
                <input
                  type="text"
                  className="flex-1 border rounded-lg p-2"
                  placeholder="Type a message..."
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                />
                <button
                  onClick={sendMessage}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                  Send
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
