import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import IMG from "../assests/raamin-ka-74jERQtN1V4-unsplash.jpg";
import UseFollow from "../hooks/UseFollow";

const RightSideBar = () => {
  const { suggestedUsers, user } = useSelector((store) => store.auth);
  const { followhandle } = UseFollow();
  const { onlineUsers } = useSelector((store) => store.chat);
  
  return (
    <div className=" -mr-260 fixed px-4 overflow-y-auto scrollbar-hide w-[30%] h-150">
      <div className="w-full max-w-md p-4 bg-white  rounded-md">
        {/* User Profile */}
        <Link to={`profile/${user?._id}`}>
          <div className="flex hover:bg-pink-200 items-center space-x-3 rounded-xl p-3">
            <img
              src={
                user?.profileimage.includes("data") ? user.profileimage : IMG
              }
              alt="User"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h2 className="text-sm font-semibold">{user?.username}</h2>
              <p className="text-xs text-gray-500">{user?.name}</p>
            </div>
            {/* {onlineUsers?.includes(user?._id) ? (
              <span className="text-white bg-gray-500 p-2 rounded-2xl">
                Online
              </span>
            ) : (
              "no"
            )} */}
          </div>
        </Link>

        {/* Suggestions Header */}
        <div className="flex justify-between items-center mt-5 mb-3">
          <h3 className="text-sm font-semibold text-gray-700">
            Suggested for you
          </h3>
          {/* <button className="text-sm text-blue-500 hover:underline">
            See All
          </button> */}
        </div>

        {/* Suggested User */}

        {suggestedUsers.map((item) => (
          <div
            key={item?._id}
            className="flex border-b  items-center space-y-2 justify-between hover:bg-pink-200 shadow rounded-xl p-3"
          >
            <Link to={`/profile/${item?._id}`}>
              <div className="flex items-center space-x-3">
                <img
                  src={
                    item.profileimage.includes("data") ? item.profileimage : IMG
                  }
                  alt="Suggested User"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h2 className="text-sm font-semibold">{item?.username}</h2>
                  <p className="text-xs text-gray-500">{item?.name}</p>
                </div>
              </div>
            </Link>
            <button
              onClick={() => followhandle(item?._id)}
              className="text-sm font-semibold text-blue-500 hover:text-blue-700"
            >
              {user?.followings.includes(item?._id) ? (
                <span className=" text-white bg-gray-500 p-2 rounded-2xl">
                  Following
                </span>
              ) : (
                <span className=" text-white bg-blue-500 p-2 rounded-2xl">
                  Follow
                </span>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RightSideBar;
