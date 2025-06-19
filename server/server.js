const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const http = require('http'); // ✅ Required for Socket.io
const path = require('path'); // ✅ NEW: Needed to serve React static files

const db = require('./config/db');
db();

const app = express();

// CORS Configuration - Update with your frontend URL
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());

// ✅ Serve static files from React build (NEW)
app.use(express.static(path.join(__dirname, '../client/build')));

// ✅ Create HTTP server for Socket.io
const server = http.createServer(app);

// ✅ Initialize Socket.io
const setupSocket = require("./socket");
setupSocket(server);

// Routes
const authRoutes = require('./routes/authRoutes');
const roomRoutes = require('./routes/roomRoutes');

app.use('/api/rooms', roomRoutes);
app.use('/api/auth', authRoutes);

// ✅ Catch-all route to serve React's index.html (NEW)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
  console.log(`Socket.io ready for connections`);
});