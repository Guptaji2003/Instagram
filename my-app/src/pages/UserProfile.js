import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import IMG from "../assests/raamin-ka-74jERQtN1V4-unsplash.jpg";
import axios from "axios";
import Post from "../component/Post";
import { useDispatch, useSelector } from "react-redux";
import GetUserProfile from "../hooks/GetUserProfile";
import { Bell, Bookmark, Grid, User, UserRoundPen } from "lucide-react";
import { setAuthUser, setSelectedUser } from "../redux/authSlice";
import { toast } from "react-toastify";
import UseFollow from "../hooks/UseFollow";

const UserProfile = () => {
  const { userId } = useParams();
  GetUserProfile(userId);
  const { user, userProfile } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("posts");
const {followhandle}=UseFollow();
 const [followtoggle, setfollowtoggle] = useState(false)
 const [followtab, setfollowtab] = useState("")
console.log(userProfile);

  return (
    <>
      {" "}
      <div className="min-h-screen mt-20 bg-pink-200 flex justify-center p-4">
        <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-6">
          {/* Profile Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src={userProfile?.profileimage}
                alt="Profile"
                className="w-20 h-20 rounded-full border-4 border-blue-500"
              />
              <div>
                <h2 className="text-xl font-bold">{userProfile?.username}</h2>
                <p className="text-gray-500">{userProfile?.name}</p>
                <p className="text-gray-900 ">{userProfile?.bio}</p>
              </div>
            </div>
            {user?._id === userProfile?._id ? (
              <Link to={"/edit-profile"}>
                <button className="bg-blue-500 text-white px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700">
                  <UserRoundPen size={18} />
                  Edit Profile
                </button>
              </Link>
            ) : (
              <></>
            )}
          </div>

          {/* Stats */}
          <div className="mt-4 flex justify-around text-center">
            <div>
              <p className="font-bold text-lg">{userProfile?.posts?.length}</p>
              <p className="text-gray-500">Posts</p>
            </div>
            <div onClick={()=>{setfollowtab("follower")
              setfollowtoggle(true)
            }}>
              <p className="font-bold text-lg">
                {userProfile?.followers?.length}
              </p>
              <p className="text-gray-500">Followers</p>
            </div>
            <div onClick={()=>{setfollowtab("following")
              setfollowtoggle(true)
            }}>
              <p className="font-bold text-lg">
                {userProfile?.followings?.length}
              </p>
              <p className="text-gray-500">Following</p>
            </div>
          </div>
          {user?._id !== userProfile?._id ? (
            <div className="flex w-full gap-3 mt-10">
              {user?.followings?.includes(userProfile?._id) ? (
                <span
                  onClick={() => followhandle(userProfile?._id)}
                  className=" w-1/2 py-2 flex justify-center bg-gray-400 text-white rounded-xl"
                >
                  Following
                </span>
              ) : (
                <span
                  onClick={() => followhandle(userProfile?._id)}
                  className=" w-1/2 py-2 flex justify-center bg-blue-500 rounded-xl"
                >
                  Follow
                </span>
              )}
              {/* </div> */}
              <Link
                to={"/message"}
                onClick={() => dispatch(setSelectedUser(userProfile))}
                className="border w-1/2 py-2 flex justify-center bg-blue-500 rounded-xl"
              >
                <div>Message</div>
              </Link>
            </div>
          ) : (
            <></>
          )}
          {user?.followings.includes(userProfile?._id) ||
          user?._id === userProfile?._id ? (
            <>
              <div className="mt-6 flex justify-around border-b">
                <button
                  onClick={() => setActiveTab("posts")}
                  className={`pb-2 flex items-center gap-1 ${
                    activeTab === "posts"
                      ? "border-b-4 border-blue-500 text-blue-500 font-bold"
                      : "text-gray-500"
                  }`}
                >
                  <Grid size={18} />
                  Posts
                </button>
                {user?._id === userProfile?._id ? (
                  <button
                    onClick={() => setActiveTab("bookmarks")}
                    className={`pb-2 flex items-center gap-1 ${
                      activeTab === "bookmarks"
                        ? "border-b-4 border-blue-500 text-blue-500 font-bold"
                        : "text-gray-500"
                    }`}
                  >
                    <Bookmark size={18} />
                    Bookmarks
                  </button>
                ) : null}
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2">
                {activeTab === "posts" &&
                  (userProfile?.posts.length > 0 ? (
                    userProfile?.posts
                      .slice("")
                      .reverse()
                      .map((post) => (
                        <>
                          <img
                            key={post.id}
                            // src={post.photo.includes("data") ? post.photo : IMG}
                            src={post.photo}
                            alt="Post"
                            className="w-full  h-64 object-cover rounded-lg hover:scale-95  transition "
                          />
                        </>
                      ))
                  ) : (
                    <p>No posts found</p>
                  ))}

                {user?._id === userProfile?._id &&
                  activeTab === "bookmarks" &&
                  (userProfile?.bookmark.length > 0 ? (
                    userProfile?.bookmark.slice("").reverse().map((bookmark) => (
                      <img
                        key={bookmark._id}
                        src={
                          bookmark.photo?.includes("data")
                            ? bookmark.photo
                            : IMG
                        }
                        alt="Bookmark"
                        className="w-full h-64 object-cover rounded-lg hover:scale-95 transition"
                      />
                    ))
                  ) : (
                    <p>No bookmarks found</p>
                  ))}
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col h-100 items-center justify-center">
                <div className="w-80 bg-white rounded-lg  p-6 text-center">
                  <h2 className="text-xl font-semibold mb-2">
                    This Account is Private
                  </h2>
                  <p className="text-gray-600">
                    Follow to see their posts and details.
                  </p>
                  {/* <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Follow</button> */}
                </div>
              </div>
            </>
          )}
        </div>
        {followtoggle && userProfile.followings.length>0 && followtab==="following" && (
                  <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-5 rounded-lg w-96 shadow-lg">
                      {/* Header */}
                      <div className="flex justify-between items-center border-b pb-2">
                        <h2 className="text-xl font-bold">Followings</h2>
                        <button
                          onClick={() => setfollowtoggle(false)}
                          className="text-gray-500 hover:text-red-500"
                        >
                          ✖
                        </button>
                      </div>
        
                      {/* Comments Section */}
                      <div className="mt-3 max-h-60 overflow-y-auto">
                        {userProfile.followings?.map((comment) => (
                          <div key={comment._id} className="p-1 border-b flex ">
                            <img
                              src={(comment.profileimage?.includes("data")? comment.profileimage  : IMG)}
                              alt="Profile"
                              className="w-10 h-10 rounded-full"
                            />
                            <div className="ml-3">
                              <p className="text-sm font-semibold">
                                {comment.username}
                              </p>
                              <p>{comment.name}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                 {followtoggle && userProfile.followers.length>0 && followtab==="follower" && (
                  <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-5 rounded-lg w-96 shadow-lg">
                      {/* Header */}
                      <div className="flex justify-between items-center border-b pb-2">
                        <h2 className="text-xl font-bold">Followers</h2>
                        <button
                          onClick={() => setfollowtoggle(false)}
                          className="text-gray-500 hover:text-red-500"
                        >
                          ✖
                        </button>
                      </div>
        
                      {/* Comments Section */}
                      <div className="mt-3 max-h-60 overflow-y-auto">
                        {userProfile.followers?.map((comment) => (
                          <div key={comment._id} className="p-1 border-b flex ">
                            <img
                              src={(comment.profileimage?.includes("data")? comment.profileimage  : IMG)}
                              alt="Profile"
                              className="w-10 h-10 rounded-full"
                            />
                            <div className="ml-3">
                              <p className="text-sm font-semibold">
                                {comment.username}
                              </p>
                              <p>{comment.name}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
      </div>
    </>
  );
};

export default UserProfile;
