import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { getLocal } from '../../../actions/auth';

function MentorComponent() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [socket, setSocket] = useState(null);

  const token = getLocal('authtoken');
  const decoded = jwtDecode(token);
  const mentorId = decoded.user_id;

  let credential = mentorId < selectedUser?.id ? `${mentorId}_${selectedUser?.id}` : `${selectedUser?.id}_${mentorId}`;
  let room_id = `chat_${credential}`;

  useEffect(() => {
    axios.get(`http://localhost:8000/api/chat/users/${mentorId}/`)
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, [mentorId]);

  useEffect(() => {
    if (socket) {
      socket.onmessage = async (event) => {
        const newMessage = JSON.parse(event.data);
        console.log("This is the message: ", newMessage);

        setMessages(prevMessages => {
          return [...prevMessages, newMessage];
        });
      };
    }
  }, [socket]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = selectedUser
          ? await axios.get(`http://localhost:8000/api/chat/get_messages/${mentorId}/${selectedUser.id}/`)
          : await axios.get('http://localhost:8000/api/chat/messages/');

        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [selectedUser, mentorId]);

  useEffect(() => {
    const createSocket = async () => {
      try {
        const request = new WebSocket(`ws://localhost:8000/ws/chat/${credential}/`);

        request.onopen = () => {
          setSocket(request);
          console.log("WebSocket connection open.");
        };

        request.onclose = (event) => {
          console.log("WebSocket connection closed.", event);
        };
      } catch (error) {
        console.log("Error: ", error);
      }
    };

    if (selectedUser) {
      createSocket();
    }

    return () => {
      // Close the WebSocket when the component unmounts
      if (socket) {
        socket.close();
      }
    };
  }, [selectedUser, mentorId]);

  const [input, setInput] = useState('');

  const handleSendMessage = async () => {
    if (socket && socket.readyState === socket.OPEN && input !== '') {
      await socket.send(JSON.stringify({ message: input, receiver_id: String(mentorId), sender: selectedUser.id }));
    } else {
      console.log("WebSocket is not open for you to send a message");
    }
    await setInput('');
  };

  return (
    <div className="flex h-screen bg-gray-200">
      {/* Users List */}
      <div className="w-1/4 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-4">Users</h2>
        <ul>
          {users.map(user => (
            <li
              key={user?.id}
              className={`mb-2 cursor-pointer p-2 ${
                selectedUser && selectedUser.id === user.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-700 text-white hover:bg-blue-500 hover:text-white'
              }`}
              onClick={() => setSelectedUser(user)}
            >
              {user.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Container */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Chat Header */}
        <div className="flex-shrink-0 bg-white border-b-2 p-4">
          <h1 className="text-xl font-bold">Mentor Chat</h1>
        </div>

        {/* Conditional Rendering Based on Selected User */}
        {selectedUser ? (
          // Render chat content when a user is selected
          <div className="flex-1 overflow-y-scroll p-4">
            <ul className="flex flex-col space-y-2">
              {messages.map(msg => (
                <li
                  key={msg.id}
                  className={`flex justify-between ${
                    msg.sender === mentorId ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  <div
                    className={`p-2 rounded ${
                      msg.sender === mentorId ? 'bg-green-300 self-end' : 'bg-yellow-300 self-start'
                    }`}
                  >
                    {msg.message}
                  </div>
                  <div className="text-xs text-gray-500">{formatTime(msg.timestamp)}</div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          // Render a different component when no user is selected
          <div className="flex-1 flex items-center justify-center">
            <p className="text-xl">Please select a user to start mentoring.</p>
          </div>
        )}

        {/* Chat Input */}
        <div className="p-4">
          <div className="flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 border-2 border-gray-300 p-2 rounded-l focus:outline-none"
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-600 focus:outline-none"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Function to format time as HH:mm
const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${hours}:${minutes}`;
};

export default MentorComponent;
