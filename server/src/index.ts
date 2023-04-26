import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import authRouter from "./routes/authRouter";
import userRouter from "./routes/userRouter";
import postRouter from "./routes/postRouter";
import commentRouter from "./routes/commentRouter";
import notificationRouter from "./routes/notificationRouter";
import conversationRouter from "./routes/conversationRouter";
import messagesRouter from "./routes/messagesRouter";

import uploadImgRouter from "./routes/uploadImgRouter";
import morgan from "morgan";
import dbConnect from "./config/dbConnect";
import { createServer } from "http";
import { Server } from "socket.io";
import SocketServer from "./socketServer";
import { ExpressPeerServer } from "peer";

const app = express();
dotenv.config();
const PORT: string | number = process.env.PORT || 4000;

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: "https://instagram-mern-typescript.vercel.app/" },
});

dbConnect();
app.use(morgan("dev"));
const corsOptions = {
  origin: "https://instagram-mern-typescript.vercel.app/",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: false,
  })
);
app.use(cookieParser());

// Socket

io.on("connection", (socket) => {
  SocketServer(socket);
});

// Create peer Server
ExpressPeerServer(httpServer, { path: "/" });

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);
app.use("/api/comment", commentRouter);
app.use("/api/notification", notificationRouter);
app.use("/api/conversation", conversationRouter);
app.use("/api/messages", messagesRouter);

app.use("/api/upload", uploadImgRouter);

httpServer.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
