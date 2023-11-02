import React, { useState } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { getLocal } from '../../../actions/auth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { BACKEND_BASE_URL } from '../../../utils/Config';

function MentorApplication() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    qualifications: '',
    education: '',
    image: null,
    phoneNumber: '',
  });

  const token = getLocal('authToken');
  const decoded = jwtDecode(token);
  const user = decoded.user_id;

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === 'file') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }
      formDataToSend.append('user', user);

      const response = await axios.post(
        `${BACKEND_BASE_URL}/api/mentors/mentor-application/`,
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 201) {
        // Handle success
        console.log('Response from backend:', response.data);
        toast.success('Form submitted successfully', { duration: 3000 });
        navigate('/userhome');
      } else if (response.status === 400) {
        // Handle bad request (user already registered)
        console.error('User is already registered.');
        toast.error('User is already registered.', { duration: 3000 });
        navigate('/userhome');
      } else {
        // Handle other response statuses as needed
        toast.error('User is already registered.', { duration: 3000 });
        navigate('/userhome');
        console.error('Unexpected response status:', response.status);
      }
    } catch (error) {
      toast.error('User is already registered.', { duration: 5000 });
      navigate('/userhome');
      // Handle error
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div
      className="bg-gradient-to-b from-purple-900 via-blue-900 to-indigo-900 text-white min-h-screen p-4 md:p-8"
      style={{ backgroundImage: 'url("https://wallpapercave.com/wp/wp2239808.gif")', backgroundSize: 'cover' }}
    >
      <div className="container mx-auto max-w-md">
        <button
          className="absolute top-4 left-4 bg-cyan-400 hover:bg-cyan-700 text-white hover:text-black px-3 py-1 rounded-full transition duration-300 ease-in-out"
          onClick={() => window.history.back()}
        >
          Home
        </button>
        <h1 className="text-2xl md:text-4xl font-semibold text-center my-6 text-cyan-400">Apply to Become a Mentor</h1>
        <form onSubmit={handleSubmit} className="bg-black  text-white rounded-lg p-4 md:p-6 shadow-lg">
          <div className="mb-4">
            <label className="block text-cyan-400 text-sm mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border border-cyan-400 bg-transparent rounded-lg p-2 md:p-3 w-full focus:outline-none focus:ring focus-cyan-400 hover:border-pink-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-cyan-400 text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-transparent border border-cyan-400 rounded-lg p-2 md:p-3 w-full focus:outline-none focus:ring focus-cyan-400 hover:border-pink-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-cyan-400 text-sm mb-1">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="bg-transparent border border-cyan-400 rounded-lg p-2 md:p-3 w-full focus:outline-none focus:ring focus-cyan-400 hover:border-pink-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-cyan-400 text-sm mb-1">Qualifications</label>
            <textarea
              name="qualifications"
              value={formData.qualifications}
              onChange={handleChange}
              rows="4"
              className="bg-transparent border border-cyan-400 rounded-lg p-2 md:p-3 w-full focus:outline-none focus:ring focus-cyan-400 hover:border-pink-400"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-cyan-400 text-sm mb-1">Education</label>
            <textarea
              name="education"
              value={formData.education}
              onChange={handleChange}
              rows="4"
              className="bg-transparent border border-cyan-400 rounded-lg p-2 md:p-3 w-full focus:outline-none focus:ring focus-cyan-400 hover:border-pink-400"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-cyan-400 text-sm mb-1">Profile Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="bg-transparent border border-cyan-400 rounded-lg p-2 md:p-3 w-full focus:outline-none focus:ring focus-cyan-400 hover:border-pink-400"
            />
          </div>
          <div className="mb-4">
            <label className="block text-cyan-400 text-sm mb-1">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="bg-transparent border border-cyan-400 rounded-lg p-2 md:p-3 w-full focus:outline-none focus:ring focus-cyan-400 hover:border-pink-400"
            />
          </div>
          <button
            type="submit"
            className="bg-cyan-400 hover:bg-pink-600 text-white hover:text-black py-2 px-4 rounded-full w-full transition duration-300 ease-in-out"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
}

export default MentorApplication;
