//ANIKET
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import Loader from "../components/Loader";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState({
    username: "receptionist",
    isLoggedIn: false,
    role: "receptionist",
    isChecking: true,
  });
  console.log("From AuthContext", authUser);

  // api/dashboard/refreshToken

  useEffect(() => {
    const checkLogin = async () => {
      try {
        // const response = await axios.get("http://localhost:4000/", {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URI}/api/dashboard/refreshToken`,
          {
            withCredentials: true,
          }
        );
        // console.log(response);
        // console.log(response.data);
        setAuthUser((prev) => ({
          ...prev,
          username: response.data.username,
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
