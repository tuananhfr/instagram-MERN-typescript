import jwt from "jsonwebtoken";

const generateToken = (id: Object) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN as any, {
    expiresIn: "1d",
  });
};

export default generateToken;
