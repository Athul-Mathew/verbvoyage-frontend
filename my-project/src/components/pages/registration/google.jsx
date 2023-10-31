
import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';

import axios from 'axios';
import { FaGoogle } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

import { useNavigate } from 'react-router-dom';


function GApp() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate()

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('login failed:', error)
  });

  useEffect(() => {
    if (user) {
      {console.log(user+'==========')}
      axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${user['access_token']}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user['access_token']}`
          }
        })
        
        .then(
          (response) => {
            console.log('changes');
            setProfile(response['data']);

          },
          (error) => {
            console.log(error);
          }
        );
    }
  }, [user]);


  useEffect(() => {
    if (profile === null) {
      console.log('profile null');
    } else {
      console.log('sending data to django');

      console.log('profile>>>>>>',profile);
      const profileData = {
        name: profile['name'],
        email: profile['email'],
        username: profile['given_name']+ " " + profile['family_name'],
        password: profile['id'],
      };

      console.log('profile data >>>>>>',profileData);

      axios.post('http://127.0.0.1:8000/api/google_authentication/', profileData).then(

        (response) => {
          

          navigate('/userhome')
          const token=response['data'].token
          console.log('token=='+token);
          localStorage.setItem('userJWT', token);
          console.log(response['data'].token);
        },
        (error) => {
          console.log(error);
        }
          );
        }
      }, [profile]);

  const logout = () => {
    googleLogout();
    setProfile(null);
  };


  return (
    <div>
      {profile ? (
        <div>

        </div>
      ) : (
        <div className="login-container text-white bg-black p-3 rounded-md">
          <button className="login-button flex items-center" onClick={login}>
            <FcGoogle />

            <h2 className="login-heading">Login</h2>

          </button>
        </div>
      )}
    </div>
  );
}

export default GApp;