// SubscriptionManagementPage.js

import React, { useEffect, useState } from 'react';
import AdminSidebar from './sidebar';
import axios from 'axios';
import { BACKEND_BASE_URL } from '../../utils/Config';
const SubscriptionManagementPage = () => {
  // Sample subscription data
  const initialSubscriptions = [];
  const [subscriptions, setSubscriptions] = useState(initialSubscriptions);
  const [editSubscription, setEditSubscription] = useState(null);

  useEffect(()=>{
    
    axios.get(BACKEND_BASE_URL+'/api/subscription/subscription-plans/').then((response)=>{
      setSubscriptions(response.data)
      
    }).catch((error)=>{
      console.log("============",error);
    })
  },[editSubscription])


  // State to manage subscriptions and the currently edited subscription


  // Function to open the edit modal for a subscription
  const openEditModal = (subscription) => {

    setEditSubscription(subscription);
  };

  // Function to close the edit modal
  const closeEditModal = () => {

    setEditSubscription(null);
  };

  // Function to save changes to the edited subscription
  const saveChanges = () => {
    axios.put(`${BACKEND_BASE_URL}/api/subscription/subscription-plans/${editSubscription.id}/`, editSubscription)
        .then(response => {
            console.log('Saved changes successfully:', response.data);
            closeEditModal();
        })
        .catch(error => {
            console.error('Error saving changes:', error);
            // Log the detailed error message from the server
            if (error.response) {
                console.error('Server error details:', error.response.data);
            }
        });
};

  

  return (
    <AdminSidebar>    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-semibold mb-5">Subscription Management</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {subscriptions.map((subscription) => (
          <div
            key={subscription.id}
            className="bg-white p-6 rounded-md shadow-md transition-transform transform hover:scale-105"
          >
            <h2 className="text-xl font-semibold mb-2">{subscription.name}</h2>
            <h2 className="text-xl font-semibold mb-2">{subscription.desc}</h2>
            <p className="text-gray-500 mb-2">${subscription.price} </p>
            
             {/* {subscription.duration}</p> */}
            <button
              className="bg-blue-500 text-white rounded-full px-4 py-2 hover:bg-blue-600 transition-colors"
              onClick={() => openEditModal(subscription)}
            >
              Edit
            </button>
          </div>
        ))}
      </div>

      {editSubscription && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-overlay absolute inset-0 bg-gray-900 opacity-50" onClick={closeEditModal}></div>

          <div className="modal-container bg-white w-96 mx-auto rounded shadow-lg z-50 overflow-y-auto">
            <div className="modal-content py-4 text-left px-6">
              <h2 className="text-2xl font-semibold mb-4">Edit Subscription</h2>
              <label className="block text-gray-600">Name</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2 mb-4"
                value={editSubscription.name}
                onChange={(e) => setEditSubscription({ ...editSubscription, name: e.target.value })}
              />
              <label className="block text-gray-600">Price</label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-md p-2 mb-4"
                value={editSubscription.price}
                onChange={(e) => setEditSubscription({ ...editSubscription, price: e.target.value })}
              />
              <label className="block text-gray-600">Duration</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2 mb-4"
                value={editSubscription.duration}
                onChange={(e) => setEditSubscription({ ...editSubscription, duration: e.target.value })}
              />
              <label className="block text-gray-600">description</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2 mb-4"
                value={editSubscription.desc}
                onChange={(e) => setEditSubscription({ ...editSubscription, desc: e.target.value })}
              />
              <div className="flex justify-end">
                <button
                  className="bg-blue-500 text-white rounded-full px-4 py-2 hover:bg-blue-600 transition-colors mr-2"
                  onClick={saveChanges}
                >
                  Save
                </button>
                <button
                  className="bg-gray-400 text-white rounded-full px-4 py-2 hover:bg-gray-500 transition-colors"
                  onClick={closeEditModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </AdminSidebar>

  );
};

export default SubscriptionManagementPage;
