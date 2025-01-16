import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const ReceptionistLayout = () => {
  const { authUser } = useAuth();
  return authUser.role === "receptionist" ? (
    <Outlet />
  ) : (
    <Navigate to='/admin/login' />
  );
};

export default ReceptionistLayout;
