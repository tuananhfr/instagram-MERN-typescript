import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsDeletePostGlobalState } from "../redux/features/GlobalStateSlice";
import { deletePost } from "../redux/features/postSlice";
import { AppDispatch, RootState } from "../redux/store";
import { deleteNotification } from "../redux/features/notificationSlice";
import { deleteImgPost } from "../redux/features/uploadImgSlice";

const DeletePost: React.FC = () => {
  const { globalState } = useSelector((state: RootState) => state);
  const { socket } = useSelector((state: RootState) => state);

  const dispatch: AppDispatch = useDispatch();
  const { isDeletePostGlobalState, postModalId } = globalState;
  const { post } = useSelector((state: RootState) => state);

  const filteredPost = post.data.find((value) => value._id === postModalId);
  // const startIndex = msg.media.lastIndexOf("/") + 1;
  //       const endIndex = msg.media.lastIndexOf(".");

  //       const publicId = msg.media.substring(startIndex, endIndex);
  //       dispatch(deleteImgMessages(publicId));
  const handleDelete = () => {
    dispatch(deletePost(postModalId!)).then((response) => {
      response.payload.images.map((image: string) => {
        if (image.startsWith("https://res.cloudinary.com")) {
          const startIndex = image.lastIndexOf("/") + 1;
          const endIndex = image.lastIndexOf(".");

          const publicId = image.substring(startIndex, endIndex);
          dispatch(deleteImgPost(publicId));
        }
      });
    });
    dispatch(setIsDeletePostGlobalState());
    dispatch(deleteNotification(postModalId!)).then((response) => {
      socket.data!.emit("deleteNotify", response.payload);
    });
    filteredPost!.comments.map((cmt) => {
      dispatch(deleteNotification(cmt)).then((response) => {
        socket.data!.emit("deleteNotify", response.payload);
      });
    });
    filteredPost!.likes.map((like) => {
      dispatch(deleteNotification(like)).then((response) => {
        socket.data!.emit("deleteNotify", response.payload);
      });
    });
  };
  return (
    <>
      {isDeletePostGlobalState && (
        <div className="edit_profile absolute-center">
          <div
            style={{
              height: "12.5rem",
              width: "25rem",
              backgroundColor: "white",

              borderRadius: "5px",
            }}
          >
            <div className="absolute-center pt-4">
              <span
                style={{
                  fontSize: "1.3rem",
                  color: "#262626",
                }}
              >
                Delete post?
              </span>
            </div>
            <div className="absolute-center">
              <span
                className=" pt-2 pb-4"
                style={{
                  color: "#8e8e8e",
                  fontSize: "14px",
                  lineHeight: "18px",
                }}
              >
                Are you sure you want to delete this post?
              </span>
            </div>
            <div className="pb-2">
              <button
                className="w-100 pt-2"
                style={{
                  backgroundColor: "white",
                  borderTop: "1px solid var(--border-color)",
                  fontWeight: 700,
                  color: "#ed4956",
                }}
                onClick={() => handleDelete()}
              >
                Delete
              </button>
            </div>
            <div>
              <button
                className="w-100 pt-2"
                style={{
                  backgroundColor: "white",
                  borderTop: "1px solid var(--border-color)",
                }}
                onClick={() => dispatch(setIsDeletePostGlobalState())}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeletePost;
