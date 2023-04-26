import React, { useState, useEffect, createRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiFillFacebook } from "react-icons/ai";
import { useFormik } from "formik";
import * as yup from "yup";

import { login } from "../redux/features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import logo from "../images/logo.png";
import appStore from "../images/app-store.png";
import googlePlay from "../images/google-play.png";
import Helmet from "../components/Helmet";
import FaceBookLogin from "../components/FaceBookLogin";
import { TbLoaderQuarter } from "react-icons/tb";

let schema = yup.object().shape({
  email: yup
    .string()
    .email("Email should be valid")
    .required("Email is Required"),
  password: yup.string().required("Password is Required"),
});
const Login: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });

  const [typePass, setTypePass] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);

  const { auth } = useSelector((state: RootState) => state);
  const { user, message } = auth;

  useEffect(() => {
    if (user) {
      navigate("/");
    } else {
      navigate("");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (
      formik.values.password.length >= 6 &&
      formik.values.email.length >= 1 &&
      !formik.errors.email
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [
    formik.values.password.length,
    formik.values.email.length,
    formik.errors.email,
  ]);

  return (
    <Helmet title="Login • Instagram">
      <div className="login-page">
        <div className="main-login-page">
          <div className="phone-app-demo"></div>
          <div className="form-data-login">
            <form onSubmit={formik.handleSubmit}>
              <div className="logo">
                <img src={logo} alt="logo" />
              </div>

              <input
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

              <div className="pass">
                <input
                  className="input-password"
                  type={typePass ? "text" : "password"}
                  placeholder="Password"
                  onChange={formik.handleChange("password")}
                  value={formik.values.password}
                  name="password"
                />

                <h6 onClick={() => setTypePass(!typePass)}>
                  {typePass ? "Hide" : "Show"}
                </h6>
              </div>

              <button
                type="submit"
                className={
                  isActive ? "form-btn active-btn" : "form-btn pe-none"
                }
                disabled={
                  formik.values.email && formik.values.password ? false : true
                }
              >
                <span>Log in</span>
              </button>

              <span className="has-separator">Or</span>
              <div className="facebook-login absolute-center">
                {/* <span>
                  <AiFillFacebook />
                </span>{" "} */}
                <FaceBookLogin title="Log in with Facebook" />
              </div>

              <div
                className="text-danger text-center my-4"
                style={{ fontSize: "0.8rem" }}
              >
                {message === "Rejected"
                  ? "Sorry, your password was incorrect. Please double-check your password."
                  : ""}
              </div>
              <Link className="password-reset" to="/forgot-password">
                Forgot password?
              </Link>
            </form>
            <div className="sign-up">
              Don't have an account?{" "}
              <Link to="/signup" className="sign-up-btn">
                Sign up
              </Link>
            </div>

            <div className="get-the-app">
              <span>Get the app.</span>
              <div className="badges">
                <img src={appStore} alt="app-store badge" />
                <img src={googlePlay} alt="google-play badge" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Helmet>
  );
};
export default Login;
