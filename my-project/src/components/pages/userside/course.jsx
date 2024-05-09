import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BACKEND_BASE_URL } from '../../../utils/Config';

const CourseDetail = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); // Added error state

  const fetchCourseData = async () => {
    try {
      const response = await fetch(`${BACKEND_BASE_URL}/api/courses/${courseId}`);
      if (!response.ok) {
        throw new Error('Course data request failed');
      }
      const responseBody = await response.json();
      setCourse(responseBody);
    } catch (error) {
      console.error('Error fetching course data:', error);
      setError(error.message); // Set the error state
    }
  };

  const fetchVideos = async () => {
    try {
      const response = await fetch(`${BACKEND_BASE_URL}/api/courses/${courseId}/videos`);
      if (!response.ok) {
        throw new Error('Videos request failed');
      }
      const responseBody = await response.json();
      setVideos(responseBody);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching videos:', error);
      setError(error.message); // Set the error state
    }
  };

  useEffect(() => {
    fetchCourseData();
    fetchVideos();
  }, [courseId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (isLoading || !course) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto mt-8 bg-cyan-400">
  <h2 className="text-4xl font-bold text-center my-6 text-cyberpunk-title">{course.title}</h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    <div className="bg-cyberpunk-bg text-cyberpunk-text rounded-lg p-6 shadow-lg">
      <img
        className="w-full h-64 object-cover mb-4 rounded-lg"
        src={course.image}
        alt={course.title}
      />
      <p className="text-lg mb-4">{course.description}</p>
      <span className={`text-sm font-bold ${course.premium ? 'text-black-500' : 'text-green-600'}`}>
        {course.premium ? 'Premium' : 'Free'}
      </span>
    </div>

    <div className="bg-cyberpunk-bg text-cyberpunk-text rounded-lg p-6 shadow-lg">
      <h3 className="text-2xl font-semibold mb-4">Videos</h3>
      <ul>
        {videos.map((video) => (
          <li key={video.id} className="text-lg mb-2">
            {video.title}
          </li>
        ))}
      </ul>
    </div>
  </div>
</div>

  );
};

export default CourseDetail;
