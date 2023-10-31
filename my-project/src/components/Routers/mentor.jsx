import React from 'react'
import {Route,Routes} from 'react-router-dom';
import jwtDecode from "jwt-decode";
import { getLocal } from '../../actions/auth';
import { Navigate } from "react-router-dom";
import MentorHomePage from '../pages/mentor/mentorhome'
import Uploadvideo from '../pages/mentor/uploadvideo'
import Viewvideo from '../pages/mentor/displayvideo'
import Mchat from '../pages/mentor/mentorchat'

function MentorRoute() {
  const token = getLocal('authToken');
  const decoded = jwtDecode(token)
  return (
    <div>
        {/* MENTORPAGES */}

        <Routes>
        <Route path="/mentor-home" element={token !== null && decoded.is_staff ? <MentorHomePage /> : <Navigate to="/forbiden" />} />
        <Route path="/upload-video" element={token !== null && decoded.is_staff ? <Uploadvideo /> : <Navigate to="/forbiden" />} />
        
        <Route path="/view-video" element={token !== null && decoded.is_staff ? <Viewvideo /> : <Navigate to="/forbiden" />} />
        <Route path="/mentorchat" element={token !== null && decoded.is_staff ? < Mchat/> : <Navigate to="/forbiden" />} />
          {/* <Route path="/mentorchat/:mentor" element={<Mentorsidechat/>} /> */}
        </Routes>
    </div>
  )
}

export default MentorRoute