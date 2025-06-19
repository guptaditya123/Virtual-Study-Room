const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const http = require('http');
const path = require('path');
const fs = require('fs');

const db = require('./config/db');
db();

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());

// Serve static files from Vite build
const clientPath = path.join(__dirname, '../client/dist');
if (fs.existsSync(clientPath)) {
  app.use(express.static(clientPath));
} else {
  console.warn("⚠️  Vite build folder not found at", clientPath);
}

// Routes
const authRoutes = require('./routes/authRoutes');
const roomRoutes = require('./routes/roomRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomRoutes);

// Fallback for SPA (must come *after* all other routes)
app.get('*', (req, res) => {
  const indexPath = path.join(clientPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(500).send('Build not found');
  }
});

// Socket setup
const server = http.createServer(app);
const setupSocket = require('./socket');
setupSocket(server);

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`✅ Server started on port ${PORT}`);
});
