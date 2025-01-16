import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const RoleBasedRedirect = () => {
  const { authUser } = useAuth();

  //   useEffect(() => {
  //     if (authUser.role === "doctor") {
  //       return navigate("/admin/dashboard/doctor");
  //     } else if (authUser.role === "receptionist") {
  //       return navigate("/admin/dashboard/receptionist");
  //     }
  //   }, []);

  if (authUser.role === "doctor") {
    return <Navigate to='/admin/dashboard/doctor' />;
  } else if (authUser.role === "receptionist") {
    return <Navigate to='/admin/dashboard/receptionist' />;
  } else return <Navigate to='admin/login' />;
};

export default RoleBasedRedirect;
