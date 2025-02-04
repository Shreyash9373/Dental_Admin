//ANIKET
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import Loader from "../components/Loader";

const AuthContext = createContext();

const toggleRole = (currentRole) => {
  switch (currentRole) {
    case "receptionist":
      return "doctor";

    default:
      return "receptionist";
  }
};

const AuthProvider = ({ children }) => {
  // const [authUser, setAuthUser] = useState({
  //   name: "receptionist",
  //   email: "receptionist@gmail.com",
  //   isLoggedIn: false,
  //   role: "receptionist",
  //   isChecking: true,
  // });
  const [authUser, setAuthUser] = useState({
    name: "Guest",
    email: "receptionist@gmail.com",
    isLoggedIn: false,
    role: localStorage.getItem("role") || "receptionist",
    isChecking: true,
  });
  console.log("From AuthContext", authUser);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        // const response = await axios.get("http://localhost:4000/", {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URI}/api/${
            authUser.role
          }s/check-refresh`,
          {
            withCredentials: true,
          }
        );
        // console.log(response);
        // console.log(response.data);
        localStorage.setItem("role", response.data.role);
        setAuthUser((prev) => ({
          ...prev,
          name: response.data.name || "Guest",
          email: response.data.email,
          role: response.data.role,
          isLoggedIn: response.data.success,
        }));
      } catch (error) {
        // console.log(error.response.data);
        setAuthUser((prev) => ({
          ...prev,
          isLoggedIn: false,
        }));
      }
      setAuthUser((prev) => ({
        ...prev,
        isChecking: false,
      }));
    };
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authUser,
        setAuthUser,
        toggleRole,
      }}>
      {/* <Loader loading={true} size={85} color={"#062335"} /> */}
      {authUser.isChecking ? (
        <Loader loading={authUser.isChecking} size={85} color={"#062335"} />
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("Cannot use useAuth outside AuthProvider");
  }
  return context;
};

export default AuthProvider;
