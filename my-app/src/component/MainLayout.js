import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import RightSideBar from "./RightSideBar";
import GetsuggestedUsers from "../hooks/GetsuggestedUsers";
import GetAllPost from "../hooks/GetAllPost";

const MainLayout = () => {
GetsuggestedUsers();
  GetAllPost();
  return (
    <div >
      <SideBar />
      <div className="">
      <Outlet />
      </div>
      
    </div>
  );
};

export default MainLayout;
