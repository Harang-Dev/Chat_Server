const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  io.on("connection", (socket) => {
    console.log("연결되었습니다.");
  
    socket.on("chat message", (msg) => {
      console.log("메세지 : ", msg);
      io.emit("메세지", msg);
    });
  
    socket.on("disconnect", () => {
      console.log("연결이 끊어졌습니다.");
    });
  });

  server.listen(3001, () => {
    console.log("3001번 포트에서 연결되었습니다.");
  });