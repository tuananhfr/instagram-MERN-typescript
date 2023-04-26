import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { Link, useLocation } from "react-router-dom";
import { CreateMessagesIcon } from "../Icons";
import { RxDotFilled } from "react-icons/rx";
import {
  getConversations,
  isReadConversation,
} from "../../redux/features/conversationSlice";
import { setIsCreateConversationGlobalState } from "../../redux/features/GlobalStateSlice";
import { getTimesToWeekAgoString } from "../../utils/Times";
import { IConversation } from "../../utils/interface";

const LeftSide: React.FC = () => {
  const { auth } = useSelector((state: RootState) => state);
  const { conversation, messages } = useSelector((state: RootState) => state);
  const { online } = useSelector((state: RootState) => state);

  const dispatch: AppDispatch = useDispatch();

  const location = useLocation();
  useEffect(() => {
    if (messages.data && messages.data.length > 0 && conversation.data) {
      const conversationExists = conversation.data.find(
        (obj) => obj._id === messages.data[0].conversation
      );
      if (!conversationExists) {
        dispatch(getConversations());
      }
    }
  }, [dispatch, messages.data, conversation.data]);

  const handleIsRead = (obj: IConversation) => {
    if (obj.recipients[1]._id === auth.user!._id) {
      dispatch(isReadConversation(obj._id));
    }
  };
  const newMessage: IConversation[] = [];

  conversation.data!.map((data: IConversation) => {
    if (data.isRead === false && data.recipients[1]._id === auth.user!._id) {
      newMessage.push(data);
    }
  });

  return (
    <div className="messages-leftside-container">
      <div className="leftside-username-box absolute-center">
        <Link className="leftside-username " to={`/${auth.user!.username}`}>
          {auth.user!.username}
        </Link>
        <div
          className="leftside-username-icon"
          onClick={() => dispatch(setIsCreateConversationGlobalState())}
        >
          <CreateMessagesIcon />
        </div>
      </div>
      <div className="leftside-list-boxchat">
        {conversation.data!.length > 0 &&
          conversation.data!.map((obj) => (
            <Link
              to={`/direct/${obj._id}`}
              key={obj._id}
              onClick={() => handleIsRead(obj)}
            >
              {obj.recipients.map((user) =>
                user._id !== auth.user!._id ? (
                  <div
                    className={
                      location.pathname === `/direct/${obj._id}`
                        ? "leftside-boxchat  leftside-boxchat-background"
                        : "leftside-boxchat"
                    }
                    key={user._id}
                  >
                    <div className="leftside-boxchat-avatar">
                      <img src={user.avatar} alt={user.avatar} />
                      {online.data!.find((obj) => obj === user._id) ? (
                        <div
                          className="leftside-boxchat-online-icon"
                          key={user._id}
                        >
                          <RxDotFilled />
                        </div>
                      ) : null}
                    </div>

                    {obj.isRead === false &&
                    obj.recipients[1]._id === auth.user!._id ? (
                      <div>
                        <div className="leftside-boxchat-username leftside-boxchat-new-msg">
                          {user.fullname}
                        </div>
                        <div className="d-flex">
                          {obj.lastMessages !== "" ? (
                            <div
                              className="leftside-boxchat-online leftside-boxchat-new-msg"
                              key={user._id}
                            >
                              {obj.lastMessages.length > 20
                                ? obj.lastMessages.slice(0, 20) + "..."
                                : obj.lastMessages}
                            </div>
                          ) : (
                            <div
                              className="leftside-boxchat-online leftside-boxchat-new-msg"
                              key={user._id}
                            >
                              Sent you a message
                            </div>
                          )}

                          <div className="leftside-boxchat-online ms-2">
                            {getTimesToWeekAgoString(obj.updatedAt)}
                          </div>
                          <div className="leftside-boxchat-new-msg-icon"></div>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="leftside-boxchat-username">
                          {user.fullname}
                        </div>
                        {online.data!.find((obj) => obj === user._id) ? (
                          <div
                            className="leftside-boxchat-online"
                            key={user._id}
                          >
                            Active now
                          </div>
                        ) : (
                          <div
                            className="leftside-boxchat-online"
                            key={user._id}
                          >
                            Offline
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ) : null
              )}
            </Link>
          ))}
      </div>
    </div>
  );
};
export default LeftSide;
