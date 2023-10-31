// MentorDetails.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MentorDetails = ({ match }) => {
  const [mentor, setMentor] = useState(null);

  useEffect(() => {
    const mentorId = match.params.id; // Assuming you have a route parameter for mentor ID
    axios.get(`/api/mentors/${mentorId}`)
      .then((response) => {
        setMentor(response.data);
      })
      .catch((error) => {
        console.error('Error fetching mentor details:', error);
      });
  }, [match.params.id]);

  if (!mentor) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-black text-white p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-semibold mb-4">{mentor.name}</h1>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <img src={mentor.image} alt={mentor.name} className="w-full rounded-lg" />
          </div>
          <div>
            <p>Email: {mentor.email}</p>
            <p>Education: {mentor.education}</p>
            <p>Phone Number: {mentor.phone}</p>
            <p>Qualification: {mentor.qualification}</p>
            <div className="mt-4">
              <button className="px-4 py-2 bg-green-500 text-white rounded-lg mr-2 hover:bg-green-600">
                Approve
              </button>
              <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                Reject
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorDetails;
