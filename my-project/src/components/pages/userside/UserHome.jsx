import React, { useEffect, useState } from 'react';
import logo from '../../../assets/logo.png';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import jwtDecode from 'jwt-decode';
import { getLocal } from '../../../actions/auth';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import pbg from '../../../assets/premiumbg.png';
import mbg from '../../../assets/tr.png';
import mebg from '../../../assets/thrs.jpg';
import userbg from '../../../assets/chatuserbg.png';
import exambg from '../../../assets/ex.png';
import coursebg from '../../../assets/crs.jpg';

function ImageCard({ imageUrl }) {
  return (
    <div className="rounded-lg overflow-hidden shadow-md">
      <img src={imageUrl} alt="Image" className="w-full h-auto" />
    </div>
  );
}

function CardButton({ text, imageUrl, linkTo }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link to={linkTo} className="w-full">
      <div
        className={`bg-black text-cyan-400 p-4 rounded-lg transition duration-300 transform shadow-md ${
          hovered ? 'hover:bg-cyan-400 hover:text-black hover:scale-105' : ''
        }`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="mb-2">
          <img src={imageUrl} alt="Button Image" className="w-20 h-20 mx-auto" />
        </div>
        <p className="text-xl text-center">{text}</p>
      </div>
    </Link>
  );
}

function AdBanner() {
  return (
    <div
      style={{
        background: 'black',
      }}
      className="text-center h-6 text-cyan-400"
    >
      {/* <p>Advertisement: Get 20% off on Premium</p> */}
    </div>
  );
}

function UserHome() {
  const [backgroundImage, setBackgroundImage] = useState('');
  const [mentorApproved, setMentorApproved] = useState(false);
  const [socket, setSocket] = useState(null);

  const buttons = [
    { text: 'Become a Premium Member', imageUrl: pbg, linkTo: '/subscription' },
    { text: 'Become a Mentor', imageUrl: mbg, linkTo: '/become-mentor' },
    { text: 'Mentors', imageUrl: mebg, linkTo: '/mentor-list' },
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
      } else {
        navigate('/userhome');
      }
    }
  }, []);
const [toggle,setToggle]= useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div
      style={{
        background: 'black',
      }}
    >
      <AdBanner />
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <nav className="border-gray-200 bg-black  dark:border-gray-700">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="#" className="flex items-center">
            <img src={logo} className="h-8 mr-3" alt="verbvoyage Logo" />
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
              <li>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 text-cyan bg-black rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <Link to="/profile">
                <li>
                  <a
                    href="#"
                    className="block py-2 pl-3 pr-4 text-black rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-cyan-400 md:dark:hover-text-blue-500 dark:hover-bg-gray-700 dark:hover-text-cyan-400 md:dark:hover-bg-transparent"
                  >
                    Profile
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
              <li>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 text-cyan bg-black rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <Link to="/profile">
                <li>
                  <a
                    href="#"
                    className="block py-2 pl-3 pr-4 text-black rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-cyan-400 md:dark:hover-text-blue-500 dark:hover-bg-gray-700 dark:hover-text-cyan-400 md:dark:hover-bg-transparent"
                  >
                    Profile
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

      <div className="container mx-auto py-12" style={{ background: 'url("https://64.media.tumblr.com/9fe71f029dd09ee99f64acf40db53612/1e3901a6a33c33d5-b9/s1280x1920/35bdb4b29b65616541eec04b96e3d5fa843bd78a.gif")', backgroundSize: 'cover' }}>
  <div className="relative bg-opacity-50">
    <section className="text-white py-20">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Learn Anything, Anytime, Anywhere</h1>
        <p className="text-lg sm:text-xl mb-8">Discover thousands of online courses taught by experts in their fields.</p>
      </div>
    </section>
    <section className="py-16">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-white">Comprehensive Courses</h2>
            <p className="mt-4 text-white">
              Access a wide range of courses designed to help you succeed in exams.
            </p>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-white">Practice Tests</h2>
            <p className="mt-4 text-white">Take practice tests to assess your knowledge and improve your skills.</p>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-white">Expert Guidance</h2>
            <p className="mt-4 text-white">Get expert guidance to excel in your exams.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
    {buttons.map((button, index) => (
      <CardButton key={index} text={button.text} imageUrl={button.imageUrl} linkTo={button.linkTo} />
    ))}
  </div>
</div>

<section className="py-12" style={{ backgroundImage: `url('https://i.pinimg.com/originals/3e/4c/9d/3e4c9d81ba6be013081a1506dd7fcdec.gif')`, backgroundSize: 'cover' }}>
  <div className="container mx-auto">
    <h2 className="text-3xl font-semibold text-cyan-400 text-center">Features</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
      <div className="p-6 bg-black rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-cyan-400">Learn Anytime, Anywhere</h3>
        <p className="text-cyan-400 mt-3">Access courses and lessons from top educators on your schedule.</p>
      </div>
      <div className="p-6 bg-black rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-cyan-400">Interactive Classes</h3>
        <p className="text-cyan-400 mt-3">Join live interactive classes and engage with instructors.</p>
      </div>
      <div className="p-6 bg-black rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-cyan-400">Assessments & Quizzes</h3>
        <p className="text-cyan-400 mt-3">Test your knowledge with quizzes and assessments to track your progress.</p>
      </div>
      <div className="p-6 bg-black rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-cyan-400">Doubt Clearing Sessions</h3>
        <p className="text-cyan-400 mt-3">Get your doubts cleared by expert educators.</p>
      </div>
    </div>
  </div>
</section>

      <footer className="text-center py-4">
        <p>Verb Voyage</p>
        &copy; {new Date().getFullYear()} Hyperconnect LLC. All rights reserved.
      </footer>
    </div>
  );
}

export default UserHome;
