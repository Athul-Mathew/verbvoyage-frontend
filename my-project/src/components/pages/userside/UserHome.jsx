import React, { useEffect, useState } from 'react';
import logo from '../../../assets/logo.png';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import jwtDecode from 'jwt-decode';
import { getLocal } from '../../../actions/auth';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import pbg from '../../../assets/premiumbg.png'
import mbg from '../../../assets/tr.png'
import mebg from '../../../assets/thrs.jpg'
import userbg from '../../../assets/chatuserbg.png'
import exambg from '../../../assets/ex.png'
import coursebg from '../../../assets/crs.jpg'


// import WebSocket from 'websocket';

// ImageCard component for displaying images
function ImageCard({ imageUrl }) {
  return (
    <div className="rounded-lg overflow-hidden shadow-md">
      <img src={imageUrl} alt="Image" className="w-full h-auto" />
    </div>
  );
}


// CardButton component for displaying buttons with images
function CardButton({ text, imageUrl, linkTo }) {
  return (
    <Link to={linkTo} className="w-full">
      <div className="bg-black hover:bg-[#FFEA00] text-white hover:text-black p-4 rounded-lg transition duration-300 transform hover:scale-105 shadow-md">
        <div className="mb-2">
          <img src={imageUrl} alt="Button Image" className="w-20 h-20 mx-auto" />
        </div>
        <p className="text-xl text-center">{text}</p>
      </div>
    </Link>
  );
}

// AdBanner component
function AdBanner() {
  return (
    <div style={{backgroundImage: `linear-gradient(to right, violet, indigo, blue, green, yellow, orange, red)`,}} className=" text-center h-6 text-white">
      <p>Advertisement: Get 20% off on Premium</p>
    </div>
  );
}

function UserHome() {
  const [backgroundImage, setBackgroundImage] = useState('');
  const [mentorApproved, setMentorApproved] = useState(false);
  const [socket, setSocket] = useState(null);
 

  const buttons = [
    { text: 'Become a Premium Member', imageUrl: pbg, linkTo:  '/subscription' },
    { text: 'Become a Mentor', imageUrl: mbg, linkTo: '/become-mentor' },
    { text: 'Mentors', imageUrl: mebg, linkTo:'/mentor-list' },
    { text: 'Chat With Random Users', imageUrl: userbg, linkTo: '/chat' },
    { text: 'Exams', imageUrl: exambg, linkTo: '/soon' },
    { text: 'Courses', imageUrl: coursebg, linkTo: '/course' },
  ];
  const navigate = useNavigate();
  const localResponse = getLocal('authToken');
  


  const handleImageChange = (e) => {
    setBackgroundImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('rzp_device_id');
    localStorage.removeItem('userJWT');
    localStorage.removeItem('rzp_checkout_anon_id');

    navigate('/');
  };

  useEffect(() => {
    const localResponse = getLocal('authToken');
    if (localResponse) {
      const decoded = jwtDecode(localResponse);
      if (decoded.is_admin === true) {
        navigate('/admin');
        toast.success('Logged in successfully', { duration: 1000 });
      } else if (decoded.is_staff) {
        navigate('/mentor/mentor-home');
        toast.success('Logged in successfully', { duration: 1000 });
      }
       else {
       
        
        navigate('/userhome');
      }
    }

  }, []);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };




  return (
    
    <div
    style={{
      backgroundImage: `linear-gradient(to right, #FFD700, #FFFF00, #FFEA00)`,
    }}
    >
    
      <AdBanner />
      <Toaster position="top-center" reverseOrder={false }></Toaster>
      

      {/* Navbar */}
      <nav className="bg-black p-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-center flex items-center">
          <img src={logo} alt="Logo" className="w-16 h-16 mx-2" />
          <p className="text-[#FFEA00] text-4xl font-extrabold" style={{ fontFamily: 'Netflix', letterSpacing: '2px' }}>
            Verb Voyage
          </p>
        </div>
        <div className="flex items-center space-x-4">
          {isMenuOpen ? (
            <div className="relative">
              <button
                className="bg-primary hover:bg-[#FFEA00] text-white hover:text-dark-blue py-2 px-4 rounded-full shadow-md transition duration-300 transform hover:scale-105 focus:outline-none font-bold"
                onClick={handleToggleMenu}
              >
                Close Menu
              </button>
              <div className="absolute right-0 mt-2 py-2 w-40 bg-white rounded-lg shadow-lg">
                <Link to="/profile">
                  <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">Profile</button>
                </Link>
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <button
              className="bg-primary hover:bg-[#FFEA00] text-white hover:text-dark-blue py-2 px-4 rounded-full shadow-md transition duration-300 transform hover:scale-105 focus:outline-none font-bold"
              onClick={handleToggleMenu}
            >
              Open Menu
            </button>
          )}
        </div>
      </nav>

     
      {/* Carousel */}
      <div className="container mx-auto py-12">
        {/* <Carousel showThumbs={false}>
          <div>
            <ImageCard imageUrl={image1} />
          </div>
          <div>
            <ImageCard imageUrl={image2} />
            </div>
          </Carousel> */}
        {/* Features Section */}
        <div className="relative  bg-opacity-50">
          
       
  <section className="py-16">
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-black">Comprehensive Courses</h2>
          <p className="mt-4 text-black">Access a wide range of courses designed to help you succeed in exams.</p>
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-black">Practice Tests</h2>
          <p className="mt-4 text-black">Take practice tests to assess your knowledge and improve your skills.</p>
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-black">Expert Guidance</h2>
          <p className="mt-4 text-black">Get expert guidance to excel in your exams.</p>
        </div>
      </div>
    </div>
  </section>
  <section className="text-black py-20">
    <div className="container mx-auto text-center">
      <h1 className="text-4xl sm:text-5xl font-bold mb-4">Learn Anything, Anytime, Anywhere</h1>
      <p className="text-lg sm:text-xl mb-8">Discover thousands of online courses taught by experts in their fields.</p>
      <Link
        to="/userhom"
        className="bg-black text-white hover:text-black py-3 px-6 rounded-full hover:bg-transparent text-lg sm:text-xl font-semibold transition duration-300"
      >
        Explore VerbVoyage
      </Link>
    </div>
  </section>
</div>





        

        {/* Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {buttons.map((button, index) => (
            <CardButton
              key={index}
              text={button.text}
              imageUrl={button.imageUrl}
              linkTo={button.linkTo}
              
            />
          ))}
        </div>
      </div>
      <section className="py-12 bg-black">
        <div className="container mx-auto">
          <h2 className="text-3xl font-semibold text-[#FFEA00] text-center">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
            {/* Feature 1 */}
            <div className="p-6 bg-[#FFEA00]  rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800">Learn Anytime, Anywhere</h3>
              <p className="text-gray-600 mt-3">
                Access courses and lessons from top educators on your schedule.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 bg-[#FFEA00]  rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800">Interactive Classes</h3>
              <p className="text-gray-600 mt-3">
                Join live interactive classes and engage with instructors.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 bg-[#FFEA00]  rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800">Assessments & Quizzes</h3>
              <p className="text-gray-600 mt-3">
                Test your knowledge with quizzes and assessments to track your progress.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 bg-[#FFEA00]  rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800">Doubt Clearing Sessions</h3>
              <p className="text-gray-600 mt-3">
                Get your doubts cleared by expert educators.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-4">
        <p>Verb Voyage</p>
        &copy; {new Date().getFullYear()} Hyperconnect LLC. All rights reserved.
      </footer>
    </div>
  );
}

export default UserHome;
