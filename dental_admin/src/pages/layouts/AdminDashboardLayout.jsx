//ANIKET
import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../context/AuthContext";

const AdminDashboardLayout = () => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? (
    <div className=' -translate-x-64 h-auto flex flex-row lg:-translate-x-0'>
      {/* Sidebar */}
      <Sidebar
        className='w-64 bg-gray-800 text-white'
        isHamburgerOpen={isHamburgerOpen}
        setIsHamburgerOpen={setIsHamburgerOpen}
      />
      {/* Main Content */}
      <div className='flex-1 flex flex-col bg-gray-200 min-h-screen w-screen'>
        {/* Navbar */}
        <Navbar
          isHamburgerOpen={isHamburgerOpen}
          setIsHamburgerOpen={setIsHamburgerOpen}
        />

        {/* Routes */}
        <div className='flex-1 p-4 overflow-y-auto'>
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <Navigate to='/admin/login' />
  );
};

export default AdminDashboardLayout;
