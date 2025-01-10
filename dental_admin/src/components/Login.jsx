import React, { useState } from "react";
import { useForm } from "react-hook-form";

const Login = () => {
  const [user, setUser] = useState("receptionist");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm(); // Initialize react-hook-form

  // Toggle user role (doctor/receptionist)
  const handleUserChange = () => {
    setUser((prev) => (prev === "doctor" ? "receptionist" : "doctor"));
  };

  // Submit handler
  const onSubmit = (data) => {
    console.log(data); // Log the form data
    reset(); // Reset the form
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="shadow-2xl shadow-blue-500/50 p-12 flex flex-col gap-2 bg-gradient-to-b from-blue-400 to-blue-500 rounded-lg">
        <h1 className="text-white font-semibold mb-7 text-center text-xl md:text-3xl lg:text-5xl">
          <span className="capitalize">{user}</span> Login
        </h1>

        {/* Login Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3 items-center justify-center md:gap-5 lg:gap-7"
        >
          {/* Username Input */}
          <div className="w-full">
            <input
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters long",
                },
              })}
              className={`text-gray-600 border-2 rounded-lg px-3 py-1 md:px-5 md:py-3 w-full placeholder:text-blue-500/80 focus:outline-blue-500 ${errors.username ? "border-red-500" : "border-blue-500"
                }`}
              type="text"
              name="username"
              placeholder="Username"
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Password Input */}
          <div className="w-full">
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
              className={`text-gray-600 border-2 rounded-lg px-3 py-1 md:px-5 md:py-3 w-full placeholder:text-blue-500/80 focus:outline-blue-500 ${errors.password ? "border-red-500" : "border-blue-500"
                }`}
              type="password"
              name="password"
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            className="text-blue-500 bg-gray-300 px-3 py-1 md:px-5 md:py-3 rounded-md w-1/2 mx-auto focus:outline-blue-500 focus:text-blue-500 focus:bg-white hover:bg-blue-200/85 hover:scale-105 transition ease-in-out duration-200"
            type="submit"
          >
            Login
          </button>
        </form>

        {/* Toggle Role */}
        <div className="text-sm text-center mt-4">
          Not a {user}?{" "}
          <button
            onClick={handleUserChange}
            className="text-white focus:outline-none"
          >
            Login as{" "}
            <span className="capitalize">
              {user === "doctor" ? "receptionist" : "doctor"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
