import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { getLocal } from '../../../actions/auth';
import { BACKEND_BASE_URL } from '../../../utils/Config';
import { wsApiUrl } from '../../../utils/Config';

function UserComponent() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [socket, setSocket] = useState(null);
  const [selectedMentor, setSelectedMentor] = useState(null);

  const token = getLocal('authtoken')
  const decoded = jwtDecode(token);
  const user_id = decoded.user_id;

  let credential = user_id < selectedMentor?.id ? `${user_id}_${selectedMentor?.id}` : `${selectedMentor?.id}_${user_id}`;
  let room_id = `chat_${credential}`;

  useEffect(() => {
    axios.get(`${BACKEND_BASE_URL}/api/staff/`)
      .then(response => {
        setMentors(response.data);
      })
      .catch(error => console.error('Error fetching mentors:', error));
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = selectedMentor
          ? await axios.get(`${BACKEND_BASE_URL}/api/chat/get_messages/${user_id}/${selectedMentor.id}/`)
          : await axios.get(`${BACKEND_BASE_URL}/api/chat/messages/`);

        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [selectedMentor, user_id]);

  const sendToMentor = async () => {
    try {
      if (selectedMentor) {
        const response = await axios.post(`${BACKEND_BASE_URL}/api/chat/send_message/`, {
          sender: user_id,
          receiver: selectedMentor?.id,
          content: message,
        });

        setMessage('');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

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
    const createSocket = async () => {
      try {
        const request = new WebSocket(`${wsApiUrl}/ws/chat/${credential}/`);

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

    if (selectedMentor) {
      createSocket();
    }

    return () => {
      // Close the WebSocket when the component unmounts
      if (socket) {
        socket.close();
      }
    };
  }, [selectedMentor, user_id]);

  const [input, setInput] = useState('');

  const handleSendMessage = async () => {
    if (socket && socket.readyState === socket.OPEN && input !== '') {
      await socket.send(JSON.stringify({ message: input, receiver_id: String(user_id), sender: selectedMentor.id }));
    } else {
      console.log("Websocket is not open for you to send a message");
    }
    await setInput('');
  };

  return (
    <div className="flex h-screen bg-black">
      {/* Mentors List */}
      <div className="w-1/4 bg-black text-cyan-400 p-4">
        <h2 className="text-xl font-bold mb-4">Mentors</h2>
        <ul>
          {mentors.map((mentor) => (
            <li
              key={mentor?.id}
              className={`mb-2 cursor-pointer p-2 ${selectedMentor && selectedMentor.id === mentor.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-700 text-white hover:bg-blue-500 hover:text-white'
                }`}
              onClick={() => setSelectedMentor(mentor)}
            >
              {mentor.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Container */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Chat Header */}
        <div className="flex-shrink-0 bg-cyan-400 border-b-2 p-4">
          <h1 className="text-xl font-bold text-black">User Chat</h1>
        </div>

        {selectedMentor ? (
          // Render chat content when a mentor is selected
          <div className="flex-1 overflow-y-scroll p-4 flex flex-col-reverse">
            <ul className="flex flex-col space-y-2">
              {messages.map((msg) => (
                <li
                  key={msg.id}
                  className={`flex justify-between ${msg.sender == user_id ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div
                    className={`p-2 rounded ${msg.sender == user_id
                        ? 'bg-blue-500 text-white self-start'
                        : 'bg-yellow-600 self-end'
                      }`}
                  >
                    {msg.message}
                  </div>
                  <div className="text-xs text-cyan-400">{formatTime(msg.timestamp)}</div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          // Render a different component when no mentor is selected
          <div className="flex-1 flex items-center justify-center">
            <p className="text-xl text-cyan-400">Please select a mentor to start chatting.</p>
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
              className="bg-cyan-400 text-white p-2 rounded-r hover:bg-cyan-600 focus:outline-none"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${hours}:${minutes}`;
};

export default UserComponent;
