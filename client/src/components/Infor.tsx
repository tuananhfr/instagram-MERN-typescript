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
