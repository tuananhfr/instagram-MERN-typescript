import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const StorySkeleton: React.FC = () => {
  const arrayCount = Array(6).fill(1);
  return (
    <div className="align-center">
      {arrayCount.map((val, index) => (
        <div className="story-wrapper" key={index}>
          <div className="story-profile-image-skeleton">
            <Skeleton circle={true} height={50} width={50} />
          </div>
          <div className="username-wrapper">
            <Skeleton />
          </div>
        </div>
      ))}
    </div>
  );
};

export default StorySkeleton;
