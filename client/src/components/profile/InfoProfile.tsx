import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserPost } from "../../redux/features/postSlice";

import { getUser } from "../../redux/features/userSlice";
import { AppDispatch, RootState } from "../../redux/store";
import EditProfile from "./EditProfile";
import FollowBtn from "./FollowBtn";
import {
  setIsFollowerGlobalState,
  setIsFollowingGlobalState,
} from "../../redux/features/GlobalStateSlice";
import InfoProfileSkeleton from "../skeleton/InfoProfileSkeleton";
import { IInfoProfile } from "../../utils/interface";

const InfoProfile: React.FC<IInfoProfile> = ({ username }) => {
  const [onEdit, setOnEdit] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { auth } = useSelector((state: RootState) => state);
  const { user } = useSelector((state: RootState) => state);
  const { message } = user;

  // useEffect(() => {
  //   setIsLoading(true);
  //   if (
  //     message === "user/get-a-user success" ||
  //     auth.user!.username === username
  //   ) {
  //     setIsLoading(false);
  //   }
  // }, [auth.user, message, username]);

  const dispatch: AppDispatch = useDispatch();

  const verifierUsername = username === auth.user!.username ? true : false;
  const openInNewTab = (url: string) => {
    window.open(url, "_blank", "noreferrer");
  };
  return (
    <div className="profile-details-section">
      {isLoading ? (
        <div>
          <InfoProfileSkeleton />
        </div>
      ) : (
        <div className="profile-image-details-wrapper d-flex">
          <div className="profile-image-wrapper">
            <img
              src={verifierUsername ? auth.user?.avatar : user.data?.avatar}
              alt="user-profile"
            />
          </div>
          {/* <InfoProfile user={user.data} /> */}
          <div className="profile-details-wrapper">
            <div className="d-flex">
              <div className="profile-username fs-5">
                {verifierUsername ? auth.user?.username : user.data?.username}
              </div>
              {verifierUsername ? (
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
                <FollowBtn user={user.data!} />
              )}
            </div>

            <div className="posts-followers-details-wrapper d-flex">
              <div className="total-posts-wrapper total-wrapper absolute-center">
                <span className="font-w-500 total-number">
                  {verifierUsername
                    ? auth.user?.post.length
                    : user.data?.post.length}
                </span>
                Post
              </div>
              <button
                className="total-wrapper absolute-center profile-btn-active"
                onClick={() => dispatch(setIsFollowerGlobalState())}
              >
                <span className="font-w-500 total-number">
                  {verifierUsername
                    ? auth.user!.followers.length
                    : user.data?.followers.length}
                </span>
                followers
              </button>
              <button
                className="total-wrapper absolute-center profile-btn-active"
                onClick={() => dispatch(setIsFollowingGlobalState())}
              >
                <span className="font-w-500 total-number">
                  {verifierUsername
                    ? auth.user!.following.length
                    : user.data?.following.length}
                </span>
                following
              </button>
            </div>
            <div className="profile-fullname-wrapper">
              {verifierUsername ? auth.user!.fullname : user.data?.fullname}
            </div>
            <span>
              {verifierUsername ? auth.user!.story : user.data?.story}
            </span>
            <div>
              <button
                className="profile-website-wrapper bg-white"
                // href={`${
                //   verifierUsername ? auth.user!.website : user.data?.website
                // }`}
                onClick={() =>
                  openInNewTab(
                    `${
                      verifierUsername ? auth.user!.website : user.data?.website
                    }`
                  )
                }
              >
                {verifierUsername ? auth.user!.website : user.data?.website}
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="mobile-screen">
        <div className="profile-fullname-wrapper"></div>
      </div>
    </div>
  );
};
export default InfoProfile;
