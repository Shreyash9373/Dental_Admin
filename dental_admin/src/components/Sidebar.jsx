import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-full bg-gray-800 text-white w-64 p-4">
        <h2 className="text-lg font-bold mb-4">My Sidebar</h2>
        <nav>
          <ul className="space-y-4">
            <li>
              <NavLink
                to="/schedule"
                className={({ isActive }) =>
                  isActive ? 'text-blue-400' : 'hover:text-gray-300'
                }
              >
                Schedule
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
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
