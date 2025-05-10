// src/Components/UserLogout.jsx
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { UserDataContext } from '../Context/UserContext';

export const UserLogout = () => {
  const [loggedOut, setLoggedOut] = useState(false);
  const { setUser } = useContext(UserDataContext);

  const handleLogout = async () => {
    setLoggedOut(true);
    try {
      await axios.get('http://localhost:4000/users/logout', {
        withCredentials: true,
      });

      setUser(null); // clear user context
      setLoggedOut(true); // trigger redirect
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  // Trigger redirect
  if (loggedOut) {
    return <Navigate to="/userlogin" replace />;
  }

  return (
    <div>
      <button
        onClick={handleLogout}
        className="bg-black p-3 text-amber-100 rounded-2xl m-4"
      >
        Logout
      </button>
    </div>
  );
};
