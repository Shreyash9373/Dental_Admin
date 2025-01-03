import React from 'react';
import { useForm } from 'react-hook-form';

const BookApointment = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);  // Handle form submission (e.g., send to API)
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Book Appointment</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            id="fullName"
            className="w-full p-2 border rounded-md"
            {...register('fullName', { required: 'Full Name is required' })}
          />
          {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
        </div>

        {/* Contact */}
        <div>
          <label htmlFor="contact" className="block text-sm font-medium text-gray-700">Contact Number</label>
          <input
            type="tel"
            id="contact"
            className="w-full p-2 border rounded-md"
            {...register('contact', { required: 'Contact number is required' })}
          />
          {errors.contact && <p className="text-red-500 text-sm">{errors.contact.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
          <input
            type="email"
            id="email"
            className="w-full p-2 border rounded-md"
            {...register('email', { required: 'Email is required' })}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        {/* Location */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            id="location"
            className="w-full p-2 border rounded-md"
            {...register('location', { required: 'Location is required' })}
          />
          {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
        </div>

        {/* Date */}
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">Appointment Date</label>
          <input
            type="date"
            id="date"
            className="w-full p-2 border rounded-md"
            {...register('date', { required: 'Date is required' })}
          />
          {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
        </div>

        {/* Service */}
        <div>
          <label htmlFor="service" className="block text-sm font-medium text-gray-700">Service</label>
          <select
            id="service"
            className="w-full p-2 border rounded-md"
            {...register('service', { required: 'Service selection is required' })}
          >
            <option value="">Select a Service</option>
            <option value="Consultation">Consultation</option>
            <option value="Checkup">Checkup</option>
            <option value="Diagnostic">Diagnostic</option>
          </select>
          {errors.service && <p className="text-red-500 text-sm">{errors.service.message}</p>}
        </div>

        {/* Timeslot */}
        <div>
          <label htmlFor="timeslot" className="block text-sm font-medium text-gray-700">Timeslot</label>
          <select
            id="timeslot"
            className="w-full p-2 border rounded-md"
            {...register('timeslot', { required: 'Timeslot selection is required' })}
          >
            <option value="">Select a Timeslot</option>
            <option value="9:00 AM">9:00 AM</option>
            <option value="10:00 AM">10:00 AM</option>
            <option value="11:00 AM">11:00 AM</option>
            <option value="2:00 PM">2:00 PM</option>
            <option value="3:00 PM">3:00 PM</option>
          </select>
          {errors.timeslot && <p className="text-red-500 text-sm">{errors.timeslot.message}</p>}
        </div>

        {/* Prescription File */}
        <div>
          <label htmlFor="prescription" className="block text-sm font-medium text-gray-700">Prescription File (optional)</label>
          <input
            type="file"
            id="prescription"
            className="w-full p-2 border rounded-md"
            {...register('prescription')}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Submit Appointment
        </button>
      </form>
    </div>
  );
};

export default BookApointment;
