import React, { useState, useEffect } from "react";

function MessageReceiver() {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Connect to the WebSocket server for the receiver
    const newSocket = new WebSocket(`ws://localhost:8000/ws/chat/`);
    setSocket(newSocket);

    newSocket.onopen = () => console.log("WebSocket connected");
    newSocket.onclose = () => console.log("WebSocket disconnected");

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      newSocket.close();
    };
  }, []);

  
  useEffect(() => {
    if (socket) {
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setMessages((prevMessages) => [...prevMessages, data]);
      };
    }
  }, [socket]);

  return (
    <div className="chat-container">
      <div className="chat-header">Receiver Chat</div>
      <div className="message-container">
        {messages.map((message, index) => (
          <div key={index} className="message">
            <div className="message-username">{message.username}:</div>
            <div className="message-content">{message.message}</div>
            <div className="message-timestamp">{message.timestamp}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MessageReceiver;
