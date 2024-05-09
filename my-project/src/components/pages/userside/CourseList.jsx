// CourseList.js
import React, { useState, useEffect } from 'react';
import premium from '../../../assets/premiumbg.png';
import free from '../../../assets/free.jpg';
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
    <div className="bg-cyan" style={{ backgroundImage: "url('https://www.google.com/imgres?q=gif%20blue%20&imgurl=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F7e%2Fc7%2F0b%2F7ec70b9ed2f3d8194bbb437a348e82d7.gif&imgrefurl=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F319826011019318047%2F&docid=qJTSFRRTGBd3xM&tbnid=Bb5m2EFwXF1_SM&vet=12ahUKEwiQ4OHEkICGAxU3amwGHQlZCIoQM3oECEkQAA..i&w=500&h=281&hcb=2&ved=2ahUKEwiQ4OHEkICGAxU3amwGHQlZCIoQM3oECEkQAA')" }}>
    <div className="container mx-auto mt-8 bg-cyan-400 p-8 rounded-lg">
      <h2 className="text-4xl font-bold text-black mb-8">Top Courses</h2>

      {isLoading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div
              key={course.id}
              className={`bg-cyan p-6 rounded-lg shadow-md cursor-pointer transition duration-300 ${
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
              <h3 className="text-lg text-black font-semibold mb-2">{course.title}</h3>
              <div className="flex justify-between items-center">
                {course.premium ? (
                  <span className="text-sm font-bold text-cyan-500">Premium</span>
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
    </div>
  );
};

export default CourseList;
