import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
// Replace this with the correct image file path from your project.
import logo from '../assets/Dr.Pakhare1.jpeg';

const Sidebar = () => {
  // Example admin state
  const [admin, setAdmin] = useState({
    name: 'Dr. Pakhare', // Replace with dynamic data
    isLoggedIn: true, // Replace with authentication logic
  });

  return (
    <div className="sticky top-0 left-0 h-full bg-[#062335] text-white w-64 p-4 flex flex-col justify-between">
      {/* Top Section */}
      <div>
        {/* Logo */}
        <div className="flex justify-center items-center">
          <img
            src={logo}
            alt="Logo"
            className="h-32 w-32 rounded-full mb-5 shadow-gray-600 shadow-lg"
          />
        </div>

        {/* Navigation Links */}
        <nav className="border-t border-gray-600 pt-4">
          <ul className="space-y-4">
            <li>
              <NavLink
                to="/usersenquiry"
                className={({ isActive }) =>
                  isActive
                    ? 'text-blue-400 font-bold'
                    : 'hover:text-gray-300 font-normal'
                }
              >
                User's Enquiry
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/scheduleappointments"
                className={({ isActive }) =>
                  isActive
                    ? 'text-blue-400 font-bold'
                    : 'hover:text-gray-300 font-normal'
                }
              >
                Scheduled Appointments
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/bookapointment"
                className={({ isActive }) =>
                  isActive
                    ? 'text-blue-400 font-bold'
                    : 'hover:text-gray-300 font-normal'
                }
              >
                Book Appointment
              </NavLink>
            </li>
            <li className='pt-8 border-t border-gray-700'>
              <NavLink
                to="/seeappointment"
                className={({ isActive }) =>
                  isActive ? 'text-blue-400 font-bold' : 'hover:text-gray-300 font-normal'
                }
              >
                See Apointments
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/addevent"
                className={({ isActive }) =>
                  isActive ? 'text-blue-400 font-bold' : 'hover:text-gray-300 font-normal'
                }
              >
                Add Event
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/blogs"
                className={({ isActive }) =>
                  isActive ? 'text-blue-400 font-bold' : 'hover:text-gray-300 font-normal'
                }
              >
                Blogs
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
