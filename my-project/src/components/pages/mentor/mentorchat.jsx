import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { getLocal } from '../../../actions/auth';
import { wsApiUrl } from '../../../utils/Config';
import { BACKEND_BASE_URL } from '../../../utils/Config';
import { Link } from 'react-router-dom';
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
    axios.get(`${BACKEND_BASE_URL}/api/chat/users/${mentorId}/`)
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
          ? await axios.get(`${BACKEND_BASE_URL}/api/chat/get_messages/${mentorId}/${selectedUser.id}/`)
          : await axios.get(`${BACKEND_BASE_URL}/api/chat/messages/`);

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
  const [toggle,setToggle]= useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [input, setInput] = useState('');
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };
  const handleSendMessage = async () => {
    if (socket && socket.readyState === socket.OPEN && input !== '') {
      await socket.send(JSON.stringify({ message: input, receiver_id: String(mentorId), sender: selectedUser.id }));
    } else {
      console.log("WebSocket is not open for you to send a message");
    }
    await setInput('');
  };

  return (
    <div>
      <nav className="border-gray-200 bg-black  dark:border-gray-700">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="#" className="flex items-center">
            {/* <img src={logo} className="h-8 mr-3" alt="verbvoyage Logo" /> */}
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-cyan-400">
              Verb Voyage
            </span>
          </a>
          <button
            data-collapse-toggle="navbar-solid-bg"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-solid-bg"
            aria-expanded="false"
            onClick={()=>setToggle(!toggle)}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          {toggle && (
          <div className="md:hidden w-full block" id="navbar-solid-bg">
            <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
            <Link to="mentor/mentor-home">
              
              <li>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 text-cyan bg-black rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              </Link>

              
              <li>
                <a
                  href="#"
                  onClick={handleLogout}
                  className="block py-2 pl-3 pr-4 text-cyan-400 rounded hover-bg-gray-100 md:hover-bg-transparent md:border-0 md:hover-text-blue-700 md:p-0 dark-text-cyan-400 md:dark-hover-text-blue-500 dark-hover-bg-gray-700 dark-hover-text-cyan-400 md:dark-hover-bg-transparent"
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
          )}
          <div className="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
            <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
            <Link to="/mentor/mentor-home">
              <li>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 text-cyan bg-black rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              </Link>

              
              <li>
                <a
                  href="#"
                  onClick={handleLogout}
                  className="block py-2 pl-3 pr-4 text-cyan-400 rounded hover-bg-gray-100 md:hover-bg-transparent md:border-0 md:hover-text-blue-700 md:p-0 dark-text-cyan-400 md:dark-hover-text-blue-500 dark-hover-bg-gray-700 dark-hover-text-cyan-400 md:dark-hover-bg-transparent"
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
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
