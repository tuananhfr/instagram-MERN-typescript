import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsDeleteConversationGlobalState } from "../redux/features/GlobalStateSlice";
import { AppDispatch, RootState } from "../redux/store";
import { deleteConversation } from "../redux/features/conversationSlice";
import { useNavigate } from "react-router-dom";
import { setDeleteConversationMessageSocket } from "../redux/features/messagesSlice";
import { deleteImgMessages } from "../redux/features/uploadImgSlice";

const DeleteConversation: React.FC = () => {
  const { auth, globalState, messages } = useSelector(
    (state: RootState) => state
  );
  const { socket } = useSelector((state: RootState) => state);

  const dispatch: AppDispatch = useDispatch();
  const { isDeleteConversationGlobalState, conversationModal } = globalState;

  const navigate = useNavigate();
  const handleDelete = () => {
    messages.data!.map((msg) => {
      if (!msg.text && msg.media) {
        const startIndex = msg.media.lastIndexOf("/") + 1;
        const endIndex = msg.media.lastIndexOf(".");

        const publicId = msg.media.substring(startIndex, endIndex);
        dispatch(deleteImgMessages(publicId));
      }
    });
    dispatch(deleteConversation(conversationModal!)).then((response) => {
      socket.data!.emit("deleteConversation", {
        data: response.payload,
        auth: auth.user!._id,
      });
    });
    dispatch(setDeleteConversationMessageSocket(conversationModal!));
    dispatch(setIsDeleteConversationGlobalState());
    navigate("/direct/inbox");
  };
  return (
    <>
      {isDeleteConversationGlobalState && (
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
                Delete Chat?
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
                Deleting removes the chat from your inbox.
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
                onClick={() => dispatch(setIsDeleteConversationGlobalState())}
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

export default DeleteConversation;
