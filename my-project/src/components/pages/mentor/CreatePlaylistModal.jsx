import React, { useState } from 'react';

const CreatePlaylistModal = ({ isOpen, onClose, onCreatePlaylist }) => {
  const [playlistTitle, setPlaylistTitle] = useState('');

  const handlePlaylistSubmit = (e) => {
    e.preventDefault();
    onCreatePlaylist(playlistTitle);
    setPlaylistTitle('');
    onClose();
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center ${isOpen ? '' : 'hidden'}`}>
      <div className="fixed inset-0 bg-black bg-opacity-75"></div>
      <div className="bg-white p-6 rounded-lg z-10">
        <h2 className="text-xl font-bold mb-4">Create Playlist</h2>
        <form onSubmit={handlePlaylistSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400">Playlist Title</label>
            <input
              type="text"
              className="mt-1 p-2 w-full rounded-md bg-gray-100 border-none focus:outline-none focus:ring focus:border-blue-300"
              value={playlistTitle}
              onChange={(e) => setPlaylistTitle(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Create Playlist
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePlaylistModal;
