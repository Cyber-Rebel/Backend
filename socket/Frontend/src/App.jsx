import React, { useEffect } from 'react'
import socket from './assets/socket.service.js';

const App = () => {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server with ID:", socket.id);
    });
    socket.on('receive', (msg) => {
      console.log('Message received from server:', msg);
    });
    

    return () => {
      socket.off("connect");
    };
  }, []);
  return (
    <div>

      <button onClick={() => socket.emit('message', `Hello from client, ${socket.id}`)}>Send Message</button>
    </div>
  )
}

export default App

// client npm install socket.io-client intall this packages