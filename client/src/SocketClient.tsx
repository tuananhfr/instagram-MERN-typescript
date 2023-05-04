import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCreateCommentSocket,
  setDeleteCommentSocket,
} from "./redux/features/commentSlice";
import {
  setGetCommentPostSocket,
  setGetPostSocket,
} from "./redux/features/postSlice";
import { AppDispatch, RootState } from "./redux/store";
import {
  setFollowerUserSocket,
  setUnFollowerUserSocket,
} from "./redux/features/authSlice";
import {
  setCreateNotificationSocket,
  setDeleteNotificationSocket,
} from "./redux/features/notificationSlice";
import {
  createMessage,
  setCreateMessageSocket,
  setDeleteConversationMessageSocket,
  setDeleteMessageSocket,
} from "./redux/features/messagesSlice";
import {
  setOfflineToClient,
  setOnline,
  setOnlineToClient,
} from "./redux/features/onlineSlice";
import {
  createMessageConversationReadSocket,
  createMessageConversationSocket,
  deleteConversationSocket,
  getConversations,
  isReadConversation,
} from "./redux/features/conversationSlice";
import { useLocation } from "react-router-dom";
import { createCall } from "./redux/features/callSlice";
import { setCallGlobalState } from "./redux/features/GlobalStateSlice";
import audiobell from "./audio/audiobell.mp3";
import audioMessage from "./audio/facebook.mp3";
import { IOnline } from "./utils/interface";

const SocketClient = () => {
  const { auth, socket, conversation } = useSelector(
    (state: RootState) => state
  );

  const dispatch: AppDispatch = useDispatch();

  const location = useLocation();

  const audioMessageRef = useRef<HTMLAudioElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    dispatch(getConversations());
  }, [dispatch]);

  // joinUser
  useEffect(() => {
    if (socket.data) {
      const newArr: any = [];
      conversation.data!.forEach((item) => {
        item.recipients.forEach((cv) => {
          if (cv._id !== auth.user!._id) {
            newArr.push({
              ...cv,
              auth: auth.user!._id,
            });
          }
        });
      });
      if (socket.data) {
        socket.data!.emit("joinUser", newArr);
      }
    }
  }, [auth.user, conversation.data, socket]);

  // Likes
  useEffect(() => {
    if (socket.data) {
      socket.data!.on("likePostToClient", (newPost) => {
        dispatch(setGetPostSocket(newPost));
      });
      return () => {
        socket.data!.off("likePostToClient");
      };
    }
  }, [socket, dispatch]);
  // UnLikes
  useEffect(() => {
    if (socket.data) {
      socket.data!.on("unLikePostToClient", (newPost) => {
        dispatch(setGetPostSocket(newPost));
      });
      return () => {
        socket.data!.off("unLikePostToClient");
      };
    }
  }, [socket, dispatch]);

  // Update Post
  useEffect(() => {
    if (socket.data) {
      socket.data!.on("updatePostToClient", (newPost) => {
        dispatch(setGetPostSocket(newPost));
      });
      return () => {
        socket.data!.off("updatePostToClient");
      };
    }
  }, [socket, dispatch]);

  // Create Comment
  useEffect(() => {
    if (socket.data) {
      socket.data!.on("createCommentToClient", (newComment) => {
        dispatch(setCreateCommentSocket(newComment));
        dispatch(setGetCommentPostSocket(newComment));
      });
      return () => {
        socket.data!.off("createCommentToClient");
      };
    }
  }, [socket, dispatch]);

  // Delete Comment
  useEffect(() => {
    if (socket.data) {
      socket.data!.on("deleteCommentToClient", (newComment) => {
        dispatch(setDeleteCommentSocket(newComment));
      });
      return () => {
        socket.data!.off("deleteCommentToClient");
      };
    }
  }, [socket, dispatch]);
  // UnFollow
  useEffect(() => {
    if (socket.data) {
      socket.data!.on("unFollowUserToClient", (data) => {
        dispatch(setUnFollowerUserSocket(data));
      });
      return () => {
        socket.data!.off("unFollowUserToClient");
      };
    }
  }, [socket, dispatch]);

  // Follow
  useEffect(() => {
    if (socket.data) {
      socket.data!.on("followUserToClient", (data) => {
        dispatch(setFollowerUserSocket(data));
      });
      return () => {
        socket.data!.off("followUserToClient");
      };
    }
  }, [socket, dispatch]);

  // Create a Notify
  useEffect(() => {
    if (socket.data) {
      socket.data!.on("createNotifyToClient", (notify) => {
        dispatch(setCreateNotificationSocket(notify));
        audioRef.current! && audioRef.current!.play();
      });
      return () => {
        socket.data!.off("createNotifyToClient");
      };
    }
  }, [socket, dispatch]);

  // Delete a Notify
  useEffect(() => {
    if (socket.data) {
      socket.data!.on("deleteNotifyToClient", (notify) => {
        dispatch(setDeleteNotificationSocket(notify));
      });
      return () => {
        socket.data!.off("deleteNotifyToClient");
      };
    }
  }, [socket, dispatch]);

  // Create a Messages
  useEffect(() => {
    if (socket.data) {
      socket.data!.on("createMessageToClient", (msg) => {
        dispatch(setCreateMessageSocket(msg));
        audioMessageRef.current! && audioMessageRef.current!.play();

        if (location.pathname === `/direct/${msg.conversation}`) {
          dispatch(isReadConversation(msg.conversation));
          dispatch(
            createMessageConversationReadSocket({
              _id: msg.conversation,
              recipients: [msg.sender, msg.recipient],
              lastMessages: msg.text,
              updatedAt: msg.createdAt,
            })
          );
        } else {
          dispatch(
            createMessageConversationSocket({
              _id: msg.conversation,
              recipients: [msg.sender, msg.recipient],
              lastMessages: msg.text,
              updatedAt: msg.createdAt,
            })
          );
        }
        dispatch(getConversations());
      });
      return () => {
        socket.data!.off("createMessageToClient");
      };
    }
  }, [socket, dispatch, location]);

  // Delete a Messages
  useEffect(() => {
    if (socket.data) {
      socket.data!.on("deleteMessageToClient", (msg) => {
        dispatch(setDeleteMessageSocket(msg));
      });
      return () => {
        socket.data!.off("deleteMessageToClient");
      };
    }
  }, [socket, dispatch]);

  // Delete a Conversation
  useEffect(() => {
    if (socket.data) {
      socket.data!.on("deleteConversationToClient", (data) => {
        dispatch(setDeleteConversationMessageSocket(data._id));
        dispatch(deleteConversationSocket(data));
      });
      return () => {
        socket.data!.off("deleteConversationToClient");
      };
    }
  }, [socket, dispatch]);

  // Check User Online / Offline
  useEffect(() => {
    if (socket.data) {
      socket.data!.emit("checkUserOnline", auth.user!._id);
    }
  }, [auth.user, socket.data]);

  useEffect(() => {
    if (socket.data) {
      socket.data!.on("checkUserOnlineToClient", (id) => {
        dispatch(setOnlineToClient(id));
      });
      return () => {
        socket.data!.off("checkUserOnlineToClient");
      };
    }
  }, [socket, dispatch]);
  useEffect(() => {
    if (socket.data) {
      socket.data!.on("checkUserOnlineToMe", (data) => {
        const ids = data.map((obj: IOnline) => obj.id);

        dispatch(setOnline(ids));
      });
      return () => {
        socket.data!.off("checkUserOnlineToMe");
      };
    }
  }, [socket, dispatch]);
  // Offline
  useEffect(() => {
    if (socket.data) {
      socket.data!.on("CheckUserOfflineToClient", (id) => {
        dispatch(setOfflineToClient(id));
      });
      return () => {
        socket.data!.off("CheckUserOfflineToClient");
      };
    }
  }, [socket, dispatch]);
  // Call
  useEffect(() => {
    if (socket.data) {
      socket.data!.on("callUserToClient", (data) => {
        dispatch(createCall(data));
        dispatch(setCallGlobalState());
      });

      return () => {
        socket.data!.off("callUserToClient");
      };
    }
  }, [socket, dispatch]);

  // Busy
  useEffect(() => {
    if (socket.data) {
      socket.data!.on("userBusy", (data) => {
        dispatch(setCallGlobalState());
        dispatch(
          createMessage({
            conversation: data!.conversation,
            sender: data!.sender._id,
            recipient: data!.recipient._id,
            text: "",
            media: "",
            call: {
              start: "",
              end: new Date().toISOString(),
              video: data!.video,
              audio: data!.video,
            },
          })
        ).then((response) => {
          socket.data!.emit("createMessage", response.payload);
          alert(`${data.recipient.fullname} is on another call!`);
        });
      });

      return () => {
        socket.data!.off("userBusy");
      };
    }
  }, [socket, dispatch]);

  return (
    <>
      <audio controls ref={audioMessageRef} style={{ display: "none" }}>
        <source src={audioMessage} type="audio/mp3" />
      </audio>
      <audio controls ref={audioRef} style={{ display: "none" }}>
        <source src={audiobell} type="audio/mp3" />
      </audio>
    </>
  );
};

export default SocketClient;
