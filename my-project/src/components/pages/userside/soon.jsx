import React from 'react';

function Soon() {
  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-black text-cyan-400"
    style={{
      backgroundImage: `url('https://rawfury.com/wp-content/uploads/2021/12/refinery_640x360.gif')`, // Replace 'your-background.gif' with the actual path to your background GIF
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    }}>
      <img
        className="w-52 h-32 mb-5 animate-bounce"
        src="https://i.pinimg.com/originals/bf/45/72/bf45724399d8ab9aa70a633c0555a97d.gif"
        alt="Coming Soon Animation"
      />
      <h1 className="text-4xl font-bold mb-4">Exams Are</h1>
      <h2 className="text-3xl font-semibold mb-4">Coming Soon</h2>
      <p className="text-lg text-cyan-100 mb-8">
        Exciting content is on the way. Stay tuned!
      </p>
      <div className="flex space-x-4">
        <button className="bg-red-500 text-cyan-400 px-6 py-2 rounded-full">
          Notify Me
        </button>
        <button className="border border-cyan-400 text-cyan-400 px-6 py-2 rounded-full transition duration-300 ease-in-out hover:bg-cyan-400 hover:text-black">
          Remind Me Later
        </button>
      </div>
      <footer className="text-cyan-100 text-center py-8 mt-auto">
        <p>&copy; 2023 VerbVoyage. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Soon;
