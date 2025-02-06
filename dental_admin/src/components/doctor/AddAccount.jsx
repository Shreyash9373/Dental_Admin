import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const defaultFormData = {
  role: "doctor",
  email: "",
  password: "",
};

const AddAccount = () => {
  const [formData, setFormData] = useState(defaultFormData);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  // const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State to toggle confirm password visibility
  // const newPassword = watch("password"); // For confirm password validation
  // const newConfirmPassword = watch("confirmPassword"); // For confirm password validation

  // Handle form submission
  const handleFormSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/api/doctors/add-member`,
        data,
        { withCredentials: true }
      );
      toast.success(response.data.message);
      setFormData(defaultFormData);
      reset();
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message ||
          "Internal server error, Please try again after some time"
      );
    }
  };

  return (
    <div>
      <div className='flex justify-center p-6'>
        <div className='w-full max-w-md bg-white p-8 rounded-lg shadow-lg'>
          <h2 className='text-2xl font-semibold text-center text-gray-800 mb-6'>
            Add Account
          </h2>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            {/* Role Field */}
            <div className='mb-4'>
              <label
                htmlFor='role'
                className='block text-sm font-medium text-gray-700'>
                Role
              </label>
              <select
                id='role'
                value={formData.role}
                {...register("role", {
                  required: "Role is required",
                  onChange: (e) =>
                    setFormData((prev) => ({ ...prev, role: e.target.value })),
                })}
                className={`mt-1 block w-full px-3 py-2 border ${
                  errors.role ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}>
                <option value='doctor'>Doctor</option>
                <option value='receptionist'>Receptionist</option>
              </select>
              {errors.role && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.role.message}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className='mb-4'>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700'>
                Email
              </label>
              <input
                type='text'
                id='email'
                value={formData.email}
                {...register("email", {
                  required: "Email is required",
                  onChange: (e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value })),
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                    message: "Invalid email",
                  },
                })}
                className={`mt-1 block w-full px-3 py-2 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              />
              {errors.email && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className='mb-4'>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-gray-700'>
                Password
              </label>
              <div className='relative'>
                <input
                  type={showPassword ? "text" : "password"}
                  id='password'
                  value={formData.password}
                  {...register("password", {
                    required: "Password is required",
                    onChange: (e) =>
                      setFormData((prev) => ({
                        ...prev,
                        password: e.target.value,
                      })),
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters long",
                    },
                  })}
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                />
                {formData.password?.length > 0 && (
                  <button
                    type='button'
                    onClick={() => setShowPassword((prev) => !prev)}
                    className='absolute top-1/2 -translate-y-1/2 right-2'>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                )}
              </div>
              {errors.password && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            {/* <div className='mb-6'>
              <label
                htmlFor='confirmPassword'
                className='block text-sm font-medium text-gray-700'>
                Confirm Password
              </label>
              <div className='relative'>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id='confirmPassword'
                  {...register("confirmPassword", {
                    required: "Confirm password is required",
                    validate: (value) =>
                      value === newPassword || "Passwords do not match",
                  })}
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                />
                {newConfirmPassword?.length > 0 && (
                  <button
                    type='button'
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className='absolute top-1/2 -translate-y-1/2 right-2'>
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                )}
              </div>
              {errors.confirmPassword && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.confirmPassword.message}
                </p>
              )}
            </div> */}

            {/* Submit Button */}
            <div className='flex items-center justify-between'>
              <button
                type='submit'
                className='w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'>
                Add Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAccount;
