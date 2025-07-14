import { io } from "socket.io-client";

export  const socket = io("https://virtual-study-room-gwjx.onrender.com", {
  transports: ["websocket"],
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  autoConnect: true,
});
