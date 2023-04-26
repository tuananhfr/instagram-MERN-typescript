import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { AiOutlineClose } from "react-icons/ai";
import { setIsFollowingGlobalState } from "../redux/features/GlobalStateSlice";
import { Link, useLocation } from "react-router-dom";
import { IUser } from "../utils/interface";

const FollowingModal: React.FC = () => {
  const location = useLocation();

  const dispatch: AppDispatch = useDispatch();
  const { auth } = useSelector((state: RootState) => state);
  const { user } = useSelector((state: RootState) => state);
  const { globalState } = useSelector((state: RootState) => state);
  const { isFollowingGlobalState } = globalState;

  return (
    <div>
      {isFollowingGlobalState && (
        <div className="edit_profile absolute-center">
          <div className="follower-modal-wrapper">
            <div className="follower-modal-header absolute-center">
              <span className="follower-modal-title">Follower</span>
              <button
                className="follower-modal-icon"
                onClick={() => dispatch(setIsFollowingGlobalState())}
              >
                <AiOutlineClose />
              </button>
            </div>
            <div className="follower-modal-body">
              {location.pathname === `/${auth.user!.username}`
                ? auth.user!.following.map((follow: IUser) => (
                    <div className="follower-modal-user" key={follow._id}>
                      <Link
                        onClick={() => dispatch(setIsFollowingGlobalState())}
                        to={`/${follow!.username}`}
                        className="follower-modal-user-info"
                      >
                        <div className="follower-modal-user-avatar">
                          <img src={follow!.avatar} alt={follow!.avatar} />
                        </div>
                        <div>
                          <div className="follower-modal-user-username">
                            {follow!.username}
                          </div>
                          <div className="follower-modal-user-fullname">
                            {follow!.fullname}
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))
                : user.data!.following.map((follow: IUser) => (
                    <div className="follower-modal-user" key={follow._id}>
                      <Link
                        onClick={() => dispatch(setIsFollowingGlobalState())}
                        to={`/${follow!.username}`}
                        className="follower-modal-user-info"
                      >
                        <div className="follower-modal-user-avatar">
                          <img src={follow!.avatar} alt={follow!.avatar} />
                        </div>
                        <div>
                          <div className="follower-modal-user-username">
                            {follow!.username}
                          </div>
                          <div className="follower-modal-user-fullname">
                            {follow!.fullname}
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FollowingModal;
