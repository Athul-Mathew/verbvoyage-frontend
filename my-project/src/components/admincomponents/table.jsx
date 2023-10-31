import React, { useState,useEffect } from 'react';
import AdminSidebar from '../admincomponents/sidebar';
import axios from 'axios';
import { BACKEND_BASE_URL } from '../../utils/Config';

const UserManagementTable = () => {
  const [users, setUsers] = useState([]);



  
  const handleBlockUser = (userId) => {
  console.log('==================');
    axios
      .post(`${BACKEND_BASE_URL}/api/block_user/${userId}/`)
      .then((response) => {
        
        console.log(response.data);
       
        const updatedUsers = users.map((user) =>
          user.id === userId ? { ...user, isBlocked: true } : user
        );
        setUsers(updatedUsers);
      })
      .catch((error) => {
     
        console.error('Error blocking user:', error);
      });
  };
  
  const handleUnblockUser = (userId) => {
   
    axios
      .post(`${BACKEND_BASE_URL}/api/unblock_user/${userId}/`)
      .then((response) => {
      
        console.log(response.data);
        
        const updatedUsers = users.map((user) =>
          user.id === userId ? { ...user, isBlocked: false } : user
        );
        setUsers(updatedUsers);
      })
      .catch((error) => {
       
        console.error('Error unblocking user:', error);
      });
  };
  
 

useEffect(() => {
  axios.get(BACKEND_BASE_URL+'/api/users/') 
    .then((response) => {
      setUsers(response.data);
    })
    .catch((error) => {
      console.error('Error fetching users:', error);
    });
}, []);

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
                Mentor
              </th>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transform hover:scale-105">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {user.name}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {user.email}
                </td>
                <td className="px-6 py-4 text-sm font-medium">
                  <span className={`text-sm ${user.isMentor ? 'text-green-600' : 'text-red-600'}`}>
                    {user.is_staff ? 'Yes' : 'No'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-medium">
                  {user.isBlocked ? (
                    <button
                      onClick={() => handleUnblockUser(user.id)}
                      className="px-2 py-1 text-sm font-medium text-green-600 bg-green-200 rounded-full hover:bg-green-300 hover:text-white transition duration-300 ease-in-out transform hover:scale-105"
                    >
                      Unblock
                    </button>
                  ) : (
                    <button
                      onClick={() => handleBlockUser(user.id)}
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

export default UserManagementTable;
