import "./App.css";
import Navbar from "./component/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Createpost from "./pages/Createpost";
import UserProfile from "./pages/UserProfile";
import MainLayout from "./component/MainLayout";
import Message from "./pages/Message";
import EditProfile from "./pages/EditProfile";
import Search from "./pages/Search";
import ProtectedRoute from "./protectroute/ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setOnlineUsers } from "./redux/chatSlice";
import { io } from "socket.io-client";
import { setSocket } from "./redux/socketSlice";
import { setLikeNotification } from "./redux/rtnSlice";
function App() {
  const { user } = useSelector((store) => store.auth);
  const { socket } = useSelector((store) => store.socketio);
  const dispatch = useDispatch();
  const backendurl=process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (user) {
      const socketio = io(`${backendurl}`, {
        query: {
          userId: user?._id,
        },
        transports: ["websocket"],
      });
      dispatch(setSocket(socketio));

      // listen all the events
      socketio.on("getOnlineUsers", (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });

      socketio.on("notification", (notification) => {
        dispatch(setLikeNotification(notification));
      });

      return () => {
        socketio.close();
        dispatch(setSocket(null));
      };
    } else if (socket) {
      socket.close();
      dispatch(setSocket(null));
    }
  }, [user, dispatch]);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
            <Route element={<ProtectedRoute />}>
          <Route path="/" element={<MainLayout />}>
            <Route path="/" element={<Home />} />
              <Route path="/createpost" element={<Createpost />} />
              <Route path="/profile/:userId" element={<UserProfile />} />
              <Route path="/message" element={<Message />} />
              <Route path="/edit-profile" element={<EditProfile />} />
              <Route path="/search" element={<Search />} />
            </Route>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <ToastContainer theme="dark" />
      </BrowserRouter>
    </>
  );
}

export default App;
