import React, { useLayoutEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

const RoleBasedRedirect = () => {
  const { authUser } = useAuth();
  const navigate = useNavigate();

  //   useEffect(() => {
  //     if (authUser.role === "doctor") {
  //       return navigate("/admin/dashboard/doctor");
  //     } else if (authUser.role === "receptionist") {
  //       return navigate("/admin/dashboard/receptionist");
  //     }
  //   }, []);

  useLayoutEffect(() => {
    if (authUser.role === "doctor") {
      navigate("/admin/dashboard/doctor");
    } else if (authUser.role === "receptionist") {
      navigate("/admin/dashboard/receptionist");
    } else {
      navigate("/admin/login");
    }
  }, []);

  // if (authUser.role === "doctor") {
  //   return <Navigate to='/admin/dashboard/doctor' />;
  // } else if (authUser.role === "receptionist") {
  //   return <Navigate to='/admin/dashboard/receptionist' />;
  // } else return <Navigate to='admin/login' />;
};

export default RoleBasedRedirect;
