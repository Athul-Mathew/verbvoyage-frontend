// src/components/NotPremiumPage.js

import React from 'react';
import { Link } from 'react-router-dom';

const NotPremiumPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-yellow-400 to-yellow-600">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">You Are Not a Premium User</h1>
        <p className="text-white mb-4">Upgrade to a premium account to unlock exclusive features. if you are already a premium user please logout your current section and login again And refresh it </p>
        <Link to="/subscription">
          <button className="bg-white text-yellow-600 font-semibold px-6 py-3 rounded-full transition duration-300 hover:bg-yellow-500 hover:text-white">
            Explore Plans
          </button>
        </Link>
      </div>
      <div>
        {/* Add your GIF here */}
        <img src="https://miro.medium.com/v2/resize:fit:1400/1*g9ee7RUD831R9n6Km5Jizg.gif" alt="GIF" className="w-64 h-64 rounded-full shadow-lg" />
      </div>
    </div>
  );
};

export default NotPremiumPage;
