import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { getUser } from "../redux/features/userSlice";

import InfoProfile from "../components/profile/InfoProfile";
import Helmet from "../components/Helmet";

import { getSavePost, getUserPost } from "../redux/features/postSlice";

import {
  PostsFocusIcon,
  PostsIcon,
  SavedFocusIcon,
  SavedIcon,
} from "../components/Icons";
import PostsProfile from "../components/profile/PostsProfile";
import SavedPostsProfile from "../components/profile/SavedPostsProfile";

const Profile: React.FC = () => {
  const params = useParams();
  if (!params) {
    // handle error or return null
  }

  const { username } = params as { username: string };

  const [isPosts, setIsPosts] = useState<boolean>(true);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const { auth } = useSelector((state: RootState) => state);
  const { user } = useSelector((state: RootState) => state);

  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    if (username !== auth.user!.username) {
      dispatch(getUser(username));
    }
    isPosts && dispatch(getUserPost(username));
  }, [auth.user, dispatch, isPosts, username]);

  const handleChangeSaved = async () => {
    if (username) {
      await dispatch(
        getSavePost(
          auth.user!.username === username ? auth.user!._id : user.data!._id
        )
      );
      setIsSaved(true);
      setIsPosts(false);
    }
  };
  const handleChangePosts = async () => {
    if (username) {
      await dispatch(getUserPost(username));
      setIsSaved(false);
      setIsPosts(true);
    }
  };
  return (
    <Helmet title={`(@${username}) • Instagram photos and videos`}>
      {
        <div className="profile-page-container">
          <InfoProfile username={username} />
          <div className="posts-list-section">
            <div className="d-flex mb-3">
              {isPosts ? (
                <div className="posts-list-title-active">
                  <PostsFocusIcon />
                  <span className="post-list-title-span-active">Posts</span>
                </div>
              ) : (
                <div
                  className="posts-list-title"
                  onClick={() => handleChangePosts()}
                >
                  <PostsIcon />
                  <span className="post-list-title-span">Posts</span>
                </div>
              )}
              {isSaved ? (
                <div className="posts-list-title-active">
                  <SavedFocusIcon />
                  <span className="post-list-title-span-active">Saved</span>
                </div>
              ) : (
                <div
                  className="posts-list-title"
                  onClick={() => handleChangeSaved()}
                >
                  <SavedIcon />
                  <span className="post-list-title-span">Saved</span>
                </div>
              )}
            </div>

            {isPosts ? <PostsProfile /> : <SavedPostsProfile />}
          </div>
        </div>
      }
    </Helmet>
  );
};
export default Profile;
