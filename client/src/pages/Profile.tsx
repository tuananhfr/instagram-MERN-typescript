import React, { useState, useEffect } from "react";

import { useLocation, useParams } from "react-router-dom";
import { FaComment } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { getUser, resetState } from "../redux/features/userSlice";

import EditProfile from "../components/EditProfile";
import Infor from "../components/Infor";
import Helmet from "../components/Helmet";

const Profile: React.FC = () => {
  const { username } = useParams() as {
    username: string;
  };
  const [onEdit, setOnEdit] = useState<boolean>(false);

  const { auth } = useSelector((state: RootState) => state);
  const { user } = useSelector((state: RootState) => state);
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    if (username === undefined) {
      dispatch(getUser(auth.user!.username));
    } else {
      dispatch(getUser(username));
    }
  }, [auth.user, dispatch, username]);

  return (
    <Helmet title="Instagram">
      <div className="profile-page-container">
        <div className="profile-details-section">
          <div className="profile-image-details-wrapper d-flex">
            <div className="profile-image-wrapper">
              <img src={user.data?.avatar} alt="user-profile" />
            </div>
            {/* <Infor user={user.data} /> */}
            <div className="profile-details-wrapper">
              <div className="d-flex">
                <div className="profile-username fs-5">
                  {user.data?.username}
                </div>
                {auth.user?.username === username ? (
                  <div>
                    <button
                      type="button"
                      className="edit-profile-btn ms-3 absolute-center"
                      title="Edit profile"
                      onClick={() => setOnEdit(true)}
                    >
                      Edit profile
                    </button>
                    {onEdit && <EditProfile setOnEdit={setOnEdit} />}
                  </div>
                ) : (
                  <div className="follow-btn ms-4 absolute-center">Follow</div>
                )}
              </div>

              <div className="posts-followers-details-wrapper absolute-center">
                <div className="total-posts-wrapper total-wrapper absolute-center">
                  <span className="font-w-500 total-number">{15}</span>
                  Post
                </div>
                <div className="total-followers-wrapper total-wrapper absolute-center">
                  <span className="font-w-500 total-number">
                    {user.data?.followers.length}
                  </span>
                  followers
                </div>
                <div className="total-following-wrapper total-wrapper absolute-center">
                  <span className="font-w-500 total-number">
                    {user.data?.following.length}
                  </span>
                  following
                </div>
              </div>
              <div className="profile-fullname-wrapper font-w-500">
                {user.data?.fullname}
              </div>
            </div>
          </div>
          <div className="mobile-screen">
            <div className="profile-fullname-wrapper font-w-500"></div>
          </div>
        </div>
        <div className="posts-list-section">
          <div className="posts-list-title">Posts</div>
          <div className="posts-list-container">
            <div
              className="explore-post-container cur-point"
              // key={post.id}
            >
              <div className="explore-post-image">
                {/* <img src={post.data().imageUrl} alt="post" /> */}
                <img
                  src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  alt=""
                />
              </div>
              <div className="like-comments-wrapper ">
                <div className="like-wrapper align-center">
                  <div className="like-icon absolute-center">
                    <FiHeart
                      style={{ width: "85%", height: "85%", fill: "white" }}
                    />
                  </div>
                  <div className="like-counts">{30}</div>
                </div>
                <div className="comments-wrapper align-center">
                  <div className="comments-icon absolute-center ">
                    <FaComment
                      style={{ width: "85%", height: "85%", fill: "white" }}
                    />
                  </div>
                  <div className="commets-counts">{5}</div>
                </div>
              </div>
            </div>

            <div
              className="explore-post-container cur-point"
              // key={post.id}
            >
              <div className="explore-post-image">
                {/* <img src={post.data().imageUrl} alt="post" /> */}
                <img
                  src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  alt=""
                />
              </div>
              <div className="like-comments-wrapper ">
                <div className="like-wrapper align-center">
                  <div className="like-icon absolute-center">
                    <FiHeart
                      style={{ width: "85%", height: "85%", fill: "white" }}
                    />
                  </div>
                  <div className="like-counts">{30}</div>
                </div>
                <div className="comments-wrapper align-center">
                  <div className="comments-icon absolute-center ">
                    <FaComment
                      style={{ width: "85%", height: "85%", fill: "white" }}
                    />
                  </div>
                  <div className="commets-counts">{5}</div>
                </div>
              </div>
            </div>
            <div
              className="explore-post-container cur-point"
              // key={post.id}
            >
              <div className="explore-post-image">
                {/* <img src={post.data().imageUrl} alt="post" /> */}
                <img
                  src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  alt=""
                />
              </div>
              <div className="like-comments-wrapper ">
                <div className="like-wrapper align-center">
                  <div className="like-icon absolute-center">
                    <FiHeart
                      style={{ width: "85%", height: "85%", fill: "white" }}
                    />
                  </div>
                  <div className="like-counts">{30}</div>
                </div>
                <div className="comments-wrapper align-center">
                  <div className="comments-icon absolute-center ">
                    <FaComment
                      style={{ width: "85%", height: "85%", fill: "white" }}
                    />
                  </div>
                  <div className="commets-counts">{5}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Helmet>
  );
};
export default Profile;
