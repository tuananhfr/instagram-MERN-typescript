import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import SearchBox from "../components/SearchBox";
import Instagram from "../images/logo.png";
import { getUser, resetState } from "../redux/features/userSlice";
import { AppDispatch, RootState } from "../redux/store";

import NavBar from "./components/NavBar";

const MainLayout: React.FC = () => {
  const { username } = useParams() as {
    username: string;
  };
  const { auth } = useSelector((state: RootState) => state);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    // if (username === undefined) {
    //   dispatch(getUser(auth.user!.username));
    // } else {
    dispatch(getUser("tuananh"));
    //}
  }, [dispatch]);
  console.log(username);
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
