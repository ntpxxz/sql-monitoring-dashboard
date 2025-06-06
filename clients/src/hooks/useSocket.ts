// ============================================================================
// FILE: client/src/hooks/useSocket.ts
// ============================================================================
import { useEffect, useState, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:4000'; // Your Node.js WebSocket URL

export const useSocket = (serverId: string | null) => {
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  
  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io(SOCKET_URL, {
        reconnectionAttempts: 5,
      });

      socketRef.current.on('connect', () => {
        console.log('Socket connected');
        setIsConnected(true);
      });

      socketRef.current.on('disconnect', () => {
        console.log('Socket disconnected');
        setIsConnected(false);
      });
    }
    
    // Subscribe to the selected server's room
    if (serverId && socketRef.current.connected) {
      socketRef.current.emit('subscribe_to_server', serverId);
      console.log(`Subscribed to server: ${serverId}`);
    }

    // Cleanup on component unmount
    return () => {
        if(socketRef.current && socketRef.current.connected) {
            // No need to disconnect here if we want the socket to persist across components
            // But if the hook is only used once, it's good practice:
            // socketRef.current.disconnect();
        }
    };
  }, [serverId]);

  return { socket: socketRef.current, isConnected };
};
