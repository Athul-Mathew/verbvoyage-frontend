import React from 'react';
import { Link } from 'react-router-dom';

const CourseList = () => {
  // Replace this with your course data
  const courses = [
    { id: 1, title: 'Course 1' },
    { id: 2, title: 'Course 2' },
    // Add more courses
  ];

  return (
    <div className="container mx-auto mt-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {courses.map((course) => (
          <Link to={`/course/${course.id}`} key={course.id}>
            <div className="bg-white p-6 rounded-lg shadow-md cursor-pointer transition duration-300">
              <h3 className="text-lg text-black font-semibold mb-2">{course.title}</h3>
              {/* Add course details here */}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CourseList;
