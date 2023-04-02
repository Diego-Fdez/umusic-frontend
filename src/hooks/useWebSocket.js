import { useEffect } from 'react';
import io from 'socket.io-client';

let socket;

const useWebSocket = () => {
  //It fetches the server to initialize the socket, then it creates a socket connection
  const socketInitializer = async () => {
    await fetch('/api/v1/socket');
    socket = io();

    socket.on('connect', () => {
      console.log('connected');
    });
  };

  return { socketInitializer, socket };
};

export default useWebSocket;
