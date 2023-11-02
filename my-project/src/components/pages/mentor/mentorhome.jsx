import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function MentorHomePage() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };

  return (
    <div
      className="bg-gradient-to-b from-purple-600 to-blue-900 text-white min-h-screen relative"
      style={{
        backgroundImage: 'url(https://www.bing.com/th/id/OGC.1652e7962f8a2986edc58e1094fd2882?pid=1.7&rurl=https%3a%2f%2fgiffiles.alphacoders.com%2f211%2f211748.gif&ehk=J8NC6SYA3%2fla%2flh3DClVL5dkUO40g5InkD21Tz3M3u4%3d)', // Set your background image here
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Navbar */}
      <nav
      className="bg-black p-4 text-white"
      style={{
        backgroundImage: 'url(https://www.bing.com/th/id/OGC.8f9f4a41187ec20f268f39ab78b8c6b4?pid=1.7&rurl=https%3a%2f%2fstatic.tumblr.com%2fb32d78ab503606d696b4762c8435cafb%2fxia03o7%2fRZ0pvfuk5%2ftumblr_static_-2094722226-content_2048_v2.gif&ehk=fE4kW7fpASWHbaiwguX4V1eHXPCmyu1yYYsrKNf8eig%3d)', // Replace with the actual path to your background GIF
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
        <Link to="/" className="text-2xl font-semibold mb-4 lg:mb-0">
          VERB VOYAGE'S BEAST AREA
        </Link>
        <div className="flex flex-col lg:flex-row lg:items-center space-y-2 lg:space-y-0 lg:space-x-4">
          <button
            className="bg-gradient-to-b from-cyberpunk-bg1 via-cyberpunk-bg2 to-cyberpunk-bg3 text-cyberpunk-text hover:from-cyberpunk-bg2 hover:to-cyberpunk-bg1 hover:text-black hover:bg-opacity-80 rounded-md px-4 py-2 transition duration-300 ease-in-out"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>

      {/* Main Content */}
      <div className="m-10 w-96">
        <div className="flex flex-col">
          {/* Dashboard Option */}
          <div className="bg-black rounded-lg p-4 hover:bg-cyan-400 hover:shadow-xl transition duration-300 cursor-pointer mb-4">
            <h2 className="text-xl font-semibold mb-2 hover:text-white text-white">
              Dashboard
            </h2>
            {/* Dashboard content here */}
          </div>

          {/* View Video Option */}
          <Link to="/mentor/view-video" className="hover:underline">
            <div className="bg-black rounded-lg p-4 hover:bg-cyan-400 hover:shadow-xl transition duration-300 cursor-pointer mb-4">
              <h2 className="text-xl font-semibold mb-2 hover:text-white text-white">
                View Video
              </h2>
              {/* Video content here */}
            </div>
          </Link>

          {/* Chat with Users Option */}
          <Link to="/mentor/mentorchat" className="hover:underline">
            <div className="bg-black rounded-lg p-4 hover:bg-cyan-400 hover:shadow-xl transition duration-300 cursor-pointer mb-4">
              <h2 className="text-xl font-semibold mb-2 hover:text-white text-white">
                Chat with Users
              </h2>
              {/* Chat interface here */}
            </div>
          </Link>

          {/* Contact Admin Option */}
          <div className="bg-black rounded-lg p-4 hover:bg-cyan-400 hover:shadow-xl transition duration-300 cursor-pointer mb-4">
            <h2 className="text-xl font-semibold mb-2 hover:text-white text-white">
              Contact Admin
            </h2>
            {/* Contact form or messaging here */}
          </div>

          {/* Upload Video Content Option */}
          <div className="bg-black rounded-lg p-4 hover:bg-cyan-400 hover:shadow-xl transition duration-300 cursor-pointer mb-4">
            <h2 className="text-xl font-semibold mb-2 hover:text-white text-white">
              Upload Video Content
            </h2>
            {/* Upload video content form or interface here */}
          </div>
        </div>
      </div>

      {/* Footer Wave Animation */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="text-blue-900"
        >
          <path
            fill-opacity="1"
            d="M0,224L48,197.3C96,171,192,117,288,112C384,107,480,149,576,181.3C672,213,768,235,864,229.3C960,224,1056,192,1152,192C1248,192,1344,224,1392,240L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
}

export default MentorHomePage;
