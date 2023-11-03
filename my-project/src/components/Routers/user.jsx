import React, { useState } from 'react'

import {BrowserRouter as Router ,Route,Routes} from 'react-router-dom';
import jwtDecode from "jwt-decode";
import { getLocal } from '../../actions/auth';
import { Navigate } from "react-router-dom";
import UserHome from '../pages/userside/UserHome';
import MentorList from '../pages/userside/Mentors';
import BecomeMentor from '../pages/userside/BecomeMentor'
import SignupPage from '../pages/registration/Signup';
import Home from '../pages/registration/Home';
import Login2 from '../pages/registration/Login2'
import SubscriptionPage from '../pages/userside/SubscriptionPage';
import ProfilePage from '../pages/userside/ProfilePage';
import Success from '../pages/userside/success'
import CourseList from '../pages/userside/CourseList';
import Video from '../../components/pages/userside/PlaylistVideos'
import Chat from '../../components/pages/userside/chat'
import Soon from '../../components/pages/userside/soon'
import Videocall from '../../components/pages/videocall/videocall'
import NotPremiumPage from '../pages/userside/notpremium';
import { useEffect } from 'react';
import Course from '../pages/userside/course'
import Check from '../pages/userside/check'
function UserRoutes() {
  const token = getLocal('authToken');
  const [premium ,setPremium] = useState(false)

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      if (decoded.is_premium) {
        setPremium(true);
      }
    }
  }, [token]);
  
 
  return (
    
        <div>
            {/* USERSIDEPAGES */}
            

          <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path="/userhome" element={ (token!==null )? <UserHome/>:<Navigate to="/forbiden" /> } />
          
          <Route path="/signup" element={<SignupPage/>} />
          <Route path="/check" element={<Check/>} />
          <Route path='/login' element={<Login2/>}/>
          <Route path="/mentor-list" element={ premium?< MentorList />:<Navigate to="/notpremium" />} />
          <Route path="/become-mentor" element={<BecomeMentor/>} />
          <Route path="/subscription" element={premium?<Navigate to='/success'/>: <SubscriptionPage />} />
          
        
          <Route path='/success' element={<Success/>} />
          <Route path='/notpremium' element={<NotPremiumPage/>} />
         
          <Route path="/profile" element={<ProfilePage/>} />
          <Route path="/course" element={<CourseList/>} />
          <Route path="/course/:courseId" element={<Course />} />

          
          <Route path="/video-list" element={<Video/>} />
          <Route path="/chat" element={<Chat/>} />
        
          <Route path="/soon" element={ (token!==null )? <Soon/>:<Navigate to="/forbiden" /> } />

        
          <Route path="/uservideocall" element={<Videocall/>} />
          
          </Routes>

        </div>

  )
}


export default UserRoutes








