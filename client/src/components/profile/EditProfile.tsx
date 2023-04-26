import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { editUser } from "../../redux/features/authSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { AiOutlineClose } from "react-icons/ai";
import { useFormik } from "formik";
import * as yup from "yup";
import { uploadImgAvatar } from "../../redux/features/uploadImgSlice";
import { getUser } from "../../redux/features/userSlice";
type EditProfileProps = {
  setOnEdit: (value: boolean) => void;
};

let schema = yup.object().shape({
  username: yup
    .string()

    .required("Username is Required"),
  fullname: yup
    .string()

    .required("Fullname is Required"),
  mobile: yup.string(),

  address: yup.string(),

  website: yup.string(),

  story: yup.string(),

  gender: yup
    .string()

    .required("Gender is Required"),
});
const EditProfile: React.FC<EditProfileProps> = ({ setOnEdit }) => {
  const ref = useRef<HTMLInputElement>(null);
  const { auth } = useSelector((state: RootState) => state);

  const { upload } = useSelector((state: RootState) => state);

  const navigate = useNavigate();
  const [avatar, setAvatar] = useState(
    auth.user?.avatar ||
      "https://res.cloudinary.com/tuananh-pham/image/upload/v1678058561/MERN-Instagram-typescript/avatar/avatar-default_xkj2pq.jpg"
  );

  const dispatch: AppDispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      username: auth.user?.username || "",
      fullname: auth.user?.fullname || "",
      mobile: auth.user?.mobile || "",
      address: auth.user?.address || "",
      website: auth.user?.website || "",
      story: auth.user?.story || "",
      gender: auth.user?.gender || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(editUser({ ...values, avatar }));
      dispatch(getUser(values.username));

      navigate(`/${formik.values.username}`);
      setOnEdit(false);
    },
  });
  // useEffect(() => {
  //   if (user.data?.username) {
  //     navigate(`/${user.data?.username}`);
  //   } else {
  //     navigate("");
  //   }
  // }, [navigate, user.data?.username]);
  useEffect(() => {
    if (upload.images[0] !== undefined) {
      setAvatar(upload.images[0]?.url);
    }
  }, [avatar, upload]);
  const handleClick = () => {
    ref.current?.click();
  };

  const handleOnClose = () => {
    setOnEdit(false);
    setAvatar(auth.user!.avatar);
  };
  const changeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    const fileList = [file];
    dispatch(uploadImgAvatar(fileList));
    const image = upload.images[0];
    setAvatar(image?.url);
  };

  return (
    <div className="edit_profile">
      <button title="close" className="btn_close" onClick={handleOnClose}>
        <AiOutlineClose
          style={{
            width: "1.5rem",
            height: "1.5rem",
            fill: "white",
          }}
        />
      </button>

      <form
        onSubmit={formik.handleSubmit}
        style={{
          maxWidth: "28rem",
          width: "100%",
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "5px",
          margin: "2rem auto",
        }}
      >
        <div className="w-100 d-flex">
          <div className="info_avatar ms-1">
            <img src={avatar} alt="avatar" title="Change profile photo" />
          </div>
          <div className="flex-column ms-3">
            <div className="w-500">{auth.user!.username}</div>
            <span className="change-avatar-btn">
              <p
                role="button"
                className="change-avatar-btn"
                onClick={handleClick}
              >
                Change profile photo
              </p>
              <input
                type="file"
                name="file"
                id="file_up"
                accept="image/*"
                style={{ display: "none" }}
                ref={ref}
                onChange={changeAvatar}
              />
            </span>
          </div>
        </div>
        <div className="form-group my-3">
          <label htmlFor="username">Username</label>
          <div className="position-relative">
            <input
              type="text"
              name="username"
              maxLength={25}
              className="form-control"
              onChange={formik.handleChange("username")}
              value={formik.values.username}
            />
            <small
              className="text-danger position-absolute"
              style={{
                top: "50%",
                right: "5px",
                transform: "translateY(-50%)",
              }}
            >
              {formik.values.username.length}/25
            </small>
          </div>
          {/* <div className="mt-2" style={{ color: "red" }}>
            {formik.touched.username && formik.errors.username}
          </div> */}
        </div>
        <div className="form-group my-3">
          <label htmlFor="fullname">Full Name</label>
          <div className="position-relative">
            <input
              type="text"
              name="fullname"
              maxLength={25}
              className="form-control"
              onChange={formik.handleChange("fullname")}
              value={formik.values.fullname}
            />
            <small
              className="text-danger position-absolute"
              style={{
                top: "50%",
                right: "5px",
                transform: "translateY(-50%)",
              }}
            >
              {formik.values.fullname.length}/25
            </small>
          </div>
        </div>

        <div className="form-group my-3">
          <label htmlFor="mobile">Mobile</label>
          <input
            type="text"
            name="mobile"
            className="form-control"
            onChange={formik.handleChange("mobile")}
            value={formik.values.mobile}
          />
        </div>

        <div className="form-group my-3">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            name="address"
            className="form-control"
            onChange={formik.handleChange("address")}
            value={formik.values.address}
          />
        </div>

        <div className="form-group my-3">
          <label htmlFor="website">Website</label>
          <input
            type="text"
            name="website"
            className="form-control"
            onChange={formik.handleChange("website")}
            value={formik.values.website}
          />
        </div>

        <div className="form-group my-3">
          <label htmlFor="story">Story</label>
          <textarea
            name="story"
            cols={30}
            rows={4}
            maxLength={200}
            className="form-control"
            onChange={formik.handleChange("story")}
            value={formik.values.story}
          />

          <small className="text-danger d-block text-right">
            {formik.values.story.length}/200
          </small>
        </div>

        <div className="form-group my-3">
          <label htmlFor="gender">Gender</label>
          <div className="px-0 mb-4">
            <select
              className="form-select"
              aria-label="Default select example"
              name="gender"
              id="gender"
              onChange={formik.handleChange("gender")}
              value={formik.values.gender}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <button className="btn btn-primary w-100" type="submit">
          Submit
        </button>
        {/* <div
          className="text-danger text-center my-4"
          style={{ fontSize: "0.8rem" }}
        >
          {message === "Rejected"
            ? "Sorry, your password was incorrect. Please double-check your password."
            : ""}
        </div> */}
      </form>
    </div>
  );
};
export default EditProfile;
