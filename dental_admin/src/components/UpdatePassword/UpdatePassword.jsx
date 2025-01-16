import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";


const UpdatePassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const [role, setRole] = useState(""); // State to manage the selected role
  const [doctors, setDoctors] = useState([]); // State to store doctors list
  const newPassword = watch("newPassword"); // For confirm password validation

  // Fetch the list of doctors when the role is selected as "Doctor"
  useEffect(() => {
    if (role === "doctor") {
      axios
        .get("http://localhost:4000/api/doctors") // Replace with your API endpoint
        .then((response) => setDoctors(response.data))
        .catch((error) => console.error("Failed to fetch doctors:", error));
    }
  }, [role]);

  const onSubmit = async (data) => {
    try {
      
       console.log(data);
      const response = await axios.post(
        "http://localhost:4000/api/dashboard/change-password",
        data
      );
      if (response) {
        toast.success(response.data.message || "Password Updated successfully!");
      }
     
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
          <label
            htmlFor="role"
            className="block text-sm font-medium text-gray-700"
          >
            Role
          </label>
          <select
            id="role"
            // {...register("role", {
            //   required: "Role is required",
            //   onChange: (e) => setRole(e.target.value),
            // })}
            className={`mt-1 block w-full border ${
              errors.role ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
          >
            <option value="">Select Role</option>
            <option value="doctor">Doctor</option>
            <option value="receptionist">Receptionist</option>
          </select>
          {errors.role && (
            <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
          )}
        </div>

        {/* Doctor's Name Dropdown */}
        {/* {role === "doctor" && (
          <div className="mb-4">
            <label
              htmlFor="doctorName"
              className="block text-sm font-medium text-gray-700"
            >
              Select Doctor's Name
            </label>
            <select
              id="doctorName"
              {...register("doctorName", {
                required: "Please select a doctor's name",
              })}
              className={`mt-1 block w-full border ${
                errors.doctorName ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            >
              <option value="">Select Doctor</option>
              {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.name}>
                  {doctor.name}
                </option>
              ))}
            </select>
            {errors.doctorName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.doctorName.message}
              </p>
            )}
          </div>
        )} */}

        {/* Receptionist Name */}
        {/* {role === "receptionist" && (
          <div className="mb-4">
            <label
              htmlFor="receptionistName"
              className="block text-sm font-medium text-gray-700"
            >
              Receptionist's Name
            </label>
            <input
              id="receptionistName"
              type="text"
              {...register("receptionistName", {
                required: "Receptionist's name is required",
              })}
              className={`mt-1 block w-full border ${
                errors.receptionistName ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              placeholder="Enter receptionist's name"
            />
            {errors.receptionistName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.receptionistName.message}
              </p>
            )}
          </div>
        )} */}

        {/* New Password */}
        <div className="mb-4">
          <label
            htmlFor="Password"
            className="block text-sm font-medium text-gray-700"
          >
            New Password
          </label>
          <input
            id="newPassword"
            type="password"
            {...register("Password", {
              required: "New password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            })}
            className={`mt-1 block w-full border ${
              errors.Password ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            placeholder="Enter new password"
          />
          {errors.Password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.Password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="mb-4">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword", {
              required: "Confirm password is required",
              validate: (value) => {
                const password = watch("Password"); // Retrieve the value of the Password field
                return value === password || "Passwords do not match";
              }
            })}
            className={`mt-1 block w-full border ${
              errors.confirmPassword ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            placeholder="Confirm new password"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
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
