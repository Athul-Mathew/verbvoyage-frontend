// PlaylistList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getLocal } from '../../../actions/auth';
import jwtDecode from 'jwt-decode';

function PlaylistList() {
    const [selectedPlaylist, setSelectedPlaylist] = useState(null);
    const [playlistsData, setPlaylistsData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = getLocal('authToken');

        if (token) {
            const decoded = jwtDecode(token);
            const user_id = decoded.user_id;

            axios
                .get(`http://localhost:8000/api/mentors/playlists/create/`, {
                    params: { user_id }
                })
                .then((response) => {
                    setPlaylistsData(response.data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Error fetching playlists:', error);
                    
                    setLoading(false);
            
                });
        } else {
            setLoading(false);
        }
    }, []);

    const handlePlaylistClick = (playlist) => {
        const token = getLocal('authToken');

        if (token) {
            axios
                .get('http://localhost:8000/api/mentors/videos/', {
                    params: { user_id: playlist.user_id, playlist_id: playlist.id }
                })
                .then((response) => {
                    setSelectedPlaylist({ ...playlist, videos: response.data });
                })
                .catch((error) => {
                    console.error('Error fetching playlists:', error);
                   
                    setLoading(false);
            
                });
        }
    };
    const handleVideoDelete = async (videoId) => {
        const token = getLocal('authToken');

        if (token) {
            try {
                await axios.delete(`http://localhost:8000/api/mentors/videos/${videoId}/delete/`);
                // Assuming successful deletion, you might want to update the UI accordingly
                setSelectedPlaylist({
                    ...selectedPlaylist,
                    videos: selectedPlaylist.videos.filter((video) => video.id !== videoId),
                });
                console.log(`Video with ID ${videoId} deleted successfully.`);
            } catch (error) {
                console.error('Error deleting video:', error);
            }
        }
    };
    const handlePlaylistCreate = async (title, premium) => {
        const token = getLocal('authToken');

        if (token) {
            try {
                const response = await axios.post(
                    `http://localhost:8000/api/mentors/playlists/create/`,
                    { title, premium },
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                setPlaylistsData([...playlistsData, response.data]);
                console.log('Playlist created successfully.');
            } catch (error) {
                console.error('Error creating playlist:', error);
            }
        }
    };

    const handlePlaylistDelete = async (playlistId) => {
        const token = getLocal('authToken');

        if (token) {
            try {
                await axios.delete(`http://localhost:8000/api/mentors/playlists/${playlistId}/delete/`);
                // Assuming successful deletion, you might want to update the UI accordingly
                setPlaylistsData(playlistsData.filter(playlist => playlist.id !== playlistId));
                console.log(`Playlist with ID ${playlistId} deleted successfully.`);
            } catch (error) {
                console.error('Error deleting playlist:', error);
            }
        }
    };

    const handleVideoUpload = async (title, videoFile, thumbnail, playlistId) => {
        const token = getLocal('authToken');

        if (token) {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('video_file', videoFile);
            formData.append('thumbnail', thumbnail);
            formData.append('playlist', playlistId);

            try {
                await axios.post(`http://localhost:8000/api/mentors/videos/create/`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`,
                    },
                });

                // Assuming successful upload, you might want to update the UI accordingly
                console.log('Video uploaded successfully.');
            } catch (error) {
                console.error('Error uploading video:', error);
            }
        }
    };

    return (
        <div className="flex bg-gray-900 min-h-screen text-white font-sans">
            {/* Sidebar */}
            <div className="w-1/4 bg-gray-800 p-4">
                <div className="text-2xl font-bold mb-4 text-gray-300">Video Manager</div>
                <div className="space-y-4">
                    {playlistsData.map((playlist, index) => (
                        <div
                            key={`playlist-${playlist.id}-${index}`}
                            onClick={() => handlePlaylistClick(playlist)}
                            className={`cursor-pointer flex items-center p-2 space-x-2 ${
                                selectedPlaylist?.id === playlist.id ? 'bg-gray-700' : 'hover:bg-gray-700'
                            }`}
                        >
                            <div className="flex-shrink-0 w-10 h-10 rounded overflow-hidden">
                                <img
                                    src="https://via.placeholder.com/50"
                                    alt="Playlist Thumbnail"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="flex-1 truncate">{playlist.title}</div>
                        </div>
                    ))}
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => handlePlaylistCreate(prompt('Enter playlist title'), false)}
                            className="bg-green-500 px-4 py-2 rounded"
                        >
                            Create Playlist
                        </button>
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
            </div>

            {/* Content */}
            <div className="w-3/4 p-4">
                {selectedPlaylist ? (
                    <div>
                        <div className="text-2xl font-bold mb-4 text-gray-300">
                            Videos in {selectedPlaylist.title}
                        </div>
                        {selectedPlaylist.videos.length === 0 ? (
                            <p>No videos in this playlist.</p>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {selectedPlaylist.videos.map((video) => (
                                    <div
                                        key={`video-${video.id}`}
                                        className="bg-gray-800 p-4 rounded-lg overflow-hidden shadow-lg"
                                    >
                                        <img
                                            src={`http://localhost:8000${video.thumbnail}`}
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
                        )}
                        <div className="mt-4">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    const title = e.target.elements.title.value;
                                    const videoFile = e.target.elements.videoFile.files[0];
                                    const thumbnail = e.target.elements.thumbnail.files[0];
                                    handleVideoUpload(title, videoFile, thumbnail, selectedPlaylist.id);
                                }}
                            >
                                <div className="text-xl font-semibold text-gray-300">Upload Video</div>
                                <div className="mb-2">
                                    <input
                                        type="text"
                                        name="title"
                                        placeholder="Video Title"
                                        className="w-full p-2"
                                        required
                                    />
                                </div>
                                <div className="mb-2">
                                    <input
                                        type="file"
                                        name="videoFile"
                                        accept="video/*"
                                        className="w-full p-2"
                                        required
                                    />
                                </div>
                                <div className="mb-2">
                                    <input
                                        type="file"
                                        name="thumbnail"
                                        accept="image/*"
                                        className="w-full p-2"
                                        required
                                    />
                                </div>
                                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                                    Upload
                                </button>
                            </form>
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-300">Select a playlist to view videos.</p>
                )}
            </div>
        </div>
    );
}

export default PlaylistList;
