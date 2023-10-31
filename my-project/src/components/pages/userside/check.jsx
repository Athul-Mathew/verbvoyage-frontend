import React from 'react';

const VideoPlayer = () => {
  // Replace this with the actual video URL
  const videoUrl = 'https://www.example.com/your-video-url.mp4';

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-lg p-4">
          <div className="relative">
            <video controls className="w-full" src={videoUrl}></video>
            <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
              <button className="text-4xl text-white bg-blue-500 rounded-full p-4 hover:bg-blue-600">
                ▶
              </button>
            </div>
          </div>
          <div className="mt-4">
            <h1 className="text-3xl font-semibold">Video Title</h1>
            <p className="text-gray-500">Instructor: Instructor Name</p>
            <div className="mt-4">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-4 hover:bg-blue-600">
                Start Course
              </button>
              <button className="text-blue-500 hover:underline">Add to Wishlist</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
