// Login Component

import React, { useState } from "react";

const defaultFormData = {
  username: "",
  password: "",
};

const Login = () => {
  const [user, setUser] = useState("receptionist");
  const [formData, setFormData] = useState(defaultFormData);

  const handleUserChange = () => {
    setUser((prev) => (prev === "doctor" ? "receptionist" : "doctor"));
  };

  const handleFormChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setFormData(defaultFormData);
  };

  return (
    <div className='bg-gradient-to-b from-blue-400 via-blue-500 to-cyan-500 flex justify-center items-center'>
      <div className='shadow-2xl shadow-blue-500/50 p-12 flex flex-col gap-2'>
        <h1 className='text-white font-semibold mb-7 text-center text-xl md:text-3xl lg:text-5xl'>
          <span className='capitalize'>{user}</span> Login
        </h1>
        {/* Login form */}
        <form
          onSubmit={handleLoginSubmit}
          className='flex flex-col gap-3 items-center justify-center md:gap-5 lg:gap-7'>
          <input
            className='text-gray-600 border-2 border-blue-500 rounded-lg px-3 py-1 md:px-5 md:py-3 placeholder:text-blue-500/80 focus:outline-blue-500'
            type='text'
            name='username'
            placeholder='Username'
            value={formData.username}
            onChange={handleFormChange}
          />
          <input
            className='text-gray-600 border-2 border-blue-500 rounded-lg px-3 py-1 md:px-5 md:py-3 placeholder:text-blue-500/80 focus:outline-blue-500'
            type='password'
            name='password'
            placeholder='Password'
            value={formData.password}
            onChange={handleFormChange}
          />
          <button
            className='text-blue-500 bg-white px-3 py-1 md:px-5 md:py-3 rounded-md w-1/2 mx-auto focus:outline-blue-500 focus:text-blue-500 focus:bg-white hover:bg-blue-200/85'
            type='submit'>
            Login
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
