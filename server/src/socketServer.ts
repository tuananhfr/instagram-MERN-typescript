import { ISocket } from "./config/interface";
import { Socket } from "socket.io";

let users: Array<ISocket> = [];
const EditData = (data: Array<ISocket>, id: string, caller: string | null) => {
  const newData = data.map((item) =>
    item.id === id && !item.caller ? { ...item, caller: caller } : item
  );
  return newData;
};
const EditData1 = (data: Array<ISocket>, id: string) => {
  const newData = data.map((item) =>
    item.id === id && item.caller ? { ...item, caller: "" } : item
  );
  return newData;
};

interface checkUserOnline {
  _id: string;
  username: string;
  fullname: string;
  avatar: string;
  auth: string;
}

const SocketServer = (socket: Socket) => {
  // Connect
  socket.on("joinUser", (data) => {
    if (data[0]) {
      const userIndex = users.findIndex((item) => item.id === data![0].auth);
      if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], socketId: socket.id };
      } else {
        users.push({
          id: data![0].auth,
          socketId: socket.id,
          online: data.map((obj: checkUserOnline) => obj._id),
        });
      }
    }
  });
  // Disconnect
  socket.on("disconnect", () => {
    const data = users.find((user) => user.socketId === socket.id);
    if (data !== undefined) {
      const checkUserOnline = users.filter((user) =>
        data!.online.filter((item) => item === user.id)
      );

      checkUserOnline.forEach((client) => {
        socket
          .to(`${client.socketId}`)
          .emit("CheckUserOfflineToClient", data!.id);
      });

      if (data.caller) {
        const callUser = users.find((user) => user.id === data.caller);
        users = EditData1(users, data.id);

        if (callUser) {
          users = EditData1(users, callUser.id);
          socket.to(`${callUser.socketId}`).emit("callerDisconnect");
        }
      }
    }

    users = users.filter((user) => user.socketId !== socket.id);
  });
  // Likes
  socket.on("likePost", (newPost) => {
    const ids = [...newPost.user.followers, newPost.user._id];
    const clients = users.filter((user) => ids.includes(user.id));

    if (clients.length > 0) {
      clients.forEach((client) => {
        socket.to(`${client.socketId}`).emit("likePostToClient", newPost);
      });
    }
  });
  // UnLikes
  socket.on("unLikePost", (newPost) => {
    const ids = [...newPost.user!.followers, newPost.user!._id];
    const clients = users.filter((user) => ids.includes(user.id));

    if (clients.length > 0) {
      clients.forEach((client) => {
        socket.to(`${client.socketId}`).emit("unLikePostToClient", newPost);
      });
    }
  });

  // Update Post
  socket.on("updatePost", (newPost) => {
    const ids = [...newPost.user!.followers, newPost.user!._id];
    const clients = users.filter((user) => ids.includes(user.id));

    if (clients.length > 0) {
      clients.forEach((client) => {
        socket.to(`${client.socketId}`).emit("updatePostToClient", newPost);
      });
    }
  });

  // Create Comment
  socket.on("createComment", (newComment) => {
    const ids = [
      ...newComment.user.followers,
      ...newComment.user.following,
      newComment.user._id,
    ];
    const clients = users.filter((user) => ids.includes(user.id));

    if (clients.length > 0) {
      clients.forEach((client) => {
        socket
          .to(`${client.socketId}`)
          .emit("createCommentToClient", newComment);
      });
    }
  });
  // Delete Comment
  socket.on("deleteComment", (newComment) => {
    const ids = [
      ...newComment.user.followers,
      ...newComment.user.following,
      ,
      newComment.user._id,
    ];
    const clients = users.filter((user) => ids.includes(user.id));

    if (clients.length > 0) {
      clients.forEach((client) => {
        socket
          .to(`${client.socketId}`)
          .emit("deleteCommentToClient", newComment);
      });
    }
  });
  // Follow
  socket.on("followUser", (data) => {
    const user = users.find((user) => user.id === data.to);
    delete data.to;

    user && socket.to(`${user.socketId}`).emit("followUserToClient", data);
  });
  // UnFollow
  socket.on("unFollowUser", (data) => {
    const user = users.find((user) => user.id === data.to);
    delete data.to;
    user && socket.to(`${user.socketId}`).emit("unFollowUserToClient", data);
  });
  // create a Notify
  socket.on("createNotify", (notify) => {
    const client = users.find((user) => notify.recipients!.includes(user.id));
    client &&
      socket.to(`${client.socketId}`).emit("createNotifyToClient", notify);
  });
  // delete a Notify
  socket.on("deleteNotify", (notify) => {
    if (notify && notify.recipients) {
      const client = users.find((user) => notify.recipients!.includes(user.id));
      client &&
        socket.to(`${client.socketId}`).emit("deleteNotifyToClient", notify);
    }
  });
  // Create a Message
  socket.on("createMessage", (msg) => {
    const user = users.find((user) => user.id === msg.recipient._id);

    user && socket.to(`${user.socketId}`).emit("createMessageToClient", msg);
  });
  // Delete a Message
  socket.on("deleteMessage", (msg) => {
    const user = users.find((user) => user.id === msg.recipient);
    user && socket.to(`${user.socketId}`).emit("deleteMessageToClient", msg);
  });
  // delete a Conversation
  socket.on("deleteConversation", (data) => {
    const dataUser = data.data.recipients.find((obj: any) => obj !== data.auth);
    const user = users.find((user) => user.id === dataUser);

    user &&
      socket
        .to(`${user.socketId}`)
        .emit("deleteConversationToClient", data.data);
  });

  // Online/Offline
  socket.on("checkUserOnline", (id) => {
    if (id) {
      const checkUserOnline = users.filter((user) =>
        user.online.filter((item) => item === user.id)
      );

      const userOnline = checkUserOnline.filter((obj) => obj !== id);

      if (userOnline.length > 0) {
        userOnline.forEach((client) => {
          socket.to(`${client.socketId}`).emit("checkUserOnlineToClient", id);
        });
        socket.emit("checkUserOnlineToMe", userOnline);
      }
    }
  });
  // callUser
  socket.on("callUser", (data) => {
    users = EditData(users, data.sender._id, data.recipient._id);
    users = EditData(users, data.recipient._id, data.sender._id);

    const client = users.find((user) => user.id === data.recipient._id);

    if (client) {
      if (client.caller !== data.sender._id) {
        socket.emit("userBusy", data);
        users = EditData1(users, data.sender);
      } else {
        users = EditData(users, data.recipient, data.sender);
        socket.to(`${client.socketId}`).emit("callUserToClient", data);
      }
    }
  });

  // End Call
  socket.on("endCall", (data) => {
    const client = users.find((user) => user.id === data.recipient._id);

    if (client) {
      socket.to(`${client.socketId}`).emit("endCallToClient", data);
      users = EditData1(users, data.recipient._id);
      users = EditData1(users, data.sender._id);
    }

    //   if (client.caller) {
    //     const clientCall = users.find((user) => user.id === client.caller);

    //     clientCall &&
    //       socket.to(`${clientCall.socketId}`).emit("endCallToClient", data);

    //     users = EditData(users, client.caller, null);
    //   }
    // }
  });
};

export default SocketServer;
