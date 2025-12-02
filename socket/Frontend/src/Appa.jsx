import React, { useEffect ,useState } from 'react'
import socketInstance from './assets/socket.service.js';

const App = () => {
    const [ socket , setSocket ] = useState(null);
  useEffect(() => {
    setSocket(socketInstance)
    socketInstance.on("connect", () => {
      console.log("Connected to server with ID:", socketInstance.id);
    });
    socketInstance.on('receive', (msg) => {
      console.log('Message received from server:', msg);
    });
    

    return () => {
        setSocket(null);
    };
  }, []);
  return (
    <div>

      <button onClick={() => socket.emit('message', `Hello from client, ${socket.id}`)}>Send Message</button>
    </div>
  )
}

export default App