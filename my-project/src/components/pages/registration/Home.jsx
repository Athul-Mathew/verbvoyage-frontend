import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-black text-cyan-400 font-mono min-h-screen">
      {/* Header */}
      <header
        className="relative h-screen flex items-center justify-center"
        style={{
          backgroundImage: `url(https://wallpaperaccess.com/full/4910984.gif)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-4xl text-cyan-400 font-semibold mb-4">Welcome to Verb Voyage</h1>
          <p className="text-lg text-cyan-400 mb-4">Your futuristic learning platform</p>
          <Link to="/login">
            <button className="bg-cyan-400 text-black hover:bg-black hover:text-cyan-400 text-lg px-6 py-2 rounded-full">
              Get Started
            </button>
          </Link>
        </div>
      </header>

      {/* Features Section */}
      <section className="bg-black text-cyan-400 py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Learn Anything, Anytime, Anywhere - In a Verb Future
          </h1>
          <p className="text-lg sm:text-xl mb-8">
            Discover thousands of online courses designed for the futuristic
            minds of tomorrow.
          </p>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-black text-cyan-400 py-8">
        <div className="container mx-auto text-center">
          <p className="text-lg">
            &copy; {new Date().getFullYear()} Verb Voyage. All rights reserved.
          </p>
          <p className="text-lg mt-2">
            Designed with <span role="img" aria-label="heart">❤️</span> by verb voyage
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
