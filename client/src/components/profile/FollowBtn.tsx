import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { follow, unFollow } from "../../redux/features/authSlice";
import {
  setFollowerUser,
  setUnFollowerUser,
} from "../../redux/features/userSlice";
import { AppDispatch, RootState } from "../../redux/store";
import {
  createNotification,
  deleteNotification,
} from "../../redux/features/notificationSlice";
import { User } from "../../utils/interface";
type FollowBtnProps = {
  user: User | null;
};

const FollowBtn: React.FC<FollowBtnProps> = ({ user }) => {
  const [followed, setFollowed] = useState<boolean>(false);

  const dispatch: AppDispatch = useDispatch();
  const { auth, socket } = useSelector((state: RootState) => state);
  useEffect(() => {
    if (auth.user?.following.find((obj) => obj._id === user?._id)) {
      setFollowed(true);
    }

    return () => setFollowed(false);
  }, [auth.user?.following, user?._id]);

  const handleFollow = () => {
    const id = user!._id;
    if (followed === false) {
      setFollowed(true);
      dispatch(follow(id)).then((response) => {
        socket.data!.emit("followUser", {
          _id: response.payload._id,
          username: response.payload.username,
          fullname: response.payload.fullname,
          avatar: response.payload.avatar,
          followers: response.payload.followers,
          following: response.payload.following,
          to: id,
        });
        dispatch(
          setFollowerUser({
            _id: response.payload._id,
            username: response.payload.username,
            fullname: response.payload.fullname,
            avatar: response.payload.avatar,
            followers: response.payload.followers,
            following: response.payload.following,
          })
        );
      });
      dispatch(
        createNotification({
          id: id,
          recipients: [id],
          images: "",
          url: "",
          content: `has started to follow you.`,
          user: auth.user!._id,
        })
      ).then((response) => {
        socket.data!.emit("createNotify", response.payload);
      });
    } else {
      setFollowed(false);
      dispatch(unFollow(id)).then((response) => {
        socket.data!.emit("unFollowUser", {
          _id: response.payload._id,
          username: response.payload.username,
          fullname: response.payload.fullname,
          avatar: response.payload.avatar,
          followers: response.payload.followers,
          following: response.payload.following,
          to: id,
        });
        dispatch(
          setUnFollowerUser({
            _id: response.payload._id,
            username: response.payload.username,
            fullname: response.payload.fullname,
            avatar: response.payload.avatar,
            followers: response.payload.followers,
            following: response.payload.following,
          })
        );
      });
      dispatch(deleteNotification(id)).then((response) => {
        socket.data!.emit("deleteNotify", response.payload);
      });
    }
  };

  return (
    <>
      {followed ? (
        <button
          className="unfollow-btn ms-4 absolute-center"
          onClick={handleFollow}
        >
          Unfollow
        </button>
      ) : (
        <button
          className="follow-btn ms-4 absolute-center"
          onClick={handleFollow}
        >
          Follow
        </button>
      )}
    </>
  );
};

export default FollowBtn;
