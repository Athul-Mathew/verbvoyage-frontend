import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function MentorHomePage() {
  const navigate = useNavigate();
  const handleclick = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  }

  const handleClick = () => {
    localStorage.removeItem('authToken');
    navigate('/');
    console.log('Logout clicked');
  };
  return (
    <div className="bg-gradient-to-b from-yellow-300 to-yellow-500 text-white min-h-screen">
      {/* Navbar */}
      <nav className="bg-black p-4 text-white">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
        <Link to="/" className="text-2xl font-semibold mb-4 lg:mb-0">
          WELCOME TO VERB VOYAGE'S Mentor Dashboard
        </Link>
        <div className="flex flex-col lg:flex-row lg:items-center space-y-2 lg:space-y-0 lg:space-x-4">
          <Link to="/profile" className="hover:underline">
            Profile
          </Link>
          <Link to="/courses" className="hover:underline">
            My Courses
          </Link>
          <Link to="/students" className="hover:underline">
            Students
          </Link>
          <button className=" bg-yellow-400 tex-bla hover:bg-yellow-500" onClick={handleClick}>
           Logout
          </button>
        </div>
      </div>
    </nav>

      

      {/* Main Content */}
    <div className='m-10 w-96'>
    <div className="flex flex-col ">
      {/* Dashboard Option */}
      <div className=" bg-black rounded-lg p-4 hover:bg-yellow-400  hover:shadow-xl transition duration-300 cursor-pointer mb-4">
        <h2 className="text-xl font-semibold mb-2 hover:text-black  text-white">Dashboard</h2>
        {/* Dashboard content here */}
      </div>

      {/* View Video Option */}
      <Link to="/mentor/view-video" className="hover:underline">
        <div className="bg-black rounded-lg p-4 hover:bg-yellow-400 hover:shadow-xl transition duration-300 cursor-pointer mb-4">
          <h2 className="text-xl font-semibold mb-2 hover:text-black  text-white ">View Video</h2>
          {/* Video content here */}
        </div>
      </Link>

      {/* Chat with Users Option */}
      <Link to="/mentor/mentorchat" className="hover:underline">
        <div className="bg-black  rounded-lg p-4 hover:bg-yellow-400 hover:shadow-xl transition duration-300 cursor-pointer mb-4">
          <h2 className="text-xl font-semibold mb-2 hover:text-black  text-white">Chat with Users</h2>
          {/* Chat interface here */}
        </div>
      </Link>

      {/* Contact Admin Option */}
      <div className="bg-black  rounded-lg p-4 hover:bg-yellow-400 hover:shadow-xl transition duration-300 cursor-pointer mb-4">
        <h2 className="text-xl font-semibold mb-2 hover:text-black  text-white">Contact Admin</h2>
        {/* Contact form or messaging here */}
      </div>

      {/* Upload Video Content Option */}
      <div className="bg-black  rounded-lg p-4 hover:bg-yellow-400 hover:shadow-xl transition duration-300 cursor-pointer mb-4">
        <h2 className="text-xl font-semibold mb-2 hover:text-black  text-white">Upload Video Content</h2>
        {/* Upload video content form or interface here */}
      </div>
    </div>



    </div>
    </div>
  );
}

export default MentorHomePage;
