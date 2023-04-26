import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { AiOutlineClose } from "react-icons/ai";
import { setIsFollowerGlobalState } from "../redux/features/GlobalStateSlice";
import { Link, useLocation } from "react-router-dom";
import { IUser } from "../utils/interface";

const FollowerModal: React.FC = () => {
  const location = useLocation();

  const dispatch: AppDispatch = useDispatch();

  const { globalState } = useSelector((state: RootState) => state);
  const { isFollowerGlobalState } = globalState;
  const { auth } = useSelector((state: RootState) => state);
  const { user } = useSelector((state: RootState) => state);

  return (
    <div>
      {isFollowerGlobalState && (
        <div className="edit_profile absolute-center">
          <div className="follower-modal-wrapper">
            <div className="follower-modal-header absolute-center">
              <span className="follower-modal-title">Follower</span>
              <button
                className="follower-modal-icon"
                onClick={() => dispatch(setIsFollowerGlobalState())}
              >
                <AiOutlineClose />
              </button>
            </div>
            <div className="follower-modal-body">
              {location.pathname === `/${auth.user!.username}`
                ? auth.user!.followers.map((follow: IUser) => (
                    <div className="follower-modal-user" key={follow._id}>
                      <Link
                        onClick={() => dispatch(setIsFollowerGlobalState())}
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
                : user.data!.followers.map((follow: IUser) => (
                    <div className="follower-modal-user" key={follow._id}>
                      <Link
                        onClick={() => dispatch(setIsFollowerGlobalState())}
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

export default FollowerModal;
