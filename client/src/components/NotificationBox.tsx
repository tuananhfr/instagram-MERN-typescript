import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import {
  createNotification,
  deleteNotification,
  getNotification,
  isReadNotification,
} from "../redux/features/notificationSlice";
import { Link } from "react-router-dom";
import { follow, unFollow } from "../redux/features/authSlice";
import { setIsNotificationGlobalState } from "../redux/features/GlobalStateSlice";

const NotificationBox = () => {
  const { auth } = useSelector((state: RootState) => state);

  const { notification } = useSelector((state: RootState) => state);

  const { socket } = useSelector((state: RootState) => state);

  const { globalState } = useSelector((state: RootState) => state);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotification());
  }, [dispatch]);

  const { isNotificationGlobalState } = globalState;

  const handleFollow = (id: string) => {
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
  };

  const handleUnFollow = (id: string) => {
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
    });
    dispatch(deleteNotification(id)).then((response) => {
      socket.data!.emit("deleteNotify", response.payload);
    });
  };
  const handleIsRead = (id: string) => {
    dispatch(setIsNotificationGlobalState());
    dispatch(isReadNotification(id));
  };
  return (
    <div
      className="search-box-container"
      style={{
        transform: isNotificationGlobalState ? "translateX(0px) " : "",
      }}
    >
      <div className="search-box-wrapper">
        <div className="search-title">Notifications</div>
        <div className="line-seperator"></div>
        <div className="ps-4 pe-4 search-results">
          <div className="d-block h-80">
            <div className="result-title notif-title">Earlier</div>
            {notification.data!.length !== 0 &&
              notification.data!.map((notif) => (
                <div key={notif._id} className="d-flex mb-3 position-relative">
                  <Link
                    to={`/${notif.user.username}`}
                    className="notify-avatar"
                    onClick={() => handleIsRead(notif._id)}
                  >
                    <img src={notif.user.avatar} alt={notif.user.username} />
                  </Link>
                  <div className="notify-content">
                    <Link
                      onClick={() => handleIsRead(notif._id)}
                      to={`/${notif.user.username}`}
                      className="notify-username"
                    >
                      {notif.user.username}
                    </Link>
                    <span>{notif.content}</span>
                  </div>
                  {notif.images === "" ? (
                    <>
                      {auth.user?.following.find(
                        (obj) => obj._id === notif.user._id
                      ) ? (
                        <button
                          className="notify-unfollow-btn"
                          onClick={() => handleUnFollow(notif.user._id)}
                        >
                          Unfollow
                        </button>
                      ) : (
                        <button
                          className="notify-follow-btn"
                          onClick={() => handleFollow(notif.user._id)}
                        >
                          Follow
                        </button>
                      )}
                    </>
                  ) : (
                    <Link
                      to={notif.url}
                      className="notify-images"
                      onClick={() => handleIsRead(notif._id)}
                    >
                      <img src={notif.images} alt={notif.images} />
                    </Link>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationBox;
