import React, { useEffect, useState } from "react";
import StorySkeleton from "./skeleton/StorySkeleton";
import { FaUserAlt } from "react-icons/fa";

// interface Story {
//   media: string;
//   user: {
//     avatar: string;
//     username: string;
//   };
// }

// interface StoriesProps {
//   stories: Story[];
// }
const allUsers = [
  {
    media: "https://example.com/story1.jpg",
    user: {
      avatar: "https://example.com/user1.jpg",
      username: "user1",
    },
  },
  {
    media: "https://example.com/story2.jpg",
    user: {
      avatar: "https://example.com/user2.jpg",
      username: "user2",
    },
  },
  {
    media: "https://example.com/story3.jpg",
    user: {
      avatar: "https://example.com/user3.jpg",
      username: "user3",
    },
  },
  {
    media: "https://example.com/story4.jpg",
    user: {
      avatar: "https://example.com/user4.jpg",
      username: "user4",
    },
  },
  {
    media: "https://example.com/story5.jpg",
    user: {
      avatar: "https://example.com/user5.jpg",
      username: "user5",
    },
  },
  {
    media: "https://example.com/story5.jpg",
    user: {
      avatar: "https://example.com/user5.jpg",
      username: "user5",
    },
  },
  {
    media: "https://example.com/story5.jpg",
    user: {
      avatar: "https://example.com/user5.jpg",
      username: "user5",
    },
  },
  {
    media: "https://example.com/story5.jpg",
    user: {
      avatar: "https://example.com/user5.jpg",
      username: "user5",
    },
  },
  {
    media: "https://example.com/story5.jpg",
    user: {
      avatar: "https://example.com/user5.jpg",
      username: "user5",
    },
  },
  {
    media: "https://example.com/story5.jpg",
    user: {
      avatar: "https://example.com/user5.jpg",
      username: "user5",
    },
  },
  {
    media: "https://example.com/story5.jpg",
    user: {
      avatar: "https://example.com/user5.jpg",
      username: "user5",
    },
  },
  {
    media: "https://example.com/story5.jpg",
    user: {
      avatar: "https://example.com/user5.jpg",
      username: "user10",
    },
  },
];
const Stories: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setLoading(false);
  }, [setLoading]);
  return (
    <div className="story-container align-center">
      {loading ? (
        <StorySkeleton />
      ) : (
        allUsers.map((users, index) => (
          <div className="story-wrapper" key={index}>
            <div className="story-profile-image">
              <FaUserAlt
                style={{ width: "100%", height: "100%", fill: "white" }}
              />
            </div>
            <div className="username-wrapper">{users.user.username}</div>
          </div>
        ))
      )}
    </div>
  );
};

export default Stories;
