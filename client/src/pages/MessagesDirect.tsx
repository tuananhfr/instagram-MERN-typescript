import React, { useEffect } from "react";
import LeftSide from "../components/messages/LeftSide";
import RightSide from "../components/messages/RightSide";
import Helmet from "../components/Helmet";

const MessagesDirect: React.FC = () => {
  return (
    <Helmet title="Inbox • Direct">
      <div className="messages-wrapper">
        <div className="messages-container">
          <LeftSide />
          <RightSide />
        </div>
      </div>
    </Helmet>
  );
};
export default MessagesDirect;
