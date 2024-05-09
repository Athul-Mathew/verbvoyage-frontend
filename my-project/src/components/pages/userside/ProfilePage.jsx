import React, { useEffect, useState } from 'react';
import jwtDecode from "jwt-decode";
import { getLocal } from '../../../actions/auth';
import defaultProfileImage from '../../../assets/batman-1.jpg'
import { BACKEND_BASE_URL } from '../../../utils/Config';
const ProfilePage = () => {
  const token = getLocal('authToken');
  const decoded = jwtDecode(token);

  const [name, setName] = useState('');
  const [profileImage, setProfileImage] = useState(defaultProfileImage);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState('');
  const [newImage, setNewImage] = useState(null);

  useEffect(() => {
    fetch(`${BACKEND_BASE_URL}/api/users/${decoded.user_id}/`)
      .then((response) => response.json())
      .then((data) => {
        setName(data);
        setProfileImage(data.profile_image);
       
      })
      .catch((error) => {
        console.log('error fetch', error);
      });
  }, []);

  const handleEditProfile = () => {
    setIsEditing(true);
    setNewName(name.name);
  };
  const handleSaveProfile = () => {
    const formData = new FormData();
    formData.append('name', newName);
  
    if (newImage) {
      formData.append('profile_image', newImage);
    }
  
    // Debugging statements
    for (let pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }
  
    fetch(`${BACKEND_BASE_URL}/api/editusers/${decoded.user_id}/`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setName(data);
        setProfileImage(data.profile_image);
        setIsEditing(false);
      })
      .catch((error) => {
        console.log('error saving profile', error);
        // Handle error appropriately
      });
  };
  
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setNewImage(file);  // Update the newImage state
  };
  
console.log(name)
  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-cyan-500 shadow-md rounded-md ">
      <div className="flex flex-col items-center mb-8">
        <img
          className="w-32 h-32 rounded-full mb-4 "
          src={profileImage}
          alt={`${name.name}'s Profile Photo`}
        />
        <h1 className="text-3xl font-bold text-white">{name.name}'s Profile</h1>
        <button
          className="bg-black hover:bg-cyan-500 text-white hover:text-black text-lg py-2 px-4 rounded-md mt-2"
          onClick={handleEditProfile}
        >
          Edit Profile
        </button>
      </div>

      <div className="bg-white rounded-md p-6 shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Contact Information</h2>
        <p className="text-gray-600">name:{name.name}</p>
        <p className="text-gray-600">email:{name.email}</p>
      </div>

      {isEditing && (
        <div className="modal fixed top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="modal-content bg-white p-8 rounded shadow-lg">
            <button
              className="absolute top-0 right-0 mt-2 mr-2 text-gray-700 cursor-pointer"
              onClick={() => setIsEditing(false)}
            >
              &times;
            </button>
            <h2 className="text-2xl mb-4 text-gray-800">Edit Profile</h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newName">
                New Name
              </label>
              <input
                id="newName"
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newImage">
                New Profile Image
              </label>
              <input
                id="newImage"
                type="file"
                onChange={handleImageChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <button
              onClick={handleSaveProfile}
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;