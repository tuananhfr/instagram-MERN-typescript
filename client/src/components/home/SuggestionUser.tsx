import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Footer from "../../layout/components/Footer";
import {
  followSuggestionUser,
  getSuggestionUser,
  unFollowSuggestionUser,
} from "../../redux/features/suggestionUserSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { follow, unFollow } from "../../redux/features/authSlice";
import {
  createNotification,
  deleteNotification,
} from "../../redux/features/notificationSlice";
import SuggestionUserSkeleton from "../skeleton/SuggestionUserSkeleton";

const SuggestionUser = () => {
  const { auth } = useSelector((state: RootState) => state);
  const { user } = useSelector((state: RootState) => state);
  const { socket } = useSelector((state: RootState) => state);

  const { suggestionUser } = useSelector((state: RootState) => state);
  const { message } = suggestionUser;
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const dispatch: AppDispatch = useDispatch();

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      dispatch(getSuggestionUser());
    }
  }, [location.pathname]);

  useEffect(() => {
    if (message === "success") {
      setIsLoading(false);
    }
  }, [message]);

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

    socket.data!.emit("unFollowUser", id);
  };

  return (
    <div>
      <Link to={`/${auth.user!.username}`} className="d-flex">
        <div className="user-image-wrapper absolute-center home-suggestion-avatar">
          <img src={auth.user!.avatar} alt={auth.user!.username} />
        </div>
        <div className="flex-column ">
          <span className="home-post-text mt-2 ms-3">
            {auth.user!.username}
          </span>
          <span className="home-suggestion-text mt-2 ms-3">
            {auth.user!.fullname}
          </span>
        </div>
      </Link>
      <div className="d-flex mt-3">
        <div className="home-suggestion-title">Suggestions for you</div>
        {/* <button className="home-suggestion-btn-see">See All</button> */}
      </div>
      {isLoading ? (
        <div className="mt-3">
          <SuggestionUserSkeleton />
        </div>
      ) : suggestionUser.data! !== null ? (
        suggestionUser.data!.map((suggestion) => (
          <div className="d-flex mt-3" key={suggestion._id}>
            <Link to={`/${suggestion.username}`} className="home-suggestion">
              <div className="user-image-wrapper absolute-center home-post-avatar">
                <img src={suggestion.avatar} alt={suggestion.username} />
              </div>
              <div className="flex-column ">
                <span className="home-post-text  ms-3">
                  {suggestion.username}
                </span>
                <span className="home-suggestion-text ms-3">
                  {suggestion.fullname}
                </span>
              </div>
            </Link>
            {auth.user!.following.find((obj) => obj._id === suggestion._id) ? (
              <button
                className="home-suggestion-btn-see"
                onClick={() => handleUnFollow(suggestion._id)}
              >
                unFollow
              </button>
            ) : (
              <button
                className="home-suggestion-btn-follow"
                onClick={() => handleFollow(suggestion._id)}
              >
                Follow
              </button>
            )}
          </div>
        ))
      ) : null}
    </div>
  );
};

export default SuggestionUser;
