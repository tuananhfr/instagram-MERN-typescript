import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RxDotFilled } from "react-icons/rx";
import {
  CreateIcon,
  ExploreIcon,
  MessagesIcon,
  HomeIcon,
  SearchIcon,
  SettingsIcon,
  HomeActiveIcon,
  ExploreActiveIcon,
  MessagesActiveIcon,
  CreateActiveIcon,
  SettingsActiveIcon,
  SearchActiveIcon,
  LikeIcon,
  NotificationActiveIcon,
} from "../../components/Icons";
import Instagram from "../../images/logo.png";
import Logo from "../../images/Instagram-logo.png";
import { logout } from "../../redux/features/authSlice";
import { AppDispatch, RootState } from "../../redux/store";
import {
  setIsNotificationGlobalState,
  setIsSearchGlobalState,
  setIsUploadGlobalState,
} from "../../redux/features/GlobalStateSlice";
import { IConversation } from "../../utils/interface";

const NavBar: React.FC = () => {
  const [isMenuMore, setIsMenuMore] = useState<boolean>(false);
  const { globalState } = useSelector((state: RootState) => state);
  const { isSearchGlobalState, isNotificationGlobalState } = globalState;
  const { isUploadGlobalState } = globalState;

  const dispatch: AppDispatch = useDispatch();

  const { auth } = useSelector((state: RootState) => state);
  const { notification } = useSelector((state: RootState) => state);
  const { conversation } = useSelector((state: RootState) => state);

  const location = useLocation();

  const handleSearch = () => {
    if (globalState.isNotificationGlobalState === true) {
      dispatch(setIsNotificationGlobalState());
    }
    dispatch(setIsSearchGlobalState());
  };
  const handleNotification = () => {
    if (globalState.isSearchGlobalState === true) {
      dispatch(setIsSearchGlobalState());
    }
    dispatch(setIsNotificationGlobalState());
  };

  const handleSearchAndNotif = () => {
    if (
      globalState.isSearchGlobalState === true ||
      globalState.isNotificationGlobalState === true
    ) {
      return true;
    }
    return false;
  };
  const handleCloseSearchAndNotif = () => {
    if (globalState.isNotificationGlobalState === true) {
      dispatch(setIsNotificationGlobalState());
    }
    if (globalState.isSearchGlobalState === true) {
      dispatch(setIsSearchGlobalState());
    }
  };
  const newMessage: IConversation[] = [];

  conversation.data!.map((data: IConversation) => {
    if (data.isRead === false && data.recipients[1]._id === auth.user!._id) {
      newMessage.push(data);
    }
  });

  return (
    <div
      className="navbar-container"
      style={{
        width: handleSearchAndNotif() ? "5rem" : undefined,
      }}
    >
      <div className="navbar-wrapper">
        <Link
          to="/"
          style={{
            textAlign: handleSearchAndNotif() ? "center" : undefined,
          }}
          onClick={handleCloseSearchAndNotif}
        >
          <img
            src={handleSearchAndNotif() ? Logo : Instagram}
            alt="instagram logo"
            className="instagram-logo"
            style={{
              width: handleSearchAndNotif() ? "2rem" : "",
              height: handleSearchAndNotif() ? "2rem" : "",
            }}
          />
        </Link>
        <div className="nav-menu-wrapper cur-point">
          <div className="menu-wrapper cur-point">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "active-link align-center w-100"
                  : "align-center w-100"
              }
              onClick={handleCloseSearchAndNotif}
            >
              <div className="icon absolute-center">
                <HomeIcon />
              </div>
              <div className="icon-active top-instagram-logo">
                <HomeActiveIcon />
              </div>
              <div
                className={`menu-title text-dark ${
                  handleSearchAndNotif() && "hide-content"
                }`}
              >
                Home
              </div>
            </NavLink>
          </div>
          <div className="menu-wrapper cur-point">
            <button
              className={
                isSearchGlobalState
                  ? "active-link create-btn cur-point w-100"
                  : "create-btn cur-point w-100"
              }
              onClick={() => handleSearch()}
            >
              <div className="icon absolute-center">
                <SearchIcon />
              </div>
              <div className="icon-active top-instagram-logo">
                <SearchActiveIcon />
              </div>
              <div
                className={`menu-title ${
                  handleSearchAndNotif() && "hide-content"
                }`}
              >
                Search
              </div>
            </button>
          </div>
          <div className="menu-wrapper cur-point">
            <NavLink
              to="/explore"
              className={({ isActive }) =>
                isActive
                  ? "active-link align-center w-100"
                  : "align-center w-100"
              }
              onClick={handleCloseSearchAndNotif}
            >
              <div className="icon absolute-center">
                <ExploreIcon />
              </div>
              <div className="icon-active top-instagram-logo">
                <ExploreActiveIcon />
              </div>
              <div
                className={`menu-title text-dark ${
                  handleSearchAndNotif() && "hide-content"
                }`}
              >
                Explore
              </div>
            </NavLink>
          </div>
          <div className="menu-wrapper cur-point">
            <NavLink
              to="/direct/inbox/"
              className={
                location.pathname.startsWith("/direct/")
                  ? "active-link align-center w-100"
                  : "align-center w-100"
              }
              onClick={handleCloseSearchAndNotif}
            >
              {newMessage.length > 0 ? (
                <div>
                  <div className="icon absolute-center">
                    <div className=" position-relative">
                      <MessagesIcon />
                      <div className="navbar-new-messages absolute-center">
                        {newMessage.length}
                      </div>
                    </div>
                  </div>
                  <div className="icon-active top-instagram-logo">
                    <div className=" position-relative">
                      <MessagesActiveIcon />
                      <div className="navbar-new-messages absolute-center">
                        {newMessage.length}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="icon  absolute-center">
                    <MessagesIcon />
                  </div>
                  <div className="icon-active top-instagram-logo">
                    <MessagesActiveIcon />
                  </div>
                </div>
              )}
              <div
                className={`menu-title text-dark ${
                  handleSearchAndNotif() && "hide-content"
                }`}
              >
                Messages
              </div>
            </NavLink>
          </div>
          <div className="menu-wrapper cur-point">
            <button
              className={
                isNotificationGlobalState
                  ? "active-link create-btn cur-point w-100"
                  : "create-btn cur-point w-100"
              }
              onClick={() => handleNotification()}
            >
              <div className="icon position-relative absolute-center">
                <LikeIcon />
                {notification.data.some((notify) => notify.isRead === false) ? (
                  <RxDotFilled className="isread-notify" />
                ) : null}
              </div>
              <div className="icon-active position-relative top-instagram-logo absolute-center">
                <NotificationActiveIcon />
                {notification.data.some((notify) => notify.isRead === false) ? (
                  <RxDotFilled className="isread-notify" />
                ) : null}
              </div>
              <div
                className={`menu-title ${
                  handleSearchAndNotif() && "hide-content"
                }`}
              >
                Notifications
              </div>
            </button>
          </div>
          <div className="menu-wrapper cur-point">
            <button
              type="button"
              className={
                isUploadGlobalState
                  ? "active-link create-btn align-center w-100"
                  : "align-center create-btn w-100"
              }
              onClick={() => dispatch(setIsUploadGlobalState())}
            >
              <div className="icon absolute-center">
                <CreateIcon />
              </div>
              <div className="icon-active top-instagram-logo">
                <CreateActiveIcon />
              </div>
              <div
                className={`menu-title text-dark ${
                  handleSearchAndNotif() && "hide-content"
                }`}
              >
                Create
              </div>
            </button>
          </div>
          <div className="menu-wrapper cur-point">
            <NavLink
              to={`/${auth.user?.username}`}
              className={({ isActive }) =>
                isActive
                  ? "active-link align-center w-100"
                  : "align-center w-100"
              }
              onClick={handleCloseSearchAndNotif}
            >
              <div className="user-image-wrapper absolute-center icon">
                <img src={auth.user?.avatar} alt={auth.user?.username} />
              </div>
              <div className="images-active top-instagram-logo">
                <img src={auth.user?.avatar} alt={auth.user?.username} />
              </div>
              <div
                className={`menu-title text-dark ${
                  handleSearchAndNotif() && "hide-content"
                }`}
              >
                Profile
              </div>
            </NavLink>
          </div>

          <div className="more-menu-wrapper menu-wrapper">
            <button
              type="button"
              title="more options"
              className={
                isMenuMore
                  ? "active-link create-btn cur-point w-100"
                  : "create-btn cur-point w-100"
              }
              onClick={() => setIsMenuMore(!isMenuMore)}
            >
              <div className="absolute-center icon">
                <SettingsIcon />
              </div>
              <div className="icon-active top-instagram-logo">
                <SettingsActiveIcon />
              </div>
              <div
                className={`menu-title ${
                  handleSearchAndNotif() && "hide-content"
                } ${handleSearchAndNotif() && "hide-content"}`}
              >
                More
              </div>
            </button>
            <div
              className="more-menu-options-wrapper"
              style={{ display: isMenuMore ? "flex" : "none" }}
            >
              <div className="logout-wrapper">
                <button
                  type="button"
                  title="logout"
                  className="logout-btn cur-point"
                  onClick={() => dispatch(logout())}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
