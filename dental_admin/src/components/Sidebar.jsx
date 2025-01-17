//ANIKET
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
// Replace this with the correct image file path from your project.
import logo from "../assets/Dr.Pakhare1.jpeg";

import { IoClose } from "react-icons/io5";

const Sidebar = ({ isHamburgerOpen, setIsHamburgerOpen }) => {
  // Example admin state
  const [admin, setAdmin] = useState({
    name: "Dr. Pakhare", // Replace with dynamic data
    isLoggedIn: true, // Replace with authentication logic
  });

  return (
    <>
      {/* Overlay */}
      <div
        className={`h-screen w-screen fixed z-40 top-0 right-0 bottom-0 left-0 translate-x-0 bg-black opacity-50 transition-opacity ease-in-out duration-200 ${
          !isHamburgerOpen ? "hidden" : "block"
        }`}></div>
      <div
        className={`transition duration-200 ease-in-out fixed z-50 top-0 left-0 bottom-0 h-screen bg-[#062335] text-white w-64 p-4 flex flex-col justify-between ${
          isHamburgerOpen ? "translate-x-0" : "-translate-x-64"
        } lg:-translate-x-0 lg:sticky`}>
        {/* Top Section */}
        <div>
          {/* Logo */}
          <div className='flex justify-center items-center gap-5'>
            <img
              src={logo}
              alt='Logo'
              className='h-32 w-32 rounded-full mb-5 shadow-gray-600 shadow-lg'
            />
            <button
              onClick={(e) => setIsHamburgerOpen((prev) => !prev)}
              className='text-white text-4xl self-start lg:hidden'>
              <IoClose />
            </button>
          </div>
          {/* Navigation Links */}
          <nav className='border-t border-gray-600 pt-4'>
            <ul className='space-y-4'>
              <li>
                <NavLink
                  onClick={(e) => setIsHamburgerOpen(false)}
                  to='/admin/dashboard/user-enquiry'
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-400 font-bold"
                      : "hover:text-gray-300 font-normal" +
                        " w-full inline-block"
                  }>
                  User's Enquiry
                </NavLink>
              </li>
              <li>
                <NavLink
                  onClick={(e) => setIsHamburgerOpen(false)}
                  to='/admin/dashboard/schedule-appointments'
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-400 font-bold"
                      : "hover:text-gray-300 font-normal" +
                        " w-full inline-block"
                  }>
                  Scheduled Appointments
                </NavLink>
              </li>
              <li>
                <NavLink
                  onClick={(e) => setIsHamburgerOpen(false)}
                  to='/admin/dashboard/book-apointment'
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-400 font-bold"
                      : "hover:text-gray-300 font-normal" +
                        " w-full inline-block"
                  }>
                  Book Appointment
                </NavLink>
              </li>
              <li className='pt-8 border-t border-gray-700'>
                <NavLink
                  onClick={(e) => setIsHamburgerOpen(false)}
                  to='/admin/dashboard/see-appointment'
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-400 font-bold"
                      : "hover:text-gray-300 font-normal" +
                        " w-full inline-block"
                  }>
                  See Apointments
                </NavLink>
              </li>
              <li>
                <NavLink
                  onClick={(e) => setIsHamburgerOpen(false)}
                  to='/admin/dashboard/add-event'
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-400 font-bold"
                      : "hover:text-gray-300 font-normal" +
                        " w-full inline-block"
                  }>
                  Add Events
                </NavLink>
              </li>
              <li>
                <NavLink
                  onClick={(e) => setIsHamburgerOpen(false)}
                  to='/admin/dashboard/blogs'
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-400 font-bold"
                      : "hover:text-gray-300 font-normal" +
                        " w-full inline-block"
                  }>
                  Add Blogs
                </NavLink>
              </li>
              <li>
                <NavLink
                  onClick={(e) => setIsHamburgerOpen(false)}
                  to='/admin/dashboard/addmember'
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-400 font-bold"
                      : "hover:text-gray-300 font-normal" +
                        " w-full inline-block"
                  }>
                  Add Member
                </NavLink>
              </li>
              <li>
                <NavLink
                  onClick={(e) => setIsHamburgerOpen(false)}
                  to='/admin/dashboard/updatepassword'
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-400 font-bold"
                      : "hover:text-gray-300 font-normal" +
                        " w-full inline-block"
                  }>
                  Update Password
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
