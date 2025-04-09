import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import IMG from "../assests/raamin-ka-74jERQtN1V4-unsplash.jpg";
import Post from "../component/Post";
import { AuthContext } from "../context/AuthContext";
import Feed from "../component/Feed";
import RightSideBar from "../component/RightSideBar";
import Story from "../component/Story";
import GetAllPost from "../hooks/GetAllPost";
import { useSelector } from "react-redux";

const Home = () => {
  GetAllPost();
  const { user } = useSelector(store =>store.auth);
  console.log(user);
  
  return (
    <div className="flex   justify-center gap-20 mt-30">
      <div>
        {/* <Story /> */}
        <Feed />
      </div>
      <RightSideBar />
    </div>
  );
};

export default Home;
