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
    console.log("🔥 A user connected");
  
    socket.on("chat message", (msg) => {
      console.log("Message: ", msg);
      io.emit("chat message", msg);
    });
  
    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });

  server.listen(3001, () => {
    console.log("✅ Server running on http://localhost:3001");
  });