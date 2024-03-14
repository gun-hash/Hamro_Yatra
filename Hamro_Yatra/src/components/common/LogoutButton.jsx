// LogoutButton.js

import React from 'react';

const LogoutButton = () => {
  const handleLogout = () => {
    localStorage.clear();

    window.location.href = '/login';
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
