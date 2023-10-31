import React, {  useState } from 'react';
import LoginImg from '../../../assets/login.jpeg';
import { toast, Toaster } from 'react-hot-toast'
import { FcGoogle } from 'react-icons/fc';
import { BACKEND_BASE_URL } from '../../../utils/Config';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import Loader from '../Loader';

function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoader] = useState(false); // Add isLoading state

  const navigate = useNavigate();

  const data = {
    email,
    name,
    password,
  };

  const signupSubmit = async (e) => {
    e.preventDefault();
    try {
      if (password === confirmPassword) {
        setIsLoader(true); // Set isLoading to true before the API call

        try {
          const response = await axios.post(
            BACKEND_BASE_URL + '/api/signup/',
            data
          );
          if (response.status === 200) {
            toast.success(
              'Registration successful! Check your email to activate your account',
              { duration: 4000 }
            );
          } else {
            toast.error('Something went wrong');
          }
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoader(false); // Set isLoading back to false when the API call is finished
        }
      } else {
        toast.error('Password mismatch');
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen"
      style={{
        background: `url(${LoginImg}) center/cover no-repeat`,
      }}
    >
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      {isLoading ? ( // Render the loader if isLoading is true
        <Loader />
      ) : (
        // Render the signup form when isLoading is false
        <div className="bg-white p-8 rounded-lg shadow-md max-w-xl w-full">
          <h2 className="text-4xl font-bold text-center mb-6">Sign Up</h2>
          <form onSubmit={signupSubmit}>
            <div className="mb-4">
              <input
                className="border border-gray-300 rounded px-4 py-3 w-full placeholder-gray-400 text-lg"
                type="text"
                name="username"
                placeholder="Username"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <input
                className="border border-gray-300 rounded px-4 py-3 w-full placeholder-gray-400 text-lg"
                type="email"
                name="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <input
                className="border border-gray-300 rounded px-4 py-3 w-full placeholder-gray-400 text-lg"
                type="password"
                name="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <input
                className="border border-gray-300 rounded px-4 py-3 w-full placeholder-gray-400 text-lg"
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-full w-full transition duration-300"
              type="submit"
            >
              Create Account
            </button>
          </form>
          <div className="text-center mt-4">
            <p>
              Already have an account?{' '}
              <Link to="/login" className="text-blue-500 hover:underline">
                Login
              </Link>
            </p>
          </div>
          <div className="mt-6 flex items-center justify-center">
            <FcGoogle className="mr-2" />
            <p>Sign Up with Google</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default SignupPage;