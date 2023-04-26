import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiFillFacebook } from "react-icons/ai";
import { useFormik } from "formik";
import * as yup from "yup";

import { register } from "../redux/features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import Helmet from "../components/Helmet";
import logo from "../images/logo.png";
import appStore from "../images/app-store.png";
import googlePlay from "../images/google-play.png";
import FaceBookLogin from "../components/FaceBookLogin";

let schema = yup.object().shape({
  email: yup
    .string()
    .email("Email should be valid")
    .required("Email is Required"),
  fullname: yup.string().required("Full Name is Required"),
  username: yup.string().required("Username is Required"),
  password: yup.string().required("Password is Required"),
});

const Register: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      fullname: "",
      username: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(register(values));
    },
  });

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
      formik.values.email.length > 0 &&
      formik.values.fullname.length > 0 &&
      formik.values.username.length > 0
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [
    formik.values.email.length,
    formik.values.fullname.length,
    formik.values.password.length,
    formik.values.username.length,
  ]);

  const [typePass, setTypePass] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  return (
    <Helmet title="Sign up • Instagram">
      <div className="register-page">
        <div className="main-register-page">
          <div className="form-data-register">
            <form onSubmit={formik.handleSubmit}>
              <div className="logo">
                <img src={logo} alt="logo" />
              </div>

              <div className="register-text">
                Sign up to see photos and videos from your friends.
              </div>
              <button className="form-btn active-btn">
                {/* <span>
                  <AiFillFacebook style={{ background: "#4db5f" }} />
                </span>{" "} */}

                <FaceBookLogin title="Log in with Facebook" />
              </button>
              <span className="has-separator">Or</span>
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

              <input
                type="text"
                placeholder="Full Name"
                name="fullname"
                onChange={formik.handleChange("fullname")}
                value={formik.values.fullname}
              />

              <input
                type="text"
                placeholder="Username"
                name="username"
                onChange={formik.handleChange("username")}
                value={formik.values.username}
              />
              <div className="pass ">
                <input
                  className="input-password form-data-register-password"
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

              <span
                style={{
                  lineHeight: "1.2rem",
                  fontWeight: "400",
                  fontSize: "0.8rem",
                  marginBottom: "1rem",
                }}
              >
                People who use our service may have uploaded your contact
                information to Instagram.
                <Link
                  to="https://www.facebook.com/help/instagram/261704639352628"
                  style={{ color: "#73b6fb" }}
                >
                  {" "}
                  Learn More
                </Link>{" "}
              </span>
              <span
                style={{
                  lineHeight: "1.2rem",
                  fontWeight: "400",
                  fontSize: "0.8rem",
                  marginBottom: "0.6rem",
                }}
              >
                By signing up, you agree to our{" "}
                <Link
                  style={{ color: "#73b6fb" }}
                  to="https://help.instagram.com/581066165581870/?locale=en_US"
                >
                  Terms
                </Link>{" "}
                . Learn how we collect, use and share your data in our{" "}
                <Link
                  to="https://www.facebook.com/privacy/policy"
                  style={{ color: "#73b6fb" }}
                >
                  Privacy Policy
                </Link>{" "}
                and how we use cookies and similar technology in our{" "}
                <Link
                  to="https://help.instagram.com/1896641480634370/"
                  style={{ color: "#73b6fb" }}
                >
                  Cookies Policy .
                </Link>
              </span>

              <button
                type="submit"
                className={
                  isActive ? "form-btn active-btn" : "form-btn pe-none"
                }
                disabled={
                  formik.values.email &&
                  formik.values.username &&
                  formik.values.fullname &&
                  formik.values.password
                    ? false
                    : true
                }
              >
                Next
              </button>

              <div
                className="text-danger text-center my-3"
                style={{ fontSize: "0.8rem" }}
              >
                {message !== "success" ? message : ""}
              </div>
            </form>
            <div className="sign-up">
              Have an account?{" "}
              <Link className="sign-up-btn" to="/login">
                Log in
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
export default Register;
