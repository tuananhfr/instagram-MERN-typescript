import React from "react";

import Helmet from "../components/Helmet";
import PostList from "../components/home/PostList";
import SuggestionUser from "../components/home/SuggestionUser";

import Story from "../components/Story";

const Home: React.FC = () => {
  return (
    <Helmet title="Instagram">
      <div className="home-wrapper">
        <div>
          <div className="story-post-wrapper">
            <Story />
          </div>
          <div className="post-wrapper">
            <PostList />
          </div>
        </div>
        <div className="suggestion-wrapper">
          <SuggestionUser />
        </div>
      </div>
    </Helmet>
  );
};
export default Home;
