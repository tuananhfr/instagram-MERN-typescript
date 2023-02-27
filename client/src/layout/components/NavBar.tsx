import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

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
} from "../../components/Icons";
import Instagram from "../../images/logo.png";
import Logo from "../../images/Instagram-logo.png";
import { logout } from "../../redux/features/authSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { setIsSearchGlobalState } from "../../redux/features/GlobalStateSlice";

const NavBar: React.FC = () => {
  const [isMenuMore, setIsMenuMore] = useState<boolean>(false);
  const { globalState } = useSelector((state: RootState) => state);
  const { isSearchGlobalState } = globalState;

  const dispatch: AppDispatch = useDispatch();

  const { auth } = useSelector((state: RootState) => state);

  return (
    <div
      className="navbar-container"
      style={{ width: isSearchGlobalState ? "5rem" : undefined }}
    >
      <div className="navbar-wrapper">
        <Link
          to="/"
          style={{ textAlign: isSearchGlobalState ? "center" : undefined }}
        >
          <img
            src={isSearchGlobalState ? Logo : Instagram}
            alt="instagram logo"
            className="instagram-logo"
            style={{
              width: isSearchGlobalState ? "40px" : "",
              height: isSearchGlobalState ? "40px" : "",
            }}
          />
        </Link>
        <div className="nav-menu-wrapper cur-point">
          <div className="menu-wrapper cur-point">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "active-link align-center" : "align-center"
              }
            >
              <div className="icon absolute-center">
                <HomeIcon />
              </div>
              <div className="icon-active top-instagram-logo">
                <HomeActiveIcon />
              </div>
              <div
                className={`menu-title text-dark ${
                  isSearchGlobalState && "hide-content"
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
                  ? "active-link create-btn cur-point"
                  : "create-btn cur-point"
              }
              onClick={() => dispatch(setIsSearchGlobalState())}
            >
              <div className="icon absolute-center">
                <SearchIcon />
              </div>
              <div className="icon-active top-instagram-logo">
                <SearchActiveIcon />
              </div>
              <div
                className={`menu-title ${
                  isSearchGlobalState && "hide-content"
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
                isActive ? "active-link align-center" : "align-center"
              }
            >
              <div className="icon absolute-center">
                <ExploreIcon />
              </div>
              <div className="icon-active top-instagram-logo">
                <ExploreActiveIcon />
              </div>
              <div
                className={`menu-title text-dark ${
                  isSearchGlobalState && "hide-content"
                }`}
              >
                Explore
              </div>
            </NavLink>
          </div>
          <div className="menu-wrapper cur-point">
            <NavLink
              to="/direct/inbox/"
              className={({ isActive }) =>
                isActive ? "active-link align-center" : "align-center"
              }
            >
              <div className="icon absolute-center">
                <MessagesIcon />
              </div>
              <div className="icon-active top-instagram-logo">
                <MessagesActiveIcon />
              </div>
              <div
                className={`menu-title text-dark ${
                  isSearchGlobalState && "hide-content"
                }`}
              >
                Messages
              </div>
            </NavLink>
          </div>
          <div className="menu-wrapper cur-point">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "active-link align-center" : "align-center"
              }
            >
              <div className="icon absolute-center">
                <CreateIcon />
              </div>
              <div className="icon-active top-instagram-logo">
                <CreateActiveIcon />
              </div>
              <div
                className={`menu-title text-dark ${
                  isSearchGlobalState && "hide-content"
                }`}
              >
                Create
              </div>
            </NavLink>
          </div>
          <div className="menu-wrapper cur-point">
            <NavLink
              to={`/${auth.user?.username}`}
              className={({ isActive }) =>
                isActive ? "active-link align-center" : "align-center"
              }
            >
              <div className="user-image-wrapper absolute-center icon">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  alt="user-profile"
                />
              </div>
              <div className="images-active top-instagram-logo">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  alt="user-profile"
                />
              </div>
              <div
                className={`menu-title text-dark ${
                  isSearchGlobalState && "hide-content"
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
                  ? "active-link create-btn cur-point"
                  : "create-btn cur-point"
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
                  isSearchGlobalState && "hide-content"
                } ${isSearchGlobalState && "hide-content"}`}
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
