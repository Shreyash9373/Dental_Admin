//ANIKET
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const [user, setUser] = useState("receptionist");
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null);
  const { authUser, setAuthUser } = useAuth();

  const handleUserChange = () => {
    setUser((prev) => (prev === "doctor" ? "receptionist" : "doctor"));
  };

  const onSubmit = async (data) => {
    // console.log(data);
    try {
      setLoading(true); // Start loading
      setError(null); // Reset any previous error
      const response = await axios.post(
        "http://localhost:4000/api/dashboard/login",
        data,{withCredentials:true}
      );
      
      console.log("response:", response.data);

     if(response.data && response.data.user){
    toast.success("Login successfully");
    setAuthUser({
      username: response.data.user.username,
      role: response.data.user.role,
      isLoggedIn:true
    })
     } else {
        toast.error(`Login failed! ${response.data.message}`);
      }
    } catch (error) {
      setError(error.message);
      toast.error(
        error.response?.data?.message || "Failed to Login. Please try again."
      );
    } finally {
      setLoading(false); // Stop loading
      reset(); // Reset the form
    }
  };

  return authUser.isLoggedIn ? (
    <Navigate to='/admin/dashboard' />
  ) : (
    <div className='w-screen h-screen flex justify-center items-center'>
      <div className='shadow-2xl bg-gradient-to-b from-blue-400 via-blue-500 to-cyan-500 shadow-gray-500 p-12 flex flex-col gap-2'>
        <h1 className='text-white font-semibold mb-7 text-center text-xl md:text-3xl lg:text-5xl'>
          <span className='capitalize'>{user}</span> Login
        </h1>
        {/* Login form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col gap-3 items-center justify-center md:gap-5 lg:gap-7'>
          <input
            {...register("username", { required: "Username is required" })}
            className='text-gray-600 border-2 border-blue-500 rounded-lg px-3 py-1 md:px-5 md:py-3 placeholder:text-blue-500/80 focus:outline-blue-500'
            type='text'
            placeholder='Username'
          />
          <input
            {...register("password", { required: "Password is required" })}
            className='text-gray-600 border-2 border-blue-500 rounded-lg px-3 py-1 md:px-5 md:py-3 placeholder:text-blue-500/80 focus:outline-blue-500'
            type='password'
            placeholder='Password'
          />
          <button
            className='text-blue-500 bg-white px-3 py-1 md:px-5 md:py-3 rounded-md w-1/2 mx-auto focus:outline-blue-500 focus:text-blue-500 focus:bg-white hover:bg-blue-200/85'
            type='submit'>
            {loading ? "Loading..." : "Login"}
          </button>
        </form>

        <div className='text-sm text-center'>
          Not a {user}?{" "}
          <button
            onClick={handleUserChange}
            className='text-white underline focus:outline-none'>
            Login as{" "}
            <span className='capitalize'>
              {user === "doctor" ? "receptionist" : "doctor"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
