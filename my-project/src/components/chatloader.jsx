import React from 'react';

const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-yellow-400">
      <div className="flex flex-col items-center space-y-4">
        {/* Dancing Banana GIF */}
        <img
          src="https://www.bing.com/th/id/OGC.8d1ea3e893b2c33f6fe77d0d13e19483?pid=1.7&rurl=https%3a%2f%2fi.pinimg.com%2foriginals%2f0a%2ff3%2fc9%2f0af3c9613761d2d2394d99312aeba397.gif&ehk=HA3dWVAhmDJUA3DDrh4mZW%2bHe0ZafRhxgv%2fg2W9rJC4%3d"
          alt="Dancing Banana"
          className="h-48 w-64 sm:h-64 sm:w-80 md:h-80 md:w-96 lg:h-96 lg:w-112 xl:h-136 xl:w-160"
        />

        {/* Loading Spinner */}
        <svg
          className="animate-spin h-8 w-8 text-blue-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V2.83A10 10 0 002.83 12H4z"
          ></path>
        </svg>

        {/* Finding User Text */}
        <span className="text-blue-500 text-2xl font-extrabold sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
          Finding User...
        </span>
      </div>
    </div>
  );
};

export default LoadingPage;
