const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const http = require('http'); // ✅ Required to create a raw server

const db = require('./config/db');
db();

const app = express();
app.use(cors({
  origin: "https://virtual-study-room-pjc7duclz-guptaditya81-gmailcoms-projects.vercel.app", // your Vercel frontend
  credentials: true
}));
app.use(express.json());

// ✅ Create server from express app
const server = http.createServer(app);

// ✅ Setup socket
const setupSocket = require("./socket");
setupSocket(server); // Now server is defined

// Routes
const authRoutes = require('./routes/authRoutes');
const roomRoutes = require('./routes/roomRoutes');

app.use('/api/rooms', roomRoutes);
app.use('/api/auth', authRoutes);

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server started at port ${PORT}`)); // ✅ use server.listen instead of app.listen
