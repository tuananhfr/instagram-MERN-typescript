import React, { useEffect, useRef } from "react";
import io, { Socket } from "socket.io-client";
import Peer from "peerjs";
import { Outlet } from "react-router-dom";
import CreatePost from "../components/CreatePost";
import DeletePost from "../components/DeletePost";
import EditPost from "../components/EditPost";
import PostModal from "../components/PostModal";

import SearchBox from "../components/SearchBox";
import Instagram from "../images/logo.png";

import NavBar from "./components/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { setSocket } from "../redux/features/socketSlice";
import SocketClient from "../SocketClient";
import NotificationBox from "../components/NotificationBox";
import CreateConversation from "../components/CreateConversation";
import DeleteConversation from "../components/DeleteConversation";
import Call from "../components/Call";
import { setPeer } from "../redux/features/peerSlice";
import FollowerModal from "../components/FollowerModal";
import FollowingModal from "../components/FollowingModal";
import { refreshToken } from "../redux/features/authSlice";
import { BASE_URL } from "../utils/baseUrl";

const MainLayout: React.FC = () => {
  const socketIo = io(BASE_URL);

  const socketRef = useRef<Socket>(socketIo);
  const dispatch: AppDispatch = useDispatch();
  const { auth } = useSelector((state: RootState) => state);

  useEffect(() => {
    socketRef.current = socketIo;
    if (socketRef.current) {
      dispatch(setSocket(socketRef.current));
      // return () => {
      //   socketRef.current?.close();
      // };
    }
  }, [dispatch]);

  useEffect(() => {
    const newPeer = new Peer("", {
      path: "/",
      secure: true,
    });

    dispatch(setPeer(newPeer));
  }, [dispatch]);

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  return (
    <div className="absolute-center main-layout-container">
      {auth.user?.refreshToken && <SocketClient />}
      <NavBar />
      <Outlet />
      <SearchBox />
      <NotificationBox />
      <CreatePost />
      <PostModal />
      <DeletePost />
      <EditPost />
      <CreateConversation />
      <DeleteConversation />
      <Call />
      <FollowerModal />
      <FollowingModal />
    </div>
  );
};

export default MainLayout;
