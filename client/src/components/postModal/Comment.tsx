import React, { useState, useEffect, KeyboardEvent, createRef } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  deleteComment,
  likeComment,
  unLikeComment,
  updateComment,
} from "../../redux/features/commentSlice";

import { AppDispatch, RootState } from "../../redux/store";
import {
  EmojiIcon,
  LikeCommentIcon,
  UnlikeCommentIcon,
  UpdateIcon,
} from "../Icons";
import { useFormik } from "formik";
import * as yup from "yup";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import {
  setCommentReply,
  setIsPostGlobalState,
} from "../../redux/features/GlobalStateSlice";
import ReplyComment from "../ReplyComment";
import { Link } from "react-router-dom";
import { follow, unFollow } from "../../redux/features/authSlice";
import {
  createNotification,
  deleteNotification,
} from "../../redux/features/notificationSlice";
import { getTimesToWeekAgoString } from "../../utils/Times";
import { CommentProps } from "../../utils/interface";
import { setFollowerUser } from "../../redux/features/userSlice";

let schema = yup.object().shape({
  content: yup.string().required("Content is Required"),
});
const Comment: React.FC<CommentProps> = ({ cmt }) => {
  const [likeCmt, setLikeCmt] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [emoji, setEmoji] = useState<boolean>(false);
  const [onReply, setOnReply] = useState<boolean>(false);

  const textareaRef = createRef<HTMLTextAreaElement>();

  const { auth } = useSelector((state: RootState) => state);
  const { user } = useSelector((state: RootState) => state);

  const { post } = useSelector((state: RootState) => state);

  const { globalState } = useSelector((state: RootState) => state);
  const { isPostGlobalState } = globalState;

  const { comment } = useSelector((state: RootState) => state);
  const { socket } = useSelector((state: RootState) => state);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (cmt.likes.find((_id) => _id === auth.user?._id)) {
      setLikeCmt(true);
    }

    return () => setLikeCmt(false);
  }, [auth.user?._id, cmt.likes]);
  const formik = useFormik({
    initialValues: {
      content: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const data = { id: cmt._id, ...values };
      dispatch(updateComment(data));
      setIsEdit(!isEdit);
      formik.resetForm();
    },
  });
  useEffect(() => {
    if (cmt.content && cmt.content !== formik.initialValues.content) {
      formik.initialValues.content = cmt.content;
    }
  }, [cmt?.content, formik.initialValues, formik.initialValues.content]);

  const handleEmojiClick = (emojiData: EmojiClickData, event: MouseEvent) => {
    formik.setFieldValue("content", formik.values.content + emojiData.emoji);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLFormElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      formik.handleSubmit();
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [textareaRef]);
  const filteredPost = post.data.find((value) => value._id === cmt.postId);

  const handleLikeComment = () => {
    if (likeCmt === false) {
      dispatch(likeComment(cmt._id));
      dispatch(
        createNotification({
          id: cmt._id,
          recipients: [cmt.user._id],
          images: filteredPost!.images[0],
          url: `/${filteredPost!.user.username}/${filteredPost!._id}`,
          content: `liked your comment on the post`,
          user: auth.user!._id,
        })
      ).then((response) => {
        socket.data!.emit("createNotify", response.payload);
      });
    } else {
      dispatch(unLikeComment(cmt._id));
      dispatch(deleteNotification(cmt._id)).then((response) => {
        socket.data!.emit("deleteNotify", response.payload);
      });
    }
    setLikeCmt(!likeCmt);
  };

  const handleCloseEdit = () => {
    setIsEdit(!isEdit);
    formik.resetForm();
  };

  const handleReply = () => {
    if (cmt.reply) {
      dispatch(setCommentReply(cmt));
    } else {
      dispatch(setCommentReply({ ...cmt, reply: cmt._id }));
    }
  };

  const handleDeleteComment = (id: string) => {
    dispatch(deleteComment(id)).then((response) => {
      // Get the created comment from the server response
      const newComment = response.payload;
      dispatch(deleteNotification(newComment._id)).then((response) => {
        socket.data!.emit("deleteNotify", response.payload);
      });

      socket.data!.emit("deleteComment", newComment);
    });
  };

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
    dispatch(deleteNotification(id)).then((response) => {
      socket.data!.emit("deleteNotify", response.payload);
    });
  };

  const commentReply = comment.data.filter((value) => value.reply === cmt._id);

  const getUsername = cmt.content.split(/(@\w+\b)/g);

  const handleCloseModal = () => {
    if (isPostGlobalState) {
      dispatch(setIsPostGlobalState());
    }
  };

  return (
    <>
      {!cmt.reply && (
        <div className="w-100">
          <div className="mt-3 home-post-comment d-flex w-100 ">
            <Link to={`/${cmt!.user.username}`} onClick={handleCloseModal}>
              <img
                className="user-image-wrapper home-post-avatar"
                src={cmt!.user.avatar}
                alt={cmt!.user.username}
              />
            </Link>
            <div className="ms-3 flex-column w-100 ">
              <div className="d-inline word-wrap position-relative pe-5">
                <Link
                  to={`/${cmt!.user.username}`}
                  onClick={handleCloseModal}
                  className="post-modal-username home-post-text me-1"
                >
                  {cmt!.user.username}
                </Link>{" "}
                {isEdit ? (
                  <form
                    onKeyDown={handleKeyDown}
                    className="d-flex w-100 ps-2"
                    style={{
                      lineHeight: "1.1rem",
                    }}
                  >
                    <textarea
                      className="w-100"
                      style={{
                        fontSize: "0.9rem",
                        lineHeight: "1.1rem",
                        height: "1.1rem",
                      }}
                      placeholder="Add a cmt..."
                      value={formik.values.content}
                      onChange={formik.handleChange("content")}
                      ref={textareaRef}
                      onFocus={(e) =>
                        e.currentTarget.setSelectionRange(
                          e.currentTarget.value.length,
                          e.currentTarget.value.length
                        )
                      }
                    />
                    <div
                      onClick={() => setEmoji(!emoji)}
                      style={{ cursor: "pointer", position: "relative" }}
                    >
                      {emoji ? (
                        <div className="comment-emoji-table">
                          <EmojiPicker onEmojiClick={handleEmojiClick} />
                        </div>
                      ) : null}
                      <EmojiIcon />
                    </div>
                  </form>
                ) : (
                  <>
                    <span
                      style={{ lineHeight: "1.1rem" }}
                      className="d-inline word-wrap"
                    >
                      {getUsername.map((value, index) => {
                        if (value.startsWith("@")) {
                          // This is a mention, wrap it in an anchor tag
                          return (
                            <Link
                              to={`/${value.substring(1, value.length)}`}
                              key={index}
                            >
                              {value}
                            </Link>
                          );
                        } else {
                          // This is normal text, wrap it in a span

                          return value;
                        }
                      })}
                    </span>
                    <span
                      className="comment-icon"
                      onClick={() => handleLikeComment()}
                    >
                      {likeCmt ? (
                        <UnlikeCommentIcon className="home-post-icon-unlike me-3 mt-2" />
                      ) : (
                        <LikeCommentIcon className="home-post-icon me-3 mt-2" />
                      )}
                    </span>
                  </>
                )}
              </div>

              <div className="d-flex comment-wrapper-reply">
                {cmt.likes.length > 0 ? (
                  <button className="me-2 comment-btn-reply">
                    {cmt.likes.length} likes
                  </button>
                ) : null}
                <span className="time me-2 absolute-center">
                  {getTimesToWeekAgoString(cmt.createdAt)}
                </span>
                <button
                  className="me-2 comment-btn-reply"
                  onClick={() => handleReply()}
                >
                  Reply
                </button>
                <div
                  className="dropdown comment-btn-settings cur-point me-2"
                  style={{ right: 0, top: 0 }}
                >
                  <span data-bs-toggle="dropdown" aria-expanded="false">
                    <UpdateIcon className="home-post-icon-update" />
                  </span>

                  <ul
                    className="dropdown-menu "
                    aria-labelledby="dropdownMenuLink"
                  >
                    {cmt.user.username === auth.user!.username ? (
                      <>
                        <li>
                          <div
                            style={{
                              fontWeight: 700,
                              color: "#ed4956",
                            }}
                            className="dropdown-item"
                            onClick={() => handleDeleteComment(cmt!._id)}
                          >
                            Delete
                          </div>
                        </li>
                        <li>
                          <div
                            className="dropdown-item"
                            onClick={() => setIsEdit(!isEdit)}
                          >
                            Edit
                          </div>
                        </li>
                      </>
                    ) : (
                      <>
                        {auth.user!.following.filter(
                          (follow) => follow._id === cmt.user._id
                        ).length > 0 ? (
                          <li>
                            <div
                              className="dropdown-item"
                              onClick={() => handleUnFollow(cmt.user._id)}
                            >
                              Unfollow
                            </div>
                          </li>
                        ) : (
                          <li>
                            <div
                              className="dropdown-item"
                              onClick={() => handleFollow(cmt.user._id)}
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
                {isEdit && (
                  <button
                    onClick={() => handleCloseEdit()}
                    className="comment-btn-cancel"
                  >
                    Cancel
                  </button>
                )}
              </div>

              {commentReply.length > 0 && (
                <div>
                  {onReply ? (
                    <div>
                      <div
                        className="d-flex"
                        onClick={() => setOnReply(!onReply)}
                      >
                        <div className="comment-horizontal-line"></div>
                        <span className="comment-hide-reply">
                          Hides replies
                        </span>
                      </div>
                      {commentReply.map((reply) => (
                        <ReplyComment cmt={reply} key={reply._id} />
                      ))}
                    </div>
                  ) : (
                    <div>
                      <div
                        className="d-flex"
                        onClick={() => setOnReply(!onReply)}
                      >
                        <div className="comment-horizontal-line"></div>
                        <span className="comment-hide-reply">
                          View replies({commentReply.length})
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Comment;
