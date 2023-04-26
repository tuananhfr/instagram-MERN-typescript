import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPost } from "../../redux/features/postSlice";
import { getUser } from "../../redux/features/userSlice";
import { AppDispatch, RootState } from "../../redux/store";
import Post from "./Post";
import { getComments } from "../../redux/features/commentSlice";
import PostHomeSkeleton from "../skeleton/PostHomeSkeleton";

const PostList: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch: AppDispatch = useDispatch();
  const { auth } = useSelector((state: RootState) => state);
  const { user } = useSelector((state: RootState) => state);
  const { post } = useSelector((state: RootState) => state);
  const { message } = post;

  useEffect(() => {
    dispatch(getPost());
    dispatch(getComments());
    if (user.data === null) {
      dispatch(getUser(auth.user!.username));
    }
  }, [auth.user, dispatch, user.data]);
  useEffect(() => {
    if (message === "post/get-current-post success") {
      setIsLoading(false);
    }
  }, [message]);
  return (
    <div>
      {isLoading ? (
        <PostHomeSkeleton />
      ) : post.data.length > 0 ? (
        post.data!.map((value) => <Post post={value} key={value._id} />)
      ) : (
        <div className="absolute-center text-uppercase fs-3">no post</div>
      )}
    </div>
  );
};

export default PostList;
