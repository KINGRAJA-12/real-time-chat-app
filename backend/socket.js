import { Server } from "socket.io";
import express from "express";
import { createServer } from "http";

export const app = express();
export const server = createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});
let activeUsers = [];
let userIdlist = [];
io.on("connection", (socket) => {
socket.on("active-user", (userId) => {
    const isAlreadyInList = activeUsers.some((data) => data.userId === userId);
    if (!isAlreadyInList) {
      activeUsers.push({ userId, socketId: socket.id });
      userIdlist.push(userId);
    }
    io.emit("alluser", { activeUsers, userIdlist });
  });
  socket.on('send-message',(data)=>{
    //console.log(data)
    let user=activeUsers.find((item)=>item.userId===data.receiverId)
    if(!user)return
    socket.to(user.socketId).emit("receive-message",data)
  })
  socket.on("disconnect", () => {
    console.log("disconnected: " + socket.id);
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    userIdlist = activeUsers.map((user) => user.userId);
    io.emit("alluser", { activeUsers, userIdlist });
  });
});
