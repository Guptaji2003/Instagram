import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setAuthUser, setSelectedUser } from "../redux/authSlice";

const SideBar = () => {
  const backendurl=process.env.REACT_APP_API_URL;

  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [activetab, setactivetab] = useState('home')
  const logouthandle = async () => {
    console.log("fkn");
    
    try {
      const res = await axios.get(`${backendurl}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setAuthUser(null));
        dispatch(setSelectedUser(null));
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed top-18 z-10 left-0 px-4 border-r bg-white border-gray-300 w-[16%] h-screen">
      <div className="flex flex-col">
        <ul className="mt-10 flex flex-col gap-3">
          <Link to={"/"}>
            <li onClick={()=>setactivetab('home')} className={`flex transition-all items-center border-b shadow space-x-3 ${activetab==='home'?"bg-pink-300":""} hover:bg-pink-300 text-gray-700 hover:text-black cursor-pointer py-4 rounded-lg`}>
              <i className="lucide lucide-home"></i>
              <span>Home</span>
            </li>
          </Link>
          <Link to={'/search'}>
          <li onClick={()=>setactivetab('search')} className={`flex items-center border-b shadow space-x-3 ${activetab==='search'?"bg-pink-300":""} hover:bg-pink-300  text-gray-700 hover:text-black cursor-pointer py-4 rounded-lg`}>
          <i className="lucide lucide-search"></i>
              <span>Search</span>
            </li>
          </Link>
          {/* <Link>
          <li onClick={()=>setactivetab('explore')} className={`flex items-center border-b shadow space-x-3 ${activetab==='explore'?"bg-pink-300":""} hover:bg-pink-300 text-gray-700 hover:text-black cursor-pointer py-4 rounded-lg`}>
          <i className="lucide lucide-trending-up"></i>
              <span>Explore</span>
            </li>
          </Link> */}
          <Link to={'/message'}> 
          <li onClick={()=>setactivetab('message')} className={`flex items-center border-b shadow space-x-3 ${activetab==='message'?"bg-pink-300":""} hover:bg-pink-300 text-gray-700 hover:text-black cursor-pointer py-4 rounded-lg`}>
          <i className="lucide lucide-message-circle"></i>
              <span>Message</span>
            </li>
          </Link>
          {/* <Link>
          <li onClick={()=>setactivetab('notification')} className={`flex items-center border-b shadow space-x-3 ${activetab==='notification'?"bg-pink-300":""} hover:bg-pink-300 text-gray-700 hover:text-black cursor-pointer py-4 rounded-lg`}>
          <i className="lucide lucide-heart"></i>
              <span>Notifications</span>
            </li>
          </Link> */}
          <Link to={"/createpost"}>
          <li onClick={()=>setactivetab('create')} className={`flex items-center border-b shadow space-x-3 ${activetab==='create'?"bg-pink-300":""} hover:bg-pink-300 text-gray-700 hover:text-black cursor-pointer py-4 rounded-lg`}>
          <i className="lucide lucide-plus-square"></i>
              <span>Create</span>
            </li>
          </Link>
          <Link to={`profile/${user?._id}`}>
          <li onClick={()=>setactivetab('profile')} className={`flex items-center border-b shadow space-x-3 ${activetab==='profile'?"bg-pink-300":""} hover:bg-pink-300 text-gray-700 hover:text-black cursor-pointer py-4 rounded-lg`}>
          <i className="lucide lucide-plus-square"></i>

              <span>Profile</span>
            </li>
          </Link>
          
          <li onClick={()=>logouthandle()} className={`flex items-center border-b shadow space-x-3  text-gray-700 hover:text-black hover:bg-pink-300 cursor-pointer py-4 rounded-lg`}>
          <i className="lucide lucide-log-out"></i>
              <span>Logout</span>
            </li>
          
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
