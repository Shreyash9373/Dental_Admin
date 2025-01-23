import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddMember = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const newPassword = watch('password'); // For confirm password validation

  // Handle form submission
  const onSubmit = async(data) => {
    // Check if passwords match
    if (data.password !== data.confirmPassword) {
      toast.error("Password and Confirm Password does not match!");
      return;
    }

    // Log the form data to the console
    console.log(data);
     try {
      const response=await axios.post(`${import.meta.env.VITE_BACKEND_URI}/api/dashboard/addMember`,data,{withCredentials:true})
      console.log("Response",response.data);
      if(response.data.success){
        toast.success("Member Added Successfully");
      }
      else{
        toast.error("Failed to Add Member");
      }
     } catch (error) {
      console.log(error);
      toast.error(error|| "Internal server error, Please try again after some time");
     }
    
    // Simulate member creation (send data to the server here)
    //alert("Member created successfully!");
  };

  return (
    <div>
      <div className="flex justify-center p-6">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Add Member</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Role Field */}
            <div className="mb-4">
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
              <select 
                id="role" 
                {...register('role', { required: 'Role is required' })}
                className={`mt-1 block w-full px-3 py-2 border ${errors.role ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              >
                <option value="doctor">Doctor</option>
                <option value="receptionist">Receptionist</option>
              </select>
              {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>}
            </div>

            {/* Username Field */}
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
              <input 
                type="text" 
                id="username" 
                {...register('username', { required: 'Username is required' })}
                className={`mt-1 block w-full px-3 py-2 border ${errors.username ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`} 
              />
              {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input 
                type="password" 
                id="password" 
                {...register('password', { 
                  required: 'Password is required', 
                  minLength: { value: 6, message: 'Password must be at least 6 characters long' }
                })}
                className={`mt-1 block w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`} 
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>

            {/* Confirm Password Field */}
            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input 
                type="password" 
                id="confirmPassword" 
                {...register('confirmPassword', { 
                  required: 'Confirm password is required', 
                  validate: (value) => value === newPassword || 'Passwords do not match'
                })}
                className={`mt-1 block w-full px-3 py-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`} 
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-between">
              <button 
                type="submit" 
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Add Member
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMember;
