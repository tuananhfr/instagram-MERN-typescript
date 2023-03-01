import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import authRouter from "./routes/authRouter";
import userRouter from "./routes/userRouter";
import uploadImgRouter from "./routes/uploadImgRouter";
import morgan from "morgan";
import dbConnect from "./config/dbConnect";

const app = express();
dotenv.config();
const PORT: string | number = process.env.PORT || 4000;

dbConnect();
app.use(morgan("dev"));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/upload", uploadImgRouter);

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
