import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from "react-toastify";
import axios from 'axios';

const BookAppointment = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state

  const onSubmit = async (data) => {
    console.log(data);
    try {
      setLoading(true); // Start loading
      setError(null); // Reset any previous error
      const response = await axios.post('http://localhost:4000/api/reception/book-appointment', data);
      setResponseData(response.data);
      toast.success(response.data.message || "Appointment booked successfully!");
    } catch (error) {
      setError(error.message);
      toast.error(error.response?.data?.message || "Failed to book appointment. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="max-w-4xl my-10 bg-gradient-to-b from-blue-400 via-blue-500 to-cyan-500 mx-auto p-8 rounded-lg shadow-xl">
      <h2 className="text-3xl font-semibold text-white mb-6 text-center">Book an Appointment</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 items-center flex flex-wrap gap-8">

        {/* Left Column */}
        <div className="flex-1 items-center pt-4">
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-lg font-medium text-gray-200">Full Name</label>
            <input
              type="text"
              id="fullName"
              className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
              {...register('fullName', { required: 'Full Name is required' })}
            />
            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
          </div>
          {/* Other inputs */}
        </div>

        {/* Right Column */}
        <div className="flex-1 items-center">
          {/* Appointment Date */}
          <div>
            <label htmlFor="date" className="block text-lg font-medium text-gray-200">Appointment Date</label>
            <input
              type="date"
              id="date"
              className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
              {...register('date', { required: 'Date is required' })}
            />
            {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>}
          </div>
          {/* Other inputs */}
        </div>

        {/* Submit Button */}
        <div className="w-full flex items-center justify-center">
          <button
            type="submit"
            disabled={loading} // Disable button while loading
            className={`w-auto px-4 py-3 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-300 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-800"
            }`}
          >
            {loading ? (
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-white animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 100 8v4a8 8 0 01-8-8z"
                  ></path>
                </svg>
                Submitting...
              </div>
            ) : (
              "Submit Appointment"
            )}
          </button>
        </div>
      </form>

      {error && <div className="text-red-500 mt-4">{error}</div>}
    </div>
  );
};

export default BookAppointment;
