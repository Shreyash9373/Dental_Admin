//ANIKET
import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { RiLoginBoxFill } from "react-icons/ri";
import { RiLogoutBoxFill } from "react-icons/ri";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const Navbar = ({ isHamburgerOpen, setIsHamburgerOpen }) => {
  const { authUser, setAuthUser } = useAuth();

  const handleLogout = () => {
    (async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URI}/api/dashboard/logout`,
          { withCredentials: true }
        );
        console.log(response);
        setAuthUser((prev) => ({
          ...prev,
          isLoggedIn: false,
        }));
      } catch (error) {
        console.error(error);
      }
    })();
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
    <div className='h-20 px-3 py-1 sticky top-0 left-0 right-0 z-30 flex justify-between items-center bg-[#253d4b] md:px-5 md:py-3'>
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

      <div className='flex items-center space-x-3'>
        {/* Avatar with initials */}
        <div className='h-10 w-10 bg-blue-500 text-white flex items-center justify-center rounded-full'>
          {getInitials(authUser.username)}
        </div>
        {/* Admin name */}
        {/* <p className='font-semibold text-gray-200'>{authUser.name}</p> */}
        {/* Logout button */}
        <button
          onClick={handleLogout}
          className='text-red-500 py-1 px-4 rounded hover:text-red-600'>
          <span className='flex justify-center items-center gap-2'>
            Logout
            <RiLogoutBoxFill />
          </span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
