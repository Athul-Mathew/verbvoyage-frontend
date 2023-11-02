import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../Loader';
import { getLocal } from '../../../actions/auth';
import jwtDecode from 'jwt-decode';
import { BACKEND_BASE_URL } from '../../../utils/Config';

function MentorList() {
  const [mentors, setMentors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const token = getLocal('authtoken');
  const decoded = jwtDecode(token);

  useEffect(() => {
    fetch(`${BACKEND_BASE_URL}/api/mentors/mentors/`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.mentors)) {
          setMentors(data.mentors);
        } else {
          console.error('Data format is incorrect:', data);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="bg-gradient-to-br from-purple-900 to-indigo-900 text-cyberpunk-text min-h-screen p-4">
      <div className="container mx-auto">
        <Link to="/userhome">
          <button className="bg-cyberpunk-bg hover:bg-cyberpunk-text text-white hover:text-black py-2 px-4 rounded-full mb-8">
            Back to Home
          </button>
        </Link>
        <h1 className="text-4xl font-semibold text-cyberpunk-title mb-8">Mentors</h1>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mentors.map((mentor) => (
              <div
                key={mentor.id}
                className="bg-cyberpunk-bg text-cyberpunk-text p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
              >
                <Link to={`/mentorchat/${mentor.id}`} className="flex flex-col items-center">
                  <img
                    src={mentor.image_url}
                    alt="profile"
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                  <h2 className="text-xl font-semibold">{mentor.name}</h2>
                  <p className="text-gray-400">{mentor.country}</p>
                  <button className="bg-cyberpunk-button hover:bg-cyberpunk-button-hover text-cyberpunk-text hover:text-cyberpunk-bg py-2 px-4 rounded-full mt-4">
                    Send a Chat Request
                  </button>
                  <Link to={'/uservideocall'}>
                    <button className="mt-2 text-sm text-cyberpunk-link hover:underline">uservideocall</button>
                  </Link>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MentorList;
