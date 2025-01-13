import React, { createContext, useContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: false,
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
