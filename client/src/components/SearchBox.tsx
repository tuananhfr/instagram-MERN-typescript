import React, { useEffect, useRef, useState } from "react";
import { AppDispatch, RootState } from "../redux/store";
import { setIsSearchGlobalState } from "../redux/features/GlobalStateSlice";
import userService from "../services/userServices";

import useDebounce from "../hooks/useDebounce";

import { useDispatch, useSelector } from "react-redux";
import { AiFillCloseCircle, AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { IUserInfo } from "../utils/interface";

const SearchBox: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchResult, setSearchResult] = useState<IUserInfo[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const debouncedValue = useDebounce(searchValue, 500);

  const inputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const { auth, globalState } = useSelector((state: RootState) => state);

  const { isSearchGlobalState } = globalState;

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (!debouncedValue.trim()) {
      setSearchResult([]);
      return;
    }

    const fetchAPI = async () => {
      setLoading(true);
      const result = await userService.search(debouncedValue);
      setSearchResult(
        result.users.filter((user: IUserInfo) => user._id !== auth.user!._id)
      );

      setLoading(false);
    };

    fetchAPI();
  }, [debouncedValue]);

  const handleClear = () => {
    setSearchValue("");
    setSearchResult([]);

    inputRef.current!.focus();
  };
  // const handleHideResult = (): void => {
  //   setShowResults(false);
  // };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    if (!searchValue.startsWith(" ")) {
      setSearchValue(e.target.value);
    } else {
      setSearchValue("");
    }
  };

  const handleRedirect = (username: string) => {
    navigate(`/${username}`);
    dispatch(setIsSearchGlobalState());

    setSearchValue("");
  };
  return (
    <div
      className="search-box-container"
      style={{
        transform: isSearchGlobalState ? "translateX(0px) " : "",
      }}
    >
      <div className="search-box-wrapper">
        <div className="search-title">Search</div>
        <div className="search-input ">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search"
            autoComplete="off"
            spellCheck={false}
            value={searchValue}
            onChange={handleChange}
            onFocus={() => setShowResults(true)}
          />
          {!!searchValue && !loading && (
            <button
              type="button"
              title="clear button"
              className="clear-btn cancel-btn cur-point"
              onClick={handleClear}
            >
              <AiFillCloseCircle style={{ color: "#c8c8c8" }} />
            </button>
          )}
          {loading && (
            <button className="loading-btn">
              <AiOutlineLoading3Quarters style={{ color: "#c8c8c8" }} />
            </button>
          )}
        </div>
        <div className="search-btn-wrapper" style={{ display: "none" }}>
          <button type="submit"></button>
        </div>
        <div className="line-seperator"></div>

        <div className="search-results">
          {searchValue &&
            searchResult.map((users) => (
              <div
                className="search-userprofile-follow-wrapper cur-point"
                key={users._id}
                onClick={() => handleRedirect(users.username)}
              >
                <div className="userprofile-wrapper">
                  <div className="userprofile-image-wrapper">
                    <img
                      src={users.avatar}
                      alt="user-profile"
                      className="rounded-circle"
                    />
                  </div>
                  <div className="ms-2">
                    <div
                      className="username-wrapper"
                      style={{ fontSize: "0.9rem" }}
                    >
                      {users.username}
                    </div>
                    <div className="fullname-wrapper">{users.fullname}</div>
                  </div>
                </div>
              </div>
            ))}

          {!searchResult.length && (
            <>
              <div className="d-block w-100 h-80">
                <div className="result-title search-title">Recent</div>
                <div className="absolute-center w-100 h-100">
                  No recent searches.
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
