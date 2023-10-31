import React, { useState, useEffect } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Link } from 'react-router-dom';
import bgvdo from '../../../assets/1525097616.mp4'
function ImageCard({ imageUrl }) {
  return (
    <div className="rounded-lg overflow-hidden shadow-md">
      <img src={imageUrl} alt="Image" className="w-full h-auto" />
    </div>
  );
}
function Home() {
  return (
    
    <div className="bg-gradient-to-r from-yellow-300 to-yellow-500">
      {/* Header */}
      <header className="relative bg-gradient-to-r from-yellow-300 to-yellow-500 py-6">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        className="absolute top-0 left-0 object-cover w-full h-full opacity-50"
      >
        <source src={bgvdo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="container mx-auto flex flex-col items-center justify-center relative">
        <h1 className="text-4xl text-black font-semibold mb-4">Welcome to Verb Voyage</h1>
        <p className="text-lg text-black mb-4">Your one-stop learning platform</p>
        <Link to="/login">
          <button className="bg-white text-blue-500 hover:bg-yellow-300 text-lg px-6 py-2 rounded-full">
            Get Started
          </button>
        </Link>
      </div>
    </header>
      {/* Features Section */}
      <section className="bg-gradient-to-r from-yellow-300 to-yellow-500 text-black py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Learn Anything, Anytime, Anywhere</h1>
          <p className="text-lg sm:text-xl mb-8">Discover thousands of online courses taught by experts in their fields.</p>
          <Link
               to="/login"
            className="bg-white text-blue-600 py-3 px-6 rounded-full hover:bg-blue-700 hover:text-white text-lg sm:text-xl font-semibold transition duration-300"
          >
            Explore VerbVoyage
          </Link>
        </div>
      </section>
      <section className="bg-gradient-to-r from-yellow-300 to-yellow-500 text-black py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Unlock endless knowledge, anytime and anywhere,</h1>
          <p className="text-lg sm:text-xl mb-8">with a world of online courses led by industry experts</p>
          <Link
            to="/login"
            className="bg-white text-blue-600 py-3 px-6 rounded-full hover:bg-blue-700 hover:text-white text-lg sm:text-xl font-semibold transition duration-300"
          >
            Explore VerbVoyage
          </Link>
        </div>
      </section>
      <section className="py-12 bg-gradient-to-r from-yellow-300 to-yellow-500">
        <div className="container mx-auto">
          <h2 className="text-3xl font-semibold text-gray-800 text-center">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
            {/* Feature 1 */}
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800">Learn Anytime, Anywhere</h3>
              <p className="text-gray-600 mt-3">
                Access courses and lessons from top educators on your schedule.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800">Interactive Classes</h3>
              <p className="text-gray-600 mt-3">
                Join live interactive classes and engage with instructors.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800">Assessments & Quizzes</h3>
              <p className="text-gray-600 mt-3">
                Test your knowledge with quizzes and assessments to track your progress.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800">Doubt Clearing Sessions</h3>
              <p className="text-gray-600 mt-3">
                Get your doubts cleared by expert educators.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* <Carousel showThumbs={false}>
          <div>
            <ImageCard imageUrl={image1} />
          </div>
          <div>
            <ImageCard imageUrl={image2} />
          </div>
        </Carousel> */}
        {/* Testimonials Section */}
      <section className="py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold text-gray-800">What Our Students Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {/* Testimonial 1 */}
            <div className="p-6 bg-white rounded-lg shadow-md">
              <p className="text-gray-600 mt-3">
                "Verb Voyage has helped me tremendously in my exam preparation. The educators are top-notch, and the content is comprehensive."
              </p>
              <p className="text-gray-800 font-semibold mt-4">- John Doe</p>
            </div>

            {/* Testimonial 2 */}
            <div className="p-6 bg-white rounded-lg shadow-md">
              <p className="text-gray-600 mt-3">
                "The platform is user-friendly, and the courses are well-structured. I've seen a significant improvement in my performance since I started using VerbVoyage."
              </p>
              <p className="text-gray-800 font-semibold mt-4">- Jane Smith</p>
            </div>

            {/* Testimonial 3 */}
            <div className="p-6 bg-white rounded-lg shadow-md">
              <p className="text-gray-600 mt-3">
                "Verb Voyage provides a wide range of subjects and courses. It's like having a personal tutor whenever I need it."
              </p>
              <p className="text-gray-800 font-semibold mt-4">- Alex Johnson</p>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      

     
{/* Features Section */}
<section className="bg-gray-100 py-16">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h2 className="text-2xl font-semibold">Comprehensive Courses</h2>
              <p className="mt-4">Access a wide range of courses designed to help you succeed in exams.</p>
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-semibold">Practice Tests</h2>
              <p className="mt-4">Take practice tests to assess your knowledge and improve your skills.</p>
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-semibold">Expert Guidance</h2>
              <p className="mt-4">Get expert guidance to excel in your exams.</p>
            </div>
          </div>
        </div>
      </section>
      {/* More Sections (e.g., Categories, Instructors, Testimonials) */}
      {/* ... */}

      {/* Footer */}
       {/* CTA Section */}
       <section className="bg-gradient-to-r from-yellow-300 to-yellow-500 py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl text-white font-semibold">Start Your Learning Journey Today</h2>
          <p className="text-lg text-white mt-2">Join millions of learners on Verb Voyage.</p>
          <button className="bg-white text-blue-500 hover:bg-blue-600 text-lg px-6 py-2 mt-4 rounded-full">
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
}

export default Home;
