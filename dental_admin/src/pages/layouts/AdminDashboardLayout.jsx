import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../context/AuthContext";

const AdminDashboardLayout = () => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    document.body.style.overflow = isHamburgerOpen ? "hidden" : "";
  }, [isHamburgerOpen]);

  return isLoggedIn ? (
    <div className='h-auto flex flex-row'>
      {/* Sidebar */}
      <Sidebar
        isHamburgerOpen={isHamburgerOpen}
        setIsHamburgerOpen={setIsHamburgerOpen}
      />
      {/* Main Content */}
      <div className='flex flex-col bg-gray-200 min-h-screen w-full'>
        {/* Navbar */}
        <Navbar
          isHamburgerOpen={isHamburgerOpen}
          setIsHamburgerOpen={setIsHamburgerOpen}
        />

        {/* Routes */}
        <div className=' p-4 overflow-y-auto'>
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <Navigate to='/admin/login' />
  );
};

export default AdminDashboardLayout;
