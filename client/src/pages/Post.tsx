import { Link, useParams } from "react-router-dom";
import { getUser } from "../redux/features/userSlice";
import { getUserPost } from "../redux/features/postSlice";

import { useDispatch, useSelector } from "react-redux";
import {
  setCommentReply,
  setIsDeletePostGlobalState,
  setIsEditPostGlobalState,
  setIsPostGlobalState,
  setPostModalId,
} from "../redux/features/GlobalStateSlice";
import { AppDispatch, RootState } from "../redux/store";
import {
  CommentIcon,
  LikeIcon,
  SaveIcon,
  ShareIcon,
  UnlikeIcon,
  EmojiIcon,
  UpdateIcon,
  SaveActiveIcon,
} from "../components/Icons";

import React, { useState, useEffect, KeyboardEvent } from "react";
import { AiOutlineClose } from "react-icons/ai";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { useFormik } from "formik";
import * as yup from "yup";

import { getAPost, likePost, unLikePost } from "../redux/features/postSlice";
import {
  createComment,
  getCommentsByPost,
} from "../redux/features/commentSlice";
import Comment from "../components/postModal/Comment";
import {
  savePost,
  setFollowerUser,
  setUnFollowerUser,
  unSavePost,
} from "../redux/features/userSlice";
import { follow, unFollow } from "../redux/features/authSlice";
import {
  createNotification,
  deleteNotification,
} from "../redux/features/notificationSlice";
import {
  getTimesString_1,
  getTimesString_2,
  getTimesToWeekAgoString,
} from "../utils/Times";

let schema = yup.object().shape({
  content: yup.string().required("Content is Required"),
});

const Post: React.FC = () => {
  const params = useParams();
  if (!params) {
    // handle error or return null
  }

  const { username } = params as { username: string };

  const { id } = params as { id: string };

  const [like, setLike] = useState<boolean>(false);
  const [reply, setReply] = useState<string>("");
  const [emoji, setEmoji] = useState<boolean>(false);
  const [savedPost, setSavedPost] = useState<boolean>(false);
  const { auth } = useSelector((state: RootState) => state);
  const { user } = useSelector((state: RootState) => state);
  const { socket } = useSelector((state: RootState) => state);

  const { post } = useSelector((state: RootState) => state);
  const { comment } = useSelector((state: RootState) => state);
  const { globalState } = useSelector((state: RootState) => state);

  const { commentReply } = globalState;

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (username !== auth.user!.username) {
      dispatch(getUser(username));
    }
    dispatch(getUserPost(username));
  }, [auth.user, dispatch, username]);
  const filteredPost = post.data.find((value) => value._id === id);
  const filteredComments = comment.data.filter(
    (value) => value.postId === filteredPost?._id
  );

  const postId = filteredPost ? filteredPost._id : "";
  useEffect(() => {
    if (filteredPost?.likes.find((value) => value === auth.user?._id)) {
      setLike(true);
    }

    return () => setLike(false);
  }, [dispatch, auth.user?._id, filteredPost, postId]);

  useEffect(() => {
    if (user.data?.saved.includes(postId)) {
      setSavedPost(true);
    }
    return () => setSavedPost(false);
  }, [dispatch, postId, user.data?.saved]);
  useEffect(() => {
    dispatch(getCommentsByPost(id));
  }, [dispatch]);
  const handleLike = (id: string) => {
    if (like === false) {
      dispatch(likePost(id));
      const newPost = {
        ...filteredPost,
        likes: [...filteredPost!.likes, auth.user!._id],
      };

      dispatch(
        createNotification({
          id: filteredPost!._id,
          recipients: [filteredPost!.user._id],
          images: filteredPost!.images[0],
          content: `liked your post`,
          url: `/${username}/${id}`,

          user: filteredPost!.user._id,
        })
      ).then((response) => {
        socket.data!.emit("createNotify", response.payload);
      });
      socket.data!.emit("likePost", newPost);
    } else {
      const newPost = {
        ...filteredPost,
        likes: filteredPost!.likes.filter((like) => like !== auth.user!._id),
      };
      socket.data!.emit("unLikePost", newPost);
      dispatch(unLikePost(id));
    }
    setLike(!like);
  };

  const formik = useFormik({
    initialValues: {
      content: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      formik.resetForm();
      if (commentReply) {
        await dispatch(createComment({ ...values, postId, reply })).then(
          (response) => {
            // Get the created comment from the server response
            const newComment = response.payload;
            dispatch(
              createNotification({
                id: newComment._id,
                recipients: [filteredPost!.user._id],
                images: filteredPost!.images[0],
                url: `/${username}/${id}`,

                content: `mentioned you in a comment`,
                user: filteredPost!.user._id,
              })
            ).then((response) => {
              socket.data!.emit("createNotify", response.payload);
            });
            socket.data!.emit("createComment", newComment);
          }
        );
        dispatch(setCommentReply(""));
      } else {
        await dispatch(createComment({ ...values, postId })).then(
          (response) => {
            // Get the created comment from the server response
            const newComment = response.payload;
            dispatch(
              createNotification({
                id: newComment._id,
                recipients: [filteredPost!.user._id],
                images: filteredPost!.images[0],
                url: `/${username}/${id}`,

                content: `has commented on your post`,
                user: filteredPost!.user._id,
              })
            ).then((response) => {
              socket.data!.emit("createNotify", response.payload);
            });

            socket.data!.emit("createComment", newComment);
          }
        );
      }

      dispatch(getAPost(postId));
    },
  });
  const handleEmojiClick = (emojiData: EmojiClickData, event: MouseEvent) => {
    formik.setFieldValue("content", formik.values.content + emojiData.emoji);
  };
  const handleKeyDown = (event: KeyboardEvent<HTMLFormElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      formik.handleSubmit();
    }
  };

  const handleDeletePostModal = (id: string) => {
    dispatch(setIsDeletePostGlobalState());
    dispatch(setPostModalId(id));
  };
  const handleCloseModal = () => {
    dispatch(setIsPostGlobalState());
  };

  useEffect(() => {
    if (commentReply) {
      formik.setFieldValue(
        "content",
        formik.values.content + "@" + commentReply?.user.username + " "
      );
      if (commentReply.reply) {
        setReply(commentReply?.reply);
      }
    }
  }, [commentReply]);

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
      if (id === user.data!._id) {
        dispatch(
          setFollowerUser({
            _id: response.payload._id,
            username: response.payload.username,
            fullname: response.payload.fullname,
            avatar: response.payload.avatar,
            followers: response.payload.followers,
            following: response.payload.following,
          })
        );
      }
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
      if (id === user.data!._id) {
        socket.data!.emit("unFollowUser", {
          _id: response.payload._id,
          username: response.payload.username,
          fullname: response.payload.fullname,
          avatar: response.payload.avatar,
          followers: response.payload.followers,
          following: response.payload.following,
          to: id,
        });
        dispatch(
          setUnFollowerUser({
            _id: response.payload._id,
            username: response.payload.username,
            fullname: response.payload.fullname,
            avatar: response.payload.avatar,
            followers: response.payload.followers,
            following: response.payload.following,
          })
        );
      }
    });
    dispatch(deleteNotification(id)).then((response) => {
      socket.data!.emit("deleteNotify", response.payload);
    });
  };

  return (
    <div>
      {filteredPost && (
        <div style={{ marginLeft: "15rem" }}>
          <div className="d-flex post-modal">
            <div className="post-modal-images">
              <Swiper
                style={{
                  height: "95%",
                  marginTop: "1.5rem",
                }}
                navigation={true}
                modules={[Navigation]}
                className="mySwiper absolute-center"
              >
                {filteredPost!.images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img src={image} alt={image} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div
              style={{
                width: "35%",
                border: "1px solid #dbdbdb",
              }}
            >
              <div
                className="ps-3 pb-3 pt-3 position-relative"
                style={{
                  borderBottom: "1px solid  #dbdbdb",
                }}
              >
                <Link to={`/${filteredPost!.user.username}`}>
                  <img
                    className="user-image-wrapper home-post-avatar"
                    src={filteredPost!.user.avatar}
                    alt={filteredPost!.user.username}
                  />
                </Link>
                <Link
                  to={`/${filteredPost!.user.username}`}
                  className="post-modal-username home-post-text mt-2 ms-3"
                >
                  {filteredPost!.user.username}
                </Link>

                <div
                  className="dropdown cur-point position-absolute mt-1 me-3"
                  style={{ right: 0, top: 0 }}
                >
                  <span
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    onClick={() => dispatch(setPostModalId(filteredPost._id))}
                  >
                    <UpdateIcon className="home-post-icon-update" />
                  </span>

                  <ul
                    className="dropdown-menu "
                    aria-labelledby="dropdownMenuLink"
                  >
                    {filteredPost.user.username === auth.user!.username ? (
                      <>
                        <li>
                          <div
                            style={{
                              fontWeight: 700,
                              color: "#ed4956",
                            }}
                            className="dropdown-item"
                            onClick={() =>
                              handleDeletePostModal(filteredPost._id)
                            }
                          >
                            Delete
                          </div>
                        </li>
                        <li>
                          <div
                            className="dropdown-item"
                            onClick={() => dispatch(setIsEditPostGlobalState())}
                          >
                            Edit
                          </div>
                        </li>
                      </>
                    ) : (
                      <>
                        {auth.user!.following.filter(
                          (follow) => follow._id === filteredPost.user._id
                        ).length > 0 ? (
                          <li>
                            <div
                              className="dropdown-item"
                              style={{
                                fontWeight: 700,
                                color: "#ed4956",
                              }}
                              onClick={() =>
                                handleUnFollow(filteredPost.user._id)
                              }
                            >
                              Unfollow
                            </div>
                          </li>
                        ) : (
                          <li>
                            <div
                              className="dropdown-item"
                              onClick={() =>
                                handleFollow(filteredPost.user._id)
                              }
                            >
                              Follow
                            </div>
                          </li>
                        )}
                      </>
                    )}
                    <li>
                      <div className="dropdown-item">Cancel</div>
                    </li>
                  </ul>
                </div>
              </div>
              <div
                className="mt-3 ps-3 pb-3 post-modal-post"
                style={{ height: "calc(100% - 13.275rem)" }}
              >
                <div className="d-flex ">
                  <Link to={`/${filteredPost!.user.username}`}>
                    <img
                      className="user-image-wrapper home-post-avatar me-3"
                      src={filteredPost!.user.avatar}
                      alt={filteredPost!.user.username}
                    />
                  </Link>
                  <div>
                    <div className="d-inline word-wrap absolute-center">
                      <Link
                        to={`/${filteredPost!.user.username}`}
                        className="post-modal-username home-post-text "
                      >
                        {filteredPost!.user.username}
                      </Link>{" "}
                      <span>{filteredPost!.content}</span>
                    </div>
                    <div className="time mt-1">
                      {getTimesToWeekAgoString(filteredPost!.createdAt)}
                    </div>
                  </div>
                </div>
                {filteredComments!.map((comment) => (
                  <Comment cmt={comment} key={comment._id} />
                ))}
              </div>
              <div
                className="ps-3 pb-3 bg-white"
                style={{
                  borderTop: "1px solid  #dbdbdb",
                  position: "absolute",
                  bottom: "2rem",
                  width: "35%",
                }}
              >
                <div className="d-flex position-relative">
                  <span onClick={() => handleLike(filteredPost!._id)}>
                    {like ? (
                      <UnlikeIcon className="home-post-icon-unlike me-3" />
                    ) : (
                      <LikeIcon className="home-post-icon me-3" />
                    )}
                  </span>
                  <div onClick={() => dispatch(setIsPostGlobalState())}>
                    <CommentIcon className="home-post-icon me-3" />
                  </div>
                  <ShareIcon className="home-post-icon" />
                  <div onClick={() => setSavedPost(!savedPost)}>
                    {savedPost ? (
                      <div onClick={() => dispatch(unSavePost(postId))}>
                        <SaveActiveIcon className="home-post-icon-unlike home-post-icon-save" />
                      </div>
                    ) : (
                      <div onClick={() => dispatch(savePost(postId))}>
                        <SaveIcon className="home-post-icon home-post-icon-save" />
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-3 home-post-text">
                  {filteredPost!.likes.length} likes
                </div>
                <div
                  className="time"
                  title={getTimesString_1(filteredPost!.createdAt)}
                >
                  {getTimesString_2(filteredPost!.createdAt)}
                </div>
              </div>
              <form
                onKeyDown={handleKeyDown}
                onSubmit={formik.handleSubmit}
                className="pt-3 pb-3 ps-3 pe-3 d-flex"
                style={{
                  position: "absolute",
                  bottom: "0",
                  width: "35%",
                }}
              >
                <div
                  onClick={() => setEmoji(!emoji)}
                  style={{ cursor: "pointer" }}
                >
                  {emoji ? (
                    <div className="post-modal-emoji-table">
                      <EmojiPicker onEmojiClick={handleEmojiClick} />
                    </div>
                  ) : null}
                  <EmojiIcon />
                </div>
                <textarea
                  className="w-100 ms-3"
                  style={{
                    fontSize: "0.9rem",
                    lineHeight: "1.5rem",
                    height: "1.5rem",
                  }}
                  placeholder="Add a comment..."
                  value={formik.values.content}
                  onChange={formik.handleChange("content")}
                />
                <button
                  className={
                    formik.values.content.length > 0
                      ? "post-modal-btn"
                      : "post-modal-btn-disabled"
                  }
                  disabled={formik.values.content ? false : true}
                >
                  Post
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
