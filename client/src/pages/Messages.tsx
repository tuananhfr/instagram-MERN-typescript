import React from "react";
import LeftSide from "../components/messages/LeftSide";
import BoxChat from "../components/messages/BoxChat";
import Helmet from "../components/Helmet";
import { useParams } from "react-router-dom";

const Messages: React.FC = () => {
  const { id } = useParams() as {
    id: string;
  };
  return (
    <Helmet title="Instagram • Direct">
      <div className="messages-wrapper">
        <div className="messages-container">
          <LeftSide />
          <BoxChat id={id} />
        </div>
      </div>
    </Helmet>
  );
};
export default Messages;
