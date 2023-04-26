import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import loading from "../../images/loading.gif";
const PostHomeSkeleton: React.FC = () => {
  return (
    <>
      <div className="absolute-center mb-3 w-100">
        <img
          src={loading}
          alt={loading}
          style={{ height: "2rem", width: "2rem" }}
        />
      </div>
      <div className="d-flex">
        <Skeleton circle={true} height={50} width={50} />
        <Skeleton height={20} width={100} className="ms-3 mt-3" />
      </div>
      <Skeleton height={360} width={480} className="mt-3" />
    </>
  );
};

export default PostHomeSkeleton;
