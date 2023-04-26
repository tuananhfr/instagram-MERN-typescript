import jwt from "jsonwebtoken";

const generateToken = (id: Object) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as any, {
    expiresIn: "1d",
  });
};

export default generateToken;
