import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const SuggestionUserSkeleton: React.FC = () => {
  const arrayCount = Array(5).fill(1);

  return (
    <>
      {arrayCount.map((val, index) => (
        <div className="d-flex mt-3" key={index}>
          <Skeleton circle={true} height={40} width={40} />
          <div className="ms-3">
            <Skeleton height={10} width={100} />
            <Skeleton height={10} width={100} />
          </div>
        </div>
      ))}
    </>
  );
};

export default SuggestionUserSkeleton;
