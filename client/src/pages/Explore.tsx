import React, { useEffect, useState } from "react";
import { FaComment } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import Helmet from "../components/Helmet";
import { getCommentsByPost } from "../redux/features/commentSlice";
import {
  setIsPostGlobalState,
  setPostModalId,
} from "../redux/features/GlobalStateSlice";
import { getExplorePosts, getPost } from "../redux/features/postSlice";
import { AppDispatch, RootState } from "../redux/store";
import loading from "../images/loading.gif";

const Explore: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const dispatch: AppDispatch = useDispatch();
  const { post } = useSelector((state: RootState) => state);
  const { message } = post;

  useEffect(() => {
    dispatch(getExplorePosts());
  }, [dispatch]);
  const handlePostModal = async (id: string) => {
    await dispatch(getCommentsByPost(id));
    dispatch(setIsPostGlobalState());
    dispatch(setPostModalId(id));
  };
  useEffect(() => {
    if (message === "post/get-explore-post success") {
      setIsLoading(false);
    }
  }, [message]);
  return (
    <Helmet title="Instagram">
      {isLoading ? (
        <div className="explore-page-container absolute-center">
          <img
            src={loading}
            alt={loading}
            style={{ height: "2rem", width: "2rem" }}
          />
        </div>
      ) : (
        <div className="explore-page-container">
          <div className="posts-list-container">
            {post.data!.length > 0 ? (
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
                      <div className="commets-counts">
                        {value.comments?.length}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-uppercase fs-2">no post</div>
            )}
          </div>
        </div>
      )}
    </Helmet>
  );
};
export default Explore;
