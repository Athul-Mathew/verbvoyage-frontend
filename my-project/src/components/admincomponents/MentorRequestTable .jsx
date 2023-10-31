import React, { useEffect, useState } from 'react';
import AdminSidebar from '../admincomponents/sidebar';
import axios from 'axios';
import { BACKEND_BASE_URL } from '../../utils/Config';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getLocal } from '../../actions/auth';
import jwtDecode from 'jwt-decode';

const MentorRequestTable = () => {
  const [mentorRequests, setMentorRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null); // State to track the selected request
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = getLocal('authToken');
  
  const decoded = jwtDecode(token);
  console.log("=======",decoded); 
  const handleApprove = async (mentorId) => {
    try {
      const decoded = getLocal('authToken');
      const response = await axios.post(`${BACKEND_BASE_URL}/api/mentors/approve/${mentorId}/`, {}, {
        headers: {
          'Authorization': `Bearer ${decoded}`,
        },
      });
  
      console.log(response.data);
  
      // Set mentor_approved flag in localStorage based on the response
      const mentorApproved = response.data.mentor_approved;
      if (mentorApproved) {
        localStorage.setItem('mentor_approved', 'true');
        
      }
    } catch (error) {
      console.error('error approving', error);
    }
  };
  
  
const handleReject = async (mentorId) => {
  try {
    await axios.post(`${BACKEND_BASE_URL}/api/mentors/reject/${mentorId}/`);
    toast.success('Form submitted successfully', { duration: 3000 });
  } catch (error) {
    console.error('Error rejecting mentor request:', error);
    // Handle error or show an error message
  }
};
  

  const handleToggleView = (requestId) => {
    // Find the selected request by ID
    const request = mentorRequests.find((request) => request.id === requestId);
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  useEffect(() => {
    axios.get(BACKEND_BASE_URL + '/api/mentors/view-mentors-request/').then((response) => {
      setMentorRequests(response.data);
    }).catch((error) => {
      console.log('error');
    });
  }, [mentorRequests]);

  return (
    <AdminSidebar>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg shadow-md divide-y divide-gray-200">
          {/* ...Table headers */}
          <tbody className="divide-y divide-gray-200">
            {mentorRequests.map((request) => (
              <tr key={request.id} className="hover:bg-gray-50 transform hover:scale-105">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {request.name}
                </td>
                <td className="px-6 py-4 text-sm font-medium">
                  <button
                    onClick={() => handleToggleView(request.id)}
                    className={`px-2 py-1 text-sm font-medium ${
                      request.viewable
                        ? 'text-green-600 bg-green-200'
                        : 'text-blue-600 bg-blue-200'
                    } rounded-full hover:bg-blue-300 hover:text-white transition duration-300 ease-in-out transform hover:scale-105`}
                  >
                    {request.viewable ? 'Hide' : 'View'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && selectedRequest && (
       <div className="fixed inset-0 flex items-center justify-center z-50">
       <div className="modal-overlay absolute inset-0 bg-gray-900 opacity-50" onClick={() => setIsModalOpen(false)}></div>
     
       <div className="modal-container bg-white w-96 mx-auto rounded shadow-lg z-50 overflow-y-auto">
         <div className="modal-content py-4 text-left px-6">
           <h2 className="text-2xl font-semibold mb-4">{selectedRequest.name}</h2>
           <img src={selectedRequest.image} alt={selectedRequest.name} className="w-full mb-4 rounded-lg" />
           <div className="mb-4">
             <p className="text-lg mb-2">
               <span className="text-blue-600 font-bold">Email:</span> {' '}
               <span className="text-green-600 font-bold">{selectedRequest.email}</span>
             </p>
             <p className="text-lg mb-2">
               <span className="text-blue-600 font-bold">Phone Number:</span> {' '}
               <span className="text-green-600 font-bold">{selectedRequest.phoneNumber}</span>
             </p>
             <p className="text-lg mb-2">
               <span className="text-blue-600 font-bold">Age:</span> {' '}
               <span className="text-green-600 font-bold">{selectedRequest.age}</span>
             </p>
             <p className="text-lg mb-2">
               <span className="text-blue-600 font-bold">Qualification:</span> {' '}
               <span className="text-green-600 font-bold">{selectedRequest.qualifications}</span>
             </p>
             <p className="text-lg mb-2">
               <span className="text-blue-600 font-bold">Education:</span> {' '}
               <span className="text-green-600 font-bold">{selectedRequest.education}</span>
             </p>
           </div>
           <div className="mt-4 flex justify-end">
             <button
               className="px-4 py-2 mr-2 bg-green-500 text-white rounded hover:bg-green-600"
               onClick={() => {
                handleApprove(selectedRequest.id);
                 setIsModalOpen(false);
               }}
             >
               Approve
             </button>
             <button
               className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
               onClick={() => {
                handleReject(selectedRequest.id)
                 
                 setIsModalOpen(false);
               }}
             >
               Reject
             </button>
           </div>
         </div>
       </div>
     </div>
     
      )}
    </AdminSidebar>
  );
};

export default MentorRequestTable;
