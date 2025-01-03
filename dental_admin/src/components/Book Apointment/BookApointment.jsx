import React from 'react';
import { useForm } from 'react-hook-form';

const BookApointment = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);  // Handle form submission (e.g., send to API)
  };

  return (
    <div className="max-w-4xl my-10 bg-gradient-to-b from-blue-400 via-blue-500 to-cyan-500 mx-auto p-8 rounded-lg shadow-xl">
      <h2 className="text-3xl font-semibold text-white mb-6">Book an Appointment</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 items-center flex flex-wrap gap-8">
        
        {/* Left Column */}
        <div className="flex-1 items-center pt-4">
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-200">Full Name</label>
            <input
              type="text"
              id="fullName"
              className="w-full p-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
              {...register('fullName', { required: 'Full Name is required' })}
            />
            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
          </div>

          {/* Contact Number */}
          <div>
            <label htmlFor="contact" className="block text-sm font-medium text-gray-200">Contact Number</label>
            <input
              type="tel"
              id="contact"
              className="w-full p-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
              {...register('contact', { required: 'Contact number is required' })}
            />
            {errors.contact && <p className="text-red-500 text-sm mt-1">{errors.contact.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-200">Email Address</label>
            <input
              type="email"
              id="email"
              className="w-full p-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-200">Location</label>
            <input
              type="text"
              id="location"
              className="w-full p-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
              {...register('location', { required: 'Location is required' })}
            />
            {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>}
          </div>
        </div>

        {/* Right Column */}
        <div className="flex-1 items-center">
          {/* Appointment Date */}
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-200">Appointment Date</label>
            <input
              type="date"
              id="date"
              className="w-full p-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
              {...register('date', { required: 'Date is required' })}
            />
            {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>}
          </div>

          {/* Service */}
          <div>
            <label htmlFor="service" className="block text-sm font-medium text-gray-200">Service</label>
            <select
              id="service"
              className="w-full p-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
              {...register('service', { required: 'Service selection is required' })}
            >
              <option value="">Select a Service</option>
              <option value="Consultation">Consultation</option>
              <option value="Checkup">Checkup</option>
              <option value="Diagnostic">Diagnostic</option>
            </select>
            {errors.service && <p className="text-red-500 text-sm mt-1">{errors.service.message}</p>}
          </div>

          {/* Timeslot */}
          <div>
            <label htmlFor="timeslot" className="block text-sm font-medium text-gray-200">Timeslot</label>
            <select
              id="timeslot"
              className="w-full p-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
              {...register('timeslot', { required: 'Timeslot selection is required' })}
            >
              <option value="">Select a Timeslot</option>
              <option value="9:00 AM">9:00 AM - 9:30 AM</option>
              <option value="10:00 AM">10:00 AM - 10:30 AM</option>
              <option value="11:00 AM">11:00 AM - 11:30 AM</option>
              <option value="2:00 PM">2:00 PM - 2:30 PM</option>
              <option value="3:00 PM">3:00 PM - 3:30 PM</option>
            </select>
            {errors.timeslot && <p className="text-red-500 text-sm mt-1">{errors.timeslot.message}</p>}
          </div>

          {/* Prescription File */}
          <div>
            <label htmlFor="prescription" className="block text-sm font-medium text-gray-200">Prescription File (optional)</label>
            <input
              type="file"
              id="prescription"
              className="w-full p-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
              {...register('prescription')}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="w-full flex items-center justify-center">
          <button
            type="submit"
            className="w-auto px-4 py-3 bg-indigo-600 text-white  rounded-md hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          >
            Submit Appointment
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookApointment;
