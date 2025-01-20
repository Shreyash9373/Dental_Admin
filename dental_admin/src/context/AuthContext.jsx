//ANIKET
import axios from "axios";
import React, {
  createContext,
  useContext,
  useLayoutEffect,
  useState,
} from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState({
    username: "receptionist",
    isLoggedIn: false,
    role: "receptionist",
  });
  console.log("From AuthContext", authUser);

  // api/dashboard/refreshToken

  useLayoutEffect(() => {
    const checkLogin = async () => {
      try {
        // const response = await axios.get("http://localhost:4000/", {
        const response = await axios.get(
          "http://localhost:4000/api/dashboard/refreshToken",
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
          isLoggedIn: error.response.data.success,
        }));
      }
    };
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authUser,
        setAuthUser,
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
