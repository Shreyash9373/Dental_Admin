//ANIKET
import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { RiLoginBoxFill } from "react-icons/ri";
import { RiLogoutBoxFill } from "react-icons/ri";

const Navbar = ({ isHamburgerOpen, setIsHamburgerOpen }) => {
  const [admin, setAdmin] = useState({
    name: "Dr. Pakhare", // Replace with dynamic data
    isLoggedIn: false, // Initial login state
  });

  const handleLogin = () => {
    setAdmin({ ...admin, isLoggedIn: true });
    console.log("Logged in");
  };

  const handleLogout = () => {
    setAdmin({ ...admin, isLoggedIn: false });
    console.log("Logged out");
  };

  // Function to extract initials from the name
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  return (
    // <div className="py-5 px-14 flex justify-between items-center bg-[#062335]">
    <div className='h-20 px-3 py-1 sticky top-0 left-0 right-0 flex justify-between items-center bg-[#253d4b] md:px-5 md:py-3'>
      <button
        onClick={(e) => {
          setIsHamburgerOpen((prev) => !prev);
        }}
        className='text-white text-xl mr-12 lg:hidden'>
        <RxHamburgerMenu />
      </button>
      <h1 className='text-lg font-bold text-gray-200'>
        Dental Clinic Dashboard
      </h1>

      {admin.isLoggedIn ? (
        <div className='flex items-center space-x-3'>
          {/* Avatar with initials */}
          <div className='h-10 w-10 bg-blue-500 text-white flex items-center justify-center rounded-full'>
            {getInitials(admin.name)}
          </div>
          {/* Admin name */}
          {/* <p className='font-semibold text-gray-200'>{admin.name}</p> */}
          {/* Logout button */}
          <button
            onClick={handleLogout}
            className='text-red-500 py-1 px-4 rounded hover:bg-red-600'>
            <span className='flex justify-center items-center gap-2'>
              Logout
              <RiLogoutBoxFill />
            </span>
          </button>
        </div>
      ) : (
        <button
          onClick={handleLogin}
          className='text-green-500 py-1 px-4 rounded hover:bg-green-600'>
          <span className='flex justify-center items-center gap-2'>
            Login
            <RiLoginBoxFill />
          </span>
        </button>
      )}
    </div>
  );
};

export default Navbar;
