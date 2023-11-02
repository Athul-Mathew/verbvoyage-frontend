// PlaylistList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { BACKEND_BASE_URL } from '../../../utils/Config';
import { getLocal } from '../../../actions/auth';
import jwtDecode from 'jwt-decode';

function PlaylistList() {
    const [selectedPlaylist, setSelectedPlaylist] = useState(null);
    const [playlistsData, setPlaylistsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isCreatePlaylistModalOpen, setCreatePlaylistModalOpen] = useState(false);
    const [isAddVideoModalOpen, setAddVideoModalOpen] = useState(false);
    const [selectedPlaylistId, setSelectedPlaylistId] = useState("");
    const [newPlaylistTitle, setNewPlaylistTitle] = useState('');
    const [newPlaylistPremium, setNewPlaylistPremium] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [newVideoTitle, setNewVideoTitle] = useState('');
    const [newVideoFile, setNewVideoFile] = useState(null);
    const [newVideoThumbnail, setNewVideoThumbnail] = useState(null);
    console.log("====0000--", selectedPlaylist);

    useEffect(() => {


        const fetchPlaylists = async () => {
            try {
                const token = getLocal('authToken');

                if (token) {
                    const decoded = jwtDecode(token);
                    const user_id = decoded.user_id;

                    const response = await axios.get(`${BACKEND_BASE_URL}/api/mentors/playlists/`, {
                        params: { user_id },
                    });

                    setPlaylistsData(response.data);
                    setLoading(false);
                } else {
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error fetching playlists:', error);
                setLoading(false);
            }
        };

        fetchPlaylists();
    }, []);

    const openModal = () => {
        setModalOpen(true);

    };

    const closeModal = () => {
        setModalOpen(false);

    };

    const handlePlaylistClick = async (playlist) => {
        try {
            const token = getLocal('authToken');

            if (token) {
                const decoded = jwtDecode(token);
                const user_id = decoded.user_id;
                console.log(decoded);

                const response = await axios.get(`${BACKEND_BASE_URL}/api/mentors/videos/`, {
                    params: { user_id, playlist_id: playlist.id },
                });

                setSelectedPlaylist({ ...playlist, videos: response.data });
            }
        } catch (error) {
            console.error('Error fetching videos for the playlist:', error);
        }
    };

    const handleVideoDelete = (videoId) => {
        const token = getLocal('authToken');

        if (token) {
            axios
                .delete(`${BACKEND_BASE_URL}/api/mentors/videos/${videoId}/delete/`)
                .then((response) => {
                    console.log(`Video with ID ${videoId} deleted successfully.`);
                })
                .catch((error) => {
                    console.error('Error deleting video:', error);
                });
        }
    };

    const handlePlaylistDelete = (playlistId) => {
        const token = getLocal('authToken');

        if (token) {
            axios
                .delete(`${BACKEND_BASE_URL}/api/mentors/playlists/${playlistId}/delete/`)
                .then((response) => {
                    console.log(`Playlist with ID ${playlistId} deleted successfully.`);
                })
                .catch((error) => {
                    console.error('Error deleting playlist:', error);
                });
        }
    };

    const handleCreatePlaylist = () => {
        const token = getLocal('authToken');

        if (token) {
            const decoded = jwtDecode(token);
            const user_id = decoded.user_id;

            const playlistData = {
                title: newPlaylistTitle,
                premium: newPlaylistPremium,
                user_id: user_id,
            };

            axios.post(`${BACKEND_BASE_URL}/api/mentors/playlists/create/`, playlistData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((response) => {
                    console.log('Playlist created successfully:', response.data);

                    // Assuming playlistsData is the current state of playlistsData
                    setPlaylistsData([...playlistsData, response.data]);
                })
                .catch((error) => {
                    console.error('Error creating playlist:', error);
                })
                .finally(() => {
                    setCreatePlaylistModalOpen(false);
                });
        }
    };


    const handleAddVideo = () => {
        const token = getLocal('authToken');

        if (token) {
            const decoded = jwtDecode(token);
            const user_id = decoded.user_id;

            // Perform a request to your backend to get the mentor ID for the given user ID
            axios.get(`${BACKEND_BASE_URL}/api/mentors/get-mentor-id/${user_id}/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },

            })
                .then((response) => {
                    const mentor_id = response.data.mentor_id;

                    // Now you have the mentor_id, you can use it in your form data
                    const formData = new FormData();
                    formData.append('title', newVideoTitle);
                    formData.append('video_file', newVideoFile);
                    formData.append('thumbnail', newVideoThumbnail);
                    formData.append('mentor', mentor_id);
                    formData.append('playlist', selectedPlaylistId);

                    // Continue with your axios.post request
                    axios.post(`${BACKEND_BASE_URL}/api/mentors/videos/create/`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: `Bearer ${token}`,
                        },
                    })
                        .then((response) => {
                            console.log('Video created successfully:', response.data);
                        })
                        .catch((error) => {
                            console.error('Error creating video:', error);
                        })
                        .finally(() => {
                            setAddVideoModalOpen(false);
                        });
                })
                .catch((error) => {
                    console.error('Error getting mentor ID:', error);
                });
        }
    };



    return (
        
        <div className={`bg-gradient-to-b from-purple-600 to-blue-900 text-white min-h-screen relative" ${isModalOpen ? 'filter blur-md' : ''} transition-all duration-300 ease-in-out`}>
            <div className="flex flex-col md:flex-row">
                <div className={`w-full md:w-1/4 bg-gradient-to-r from-cyberpunk-bg1 via-cyberpunk-bg2 to-cyberpunk-bg3 p-4 text-white`}>
                    <div className="text-2xl font-bold mb-4">Video Manager</div>
                    <div className="space-y-4">
                        {playlistsData.map((playlist, index) => (
                            <div
                                key={`playlist-${playlist.id}-${index}`}
                                onClick={() => handlePlaylistClick(playlist)}
                                className={`cursor-pointer flex items-center p-2 space-x-2 ${selectedPlaylist?.id === playlist.id ? 'bg-black' : 'hover:bg-gray-700'}`}
                            >
                                <div className="flex-shrink-0 w-10 h-10 rounded overflow-hidden">
                                    <img
                                        src="https://via.placeholder.com/50"
                                        alt="Playlist Thumbnail"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex-1 truncate text-cyberpunk-text">{playlist.title}</div>
                            </div>
                        ))}
                        {selectedPlaylist && (
                            <button
                                onClick={() => handlePlaylistDelete(selectedPlaylist.id)}
                                className="text-red-500 bg-gray-700 px-2 py-1 rounded"
                            >
                                Delete Playlist
                            </button>
                            
                        )}
                    </div>
                </div>


                <div className="w-full md:w-3/4 p-4">
                    {selectedPlaylist ? (
                        <div>
                            <div className="text-2xl font-bold mb-4 text-black">
                                Videos in {selectedPlaylist.title}
                            </div>
                            {selectedPlaylist.videos && selectedPlaylist.videos.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {selectedPlaylist.videos.map((video) => (
                                        <div
                                            key={`video-${video.id}`}
                                            className="bg-gradient-to-r from-gray-800 via-blue-900 to-green-900 p-4 rounded-lg overflow-hidden shadow-lg text-white"

                                        >
                                            <img
                                                src={video.thumbnail}
                                                alt="Video Thumbnail"
                                                className="w-full h-48 object-cover mb-4 rounded"
                                            />

                                            <div className="flex items-center justify-between">
                                                <div className="text-lg font-semibold">{video.title}</div>
                                                <button
                                                    onClick={() => handleVideoDelete(video.id)}
                                                    className="text-white bg-red-500 px-2 py-1 rounded"
                                                >
                                                    Delete Video
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p>No videos in this playlist.</p>
                            )}
                        </div>
                    ) : (
                        <p className="text-black border-l-0">Select a playlist to view videos.</p>
                    )}
                </div>
            </div>

            {/* Top right buttons */}
            <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 items-center">
                <button
                    onClick={() => setCreatePlaylistModalOpen(true)}
            className="bg-gradient-to-b from-cyberpunk-bg1 via-cyberpunk-bg2 to-cyberpunk-bg3 text-cyberpunk-text hover:from-cyberpunk-bg2 hover:to-cyberpunk-bg1 hover:text-black hover:bg-opacity-80 rounded-md px-4 py-2 transition duration-300 ease-in-out"
            
                >
                    Create Playlist
                </button>
                
                <button
                    onClick={() => setAddVideoModalOpen(true)}
                    className="w-20 md:w-28 h-8 md:h-10 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-none shadow-md"
                >
                    Add Video
                </button>
            </div>


            {/* Create Playlist Modal */}
            <Modal
                isOpen={isCreatePlaylistModalOpen}
                onRequestClose={() => setCreatePlaylistModalOpen(false)}
                onAfterOpen={openModal}  // Call the openModal function when the modal opens
                onAfterClose={closeModal}  // Call the closeModal function when the modal closes
                contentLabel="Create Playlist"
                className="Modal max-w-md mx-auto mt-20 p-6 bg-yellow-400 rounded shadow-lg"
                overlayClassName="Overlay fixed top-0 left-0 w-full h-full "
            >
                <h2 className="text-2xl font-bold mb-4 text-gray-700">Create Playlist</h2>
                <div className="mb-4">
                    <label htmlFor="playlistTitle" className="block text-sm font-medium text-gray-700">
                        Title
                    </label>
                    <input
                        type="text"
                        id="playlistTitle"
                        className="mt-1 p-2 w-full border rounded-md"
                        value={newPlaylistTitle}
                        onChange={(e) => setNewPlaylistTitle(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="premium" className="block text-sm font-medium text-gray-700">
                        Premium
                    </label>
                    <input
                        type="checkbox"
                        id="premium"
                        className="mt-1"
                        checked={newPlaylistPremium}
                        onChange={() => setNewPlaylistPremium(!newPlaylistPremium)}
                    />
                </div>
                <button
                    onClick={handleCreatePlaylist}
                    className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
                >
                    Create Playlist
                </button>
                <button
                    onClick={() => setCreatePlaylistModalOpen(false)}
                    className="ml-2 text-gray-500 hover:text-gray-700"
                >
                    Cancel
                </button>
            </Modal>

            {/* Add Video Modal */}
            <Modal
                isOpen={isAddVideoModalOpen}
                onRequestClose={() => setAddVideoModalOpen(false)}
                onAfterOpen={openModal}  // Call the openModal function when the modal opens
                onAfterClose={closeModal}  // Call the closeModal function when the modal closes
                contentLabel="Add Video"
                className="Modal max-w-md mx-auto mt-20 p-6 bg-yellow-400 rounded shadow-lg"
                overlayClassName="Overlay fixed top-0 left-0 w-full h-full"
            >
                <h2 className="text-2xl font-bold mb-4 text-gray-700">Add Video</h2>
                <div className="mb-4">
                    <label htmlFor="videoTitle" className="block text-sm font-medium text-gray-700">
                        Title
                    </label>
                    <input
                        type="text"
                        id="videoTitle"
                        className="mt-1 p-2 w-full border rounded-md"
                        value={newVideoTitle}
                        onChange={(e) => setNewVideoTitle(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="videoFile" className="block text-sm font-medium text-gray-700">
                        Video File
                    </label>
                    <input
                        type="file"
                        id="videoFile"
                        className="mt-1 p-2 w-full border rounded-md"
                        onChange={(e) => setNewVideoFile(e.target.files[0])}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="videoThumbnail" className="block text-sm font-medium text-gray-700">
                        Thumbnail Image
                    </label>
                    <input
                        type="file"
                        id="videoThumbnail"
                        accept="image/*"
                        className="mt-1 p-2 w-full border rounded-md"
                        onChange={(e) => setNewVideoThumbnail(e.target.files[0])}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="playlistSelect" className="block text-sm font-medium text-gray-700">
                        Select Playlist
                    </label>
                    <select
                        id="playlistSelect"
                        className="mt-1 p-2 w-full border rounded-md"
                        onChange={(e) => setSelectedPlaylistId(e.target.value)}
                    >
                        <option value="" disabled selected>
                            Choose a Playlist
                        </option>
                        {playlistsData.map((playlist) => (
                            <option key={playlist.id} value={playlist.id}>
                                {playlist.title}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    onClick={handleAddVideo}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                >
                    Add Video
                </button>
                <button
                    onClick={() => setAddVideoModalOpen(false)}
                    className="ml-2 text-gray-500 hover:text-gray-700"
                >
                    Cancel
                </button>
            </Modal>
        </div>
    );
}

export default PlaylistList;
