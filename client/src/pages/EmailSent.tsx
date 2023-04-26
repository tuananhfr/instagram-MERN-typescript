import React from "react";
import Helmet from "../components/Helmet";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setNullUser } from "../redux/features/authSlice";

const EmailSent = () => {
  const dispatch: AppDispatch = useDispatch();
  const { auth } = useSelector((state: RootState) => state);

  const handleOnClick = () => {
    dispatch(setNullUser());
  };
  return (
    <Helmet title="Email Sent • Instagram">
      <div className="forgot-password-header">
        <div className="forgot-password-header-wrapper">
          <Link to="/" className="forgot-password-logo" onClick={handleOnClick}>
            <img src={logo} alt="logo" />
          </Link>
          <Link
            className="email-sent-btn-login"
            to="/login"
            onClick={handleOnClick}
          >
            Log in to another account
          </Link>
        </div>
      </div>
      <div
        className="forgot-password-body absolute-center"
        style={{ height: "80vh" }}
      >
        <div className="email-sent-box ">
          <div
            style={{
              fontWeight: "500",
            }}
            className="absolute-center"
          >
            Email sent
          </div>
          <div
            className="absolute-center mt-2"
            style={{
              display: "block",
              textAlign: "center",
              color: "#737373",
              fontSize: "14px",
            }}
          >
            We sent an email to{" "}
            <div style={{ display: "inline", color: "black", fontWeight: 600 }}>
              {auth.user!.email}
            </div>{" "}
            with a link to recover your account.
          </div>
          <Link
            onClick={handleOnClick}
            to="/forgot-password"
            className="email-sent-btn absolute-center"
          >
            OK
          </Link>
        </div>
      </div>
    </Helmet>
  );
};

export default EmailSent;
