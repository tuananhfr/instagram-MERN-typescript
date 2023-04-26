import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { setIsEditPostGlobalState } from "../redux/features/GlobalStateSlice";
import { updatePost } from "../redux/features/postSlice";
import { AppDispatch, RootState } from "../redux/store";
import { EmojiIcon } from "./Icons";

import { useFormik } from "formik";
import * as yup from "yup";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

let schema = yup.object().shape({
  content: yup.string().required("Content is Required"),
});
const EditPost: React.FC = () => {
  const [emoji, setEmoji] = useState<boolean>(false);
  const [idP, setIdP] = useState<string>("");

  const { auth } = useSelector((state: RootState) => state);

  const { post } = useSelector((state: RootState) => state);
  const { socket } = useSelector((state: RootState) => state);

  const { globalState } = useSelector((state: RootState) => state);
  const dispatch: AppDispatch = useDispatch();
  const { isEditPostGlobalState, postModalId } = globalState;

  const filteredPost = post.data.find((value) => value._id === postModalId);

  const initialValues = {
    content: "",
  };
  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit: (values) => {
      const formData = { ...values, id: idP };
      dispatch(updatePost(formData)).then((response) => {
        // Get the created comment from the server response
        const newComment = response.payload;

        socket.data!.emit("updatePost", newComment);
      });

      dispatch(setIsEditPostGlobalState());
    },
  });
  useEffect(() => {
    if (
      filteredPost?.content &&
      filteredPost.content !== formik.initialValues.content
    ) {
      formik.initialValues.content = filteredPost.content;
      setIdP(filteredPost._id);
    }
  }, [
    filteredPost?._id,
    filteredPost?.content,
    formik.initialValues,
    formik.initialValues.content,
  ]);

  const handleEmojiClick = (emojiData: EmojiClickData, event: MouseEvent) => {
    formik.setFieldValue("content", formik.values.content + emojiData.emoji);
  };

  const handleCloseModal = () => {
    dispatch(setIsEditPostGlobalState());
    formik.resetForm();
  };
  return (
    <>
      {isEditPostGlobalState && (
        <div className="edit_profile absolute-center">
          <button
            title="close"
            className="btn_close"
            onClick={() => handleCloseModal()}
          >
            <AiOutlineClose
              style={{
                width: "1.5rem",
                height: "1.5rem",
                fill: "white",
              }}
            />
          </button>
          <form
            onSubmit={formik.handleSubmit}
            className="flex-column"
            style={{
              maxWidth: "60%",
              maxHeight: "80%",
              height: "100%",
              width: "100%",
              backgroundColor: "white",
              paddingTop: "1rem",
              borderRadius: "0.5rem",
              margin: "6rem auto",
            }}
          >
            <div
              className="absolute-center"
              style={{
                padding: "0 1rem 0.5rem  1rem",
                borderBottom: "1px solid #dbdbdb",
              }}
            >
              <span
                className="post-modal-btn-cancel"
                onClick={() => handleCloseModal()}
              >
                Cancel
              </span>
              <span
                className="absolute-center w-100"
                style={{
                  fontWeight: "600",
                  lineHeight: "1.5px",
                }}
              >
                Edit info
              </span>
              <button type="submit" className="post-btn">
                Done
              </button>
            </div>
            <div className="d-flex w-100 h-100 ">
              <div
                style={{
                  width: "66%",
                }}
              >
                {" "}
                <Swiper
                  navigation={true}
                  modules={[Navigation]}
                  className="mySwiper absolute-center "
                >
                  {filteredPost!.images.map((image, index) => (
                    <SwiperSlide key={index}>
                      <img src={image} alt={image} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <div
                className="px-3 pt-3"
                style={{
                  width: "34%",
                  backgroundColor: "white",
                }}
              >
                <div className="d-flex mb-3">
                  <div
                    className="user-image-wrapper absolute-center icon "
                    style={{ cursor: "pointer" }}
                  >
                    <img src={auth.user?.avatar} alt={auth.user?.username} />
                  </div>
                  <span
                    className="ms-3 mt-2"
                    style={{
                      fontSize: "0.9rem",
                      fontWeight: "600",
                      lineHeight: "1.2rem",
                      cursor: "pointer",
                    }}
                  >
                    {auth.user?.username}
                  </span>
                </div>
                <textarea
                  maxLength={2200}
                  className="w-100 h-25"
                  name="content"
                  placeholder="Write a caption..."
                  value={formik.values.content}
                  onChange={formik.handleChange("content")}
                />

                <div
                  style={{
                    position: "relative",
                  }}
                >
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => setEmoji(!emoji)}
                  >
                    <EmojiIcon className="mb-2" />
                  </span>
                  {emoji ? (
                    <EmojiPicker onEmojiClick={handleEmojiClick} />
                  ) : null}
                  <span className="length-content ">
                    {formik.values.content.length}/2200
                  </span>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default EditPost;
