import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getUser } from "../redux/features/userSlice";
import { AppDispatch, RootState } from "../redux/store";

type InforProps = {
  user: User;
};
interface User {
  fullname: string;
  username: string;
  email: string;
  password: string;
  avatar: string;
  mobile: string;
  gender: string;
  role: string;
  address: string;
  story: string;
  website: string;
  followers: Array<User>;
  following: Array<User>;
  saved: Array<User>;
  refreshToken: string;
}

const Infor: React.FC<InforProps> = ({ user }) => {
  //   const dispatch: AppDispatch = useDispatch();
  //   const { user } = useSelector((state: RootState) => state);

  //   useEffect(() => {
  //     dispatch(getUser(username));
  //   }, [dispatch, username]);
  return (
    <div className="profile-image-wrapper">
      <img src={user.avatar} alt="user-profile" />
    </div>
  );
};
export default Infor;

// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { editUser } from "../redux/features/authSlice";
// import { AppDispatch, RootState } from "../redux/store";
// import { AiOutlineClose } from "react-icons/ai";

// type EditProfileProps = {
//   setOnEdit: (value: boolean) => void;
// };

// const EditProfile: React.FC<EditProfileProps> = ({ setOnEdit }) => {
//   const { auth } = useSelector((state: RootState) => state);

//   const initState = {
//     username: auth.user?.username || "",
//     fullname: auth.user?.fullname || "",
//     mobile: auth.user?.mobile || "",
//     address: auth.user?.address || "",
//     website: auth.user?.website || "",
//     story: auth.user?.story || "",
//     gender: auth.user?.gender || "",
//   };
//   const [userData, setUserData] = useState(initState);
//   const { username, fullname, mobile, address, website, story, gender } =
//     userData;

//   const [avatar, setAvatar] = useState(
//     auth.user?.avatar ||
//       "https://res.cloudinary.com/dd52rye04/image/upload/v1677069017/MERN-Instagram-typescript/avatar-default_c3rprd.jpg"
//   );
//   const navigate = useNavigate();
//   const dispatch: AppDispatch = useDispatch();

//   const handleInput = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >
//   ): void => {
//     const { name, value } = e.target;
//     setUserData({ ...userData, [name]: value });
//   };
//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     dispatch(editUser({ ...userData, avatar }));
//     navigate(`/${username}`);
//     setOnEdit(false);
//   };

//   return (
//     <div className="edit_profile">
//       <button
//         title="close"
//         className="btn_close"
//         onClick={() => setOnEdit(false)}
//       >
//         <AiOutlineClose
//           style={{
//             width: "1.5rem",
//             height: "1.5rem",
//             fill: "white",
//           }}
//         />
//       </button>

//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="username">Username</label>
//           <div className="position-relative">
//             <input
//               type="text"
//               name="username"
//               value={username}
//               className="form-control"
//               onChange={handleInput}
//             />
//             <small
//               className="text-danger position-absolute"
//               style={{
//                 top: "50%",
//                 right: "5px",
//                 transform: "translateY(-50%)",
//               }}
//             >
//               {username.length}/25
//             </small>
//           </div>
//         </div>
//         <div className="form-group">
//           <label htmlFor="fullname">Full Name</label>
//           <div className="position-relative">
//             <input
//               type="text"
//               name="fullname"
//               value={fullname}
//               className="form-control"
//               onChange={handleInput}
//             />
//             <small
//               className="text-danger position-absolute"
//               style={{
//                 top: "50%",
//                 right: "5px",
//                 transform: "translateY(-50%)",
//               }}
//             >
//               {fullname.length}/25
//             </small>
//           </div>
//         </div>

//         <div className="form-group">
//           <label htmlFor="mobile">Mobile</label>
//           <input
//             type="text"
//             name="mobile"
//             value={mobile}
//             className="form-control"
//             onChange={handleInput}
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="address">Address</label>
//           <input
//             type="text"
//             name="address"
//             value={address}
//             className="form-control"
//             onChange={handleInput}
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="website">Website</label>
//           <input
//             type="text"
//             name="website"
//             className="form-control"
//             value={website}
//             onChange={handleInput}
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="story">Story</label>
//           <textarea
//             name="story"
//             cols={30}
//             rows={4}
//             className="form-control"
//             value={story}
//             onChange={handleInput}
//           />

//           <small className="text-danger d-block text-right">
//             {story.length}/200
//           </small>
//         </div>

//         <label htmlFor="gender">Gender</label>
//         <div className="input-group-prepend px-0 mb-4">
//           <select
//             name="gender"
//             id="gender"
//             className="custom-select text-capitalize"
//             value={gender}
//             onChange={handleInput}
//           >
//             <option value="male">Male</option>
//             <option value="female">Female</option>
//             <option value="other">Other</option>
//           </select>
//         </div>

//         <button className="btn btn-primary w-100" type="submit">
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };
// export default EditProfile;
