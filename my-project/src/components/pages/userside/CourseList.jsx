import React, { useState, useEffect } from 'react';
import premium from '../../../assets/premiumbg.png';
import free from '../../../assets/free.jpg';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader';
import { BACKEND_BASE_URL } from '../../../utils/Config';

const CourseList = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
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

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
    navigate(`/course/${course.id}`); // Navigate to the course detail page
  };

  return (
    <div className="bg-gradient-to-b from-cyberpunk-bg1 via-cyberpunk-bg2 to-cyberpunk-bg3 text-cyberpunk-text min-h-screen p-4 md:p-8">
      <div className="container mx-auto mt-8">
        <h2 className="text-4xl font-bold text-center my-6 text-cyberpunk-title">Top Courses</h2>

        {isLoading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-cyberpunk-bg text-cyberpunk-text rounded-lg p-6 shadow-lg cursor-pointer transition duration-300"
                onClick={() => handleCourseClick(course)}
              >
                <img
                  className="w-full h-32 object-cover mb-4 rounded-lg"
                  src={course.premium ? premium : free}
                  alt={course.premium ? 'premium' : 'free'}
                />
                <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
                <div className="flex justify-between items-center">
                  <span className={`text-sm font-bold ${course.premium ? 'text-yellow-500' : 'text-green-600'}`}>
                    {course.premium ? 'Premium' : 'Free'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseList;
