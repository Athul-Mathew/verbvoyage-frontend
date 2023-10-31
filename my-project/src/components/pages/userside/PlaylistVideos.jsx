// PlaylistVideos.js
import React, { useState, useEffect } from 'react';
import { BACKEND_BASE_URL } from '../../../utils/Config';

const PlaylistVideos = ({ playlistId, setIsEnrolled, setSelectedPlaylistId }) => {
  const [videos, setVideos] = useState([]);

  const fetchVideos = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/mentors/playlist-videos/${playlistId}/`);
      const data = await response.json();
      setVideos(data);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [playlistId]);

  return (
    <div className="container mx-auto mt-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {videos.map((video, index) => (
          <div
            key={video.id}
            className="bg-white p-6 rounded-lg shadow-md cursor-pointer transition duration-300"
            onClick={() => {
              setIsEnrolled(false);
              setSelectedPlaylistId(null);
            }}
          >
            <h3 className="text-lg text-black font-semibold mb-2">{video.title}</h3>
            <video
              controls
              className="w-full h-32 object-cover mb-4 rounded-lg"
              poster={BACKEND_BASE_URL + video.thumbnail}
            >
              <source src={BACKEND_BASE_URL + video.video_file} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <p className="text-sm text-gray-500">{`Video ${index + 1}`}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaylistVideos;
