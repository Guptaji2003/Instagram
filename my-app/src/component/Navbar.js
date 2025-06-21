import React, { useContext } from "react";
import Logo from "../instagram-vector-social-media-icon-7-june-2021-bangkok-thailand_53876-136728.avif";

const Navbar = () => {
  return (
    <>
      <div className="flex z-50 fixed top-0  w-full bg-white items-center justify-between px-10 py-3 border-b ">
        <div className="flex items-center">
          <img src={Logo} alt="" className="rounded-3xl" width={50} />
          <h1 className="font-mono font-bold text-2xl">Instagram</h1>
        </div>
      </div>
    </>
  );
};

export default Navbar;
