import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Helmet from "../components/Helmet";
import logo from "../images/logo.png";
import { useFormik } from "formik";
import * as yup from "yup";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../redux/features/authSlice";
let schema = yup.object().shape({
  password: yup.string().required("Email is Required"),
});
const ResetPassWord = () => {
  const { token } = useParams() as {
    token: string;
  };
  const navigate = useNavigate();

  const [isActive, setIsActive] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();
  const { auth } = useSelector((state: RootState) => state);
  const { user, message } = auth;
  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(
        resetPassword({
          password: values.password,
          token: token,
        })
      );
      formik.resetForm();
    },
  });
  useEffect(() => {
    if (formik.values.password.length >= 6) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [formik.values.password.length]);
  useEffect(() => {
    if (user) {
      navigate("/");
    } else {
      navigate("");
    }
  }, [user, navigate]);
  return (
    <Helmet title="Reset Password • Instagram">
      <div className="forgot-password-header">
        <div className="forgot-password-header-wrapper">
          <Link to="/" className="forgot-password-logo">
            <img src={logo} alt="logo" />
          </Link>
        </div>
      </div>
      <div
        className="forgot-password-body absolute-center"
        style={{ height: "70vh" }}
      >
        <form onSubmit={formik.handleSubmit}>
          <div className="reset-password-title absolute-center">
            Create A Strong Password
          </div>
          <div className="reset-password-text">
            Your password must be at least 6 characters and should include a
            combination of numbers, letters and special characters (!$@%).
          </div>
          <input
            className="mb-2"
            type="Password"
            placeholder="Password"
            name="password"
            onChange={formik.handleChange("password")}
            value={formik.values.password}
          />
          {formik.errors.password && formik.values.password ? (
            <div className="mb-1" style={{ color: "red" }}>
              {formik.errors.password}
            </div>
          ) : null}
          <button
            type="submit"
            className={
              isActive
                ? "form-btn active-btn w-100 mt-5"
                : "form-btn pe-none w-100 mt-5"
            }
            disabled={isActive ? false : true}
          >
            Reset Password
          </button>
        </form>
      </div>
    </Helmet>
  );
};

export default ResetPassWord;
