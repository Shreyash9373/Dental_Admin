import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import logo from '../assets/Dr.Pakhare.png'

const Sidebar = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-full bg-gray-800 text-white w-64 p-4">
        {/* <h2 className="text-lg font-bold mb-4">My Sidebar</h2> */}
        <img src={logo} alt="" className='h-20 w-20 rounded-xl mb-10' />
        <nav>
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
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;

