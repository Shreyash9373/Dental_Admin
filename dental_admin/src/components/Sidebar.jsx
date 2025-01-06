// import React from 'react';
// import { NavLink, Outlet } from 'react-router-dom';
// import logo from '../assets/Dr.Pakhare.png'

// const Sidebar = () => {
//   return (
//     <div className="flex h-screen">
//       {/* Sidebar */}
//       <div className="fixed top-0 left-0 h-full bg-gray-800 text-white w-64 p-4">
//         {/* <h2 className="text-lg font-bold mb-4">My Sidebar</h2> */}
//         <img src={logo} alt="" className='h-20 w-20 rounded-xl mb-5' />
//         {/* <h1 className='mb-10 font-semibold'>Dr. Pakhare Dental Clinic</h1> */}
//         <nav>
//           <ul className="space-y-4">
//             <li>
//               <NavLink
//                 to="/usersenquiry"
//                 className={({ isActive }) =>
//                   isActive
//                     ? 'text-blue-400 font-bold'
//                     : 'hover:text-gray-300 font-normal'
//                 }
//               >
//                 User's Enquiry
//               </NavLink>
//             </li>
//             <li>
//               <NavLink
//                 to="/scheduleappointments"
//                 className={({ isActive }) =>
//                   isActive
//                     ? 'text-blue-400 font-bold'
//                     : 'hover:text-gray-300 font-normal'
//                 }
//               >
//                 Scheduled Appointments
//               </NavLink>
//             </li>
//             <li>
//               <NavLink
//                 to="/bookapointment"
//                 className={({ isActive }) =>
//                   isActive
//                     ? 'text-blue-400 font-bold'
//                     : 'hover:text-gray-300 font-normal'
//                 }
//               >
//                 Book Appointment
//               </NavLink>
//             </li>
//           </ul>
//         </nav>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;






import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
// import logo from '../assets/Dr.Pakhare.png';
import logo from '../assets/Dr.Pakhare1.jpeg';
// import logo from '../assets/Dr.Pakhare2.png';

const Sidebar = () => {
  // Example admin state
  const [admin, setAdmin] = useState({
    name: 'Dr. Pakhare', // Replace with dynamic data
    isLoggedIn: true, // Replace with authentication logic
  });

  const handleLogout = () => {
    // Add logout logic here
    setAdmin({ ...admin, isLoggedIn: false });
    console.log('Logged out');
  };

  const handleLogin = () => {
    // Add login logic here
    setAdmin({ ...admin, isLoggedIn: true });
    console.log('Logged in');
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-full bg-[#062335] text-white w-64 p-4 flex flex-col justify-between">
        <div>
          <div className='flex justify-center items-center'>
          <img src={logo} alt="Logo" className="h-32 w-32 rounded-full mb-5 shadow-gray-600 shadow-lg" />
          </div>
          <nav className='border-t border-gray-600 pt-4'>
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
