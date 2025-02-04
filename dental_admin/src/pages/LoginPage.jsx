//ANIKET
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [loading, setLoading] = useState(false); // Loading state
  const { authUser, setAuthUser, toggleRole } = useAuth();

  const handleRoleToggle = () => {
    setAuthUser((prev) => ({
      ...prev,
      role: toggleRole(authUser.role),
    }));
    localStorage.setItem("role", toggleRole(authUser.role));
  };

  const handleFormSubmit = async (data) => {
    // console.log(data);
    localStorage.setItem("role", authUser.role);

    try {
      setLoading(true); // Start loading
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/api/${authUser.role}s/login`,
        data,
        { withCredentials: true }
      );

      console.log("response:", response.data);

      if (response.data && response.data[authUser.role]) {
        toast.success("Login successfully");
        setAuthUser((prev) => ({
          ...prev,
          email: response.data[authUser.role].email,
          name: response.data[authUser.role].name || "Guest",
          isLoggedIn: true,
        }));
      } else {
        toast.error(`Login failed! ${response.data.message}`);
      }
    } catch (error) {
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
      <div className='shadow-2xl bg-gradient-to-b from-blue-400/55  via-blue-500/55  to-cyan-500/55   shadow-white0 p-12 flex flex-col gap-2'>
        <h1 className='text-white text-opacity-90 font-semibold mb-7 text-center text-lg md:text-xl lg:text-3xl'>
          <span className='capitalize font-bold text-blue-800'>
            {authUser.role}
          </span>{" "}
          Login
        </h1>
        {/* Login form */}
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className='flex flex-col gap-3 items-center justify-center md:gap-5 lg:gap-7'>
          <div className='flex flex-col gap-2 justify-center'>
            <div className='flex flex-col gap-1 justify-center items-start'>
              <label className='text-blue-800 font-semibold' htmlFor='email'>
                Email:
              </label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                })}
                className={`text-gray-600 border-2 border-blue-500 rounded-lg px-3 py-1 md:px-5 md:py-3 placeholder:text-blue-500/80 focus:outline-none ${
                  errors.email ? "border-red-600" : ""
                }`}
                type='text'
                id='email'
                name='email'
                placeholder='Email'
              />
              {errors.email && (
                <small className='text-red-600'>{errors.email.message}</small>
              )}
            </div>
          </div>
          <div className='flex flex-col gap-3 justify-center'>
            <div className='flex flex-col gap-1 justify-center items-start'>
              <label className='text-blue-800 font-semibold' htmlFor='password'>
                Password:
              </label>
              <input
                {...register("password", { required: "Password is required" })}
                className={`text-gray-600 border-2 border-blue-500 rounded-lg px-3 py-1 md:px-5 md:py-3 placeholder:text-blue-500/80 focus:outline-none ${
                  errors.password ? "border-red-600" : ""
                }`}
                type='password'
                id='password'
                name='password'
                placeholder='Password'
              />
              {errors.password && (
                <small className='text-red-600'>
                  {errors.password.message}
                </small>
              )}
            </div>
          </div>
          <button
            className='text-blue-500 bg-white px-3 py-1 md:px-5 md:py-3 rounded-md w-1/2 mx-auto focus:outline-blue-500 focus:text-blue-500 focus:bg-white hover:bg-blue-200/85'
            type='submit'>
            {loading ? "Loading..." : "Login"}
          </button>
          <span className='text-white text-opacity-90'>
            Not a {authUser.role}?{" "}
            <button
              type='button' // react hook form explicitly sets all buttons in form as submit
              className='text-blue-800 underline'
              onClick={handleRoleToggle}>
              Login as {toggleRole(authUser.role)}
            </button>
          </span>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
