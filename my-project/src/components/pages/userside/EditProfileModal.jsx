import React, { useState } from 'react';
import Modal from 'your-modal-library'; // replace with your modal library
import { updateProfile } from '../../../api/user'; // make an API call function

const EditProfileModal = ({ isOpen, onClose, initialName, initialImage }) => {
  const [name, setName] = useState(initialName);
  const [image, setImage] = useState(initialImage);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImageChange = (e) => {
    // handle image upload logic
  };

  const handleSubmit = () => {
    // Make API call to update profile
    updateProfile({ name, image })
      .then((response) => {
        // handle success
        
        onClose();
      })
      .catch((error) => {
        // handle error
      });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div>
        <h2>Edit Profile</h2>
        <form>
          <label>Name:</label>
          <input type="text" value={name} onChange={handleNameChange} />
          <label>Image:</label>
          <input type="file" onChange={handleImageChange} />
          <button type="button" onClick={handleSubmit}>
            Save Changes
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default EditProfileModal;
