// ANIKET
import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../context/AuthContext";

const AdminDashboardLayout = () => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const { authUser } = useAuth();

  if (!authUser?.isLoggedIn) {
    return <Navigate to='/admin/login' />;
  }

  return (
    <div className='flex flex-row h-auto min-h-screen'>
      {/* Sidebar */}
      <Sidebar
        isHamburgerOpen={isHamburgerOpen}
        setIsHamburgerOpen={setIsHamburgerOpen}
        className='w-64 bg-gray-800 text-white'
      />

      {/* Main Content */}
      <div className='flex-1 flex flex-col bg-gray-200'>
        {/* Navbar */}
        <Navbar
          isHamburgerOpen={isHamburgerOpen}
          setIsHamburgerOpen={setIsHamburgerOpen}
        />

        {/* Content */}
        <main className='flex-1 p-4 overflow-y-auto'>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
