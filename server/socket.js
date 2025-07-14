const { Server } = require("socket.io");

function setupSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  const roomUsers = {};

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join_room", ({ roomId, username }) => {
      socket.join(roomId);
      socket.roomId = roomId;
      socket.username = username;

      if (!roomUsers[roomId]) {
        roomUsers[roomId] = new Set();
      }
      roomUsers[roomId].add(socket.id);

      console.log(`${username} joined room ${roomId}`);

      io.to(roomId).emit("room_user_count", {
        count: roomUsers[roomId].size,
      });
    });

    socket.on("send_message", ({ roomId, username, message, time, id }) => {
      const data = {
        id, // ✅ include message ID for frontend rendering
        username,
        message,
        time,
      };
      io.to(roomId).emit("receive_message", data);
    });

    socket.on("sync_timer", ({ roomId, time }) => {
      io.to(roomId).emit("update_timer", time);
    });

    socket.on("draw", ({ roomId, x, y, lx, ly }) => {
      socket.to(roomId).emit("draw", { x, y, lx, ly });
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
      const roomId = socket.roomId;
      if (roomId && roomUsers[roomId]) {
        roomUsers[roomId].delete(socket.id);
        if (roomUsers[roomId].size === 0) {
          delete roomUsers[roomId];
        } else {
          io.to(roomId).emit("room_user_count", {
            count: roomUsers[roomId].size,
          });
        }
      }
    });
  });
}

module.exports = setupSocket;
