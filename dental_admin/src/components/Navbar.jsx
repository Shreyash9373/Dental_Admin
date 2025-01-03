import React from 'react';
import logo from '../assets/react.svg'

const Navbar = () => {

  const handleLogout = () => {
    localStorage.removeItem("isAdminAuthenticated");
    window.location.href = "/admin"; // Redirect to the admin login page
  };

  return (
    <div className='z-10 w-full bg-gray-800 text-white p-4 sticky top-0'>
      <div className='w-full flex flex-row justify-between items-center px-6'>
        <img src={logo} alt="" />
        <button
          onClick={handleLogout}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Login
        </button>
      </div>
    </div>
  )
}

export default Navbar
