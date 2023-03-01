import React from "react";

import { Outlet } from "react-router-dom";
import SearchBox from "../components/SearchBox";
import Instagram from "../images/logo.png";

import NavBar from "./components/NavBar";

const MainLayout: React.FC = () => {
  return (
    <div className="main-layout-container">
      <div className="top-instagram-logo">
        <img src={Instagram} alt="instagram logo" className="instagram-logo" />
      </div>
      <NavBar />
      <Outlet />
      <SearchBox />
    </div>
  );
};

export default MainLayout;
