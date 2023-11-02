import React from 'react';
  // Import your background GIF

const ComingSoon = () => {
    const gifBackground=""
    return (
        <div className="bg-fixed bg-cover min-h-screen relative">
            <img src={gifBackground} alt="Cyberpunk Background" className="w-full h-full object-cover" />
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-70"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">Verb ...</h1>
                <p className="text-lg sm:text-xl md:text-2xl mb-8">We're working on something awesome!</p>
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8">Coming Soon...</p>
                <div className="flex justify-center">
                    <a href="#" className="text-2xl mx-2 hover:text-blue-500"><i className="fab fa-facebook"></i></a>
                    <a href="#" className="text-2xl mx-2 hover:text-blue-400"><i className="fab fa-twitter"></i></a>
                    <a href="#" className="text-2xl mx-2 hover:text-red-400"><i className="fab fa-instagram"></i></a>
                </div>
            </div>
        </div>
    );
};

export default ComingSoon;
