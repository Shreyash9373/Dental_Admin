  import React, { useState } from 'react';
  import { NavLink } from 'react-router-dom';
  // Replace these imports with the correct image files from your project.
  import logo from '../assets/Dr.Pakhare1.jpeg';

const Sidebar = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="fixed mt-12 top-0 left-0 h-full bg-gray-800 text-white w-64 p-4">
        <h2 className="text-lg font-bold mb-4">My Sidebar</h2>
        <nav>
          <ul className="space-y-4">
          <li>
              <NavLink
                to="/usersenquiry"
                className={({ isActive }) =>
                  isActive ? 'text-blue-400' : 'hover:text-gray-300'
                }
              >
                User's Enquiry
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/scheduleappointments"
                className={({ isActive }) =>
                  isActive ? 'text-blue-400' : 'hover:text-gray-300'
                }
              >
                Scheduled Appointments
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/bookapointment"
                className={({ isActive }) =>
                  isActive ? 'text-blue-400' : 'hover:text-gray-300'
                }
              >
                Book Appointment
              </NavLink>
            </li>

            <li className='pt-8 border-t border-gray-700'>
              <NavLink
                to="/seeappointment"
                className={({ isActive }) =>
                  isActive ? 'text-blue-400' : 'hover:text-gray-300'
                }
              >
                See Apointments
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/addevent"
                className={({ isActive }) =>
                  isActive ? 'text-blue-400' : 'hover:text-gray-300'
                }
              >
                Add Event
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/blogs"
                className={({ isActive }) =>
                  isActive ? 'text-blue-400' : 'hover:text-gray-300'
                }
              >
                Blogs
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      {/* Content Area */}
      <div className="flex-1 ml-64 p-4">
        <main className="mt-4 my-4">
          {/* <h1 className="text-2xl font-bold">Welcome to My App</h1>
          <p className="mt-2">Here is the content of your application.</p> */}
        </main>
      </div>
    </div>
  );
};

  export default Sidebar;
