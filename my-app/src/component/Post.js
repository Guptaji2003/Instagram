import React, { useState } from "react";
import IMG from "../assests/raamin-ka-74jERQtN1V4-unsplash.jpg";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import GetAllPost from "../hooks/GetAllPost";
import { useDispatch } from "react-redux";
import { setPosts } from "../redux/postSlice";
import { setAuthUser } from "../redux/authSlice";
import UseFollow from "../hooks/UseFollow";
const Post = ({ post }) => {
  const backendurl=process.env.REACT_APP_API_URL;
  const [commenttoggle, setCommenttoggle] = useState(false);
  const [commenttext, setcommenttext] = useState("");
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const { followhandle } = UseFollow();
  // const followhandle = async () => {
  //   try {
  //     const res = await axios.put(
  //       `http://localhost:7000/follow/${post.author._id}`,
  //       {},
  //       {
  //         withCredentials: true,
  //       }
  //     );
  //     if (res.data.success) {
  //       console.log(res.data);
  //       toast.success(res.data.message);
  //     }
  //     dispatch(setAuthUser(res.data.user));
  //   } catch (err) {
  //     console.log(err.response.data.message);
  //     toast.error(err.response.data.message);
  //   }
  // };

  const deletehandle = async () => {
    try {
      const res = await axios.delete(
        `${backendurl}/delete-post/${post._id}`,
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        // console.log(res.data);
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
      // GetAllPost();
    } catch (err) {
      console.log(err.response.data.message);
      toast.error(err.response.data.message);
    }
  };

  const likehandle = async () => {
    try {
      const res = await axios.put(
        `${backendurl}/like-dislike/${post._id}`,
        {},
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        console.log(res.data);
        toast.success(res.data.message);
        dispatch(setPosts(res.data.posts));
      }
    } catch (err) {
      console.log(err.response.data.message);
      toast.error(err.response.data.message);
    }
  };

  const commenthandle = async () => {
    try {
      const res = await axios.put(
        `${backendurl}/comment/${post._id}`,
        { text: commenttext },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        console.log(res.data);
        toast.success(res.data.message);
        dispatch(setPosts(res.data.posts));
      }
      setcommenttext("");
      // console.log(res.data);
    } catch (err) {
      console.log(err);

      // console.log(err.response.data.message);
      // toast.error(err.response.data.message);
    }
  };

  const bookmarkhandle = async () => {
    try {
      const res = await axios.put(
        `${backendurl}/bookmark/${post._id}`,
        {},
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        console.log(res.data);
        toast.success(res.data.message);
        dispatch(setAuthUser(res.data.user));
      }
    } catch (err) {
      console.log(err.response.data.message);
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white border border-gray-300 rounded-md shadow-md">
      {/* Post Header */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center space-x-3">
          <Link to={`/profile/${post.author?._id}`}>
            <img
              src={
                post.author?.profileimage?.includes("data")
                  ? post.author?.profileimage
                  : IMG
              }
              alt="Profile"
              className="w-10 h-10 rounded-full "
            />
          </Link>
          <div className="flex flex-col">
            <h2 className="text-sm font-semibold">{post.author?.username}</h2>
            <h5 className="text-gray-600 font-mono text-xm">
              {post?.location}
            </h5>
          </div>
          {user?._id == post.author?._id ? (
            <span className="bg-gray-200 text-xs px-2 py-1 rounded-md">
              You
            </span>
          ) : (
            ""
          )}
        </div>
        {/* {console.log(user.followings.includes(post.author._id))} */}

        <div className="flex  gap-10">
          {user?._id !== post.author?._id ? (
            <button
              className="text-sm font-semibold text-blue-500 hover:text-blue-700"
              onClick={() => followhandle(post.author?._id)}
            >
              {user?.followings.includes(post.author?._id) ? (
                <span className=" text-white bg-gray-500 p-2 rounded-2xl">
                  Following
                </span>
              ) : (
                <span className=" text-white bg-blue-500 p-2 rounded-2xl">
                  Follow
                </span>
              )}
            </button>
          ) : (
            <></>
          )}

          <div className="relative group">
            <button>⋮</button>
            <div className="hidden group-hover:block absolute  -mt-2 -left-10 w-32 bg-white border border-gray-300 rounded-lg shadow-lg">
              <ul>
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                  Report
                </li>
                {/* <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Option 2</li> */}
                {user?._id === post.author?._id && (
                  <li
                    onClick={() => deletehandle()}
                    className="px-4 py-2  hover:bg-gray-200 text-red-600 cursor-pointer"
                  >
                    Delete
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* Post Image */}
      <img
        // src={post.photo?.includes("data") ? post.photo : IMG}
        src={post.photo}
        alt="Post"
        width={300}
      />
      {/* Post Actions */}
      <div className="flex justify-between p-3">
        <div className="flex space-x-4">
          <button onClick={() => likehandle()}>
            {post.likes.includes(user?._id) ? "❤️" : "🤍"}
          </button>
          {post.likes.length > 0 && post.likes.length}
          <button>💬</button>
          {post.comments.length > 0 && post.comments.length}
          <button>📤</button>
        </div>
        <button onClick={() => bookmarkhandle()}>
          {user?.bookmark.includes(post._id) ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="black"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="black"
                class="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M5 3v18l7-5 7 5V3z"
                />
              </svg>
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="black"
                class="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M5 3v18l7-5 7 5V3z"
                />
              </svg>
            </>
          )}
        </button>
      </div>
      {/* Likes and Caption */}
      <div className="px-3 pb-3">
        {/* <p className="text-sm text-gray-500">{post.likes.length} likes</p> */}
        <p className="text-sm">
          <span className="font-semibold">{post.author?.username} </span>{" "}
          {post.caption}
        </p>
      </div>
      {/* Comments */}
      <div className="flex px-3">
        {/* Button to Open Popup */}
        {post?.comments.length > 0 && (
          <button
            onClick={() => setCommenttoggle(true)}
            className="b text-gray-500 "
          >
            View all {post?.comments.length} comments
          </button>
        )}
        {/* Popup Modal */}
        {commenttoggle && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-5 rounded-lg w-96 shadow-lg">
              {/* Header */}
              <div className="flex justify-between items-center border-b pb-2">
                <h2 className="text-xl font-bold">Comments</h2>
                <button
                  onClick={() => setCommenttoggle(false)}
                  className="text-gray-500 hover:text-red-500"
                >
                  ✖
                </button>
              </div>

              {/* Comments Section */}
              <div className="mt-3 max-h-60 overflow-y-auto">
                {post.comments.map((comment) => (
                  <div key={comment._id} className="p-1 border-b flex ">
                    <img
                      src={
                        comment.author?.profileimage?.includes("data")
                          ? comment.author.profileimage
                          : IMG
                      }
                      alt="Profile"
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="ml-3">
                      <p className="text-sm font-semibold">
                        {comment.author.username}
                      </p>
                      <p>{comment.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Comment Input */}̥
      <div className=" p-1 flex">
        <input
          type="text"
          placeholder="Add a comment..."
          className="w-full text-sm p-2 outline-none"
          value={commenttext}
          onChange={(e) => setcommenttext(e.target.value)}
        />
        <button
          className=" text-white bg-pink-700 px-2 py-1 rounded-md"
          onClick={() => commenthandle()}
        >
          send
        </button>
      </div>
    </div>
  );
};

export default Post;
