import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from './Loader';
import { BACKEND_BASE_URL } from '../utils/Config';

const CourseDetail = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [courseDetails, setCourseDetails] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await fetch(`${BACKEND_BASE_URL}/api/courses/${courseId}`);
        const responseBody = await response.json();
        setCourseDetails(responseBody);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching course details:', error);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  const handleVideoSelection = (video) => {
    setSelectedVideo(video);
  };

  return (
    <div className="bg-gradient-to-b from-purple-900 via-blue-900 to-indigo-900 text-white min-h-screen p-4 md:p-8">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-cyberpunk-title mb-4">
            {courseDetails.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-cyberpunk-bg text-cyberpunk-text rounded-lg p-4 md:p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-cyberpunk-title mb-4">
                Course Details
              </h3>
              <p className="text-cyberpunk-text">
                {courseDetails.description}
              </p>
            </div>
            <div className="bg-cyberpunk-bg text-cyberpunk-text rounded-lg p-4 md:p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-cyberpunk-title mb-4">
                Video Selection
              </h3>
              <ul>
                {courseDetails.videos.map((video) => (
                  <li
                    key={video.id}
                    className={`cursor-pointer mb-2 ${
                      selectedVideo === video ? 'text-cyberpunk-highlight' : ''
                    }`}
                    onClick={() => handleVideoSelection(video)}
                  >
                    {video.title}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="bg-cyberpunk-bg text-cyberpunk-text rounded-lg p-4 md:p-6 shadow-lg mt-8">
            <h3 className="text-xl font-semibold text-cyberpunk-title mb-4">
              Video Player
            </h3>
            {selectedVideo ? (
              <div>
                <h4 className="text-cyberpunk-highlight mb-2">
                  {selectedVideo.title}
                </h4>
                <video controls width="100%">
                  <source src={selectedVideo.video_url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            ) : (
              <p className="text-cyberpunk-text">
                Select a video to start watching.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetail;
