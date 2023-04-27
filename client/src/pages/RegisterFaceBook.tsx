import React, { useState, useEffect } from "react";
import Helmet from "../components/Helmet";
import logo from "../images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { register } from "../redux/features/authSlice";
let schema = yup.object().shape({
  email: yup
    .string()
    .email("Email should be valid")
    .required("Email is Required"),
  fullname: yup.string().required("Full Name is Required"),
  username: yup.string().required("Username is Required"),
  password: yup.string().required("Password is Required"),
});
const RegisterFaceBook = () => {
  const [typePass, setTypePass] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const { infoFaceBook } = useSelector((state: RootState) => state);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      fullname: infoFaceBook.data!.name,
      username: "",
      password: "",
      faceBookId: infoFaceBook.data!.id,
      avatar: infoFaceBook.data!.picture.data.url,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(register(values));
    },
  });
  const { auth } = useSelector((state: RootState) => state);
  const { user, message } = auth;

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

  useEffect(() => {
    if (user) {
      navigate("/");
    } else {
      navigate("");
    }
  }, [user, navigate]);
  useEffect(() => {
    if (infoFaceBook === null) {
      navigate("/login");
    }
  }, [infoFaceBook, navigate]);
  return (
    <Helmet title="Sign up • FaceBook • Instagram">
      <div className="register-fb-page">
        <div className="main-register-page">
          <div className="form-data-register">
            <form className=" absolute-center" onSubmit={formik.handleSubmit}>
              <div className="logo">
                <img src={logo} alt="logo" />
              </div>
              <div className="register-fb-avatar">
                <img
                  src={infoFaceBook.data!.picture.data.url}
                  alt={infoFaceBook.data!.picture.data.url}
                />
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
              <span
                style={{
                  lineHeight: "1.2rem",
                  fontWeight: "400",
                  fontSize: "0.8rem",
                  marginBottom: "1rem",
                  marginTop: "1rem",
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
                  isActive
                    ? "form-btn active-btn w-100"
                    : "form-btn pe-none w-100"
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
                {message !== "success" &&
                message !== "This user does not exist."
                  ? message
                  : ""}
              </div>
            </form>
          </div>
        </div>
      </div>
    </Helmet>
  );
};

export default RegisterFaceBook;
