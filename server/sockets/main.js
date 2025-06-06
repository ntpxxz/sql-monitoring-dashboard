// ============================================================================
// FILE: server/sockets/main.handler.js
// Manages all WebSocket connection logic.
// ============================================================================
function initializeSocketHandlers(io) {
  io.on('connection', (socket) => {
    console.log(`SOCKET: Client connected: ${socket.id}`);
    socket.on('subscribe_to_server', (serverId) => {
      socket.rooms.forEach(room => {
        if (room !== socket.id) socket.leave(room);
      });
      socket.join(serverId);
      console.log(`SOCKET: Client ${socket.id} subscribed to room ${serverId}`);
    });
    socket.on('disconnect', () => {
      console.log(`SOCKET: Client disconnected: ${socket.id}`);
    });
  });
}

module.exports = { initializeSocketHandlers };
