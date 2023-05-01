import jwt from "jsonwebtoken";

const generateToken = (id: Object) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN as any, {
    expiresIn: "2h",
  });
};

export default generateToken;
