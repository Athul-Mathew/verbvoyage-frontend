import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Assuming you're using React Router
import axios from 'axios';

const Activate = () => {
  const { uid, token } = useParams(); // Extract uid and token from the URL

  const [activationMessage, setActivationMessage] = useState('');

  useEffect(() => {
    // Make a GET request to your backend to activate the account
    axios
      .get(`/api/activate/${uid}/${token}`)
      .then((response) => {
        // Check the response from the backend
        if (response.data.message === 'Congrats! Account activated!') {
          setActivationMessage('Your account has been successfully activated.');
        } else {
          setActivationMessage('Invalid activation link. Please try again.');
        }
      })
      .catch((error) => {
        console.error('Activation error:', error);
        setActivationMessage('An error occurred during activation. Please try again later.');
      });
  }, [uid, token]);

  return (
    <div>
      <h2>Account Activation</h2>
      <p>{activationMessage}</p>
      {/* You can include a link to your login page here */}
      <a href="/login">Login</a>
    </div>
  );
};

export default Activate;
