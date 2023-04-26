import jwt from "jsonwebtoken";

const generateRefreshToken = (id: Object) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as any, {
    expiresIn: "3d",
  });
};

export default generateRefreshToken;
