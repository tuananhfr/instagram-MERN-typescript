import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { AiOutlineClose } from "react-icons/ai";
import { setCallGlobalState } from "../redux/features/GlobalStateSlice";
import { createMessage } from "../redux/features/messagesSlice";
import {
  BsCameraVideoFill,
  BsCameraVideoOffFill,
  BsFillMicMuteFill,
  BsFillMicFill,
} from "react-icons/bs";
import { MdCallEnd, MdCall } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { createCall } from "../redux/features/callSlice";
import RingRing from "../audio/RingRing.mp3";

const Call: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { globalState } = useSelector((state: RootState) => state);
  const { auth, call, socket, peer } = useSelector((state: RootState) => state);

  const { isCallGlobalState } = globalState;
  const [answer, setAnswer] = useState(false);
  const [total, setTotal] = useState<number>(0);

  const [tracks, setTracks] = useState<MediaStreamTrack[] | null>(null);

  const location = useLocation();
  const yourVideo = useRef<HTMLVideoElement>(null);
  const otherVideo = useRef<HTMLVideoElement>(null);

  // Set Time
  useEffect(() => {
    if (answer === false && isCallGlobalState) {
      const intervalId = setInterval(() => {
        setTotal((total) => total + 1);
      }, 1000);

      return () => {
        clearInterval(intervalId);
        setTotal(0);
      };
    }
  }, [answer, isCallGlobalState]);

  useEffect(() => {
    if (total === 30) {
      handleEndCall();
    }
  }, [total]);

  // Play - Pause Audio
  const playAudio = (newAudio: HTMLAudioElement) => {
    newAudio.play();
  };

  const pauseAudio = (newAudio: HTMLAudioElement) => {
    newAudio.pause();
  };

  useEffect(() => {
    let newAudio = new Audio(RingRing);

    if (answer === false && isCallGlobalState) {
      playAudio(newAudio);
    } else {
      pauseAudio(newAudio);
    }

    return () => pauseAudio(newAudio);
  }, [answer, isCallGlobalState]);

  // End Call
  const handleEndCall = () => {
    tracks && tracks.forEach((track) => track.stop());

    dispatch(setCallGlobalState());
    dispatch(
      createMessage({
        conversation: location.pathname.split("/")[2],
        sender: call.data!.sender._id,
        recipient: call.data!.recipient._id,
        text: "",
        media: "",
        call: {
          start: "",
          end: new Date().toISOString(),
          video: call.data!.video,
          audio: call.data!.audio,
        },
      })
    ).then((response) => {
      if (response.payload.sender._id === auth.user!._id) {
        socket.data!.emit("createMessage", response.payload);
      } else {
        socket.data!.emit("createMessage", {
          ...response.payload,
          recipient: response.payload.sender,
        });
      }
    });
    socket.data!.emit("endCall", {
      ...call.data!,
      sender:
        call.data!.sender._id === auth.user!._id
          ? call.data!.sender
          : call.data!.recipient,
      recipient:
        call.data!.sender._id === auth.user!._id
          ? call.data!.recipient
          : call.data!.sender,
    });
    setAnswer(false);
  };

  // Socket End Call
  useEffect(() => {
    if (socket.data) {
      socket.data!.on("endCallToClient", (data) => {
        tracks && tracks.forEach((track) => track.stop());
        setAnswer(false);

        dispatch(setCallGlobalState());
      });

      return () => {
        socket.data!.off("endCallToClient");
      };
    }
  }, [socket, dispatch, tracks]);

  //Handle Answer
  const handleAnswer = () => {
    openStream(call.data!.video, call.data!.audio).then((stream) => {
      if (yourVideo!.current) {
        playStream(yourVideo!.current, stream);
      }
      const track = stream.getTracks();
      setTracks(track);
      if (call.data!.peerId) {
        const newCall = peer.data!.call(call.data!.peerId, stream);
        newCall.on("stream", function (remoteStream) {
          playStream(otherVideo.current, remoteStream);
        });
      }
    });
    setAnswer(true);
  };

  useEffect(() => {
    if (peer.data!) {
      peer.data!.on("call", (newCall) => {
        openStream(call.data!.video, call.data!.audio).then((stream) => {
          if (yourVideo!.current) {
            playStream(yourVideo!.current, stream);
          }
          const track = stream.getTracks();
          setTracks(track);
          newCall.answer(stream);
          newCall.on("stream", function (remoteStream) {
            playStream(otherVideo!.current, remoteStream);
          });
        });
        setAnswer(true);
        // setNewCall(newCall)
      });
      return () => {
        peer.data!.removeListener("call");
      };
    }
  }, [call.data, peer.data]);
  // Stream Media

  const openStream = (video: boolean, audio: boolean) => {
    const config = { audio: audio, video: video };
    return navigator.mediaDevices.getUserMedia(config);
  };

  const playStream = (
    tag: HTMLVideoElement | null,
    stream: MediaStream | null
  ): void => {
    let video = tag;
    video!.srcObject = stream;
    video!.play();
  };
  // Disconnected

  useEffect(() => {
    if (socket.data) {
      socket.data!.on("callerDisconnect", () => {
        tracks && tracks.forEach((track) => track.stop());
        setAnswer(false);
        dispatch(setCallGlobalState());
        dispatch(
          createMessage({
            conversation: location.pathname.split("/")[2],
            sender: call.data!.sender._id,
            recipient: call.data!.recipient._id,
            text: "",
            media: "",
            call: {
              start: "",
              end: new Date().toISOString(),
              video: call.data!.video,
              audio: call.data!.audio,
            },
          })
        );
        call.data!.sender._id === auth.user!._id
          ? alert(`${call.data!.recipient.fullname} disconnected!`)
          : alert(`${call.data!.sender.fullname} disconnected!`);
      });

      return () => {
        socket.data!.off("callerDisconnect");
      };
    }
  }, [call.data, dispatch, location.pathname, socket.data, tracks]);

  //

  // const handleStream = () => {
  //   dispatch(createCall({ ...call.data!, video: !call.data!.video }));
  //   handleAnswer;
  // };

  return (
    <>
      {isCallGlobalState && call.data! && (
        <div className="edit_profile absolute-center">
          <button title="close" className="btn_close" onClick={handleEndCall}>
            <AiOutlineClose
              style={{
                width: "1.5rem",
                height: "1.5rem",
                fill: "white",
              }}
            />
          </button>

          {answer ? (
            call.data!.video === true ? (
              <div className="call-wrapper">
                <video
                  ref={yourVideo}
                  className="call-your-video"
                  playsInline
                  muted
                />
                <video
                  ref={otherVideo}
                  className="call-other-video"
                  playsInline
                />

                <div className="call-icon">
                  {/* <div className="call-icon-camera call-icon-mic absolute-center">
                    <BsCameraVideoFill />
                  </div> */}

                  {/* {call.data!.audio ? (
                    <div className="call-icon-camera call-icon-mic absolute-center">
                      <BsFillMicFill onClick={handleAnswer} />
                    </div>
                  ) : (
                    <div className="call-icon-camera absolute-center">
                      <BsFillMicMuteFill onClick={handleAnswer} />
                    </div>
                  )} */}
                  <div
                    className="call-icon-camera call-icon-end absolute-center"
                    onClick={handleEndCall}
                  >
                    <MdCallEnd />
                  </div>
                </div>
              </div>
            ) : (
              <div className="call-wrapper">
                <audio ref={otherVideo} playsInline />
                <div className="absolute-center flex-column w-100">
                  {call.data!.sender._id === auth.user!._id ? (
                    <>
                      <div className="call-avatar absolute-center">
                        <img
                          src={call.data!.recipient.avatar}
                          alt={call.data!.recipient.avatar}
                        />
                      </div>
                      <div className="call-username">
                        {call.data!.recipient.fullname}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="call-avatar absolute-center">
                        <img
                          src={call.data!.sender.avatar}
                          alt={call.data!.sender.avatar}
                        />
                      </div>
                      <div className="call-username">
                        {call.data!.sender.fullname}
                      </div>
                    </>
                  )}
                  <div className="call-text">Calling ...</div>
                </div>
                <div className="call-icon">
                  {/* <div className="call-icon-camera absolute-center">
                    <BsCameraVideoOffFill onClick={handleAnswer} />
                  </div> */}

                  {/* {call.data!.audio ? (
                    <div className="call-icon-camera call-icon-mic absolute-center">
                      <BsFillMicFill onClick={handleAnswer} />
                    </div>
                  ) : (
                    <div className="call-icon-camera call-icon-mic absolute-center">
                      <BsFillMicMuteFill onClick={handleAnswer} />
                    </div>
                  )} */}
                  <div
                    className="call-icon-camera call-icon-end absolute-center"
                    onClick={handleEndCall}
                  >
                    <MdCallEnd />
                  </div>
                </div>
              </div>
            )
          ) : call.data!.sender._id === auth.user!._id ? (
            <div className="call-wrapper">
              <div className="absolute-center flex-column w-100">
                <div className="call-avatar absolute-center">
                  <img
                    src={call.data!.recipient.avatar}
                    alt={call.data!.recipient.avatar}
                  />
                </div>
                <div className="call-username">
                  {call.data!.recipient.fullname}
                </div>
                <div className="call-text">Calling ...</div>
              </div>
              <div className="call-icon">
                {/* {call.data!.video ? (
                  <div className="call-icon-camera call-icon-mic absolute-center">
                    <BsCameraVideoFill />
                  </div>
                ) : (
                  <div className="call-icon-camera absolute-center">
                    <BsCameraVideoOffFill />
                  </div>
                )}

                <div className="call-icon-camera call-icon-mic absolute-center">
                  <BsFillMicFill />
                </div> */}
                <div
                  className="call-icon-camera call-icon-end absolute-center"
                  onClick={handleEndCall}
                >
                  <MdCallEnd />
                </div>
              </div>
            </div>
          ) : (
            <div className="call-wrapper">
              <div className="absolute-center flex-column w-100">
                <div className="call-avatar absolute-center">
                  <img
                    src={call.data!.sender.avatar}
                    alt={call.data!.sender.avatar}
                  />
                </div>
                <div className="call-username">
                  {call.data!.sender.fullname}
                </div>
                <div className="call-text">Calling ...</div>
              </div>

              <div
                className="call-icon-camera call-icon-refuse call-icon-end absolute-center"
                onClick={handleEndCall}
              >
                <MdCallEnd />
              </div>

              {call.data!.video ? (
                <div className="call-icon-camera call-icon-accept absolute-center ">
                  <BsCameraVideoFill onClick={handleAnswer} />
                </div>
              ) : (
                <div className="call-icon-camera call-icon-accept absolute-center ">
                  <MdCall onClick={handleAnswer} />
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};
export default Call;
