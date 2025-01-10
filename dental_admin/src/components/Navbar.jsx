import React, { useState } from 'react';

const Navbar = () => {
  const [admin, setAdmin] = useState({
    name: 'Dr. Pakhare', // Replace with dynamic data
    isLoggedIn: false, // Initial login state
  });

  const handleLogin = () => {
    setAdmin({ ...admin, isLoggedIn: true });
    console.log('Logged in');
  };

  const handleLogout = () => {
    setAdmin({ ...admin, isLoggedIn: false });
    console.log('Logged out');
  };

  // Function to extract initials from the name
  const getInitials = (name) => {
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase();
  };

  return (
    // <div className="py-5 px-14 flex justify-between items-center bg-[#062335]">
    <div className="h-20 py-7 px-14 flex justify-between items-center bg-[#253d4b]">
      <h1 className="text-xl font-bold text-gray-200">Dental Clinic Dashboard</h1>

      {admin.isLoggedIn ? (
        <div className="flex items-center space-x-3">
          {/* Avatar with initials */}
          <div className="h-10 w-10 bg-blue-500 text-white flex items-center justify-center rounded-full">
            {getInitials(admin.name)}
          </div>
          {/* Admin name */}
          <p className="font-semibold text-gray-200">{admin.name}</p>
          {/* Logout button */}
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          onClick={handleLogin}
          className="bg-green-500 text-white py-1 px-4 rounded hover:bg-green-600"
        >
          Login
        </button>
      )}
    </div>
  );
};

export default Navbar;
