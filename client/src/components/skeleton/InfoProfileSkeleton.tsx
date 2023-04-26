import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const InfoProfileSkeleton: React.FC = () => {
  return (
    <>
      <div className="d-flex">
        <Skeleton
          circle={true}
          height={144}
          width={144}
          style={{ marginRight: "6rem" }}
        />
        <div>
          <div className="d-flex mb-3">
            <Skeleton height={20} width={100} className="me-3" />
            <Skeleton height={20} width={100} className="me-3" />
          </div>
          <div className="d-flex">
            <Skeleton height={20} width={100} className="me-3" />
            <Skeleton height={20} width={100} className="me-3" />
            <Skeleton height={20} width={100} className="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoProfileSkeleton;
