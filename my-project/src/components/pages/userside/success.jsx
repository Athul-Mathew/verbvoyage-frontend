// src/App.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';


const PremiumPage = () => {
  const navigate = useNavigate();

  const exploreMore = () => {
 
    navigate('/userhome');
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
        <img src="https://www.bing.com/th/id/OGC.81e255e0ceeca98084787662c4f7814c?pid=1.7&rurl=http%3a%2f%2f38.media.tumblr.com%2f297947c71204948483def02f60a9b366%2ftumblr_mlh0ipVnQq1rdnvweo1_500.gif&ehk=4vjFoR5sds6%2fLw7baeM6FaR33xDXxRRVDMnNwYJqFd4%3d" alt="Premium GIF" className="w-64 h-64 rounded-full shadow-lg" />
      </div>
    </animated.div>
  );
};

export default PremiumPage;
