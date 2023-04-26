import React from "react";
import { YourMessagesIcon } from "../Icons";
import { setIsCreateConversationGlobalState } from "../../redux/features/GlobalStateSlice";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";

const RightSide: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  return (
    <div className="messages-rightside-container absolute-center">
      <div className="flex-column">
        <div className="absolute-center mb-3">
          <YourMessagesIcon />
        </div>
        <div className="absolute-center rightside-big-text">Your Message</div>
        <div className="absolute-center rightside-small-text mb-4">
          Send private photos and messages to a friend or group.
        </div>
        <div className="absolute-center">
          <button
            className="rightside-btn"
            onClick={() => dispatch(setIsCreateConversationGlobalState())}
          >
            Send Messages
          </button>
        </div>
      </div>
    </div>
  );
};
export default RightSide;
