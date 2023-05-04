import React, { useState, useEffect, KeyboardEvent, createRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { RxDotFilled } from "react-icons/rx";
import {
  CallActiveIcon,
  CallIcon,
  EmojiIcon,
  ImagesMessageIcon,
  SettingsMessagesIcon,
  UpdateIcon,
  VideoCallActiveIcon,
  VideoCallIcon,
} from "../Icons";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import {
  createMessage,
  deleteMessage,
  getMessages,
} from "../../redux/features/messagesSlice";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  deleteImgMessages,
  uploadImgMessages,
} from "../../redux/features/uploadImgSlice";
import {
  setConversationModalId,
  setIsDeleteConversationGlobalState,
} from "../../redux/features/GlobalStateSlice";

import { getTimesMessagesString } from "../../utils/Times";
import { setCallGlobalState } from "../../redux/features/GlobalStateSlice";
import { createCall } from "../../redux/features/callSlice";
import { BoxChatProps, IMessage } from "../../utils/interface";

let schema = yup.object().shape({
  text: yup.string(),
});
const BoxChat: React.FC<BoxChatProps> = ({ id }) => {
  const [emoji, setEmoji] = useState<boolean>(false);

  const { auth } = useSelector((state: RootState) => state);
  const { online } = useSelector((state: RootState) => state);
  const { upload } = useSelector((state: RootState) => state);

  const { socket } = useSelector((state: RootState) => state);

  const { messages } = useSelector((state: RootState) => state);
  const { conversation } = useSelector((state: RootState) => state);
  const { peer } = useSelector((state: RootState) => state);

  const dispatch: AppDispatch = useDispatch();
  const ref = createRef<HTMLInputElement>();

  const handleClick = () => {
    ref.current?.click();
  };

  const uploadImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList: FileList = e.target.files!;
    const filesArray: File[] = Array.from(fileList);

    dispatch(uploadImgMessages(filesArray)).then((response) =>
      dispatch(
        createMessage({
          conversation: id,
          sender: auth.user!._id,
          recipient: newArr[0]!.recipients._id,

          media: response.payload[0].url,
        })
      ).then((res) => {
        socket.data!.emit("createMessage", res.payload);
      })
    );
  };

  useEffect(() => {
    dispatch(getMessages(id));
  }, [dispatch, id]);

  const newArr: any = [];
  conversation.data!.forEach((item) => {
    if (item._id === id) {
      item.recipients.forEach((cv) => {
        if (cv._id !== auth.user!._id) {
          newArr.push({
            recipients: cv,
            _id: item._id,
          });
        }
      });
    }
  });

  const MessageSameConversation: IMessage[] = [];
  messages.data!.map((msg) => {
    if (msg.conversation === id) {
      MessageSameConversation.push(msg);
    }
  });

  const formik = useFormik({
    initialValues: {
      text: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      if (values.text !== "") {
        dispatch(
          createMessage({
            conversation: id,
            sender: auth.user!._id,
            recipient: newArr[0]!.recipients._id,
            text: values.text,
          })
        ).then((response) => {
          socket.data!.emit("createMessage", response.payload);
        });
      }

      formik.resetForm();
    },
  });

  const handleEmojiClick = (emojiData: EmojiClickData, event: MouseEvent) => {
    formik.setFieldValue("text", formik.values.text + emojiData.emoji);
  };
  const handleKeyDown = (event: KeyboardEvent<HTMLFormElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      formik.handleSubmit();
    }
  };

  // const isSameSender = (
  //   messages: Message[],
  //   m: Message,
  //   i: number,
  //   userId: string
  // ) => {
  //   return (
  //     i < messages.length - 1 &&
  //     (messages[i + 1].sender !== m.sender ||
  //       messages[i + 1].sender === undefined) &&
  //     messages[i].sender !== userId
  //   );
  // };
  const handleDeleteConversation = (id: string) => {
    dispatch(setIsDeleteConversationGlobalState());
    dispatch(setConversationModalId(id));
  };
  const handleDeleteMsg = (obj: IMessage) => {
    if (obj.text === "" && obj.media !== "") {
      const startIndex = obj.media.lastIndexOf("/") + 1;
      const endIndex = obj.media.lastIndexOf(".");

      const publicId = obj.media.substring(startIndex, endIndex);
      dispatch(deleteImgMessages(publicId));
    }
    dispatch(deleteMessage(obj._id)).then((response) => {
      socket.data!.emit("deleteMessage", response.payload);
    });
  };
  // Call
  const caller = async (video: boolean, audio: boolean) => {
    await dispatch(
      createMessage({
        conversation: id,
        sender: auth.user!._id,
        recipient: newArr[0]!.recipients._id,
        text: "",
        media: "",
        call: {
          start: new Date().toISOString(),
          end: "",
          video: video,
          audio: audio,
        },
      })
    ).then((response) => {
      socket.data!.emit("createMessage", response.payload);
    });
    dispatch(
      createCall({
        sender: {
          _id: auth.user!._id,
          avatar: auth.user!.avatar,
          username: auth.user!.username,
          fullname: auth.user!.fullname,
        },
        recipient: newArr[0]!.recipients,
        conversation: id,
        video: video,
        audio: audio,
      })
    );
    dispatch(setCallGlobalState());
  };

  const callUser = (video: boolean, audio: boolean) => {
    const msg = {
      sender: {
        _id: auth.user!._id,
        avatar: auth.user!.avatar,
        username: auth.user!.username,
        fullname: auth.user!.fullname,
      },
      recipient: newArr[0]!.recipients,
      video: video,
      audio: audio,
      conversation: id,

      peerId: "",
    };

    if (peer.data!.open) msg.peerId = peer.data!.id;

    socket.data!.emit("callUser", msg);
  };

  const handleAudioCall = () => {
    caller(false, true);
    callUser(false, true);
  };
  const handleVideoCall = () => {
    caller(true, true);
    callUser(true, true);
  };

  return (
    <>
      {newArr.length > 0 && (
        <div className="messages-rightside-container">
          <div className="boxchat-header">
            <div className="boxchat-header-container">
              <div className="boxchat-info-user">
                <div className="boxchat-avatar">
                  <img
                    src={newArr[0]!.recipients.avatar}
                    alt={newArr[0]!.recipients.avatar}
                  />
                  {online.data!.map((obj) =>
                    obj === newArr[0]!.recipients._id ? (
                      <div className="boxchat-online" key={obj}>
                        <RxDotFilled />
                      </div>
                    ) : null
                  )}
                </div>

                <div>
                  <div className="boxchat-fullname">
                    {newArr[0]!.recipients.fullname}
                  </div>
                  {online.data!.length > 0 ? (
                    online.data!.find(
                      (obj) => obj === newArr[0]!.recipients._id
                    ) ? (
                      <div
                        className="leftside-boxchat-online"
                        key={newArr[0]!.recipients._id}
                      >
                        Active now
                      </div>
                    ) : (
                      <div
                        className="leftside-boxchat-online"
                        key={newArr[0]!.recipients._id}
                      >
                        Offline
                      </div>
                    )
                  ) : (
                    <div
                      className="leftside-boxchat-online"
                      key={newArr[0]!.recipients._id}
                    >
                      Offline
                    </div>
                  )}
                </div>
              </div>
              <div className="boxchat-header-icon">
                <div className="boxchat-icon" onClick={handleAudioCall}>
                  <CallIcon />
                </div>
                <div className="boxchat-icon" onClick={handleVideoCall}>
                  <VideoCallIcon />
                </div>
                <div
                  className="boxchat-icon"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <SettingsMessagesIcon />
                </div>

                <ul
                  className="dropdown-menu "
                  aria-labelledby="dropdownMenuLink"
                >
                  <li>
                    <div
                      style={{
                        fontWeight: 700,
                        color: "#ed4956",
                      }}
                      className="dropdown-item cur-point"
                      onClick={() => handleDeleteConversation(id)}
                    >
                      Delete
                    </div>
                  </li>
                  <li>
                    <div className="dropdown-item cur-point">Cancel</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="boxchat-body">
            {MessageSameConversation!.map((msg, index) =>
              msg.sender._id === auth.user!._id ? (
                <div
                  className="boxchat-box-message absolute-end flex-column-reverse"
                  key={msg._id}
                >
                  <div className="d-flex absolute-center">
                    <div className="me-1">
                      {getTimesMessagesString(msg.createdAt)}
                    </div>
                    <div
                      className="boxchat-update-icon"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <UpdateIcon />
                    </div>
                    <ul
                      className="dropdown-menu "
                      aria-labelledby="dropdownMenuLink"
                    >
                      <li>
                        <div
                          style={{
                            fontWeight: 700,
                            color: "#ed4956",
                          }}
                          className="dropdown-item cur-point"
                          onClick={() => handleDeleteMsg(msg)}
                        >
                          Delete
                        </div>
                      </li>
                      <li>
                        <div className="dropdown-item cur-point">Cancel</div>
                      </li>
                    </ul>

                    {msg.call ? (
                      msg.call.video ? (
                        msg.call.start === "" ? (
                          <div
                            className="boxchat-my-message-call"
                            onClick={handleVideoCall}
                          >
                            <VideoCallActiveIcon />
                            <div className="boxchat-user-message-call-text">
                              Video call ended
                            </div>
                          </div>
                        ) : (
                          <div
                            className="boxchat-my-message-call"
                            onClick={handleVideoCall}
                          >
                            <VideoCallActiveIcon />
                            <div className="boxchat-user-message-call-text">
                              Video call started
                            </div>
                          </div>
                        )
                      ) : msg.call.start === "" ? (
                        <div
                          className="boxchat-my-message-call"
                          onClick={handleAudioCall}
                        >
                          <CallActiveIcon />
                          <div className="boxchat-user-message-call-text">
                            Audio call ended
                          </div>
                        </div>
                      ) : (
                        <div
                          className="boxchat-my-message-call"
                          onClick={handleAudioCall}
                        >
                          <CallActiveIcon />
                          <div className="boxchat-user-message-call-text">
                            Audio call started
                          </div>
                        </div>
                      )
                    ) : (
                      <>
                        {msg.media && !msg.text ? (
                          <div className="boxchat-my-message-images">
                            <img src={msg.media} alt={msg.media} />
                          </div>
                        ) : (
                          <div className="boxchat-my-message">{msg.text}</div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <div
                  className="boxchat-box-message absolute-start flex-column-reverse"
                  key={msg._id}
                >
                  <div className="absolute-start">
                    <div className="boxchat-avatar boxchat-avatar-absolute">
                      <img
                        src={newArr[0]!.recipients.avatar}
                        alt={newArr[0]!.recipients.avatar}
                      />
                    </div>
                    <div className="d-flex absolute-center">
                      {msg.call ? (
                        msg.call.video ? (
                          msg.call.start === "" ? (
                            <div
                              className="boxchat-user-message-call"
                              onClick={handleVideoCall}
                            >
                              <VideoCallActiveIcon />
                              <div className="boxchat-user-message-call-text">
                                Video call ended
                              </div>
                            </div>
                          ) : (
                            <div
                              className="boxchat-user-message-call"
                              onClick={handleVideoCall}
                            >
                              <VideoCallActiveIcon />
                              <div className="boxchat-user-message-call-text">
                                Video call started
                              </div>
                            </div>
                          )
                        ) : msg.call.start === "" ? (
                          <div
                            className="boxchat-user-message-call"
                            onClick={handleAudioCall}
                          >
                            <CallActiveIcon />
                            <div className="boxchat-user-message-call-text">
                              Audio call ended
                            </div>
                          </div>
                        ) : (
                          <div
                            className="boxchat-user-message-call"
                            onClick={handleAudioCall}
                          >
                            <CallActiveIcon />

                            <div className="boxchat-user-message-call-text">
                              Audio call started
                            </div>
                          </div>
                        )
                      ) : (
                        <>
                          {msg.media && !msg.text ? (
                            <div className="boxchat-user-message-images">
                              <img src={msg.media} alt={msg.media} />
                            </div>
                          ) : (
                            <div className="boxchat-user-message">
                              {msg.text}
                            </div>
                          )}
                        </>
                      )}
                      <div className="ms-3">
                        {getTimesMessagesString(msg.createdAt)}
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
          <div className="boxchat-footer">
            <div className="boxchat-textarea-wrapper">
              <div
                onClick={() => setEmoji(!emoji)}
                style={{ cursor: "pointer" }}
              >
                {emoji ? (
                  <div className="post-modal-emoji-table">
                    <EmojiPicker onEmojiClick={handleEmojiClick} />
                  </div>
                ) : null}
                <EmojiIcon className="boxchat-emoji-icon" />
              </div>
              <form
                className="boxchat-form"
                onKeyDown={handleKeyDown}
                onSubmit={formik.handleSubmit}
              >
                <textarea
                  className="boxchat-textarea"
                  placeholder="Message..."
                  value={formik.values.text}
                  onChange={formik.handleChange("text")}
                />
                {formik.values.text === "" ? (
                  <>
                    <div
                      className="boxchat-images-icon"
                      role="button"
                      onClick={handleClick}
                    >
                      <ImagesMessageIcon />
                    </div>
                    <input
                      type="file"
                      name="file"
                      id="file_up"
                      accept="image/*"
                      style={{ display: "none" }}
                      ref={ref}
                      onChange={uploadImages}
                    />
                  </>
                ) : (
                  <button type="submit" className="boxchat-btn-send ">
                    Send
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default BoxChat;
