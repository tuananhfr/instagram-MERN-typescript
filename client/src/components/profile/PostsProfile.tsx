import React, { useState, useEffect } from "react";
import { FaComment } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsPostGlobalState,
  setPostModalId,
} from "../../redux/features/GlobalStateSlice";
import { AppDispatch, RootState } from "../../redux/store";
import PostsProfileSkeleton from "../skeleton/PostsProfileSkeleton";

const PostsProfile = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { post } = useSelector((state: RootState) => state);
  const { message } = post;
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    if (message === "post/get-user-post success") {
      setIsLoading(false);
    }
  }, [message]);

  const handlePostModal = (id: string) => {
    dispatch(setIsPostGlobalState());
    dispatch(setPostModalId(id));
  };
  return (
    <div className="posts-list-container">
      {isLoading ? (
        <PostsProfileSkeleton />
      ) : post.data!.length > 0 ? (
        post.data?.map((value) => (
          <div
            className="explore-post-container cur-point"
            key={value._id}
            onClick={() => handlePostModal(value._id)}
          >
            <div className="explore-post-image">
              <img src={value.images[0]} alt={value.images[0]} />
            </div>
            <div className="like-comments-wrapper ">
              <div className="like-wrapper align-center">
                <div className="like-icon absolute-center">
                  <FiHeart
                    style={{ width: "85%", height: "85%", fill: "white" }}
                  />
                </div>
                <div className="like-counts">{value.likes.length}</div>
              </div>
              <div className="comments-wrapper align-center">
                <div className="comments-icon absolute-center ">
                  <FaComment
                    style={{ width: "85%", height: "85%", fill: "white" }}
                  />
                </div>
                <div className="commets-counts">{value.comments?.length}</div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-uppercase fs-4 mt-3">no post</div>
      )}
    </div>
  );
};

export default PostsProfile;
