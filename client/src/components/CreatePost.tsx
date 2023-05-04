import { useState, useEffect, useRef, createRef } from "react";
import { AiOutlineCamera, AiOutlineClose } from "react-icons/ai";
import { useFormik } from "formik";
import * as yup from "yup";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../redux/store";
import { setIsUploadGlobalState } from "../redux/features/GlobalStateSlice";
import { EmojiIcon, UploadImg } from "./Icons";
import { deleteImgPost, uploadImgPost } from "../redux/features/uploadImgSlice";
import { createPost } from "../redux/features/postSlice";
import { createNotification } from "../redux/features/notificationSlice";
import Load from "../images/loading.gif";
import { setCreatePost } from "../redux/features/authSlice";

let schema = yup.object().shape({
  content: yup.string().required("Content is Required"),
});
const CreatePost: React.FC = () => {
  const { auth } = useSelector((state: RootState) => state);
  const { upload } = useSelector((state: RootState) => state);
  const { message } = upload;
  const { socket } = useSelector((state: RootState) => state);

  const { globalState } = useSelector((state: RootState) => state);

  const { isUploadGlobalState } = globalState;
  const dispatch: AppDispatch = useDispatch();
  const ref = createRef<HTMLInputElement>();
  const videoRef = useRef<HTMLVideoElement>(null);
  const refCanvas = useRef<HTMLCanvasElement>(null);
  const handleClick = () => {
    ref.current?.click();
  };

  const [images, setImages] = useState<string[]>([]);
  const [emoji, setEmoji] = useState<boolean>(false);
  const [tracks, setTracks] = useState<MediaStreamTrack | null>(null);
  const [stream, setStream] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    if (message === "upload/upload-images-post pedding") {
      setLoading(true);
    }
  }, [message]);

  useEffect(() => {
    if (
      upload.images[0] !== undefined &&
      message === "upload/upload-images-post success"
    ) {
      const urls = upload.images.map((image) => image.url);
      setImages(urls);
    }
  }, [upload.images, message]);

  const uploadImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList: FileList = e.target.files!;
    const filesArray: File[] = Array.from(fileList);
    dispatch(uploadImgPost(filesArray)).then((response) => {
      if (response.payload) {
        setLoading(false);
      }
    });
  };

  const formik = useFormik({
    initialValues: {
      content: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createPost({ ...values, images })).then((response) => {
        // Get the created comment from the server response
        const newPost = response.payload;
        dispatch(setCreatePost(newPost._id));

        dispatch(
          createNotification({
            id: newPost._id,
            recipients: [...newPost.user.followers],
            images: newPost.images[0],
            url: `/${newPost.user.username}/${newPost._id}`,
            content: `posted: "${newPost.content}"`,
            user: newPost.user._id,
          })
        ).then((response) => {
          socket.data!.emit("createNotify", response.payload);
        });

        // socket.data!.emit("createComment", newComment);
      });
      if (stream) {
        handleStopStream();
      }
      dispatch(setIsUploadGlobalState());
      formik.resetForm();
      setImages([]);
    },
  });

  const handleEmojiClick = (emojiData: EmojiClickData, event: MouseEvent) => {
    formik.setFieldValue("content", formik.values.content + emojiData.emoji);
  };

  const handleStream = () => {
    setStream(true);
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((mediaStream) => {
          videoRef.current!.srcObject = mediaStream;
          videoRef.current!.play();

          const track = mediaStream.getTracks();
          setTracks(track[0]);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleCapture = () => {
    const width = videoRef.current!.clientWidth;
    const height = videoRef.current!.clientHeight;

    refCanvas.current!.setAttribute("width", String(width));
    refCanvas.current!.setAttribute("height", String(height));

    const ctx = refCanvas.current!.getContext("2d");
    if (videoRef.current) {
      ctx!.drawImage(videoRef.current, 0, 0, width, height);
      let URL = refCanvas.current!.toDataURL();
      setImages(
        [...images, URL].map((item) =>
          typeof item === "string" ? item : JSON.stringify(item)
        )
      );
    }
  };

  const handleStopStream = () => {
    tracks!.stop();
    setStream(false);
  };

  const handleDeleteImages = (index: number) => {
    if (upload.images.length > 0) {
      dispatch(deleteImgPost(upload.images[index].public_id));
    }
    const newArr = [...images];
    newArr.splice(index, 1);
    setImages(newArr);
  };
  const handleCloseModal = () => {
    dispatch(setIsUploadGlobalState());
    if (stream) {
      handleStopStream();
    }
    formik.resetForm();
    setImages([]);
  };
  return (
    <>
      {isUploadGlobalState && (
        <div className="edit_profile">
          <button
            title="close"
            className="btn_close"
            onClick={handleCloseModal}
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
              borderRadius: "5px",
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
                className="absolute-center w-100"
                style={{
                  fontWeight: "600",
                  lineHeight: "1.5px",
                }}
              >
                Create new post
              </span>
              <button
                type="submit"
                className={
                  images.length > 0 && formik.values.content
                    ? "post-btn"
                    : "post-btn-disabled"
                }
                disabled={
                  images.length > 0 && formik.values.content ? false : true
                }
              >
                Share
              </button>
            </div>
            <div className="d-flex w-100 h-100">
              <div
                style={{
                  width: "66%",
                }}
              >
                {images.length > 0 && stream === false ? (
                  <Swiper
                    navigation={true}
                    modules={[Navigation]}
                    className="mySwiper absolute-center"
                    style={{
                      borderRight: "1px solid #dbdbdb",
                    }}
                  >
                    {images.map((image, index) => (
                      <SwiperSlide key={index} className="stream">
                        <span>
                          <button
                            type="button"
                            className="btn-close bg-white"
                            aria-label="Close"
                            onClick={() => handleDeleteImages(index)}
                          ></button>
                        </span>
                        <img src={image} alt={image} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                ) : (
                  <div
                    className="flex-column change-avatar-btn absolute-center w-100 h-100"
                    style={{
                      borderRight: "1px solid #dbdbdb",
                    }}
                  >
                    <UploadImg />

                    {stream && (
                      <div className="stream position-relative">
                        <span>
                          <button
                            type="button"
                            className="btn-close bg-white"
                            aria-label="Close"
                            onClick={handleStopStream}
                          ></button>
                        </span>
                        <video
                          autoPlay
                          muted
                          ref={videoRef}
                          width="100%"
                          height="100%"
                        />

                        <canvas ref={refCanvas} style={{ display: "none" }} />
                      </div>
                    )}
                    <div className="input_images">
                      {stream ? (
                        <div style={{ position: "relative" }}>
                          <span className="number-img-stream">
                            {images.length}
                          </span>
                          <AiOutlineCamera
                            className="mt-3"
                            style={{
                              width: "2.5rem",
                              height: "2.5rem",
                              cursor: "pointer",
                              color: "black",
                            }}
                            onClick={handleCapture}
                          />
                        </div>
                      ) : (
                        <div style={{ position: "relative" }}>
                          <span className="number-img-stream">
                            {images.length}
                          </span>
                          <AiOutlineCamera
                            className="mt-3 stream-btn"
                            onClick={handleStream}
                          />
                        </div>
                      )}
                    </div>
                    <p
                      className="mt-3"
                      style={{
                        color: "#8e8e8e",
                      }}
                    >
                      Or
                    </p>
                    <p
                      role="button"
                      className="btn btn-primary mt-3 px-3"
                      onClick={handleClick}
                    >
                      Select from computer
                    </p>
                    <input
                      type="file"
                      name="file"
                      id="file_up"
                      multiple
                      accept="image/*"
                      style={{ display: "none" }}
                      ref={ref}
                      onChange={uploadImages}
                    />

                    {loading ? (
                      <img
                        src={Load}
                        alt=""
                        style={{ width: "1.2rem", height: "1.2rem" }}
                      />
                    ) : null}
                  </div>
                )}
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

export default CreatePost;
