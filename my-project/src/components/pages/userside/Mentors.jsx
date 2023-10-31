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
console.log(mentors)
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
    <div className="bg-gradient-to-br from-yellow-300 to-yellow-500 text-black min-h-screen p-4">
      <div className="container mx-auto">
        <Link to="/userhome">
          <button className="bg-black hover:bg-white text-white hover:text-black py-2 px-4 rounded-full mb-8">
            Back to Home
          </button>
        </Link>
        <h1 className="text-4xl font-semibold mb-8">Mentors</h1>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mentors.map((mentor) => (
              <div
                key={mentor.id}
                className="bg-white text-black p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
              >
                <Link to={`/mentorchat/${mentor.id}`} className="flex flex-col items-center">
                  <img
                    src={mentor.image_url}
                    alt="profile"
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                  <h2 className="text-xl font-semibold">{mentor.name}</h2>
                  <p className="text-gray-400">{mentor.country}</p>
                  <button className="bg-primary-600 hover:bg-primary-700 text-white hover:text-black py-2 px-4 rounded-full mt-4">
                    Send a Chat Request
                  </button>
                  <Link to={'/uservideocall'}>
                    <button className="mt-2 text-sm text-gray-500 hover:underline">uservideocall</button>
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
