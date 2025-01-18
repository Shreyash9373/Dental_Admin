//ANIKET
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";

const BookApointment = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false); // Loading state
  const [availableSlots, setAvailableSlots] = useState([]); // Available time slots
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);

  const selectedDate = watch("date"); // Watch selected date

  useEffect(() => {
    if (selectedDate) {
      const fetchAvailableSlots = async () => {
        try {
          const response = await axios.get(
            `http://localhost:4000/api/reception/available-slots?date=${encodeURIComponent(
              selectedDate
            )}`,{withCredentials:true}
          );

          // Assuming the backend sends available slots in `response.data.availableSlots`
          setAvailableSlots(response.data.availableSlots || []);
          console.log(response.data.availableSlots);
        } catch (error) {
          console.error("Error fetching available slots:", error);
          setAvailableSlots([]); // Reset available slots on error
        }
      };

      fetchAvailableSlots();
    }
  }, [selectedDate]);

  const onSubmit = async (data) => {
    console.log(data);
    try {
      setLoading(true); // Start loading
      setError(null); // Reset any previous error
      const response = await axios.post(
        "http://localhost:4000/api/reception/book-appointment",
        data,{withCredentials:true}
      );
      setResponseData(response.data);
      toast.success(
        response.data.message || "Appointment booked successfully!"
      );
    } catch (error) {
      setError(error.message);
      toast.error(
        error.response?.data?.message ||
          "Failed to book appointment. Please try again."
      );
    } finally {
      setLoading(false); // Stop loading
      reset(); // Reset the form
    }
  };

  return (
    <div className='max-w-4xl my-10 bg-gradient-to-b from-blue-400 via-blue-500 to-cyan-500 mx-auto p-4 rounded-lg shadow-xl'>
      <h2 className='text-3xl font-semibold text-white mb-6'>
        Book an Appointment
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
        {/* Full Name and Contact Number */}
        <div className='flex flex-col gap-6 md:flex-row'>
          <div className='flex-1'>
            <label
              htmlFor='fullName'
              className='block text-sm font-medium text-gray-200'>
              Full Name
            </label>
            <input
              type='text'
              id='fullName'
              placeholder='Enter full name'
              className='w-full p-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400'
              {...register("fullName", { required: "Full Name is required" })}
            />
            {errors.fullName && (
              <p className='text-red-500 text-sm mt-1'>
                {errors.fullName.message}
              </p>
            )}
          </div>
          <div className='flex-1'>
            <label
              htmlFor='contact'
              className='block text-sm font-medium text-gray-200'>
              Contact Number
            </label>
            <input
              type='tel'
              id='contact'
              placeholder='Enter contact number'
              className='w-full p-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400'
              {...register("mobileNo", {
                required: "Contact number is required",
              })}
            />
            {errors.mobileNo && (
              <p className='text-red-500 text-sm mt-1'>
                {errors.mobileNo.message}
              </p>
            )}
          </div>
        </div>

        {/* Email and Location */}
        <div className='flex flex-col gap-6 md:flex-row'>
          <div className='flex-1'>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-gray-200'>
              Email Address
            </label>
            <input
              type='email'
              id='email'
              placeholder='Enter email address'
              className='w-full p-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400'
              {...register("emailId", { required: "Email is required" })}
            />
            {errors.emailId && (
              <p className='text-red-500 text-sm mt-1'>
                {errors.emailId.message}
              </p>
            )}
          </div>
          <div className='flex-1'>
            <label
              htmlFor='location'
              className='block text-sm font-medium text-gray-200'>
              Location
            </label>
            <input
              type='text'
              id='location'
              placeholder='Enter location'
              className='w-full p-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400'
              {...register("location", { required: "Location is required" })}
            />
            {errors.location && (
              <p className='text-red-500 text-sm mt-1'>
                {errors.location.message}
              </p>
            )}
          </div>
        </div>

        {/* Appointment Date and Service */}
        <div className='flex flex-col gap-6 md:flex-row'>
          <div className='flex-1'>
            <label
              htmlFor='date'
              className='block text-sm font-medium text-gray-200'>
              Appointment Date
            </label>
            <input
              type='date'
              id='date'
              className='w-full p-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400'
              {...register("date", { required: "Date is required" })}
            />
            {errors.date && (
              <p className='text-red-500 text-sm mt-1'>{errors.date.message}</p>
            )}
          </div>
          <div className='flex-1'>
            <label
              htmlFor='service'
              className='block text-sm font-medium text-gray-200'>
              Service
            </label>
            <select
              id='service'
              className='w-full p-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400'
              {...register("service", {
                required: "Service selection is required",
              })}>
              <option value=''>Select a Service</option>
              <option value='Consultation'>Consultation</option>
              <option value='Checkup'>Checkup</option>
              <option value='Diagnostic'>Diagnostic</option>
            </select>
            {errors.service && (
              <p className='text-red-500 text-sm mt-1'>
                {errors.service.message}
              </p>
            )}
          </div>
        </div>

        {/* Timeslot */}
        <div className='flex flex-col justify-evenly gap-6 md:flex-row'>
          <div className='flex-1'>
            <label
              htmlFor='timeslot'
              className='block text-sm font-medium text-gray-200'>
              Timeslot
            </label>
            <select
              id='timeslot'
              className='w-full p-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400'
              {...register("timeSlot", {
                required: "Timeslot selection is required",
              })}>
              <option value=''>Select a Timeslot</option>
              {availableSlots.length > 0 ? (
                availableSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))
              ) : (
                <option disabled>No available slots</option>
              )}
            </select>
            {errors.timeSlot && (
              <p className='text-red-500 text-sm mt-1'>
                {errors.timeSlot.message}
              </p>
            )}
          </div>
              {/* Profile Phtot File */}
          <div className="flex-1">
            <label htmlFor="prescription" className="block text-sm font-medium text-gray-200">Photo (optional)</label>
            <input
              type="file"
              id="prescription"
              className="w-full p-3 mt-2 border-2  border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
              {...register('prescription')}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className='w-full flex items-center justify-center'>
          <button
            type='submit'
            disabled={loading}
            className={`w-auto px-4 py-3 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-300 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-800"
            }`}>
            {loading ? "Booking..." : "Book Appointment"}
          </button>
        </div>
      </form>

      {/* Loading spinner */}
      {loading && (
        <div className='mt-6 flex justify-center'>
          <div className='loader border-t-4 border-b-4 border-white w-10 h-10 rounded-full animate-spin'></div>
        </div>
      )}

      {error && <div className='text-red-500 mt-4'>{error}</div>}
    </div>
  );
};

export default BookApointment;
