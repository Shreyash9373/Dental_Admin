import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";

const Login = () => {
  const [user, setUser] = useState("receptionist");
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false); // Loading state
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);

  const handleUserChange = () => {
    setUser((prev) => (prev === "doctor" ? "receptionist" : "doctor"));
  };

  const onSubmit = async (data) => {
    console.log(data);
    try {
      setLoading(true); // Start loading
      setError(null); // Reset any previous error
      const response = await axios.post(
        "http://localhost:4000/api/dashboard/login",
        data
      );
      setResponseData(response.data);
      console.log("response:", response.data);
      toast.success("Login  successfully!");
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

  return (
    <div className='bg-gradient-to-b from-blue-400 via-blue-500 to-cyan-500 flex justify-center items-center'>
      <div className='shadow-2xl shadow-blue-500/50 p-12 flex flex-col gap-2'>
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

export default Login;
