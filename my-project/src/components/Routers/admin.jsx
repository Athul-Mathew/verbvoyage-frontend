import React from 'react'
import {BrowserRouter as Router ,Route,Routes} from 'react-router-dom';
import AdminPanel from '../../components/admincomponents/dashboard';
import { getLocal } from '../../actions/auth';
import jwtDecode from 'jwt-decode';
import { Navigate } from "react-router-dom";
import Table from '../admincomponents/table'
import MentorManagementTable from '../admincomponents/mentortable';
import MentorRequestTable from '../admincomponents/MentorRequestTable ';
import SubscriptionManagementTable from '../admincomponents/SubscriptionManagementTable ';
import MentorDetails from '../admincomponents/request';

function AdminRoute() {
    const token = getLocal('authToken');
  
    const decoded = jwtDecode(token);
    
  
  return (

    <div>
        <Routes>

        <Route path="/" element={(token!==null && decoded.is_admin )? <AdminPanel />:<Navigate to="/forbiden" />  }/>
        <Route path="/users" element={(token!==null && decoded.is_admin )? <Table />:<Navigate to="/forbiden" />  }/>
        <Route path="/request" element={(token!==null && decoded.is_admin )? <MentorDetails />:<Navigate to="/forbiden" />  }/>
        <Route path="/mentors" element={(token!==null && decoded.is_admin )? < MentorManagementTable/>:<Navigate to="/forbiden" />  }/>
        <Route path="/mentor-management" element={(token!==null && decoded.is_admin )? < MentorRequestTable/>:<Navigate to="/forbiden" />  }/>
        <Route path="/subscription-management" element={(token!==null && decoded.is_admin )? < SubscriptionManagementTable/>:<Navigate to="/forbiden" />  }/>
         
        


        </Routes>
    </div>
  )
}

export default AdminRoute