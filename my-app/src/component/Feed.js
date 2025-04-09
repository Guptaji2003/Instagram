import React from "react";
import Post from "./Post";
import { useSelector } from "react-redux";

const Feed = () => {
  const {posts}=useSelector(store=>store.post);
  console.log(posts);
  
  return (
    <div className="flex flex-col gap-10 ">
      {posts.slice("").reverse().map((item) => <Post post={item}/> )}
    </div>
  );
};

export default Feed;
