import jwt from "jsonwebtoken";

const generateRefreshToken = (id: string) => {
  return jwt.sign({ id }, process.env.REFRESH_TOKEN as any, {
    expiresIn: "30d",
  });
};

export default generateRefreshToken;
