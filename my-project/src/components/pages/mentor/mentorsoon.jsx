import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
  // Import your background GIF

const ComingSoon = () => {
    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/');
      };
      const [toggle,setToggle]= useState(false)
      const [isMenuOpen, setIsMenuOpen] = useState(false);
    const gifBackground="https://www.bing.com/th/id/OGC.316e0283f1afbb14d1c2d8f3de08e5ae?pid=1.7&rurl=https%3a%2f%2fi.pinimg.com%2foriginals%2f8c%2f69%2f41%2f8c6941594c4fc8401528992a0b1eacc2.gif&ehk=PB595%2fzDANIYBXRtAsGra1YPdpvlUNvA8JlCblt8tlo%3d"
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
      </nav>       <div className="bg-fixed bg-cover min-h-screen relative">
            
            <img src={gifBackground} alt="Cyberpunk Background" className="w-full h-full object-cover" />
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-70"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">Verb ...</h1>
                <p className="text-lg sm:text-xl md:text-2xl mb-8">We're working on something awesome!</p>
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8">Coming Soon...</p>
                <div className="flex justify-center">
                    <a href="#" className="text-2xl mx-2 hover:text-blue-500"><i className="fab fa-facebook"></i></a>
                    <a href="#" className="text-2xl mx-2 hover:text-blue-400"><i className="fab fa-twitter"></i></a>
                    <a href="#" className="text-2xl mx-2 hover:text-red-400"><i className="fab fa-instagram"></i></a>
                </div>
            </div>
        </div>
        </div>

    );
};

export default ComingSoon;
