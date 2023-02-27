import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRouter from "./routes/authRouter";
import userRouter from "./routes/userRouter";

import dbConnect from "./config/dbConnect";

const app = express();
dotenv.config();
const PORT: string | number = process.env.PORT || 4000;

dbConnect();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
