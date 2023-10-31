import axios  from 'axios';
import React from 'react'
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BACKEND_BASE_URL } from '../../../utils/Config';

function Chatlist() {
    const [recipientdet, setRecipientDet] = useState([]);
    const [activeUserId, setActiveUserId] = useState(null);
    // const [searchQuery, setSearchQuery] = useState('');

    const setUserProfileDet = async () => {
        try {
            const response = await axios.get(
                `${BACKEND_BASE_URL}/api/staff/`
            );
            setRecipientDet(response.data);
            console.log("Employee data:", response.data);
        } catch (error) {
            console.error("Error fetching employee data:", error);
        }
    };

    useEffect(() => {
        setUserProfileDet();
    }, []);

    const handleUserClick = (userId) => {
        setActiveUserId(userId);
    };


  return (
    <div className="border-r border-gray-300 lg:col-span-1">
    <div className="mx-3 my-3">
        <div className="relative text-gray-600">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    viewBox="0 0 24 24" className="w-6 h-6 text-gray-300">
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
            </span>
            {/* <input
                type="search"
                className="block w-full py-2 pl-10 bg-gray-100 rounded-xl outline-none"
                name="search"
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearchInputChange}
            /> */}
        </div>
    </div>

    <ul className="overflow-auto h-[32rem]">
        <h2 className="my-2 mb-2 ml-2 text-xl font-bold text-gray-600"></h2>

        {recipientdet.map((user) => (
            <li key={user.id}>

                <a
                    onClick={() => handleUserClick(user.id)}
                    className={`flex items-center rounded-xl px-3 mb-3 py-2 text-sm transition duration-150 ease-in-out  cursor-pointer focus:outline-none ${activeUserId === user.id ? ' bg-indigo-300' : 'bg-gray-100 text-gray-600 border-black'
                        }`}
                >
                    {/* <img className="object-cover w-10 h-10 rounded-full" src={BACKEND_BASE_URL + user.profile_img} alt="" /> */}
                    <Link to={`/chat/chatbox/${user.id}/`}>
                        <div className="w-full pb-2">
                            <div className="flex justify-between">
                                <span className="block ml-2 font-bold">{user.name}</span>
                            </div>
                        </div>
                    </Link>
                </a>
            </li>
         ))} 
    </ul>
</div>
);
}

export default Chatlist