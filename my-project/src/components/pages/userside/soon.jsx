import React from 'react';

function Soon() {
  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-gradient-to-r from-yellow-300 to-yellow-500 text-white">
      
      <img
        className="w-52 h-32 mb-5 animate-bounce"
        src="https://i.pinimg.com/originals/bf/45/72/bf45724399d8ab9aa70a633c0555a97d.gif"
        alt="Coming Soon Animation"
      />
      <h1 className="text-4xl font-bold mb-4">Exams Are</h1>
      <h2 className="text-3xl font-semibold mb-4">Coming Soon</h2>
      <p className="text-lg text-gray-400 mb-8">
        Exciting content is on the way. Stay tuned!
      </p>
      <div className="flex space-x-4">
        <button className="bg-red-500 text-white px-6 py-2 rounded-full">
          Notify Me
        </button>
        <button className="border border-gray-400 text-black px-6 py-2 rounded-full transition duration-300 ease-in-out hover:bg-gray-400 hover:text-white">
  Remind Me Later
</button>
      </div>
      <footer className="text-white text-center py-8 mt-auto">
        <p>&copy; 2023 VerbVoyage. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Soon;
