import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "./redux/store";

const PrivateRouter: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { auth } = useSelector((state: RootState) => state);
  const { user } = auth;

  return !user ? <Navigate to={"/login"} /> : children;
};

export default PrivateRouter;
