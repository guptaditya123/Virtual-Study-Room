const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const http = require("http"); // ✅ Required to create a raw server

const db = require("./config/db");
db();

const app = express();
const allowedOrigins = [
  "http://localhost:5173",
  "https://virtual-study-room-azy3yw0a5-guptaditya81-gmailcoms-projects.vercel.app",
  'https://virtual-study-room-3qj0a89am-guptaditya81-gmailcoms-projects.vercel.app' // ✅ Add this
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());

// ✅ Create server from express app
const server = http.createServer(app);

// ✅ Setup socket
const setupSocket = require("./socket");
setupSocket(server); // Now server is defined

// Routes
const authRoutes = require("./routes/authRoutes");
console.log("Auth routes loaded"); // Add this

const roomRoutes = require("./routes/roomRoutes");

app.use("/api/rooms", roomRoutes);

console.log("Registering /api/auth routes...");
app.use("/api/auth", authRoutes);

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server started at port ${PORT}`)); // ✅ use server.listen instead of app.listen
