import React, { useState,useEffect } from 'react';
import AdminSidebar from '../admincomponents/sidebar';
import axios from 'axios';
import { BACKEND_BASE_URL } from '../../utils/Config';

const MentorManagementTable = () => {
  const [mentors, setMentors] = useState([]);



  useEffect(()=>{
    axios.get(BACKEND_BASE_URL+'/api/mentors/view-mentors/').then((response)=>{
      setMentors(response.data)

    }).catch((error)=>{
      console.log('error');
    })
  },[])


  return (
    <AdminSidebar>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg shadow-md divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                User Name
              </th>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Email ID
              </th>
              
              <th className="px-6 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {mentors.map((mentor) => (
              <tr key={mentor.id} className="hover:bg-gray-50 transform hover:scale-105">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {mentor.name}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {mentor.email}
                </td>
                
                
                <td className="px-6 py-4 text-sm font-medium">
                  {mentor.isBlocked ? (
                    <button
                      // onClick={() => handleUnblockUser(mentor.id)}
                      className="px-2 py-1 text-sm font-medium text-green-600 bg-green-200 rounded-full hover:bg-green-300 hover:text-white transition duration-300 ease-in-out transform hover:scale-105"
                    >
                      Unblock
                    </button>
                  ) : (
                    <button
                      // onClick={() => handleBlockUser(mentor.id)}
                      className="px-2 py-1 text-sm font-medium text-red-600 bg-red-200 rounded-full hover:bg-red-300 hover:text-white transition duration-300 ease-in-out transform hover:scale-105"
                    >
                      Block
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminSidebar>
  );
};

export default MentorManagementTable;
