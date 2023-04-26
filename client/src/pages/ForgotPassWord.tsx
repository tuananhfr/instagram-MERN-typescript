import React, { useState, useEffect } from "react";
import logo from "../images/logo.png";
import Helmet from "../components/Helmet";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { forgotPassword } from "../redux/features/authSlice";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
let schema = yup.object().shape({
  email: yup
    .string()
    .email("Email should be valid")
    .required("Email is Required"),
});
const ForgotPassWord: React.FC = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();
  const { auth } = useSelector((state: RootState) => state);
  const { user, message } = auth;

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(forgotPassword(values));
      formik.resetForm();
    },
  });
  useEffect(() => {
    if (formik.values.email.length > 0) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [formik.values.email.length]);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/email-sent");
    } else {
      navigate("");
    }
  }, [user, navigate]);

  return (
    <Helmet title="Forgot Password • Instagram">
      <div className="forgot-password-header">
        <div className="forgot-password-header-wrapper">
          <Link to="/" className="forgot-password-logo">
            <img src={logo} alt="logo" />
          </Link>
        </div>
      </div>
      <div className="forgot-password-body absolute-center">
        <form
          className="absolute-center flex-column"
          onSubmit={formik.handleSubmit}
        >
          <div className="forgot-password-lock"></div>
          <div style={{ fontWeight: "600" }} className="mb-2">
            Trouble logging in?
          </div>
          <div style={{ color: "#737373", fontSize: "14px" }} className="mb-2">
            Enter your email, phone, or username and we'll send you a link to
            get back into your account.
          </div>

          <input
            className="mb-2"
            type="Email"
            placeholder="Email"
            name="email"
            onChange={formik.handleChange("email")}
            value={formik.values.email}
          />
          {formik.errors.email && formik.values.email ? (
            <div className="mb-1" style={{ color: "red" }}>
              {formik.errors.email}
            </div>
          ) : null}
          <button
            type="submit"
            className={
              isActive ? "form-btn active-btn w-100" : "form-btn pe-none w-100"
            }
            disabled={isActive ? false : true}
          >
            Send login link
          </button>
          <Link
            className="password-reset"
            to="https://help.instagram.com/374546259294234"
          >
            Can't reset your password?
          </Link>
          <div className="forgot-password-separator">
            <span
              className="absolute-center"
              style={{
                fontSize: "13px",
                fontWeight: 600,
                color: "#737373",
                lineHeight: "15px",
              }}
            >
              Or
            </span>
          </div>
          <Link
            className="forgot-password-text-btn absolute-center"
            to="/signup"
          >
            Create new account
          </Link>
          <div
            className="text-danger text-center my-3"
            style={{ fontSize: "0.8rem" }}
          >
            {message !== "success" ? message : ""}
          </div>
          <div className="forgot-password-login">
            <Link
              className="forgot-password-text-btn absolute-center"
              to="/login"
              style={{ height: "100%" }}
            >
              Back to login
            </Link>
          </div>
        </form>
      </div>
    </Helmet>
  );
};

export default ForgotPassWord;
