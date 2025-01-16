import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const DoctorLayout = () => {
  const { authUser } = useAuth();
  return authUser.role === "doctor" ? (
    <Outlet />
  ) : (
    <Navigate to='/admin/login' />
  );
};

export default DoctorLayout;
