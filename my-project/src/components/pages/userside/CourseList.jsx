import React, { useState, useEffect } from 'react';
import PlaylistVideos from './PlaylistVideos';
import Loader from '../Loader';
import { BACKEND_BASE_URL } from '../../../utils/Config';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch(`${BACKEND_BASE_URL}/api/mentors/user-playlists/`);
      const responseBody = await response.json();
      setCourses(responseBody);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEnroll = (playlistId) => {
    setSelectedPlaylistId(playlistId);
    setIsEnrolled(true);
  };

  return (
    <div className="bg-cyberpunk-bg text-cyberpunk-text min-h-screen p-8">
      <h2 className="text-4xl font-bold text-cyberpunk-title mb-8">Top Courses</h2>

      {isLoading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div
              key={course.id}
              className={`bg-cyberpunk-bg text-cyberpunk-text p-6 rounded-lg shadow-md cursor-pointer transition duration-300 ${
                isEnrolled && selectedPlaylistId !== course.id ? 'opacity-50' : ''
              }`}
              onClick={() => handleEnroll(course.id)}
            >
              {course.premium ? (
                <img
                  className="w-full h-32 object-cover mb-4 rounded-lg"
                  src={premium}
                  alt={'premium'}
                />
              ) : (
                <img
                  className="w-full h-32 object-cover mb-4 rounded-lg"
                  src={free}
                  alt={'free'}
                />
              )}
              <h3 className="text-lg text-cyberpunk-title font-semibold mb-2">{course.title}</h3>
              <div className="flex justify-between items-center">
                {course.premium ? (
                  <span className="text-sm font-bold text-yellow-500">Premium</span>
                ) : (
                  <span className="text-sm font-bold text-green-600">Free</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedPlaylistId && (
        <PlaylistVideos
          playlistId={selectedPlaylistId}
          setIsEnrolled={setIsEnrolled}
          setSelectedPlaylistId={setSelectedPlaylistId}
        />
      )}
    </div>
  );
};

export default CourseList;
