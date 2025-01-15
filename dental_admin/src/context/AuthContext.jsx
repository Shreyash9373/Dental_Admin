import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authUser , setAuthUser] = useState({
    username:"",
    role:"",
    isLoggedIn:false
  })
  return (
    <AuthContext.Provider
      value={{
        authUser,
        setAuthUser
      }}>
      {children}
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