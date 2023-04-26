import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const PostsProfileSkeleton: React.FC = () => {
  const arrayCount = Array(6).fill(1);

  return (
    <>
      {arrayCount.map((val, index) => (
        <div className="explore-post-container" key={index}>
          <Skeleton height={307} width={307} />
        </div>
      ))}
    </>
  );
};

export default PostsProfileSkeleton;
