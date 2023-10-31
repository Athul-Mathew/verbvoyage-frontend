import React from 'react';

const VideoList = ({ courseId }) => {
  // Fetch video data based on the courseId
  // Replace this with your video data
  const videos = [
    { id: 1, title: 'Video 1', thumbnail: 'video1.jpg', video_file: 'video1.mp4' },
    { id: 2, title: 'Video 2', thumbnail: 'video2.jpg', video_file: 'video2.mp4' },
    // Add more videos
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
      {videos.map((video, index) => (
        <div key={video.id} className="bg-white p-6 rounded-lg shadow-md cursor-pointer transition duration-300">
          <h3 className="text-lg text-black font-semibold mb-2">{video.title}</h3>
          <video
            controls
            className="w-full h-32 object-cover mb-4 rounded-lg"
            poster={video.thumbnail}
          >
            <source src={video.video_file} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <p className="text-sm text-gray-500">{`Video ${index + 1}`}</p>
        </div>
      ))}
    </div>
  );
};

export default VideoList;
