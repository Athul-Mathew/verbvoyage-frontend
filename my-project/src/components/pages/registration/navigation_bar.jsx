import React from 'react';

function Navbar({ profile, logout }) {
  return (
    <nav>
      <div className="logo">
        <img src={profile['picture']} alt={profile['name']} />
        <h2>Welcome, {profile['name']}!</h2>
      </div>
      <div className="profile-info">
        <h3>Mail ID: {profile['email']}</h3>
        <button onClick={logout}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;