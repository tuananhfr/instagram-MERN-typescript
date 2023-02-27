import React from "react";

import Helmet from "../components/Helmet";

import Story from "../components/Story";

const Home: React.FC = () => {
  return (
    <Helmet title="Instagram">
      <div className="story-post-wrapper">
        <Story />
        Home
      </div>
    </Helmet>
  );
};
export default Home;
