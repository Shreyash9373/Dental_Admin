import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const UpdatePassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const [role, setRole] = useState("doctor"); // State to manage the selected role
  const [doctors, setDoctors] = useState([]); // State to store doctors list
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  //const newPassword = watch("newPassword"); // For confirm password validation

  // Fetch the list of doctors when the role is selected as "Doctor"
  // useEffect(() => {
  //   if (role === "doctor") {
  //     axios
  //       .get("http://localhost:4000/api/doctors") // Replace with your API endpoint
  //       .then((response) => setDoctors(response.data))
  //       .catch((error) => console.error("Failed to fetch doctors:", error));
  //   }
  // }, [role]);

  const onSubmit = async (data) => {
    try {
      console.log(data);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/api/dashboard/change-password`,
        data,
        { withCredentials: true }
      );
      if (response) {
        toast.success(
          response.data.message || "Password Updated successfully!"
        );
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to book appointment. Please try again."
      );
    }
  };

  return (
    <div className='p-4 max-w-md mx-auto relative'>
      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='bg-white p-4 rounded-xl shadow-md'>
        <h1 className='text-2xl font-bold mb-4'>Update Password</h1>

        {/* Role Selection */}
        <div className='mb-4'>
          <label
            htmlFor='role'
            className='block text-sm font-medium text-gray-700'>
            Role
          </label>
          <select
            id='role'
            defaultValue='doctor'
            {...register("role", {
              required: "Role is required",
              onChange: (e) => setRole(e.target.value),
            })}
            className={`mt-1 block w-full border ${
              errors.role ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}>
            <option value=''>Select Role</option>
            <option value='doctor'>Doctor</option>
            <option value='receptionist'>Receptionist</option>
          </select>
          {errors.role && (
            <p className='text-red-500 text-sm mt-1'>{errors.role.message}</p>
          )}
        </div>

        {/* User Name */}
        <div className='mb-4'>
          <label
            htmlFor='receptionistName'
            className='block text-sm font-medium text-gray-700'>
            {role == "receptionist" ? "Receptionist name" : "Doctor Name"}
          </label>
          <input
            id='receptionistName'
            type='text'
            {...register("receptionistName", {
              required: "Receptionist's name is required",
            })}
            className={`mt-1 block w-full border ${
              errors.receptionistName ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            placeholder={`Enter ${role} name`}
          />
          {errors.receptionistName && (
            <p className='text-red-500 text-sm mt-1'>
              {errors.receptionistName.message}
            </p>
          )}
        </div>

        {/* New Password */}
        <div className='mb-4'>
          <label
            htmlFor='Password'
            className='block text-sm font-medium text-gray-700'>
            New Password
          </label>
          <input
            id='newPassword'
            type={showPassword ? "text" : "password"}
            {...register("Password", {
              required: "New password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            })}
            onChange={(e) => setPassword(e.target.value)}
            className={`mt-1 block w-full border ${
              errors.Password ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            placeholder='Enter new password'
          />
          {password.length > 0 && (
            <button
              type='button'
              onClick={() => setShowPassword((prev) => !prev)}
              className='absolute right-10 top-[12.5rem]'>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          )}
          {errors.Password && (
            <p className='text-red-500 text-sm mt-1'>
              {errors.Password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className='mb-4'>
          <label
            htmlFor='confirmPassword'
            className='block text-sm font-medium text-gray-700'>
            Confirm Password
          </label>
          <input
            id='confirmPassword'
            type={showConfirmPassword ? "text" : "password"}
            {...register("confirmPassword", {
              required: "Confirm password is required",
              validate: (value) => {
                const password = watch("Password"); // Retrieve the value of the Password field
                return value === password || "Passwords do not match";
              },
            })}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`mt-1 block w-full border ${
              errors.confirmPassword ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            placeholder='Confirm new password'
          />
          {confirmpassword.length > 0 && (
            <button
              type='button'
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className='absolute right-10 bottom-[6.5rem]'>
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          )}

          {errors.confirmPassword && (
            <p className='text-red-500 text-sm mt-1'>
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type='submit'
          className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'>
          Update Password
        </button>
      </form>
    </div>
  );
};

export default UpdatePassword;
