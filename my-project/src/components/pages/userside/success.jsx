// src/App.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';


const PremiumPage = () => {
  const navigate = useNavigate();

  const exploreMore = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('rzp_device_id');
    localStorage.removeItem('userJWT');
    localStorage.removeItem('rzp_checkout_anon_id');
    navigate('/login');
  };

  const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1000 },
  });

  return (
    <animated.div style={fadeIn} className="min-h-screen flex flex-col items-center justify-center bg-black">
      <div className="text-white text-center mb-8">
        <div className="text-4xl font-bold mb-4">You are already a Premium User! Please logout to activate your membership</div>
        <button
          className="bg-white text-yellow-500 px-6 py-3 rounded-full font-bold hover:bg-yellow-500 hover:text-white transition duration-300"
          onClick={exploreMore}
        >
          Logout 
        </button>
      </div>
      <div>
        <img src="https://gifsec.com/wp-content/uploads/2022/09/congrats-gif-9.gif" alt="Premium GIF" className="w-64 h-64 rounded-full shadow-lg" />
      </div>
    </animated.div>
  );
};

export default PremiumPage;
