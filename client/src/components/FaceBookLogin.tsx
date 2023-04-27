import React, { useEffect, useState } from "react";
import { AiFillFacebook } from "react-icons/ai";
import OAuth2Login from "react-simple-oauth2-login";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginFacebookUser } from "../redux/features/authSlice";
import { setInfoFaceBook } from "../redux/features/infoFacebookSlice";
import { FaceBookLoginProps } from "../utils/interface";

const FaceBookLogin: React.FC<FaceBookLoginProps> = ({ title }) => {
  const [faceBookId, setFaceBookId] = useState<string | null>(null);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { auth } = useSelector((state: RootState) => state);
  const { user, message } = auth;

  useEffect(() => {
    if (user) {
      navigate("/");
    } else {
      navigate("");
    }
  }, [user, navigate]);
  const onSuccess = async (response: Record<string, any>) => {
    const accessToken = response.access_token;
    const profileResponse = await fetch(
      `https://graph.facebook.com/me?fields=id,name,email,picture,link&access_token=${accessToken}`
    );
    const profileData = await profileResponse.json();

    dispatch(loginFacebookUser({ faceBookId: profileData.id }));
    dispatch(setInfoFaceBook(profileData));
    setFaceBookId(profileData.id);
  };
  const onFailure = (response: Error) => console.error(response);
  useEffect(() => {
    if (faceBookId !== null && message === "This user does not exist.") {
      navigate(`/signup/${faceBookId}`);
    }
  }, [faceBookId, message, navigate]);
  return (
    <>
      <OAuth2Login
        buttonText={title}
        authorizationUrl="https://www.facebook.com/dialog/oauth"
        responseType="token"
        clientId="219669547363948"
        redirectUri="https://instagram-mern-typescript.vercel.app"
        onSuccess={onSuccess}
        onFailure={onFailure}
      />
    </>
  );
};

export default FaceBookLogin;
