// ============================================================================
// FILE: server/server.js
// Main application entry point. Initializes the server and services.
// ============================================================================
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const apiRoutes = require('./api');
const { initializeSocketHandlers } = require('./sockets/main.handler');
const { startMetricsStream } = require('./services/streaming.service');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // For development. In production, restrict to your frontend's URL.
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// All API logic is routed through the /api entry point.
app.use('/api', apiRoutes);

// Initialize WebSocket connection handlers.
initializeSocketHandlers(io);

server.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
  
  // Start the real-time data streaming service.
  startMetricsStream(io);
});