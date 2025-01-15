//ANIKET
import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const UpdatePassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const newPassword = watch("newPassword"); // For confirm password validation

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:4000/api/reception/change-password", data);
      alert(response.data.message || "Password updated successfully!");
      reset(); // Reset the form after successful submission
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update password.");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-4 rounded-xl shadow-md"
      >
      <h1 className="text-2xl font-bold mb-4">Update Password</h1>

        {/* Role Selection */}
        <div className="mb-4">
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">
            Role
          </label>
          <select
            id="role"
            {...register("role", { required: "Role is required" })}
            className={`mt-1 block w-full border ${
              errors.role ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
          >
            <option value="doctor">Doctor</option>
            <option value="receptionist">Receptionist</option>
          </select>
          {errors.role && (
            <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
          )}
        </div>

        {/* Old Password */}
        <div className="mb-4">
          <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700">
            Old Password
          </label>
          <input
            id="oldPassword"
            type="password"
            {...register("oldPassword", {
              required: "Old password is required",
            })}
            className={`mt-1 block w-full border ${
              errors.oldPassword ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            placeholder="Enter old password"
          />
          {errors.oldPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.oldPassword.message}</p>
          )}
        </div>

        {/* New Password */}
        <div className="mb-4">
          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
            New Password
          </label>
          <input
            id="newPassword"
            type="password"
            {...register("newPassword", {
              required: "New password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            })}
            className={`mt-1 block w-full border ${
              errors.newPassword ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            placeholder="Enter new password"
          />
          {errors.newPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword", {
              required: "Confirm password is required",
              validate: (value) =>
                value === newPassword || "Passwords do not match",
            })}
            className={`mt-1 block w-full border ${
              errors.confirmPassword ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            placeholder="Confirm new password"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default UpdatePassword;
