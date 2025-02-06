import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useForm } from "react-hook-form";
axios.defaults.withCredentials = true; // Include credentials (cookies)

const getWeekDates = (date) => {
  const currentDate = new Date(date);
  const daysOfWeek = [];
  currentDate.setDate(currentDate.getDate() - 3);

  for (let i = 0; i < 7; i++) {
    daysOfWeek.push(new Date(currentDate.getTime()));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return daysOfWeek;
};

// Helper function to determine the text color and background for the status
const getStatusColor = (status) => {
  switch (status) {
    case "Completed":
      return "bg-green-100 text-green-500 px-2 py-1 rounded"; // Green text with green background
    case "Postponed":
      return "bg-yellow-100 text-yellow-500 px-2 py-1 rounded"; // Yellow text with yellow background
    case "Cancelled":
      return "bg-red-100 text-red-500 px-2 py-1 rounded"; // Red text with red background
    default:
      return "bg-gray-100 text-gray-500 px-2 py-1 rounded"; // Default gray background and text
  }
};

const ScheduleAppointment = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [appointments, setAppointments] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { register, handleSubmit, reset } = useForm(); // react-hook-form

  const formatDate = (date) => date.toISOString().split("T")[0];

  const getScheduleAppointments = async (date) => {
    try {
      setLoading(true);
      setError(null);

      const formattedDate = formatDate(new Date(date));

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/api/receptionists/get-appointment`,
        { date: formattedDate },
        { withCredentials: true }
      );

      setAppointments((prev) => ({
        ...prev,
        [formattedDate]: response.data.appointment || [],
      }));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch appointments.");
      toast.error(err.response?.data?.message || "Failed to get Appointments.");
    } finally {
      setLoading(false);
    }
  };

  const updatePatient = async (data) => {
    try {
      setLoading(true);
      setError(null);

      const updatedData = { ...data, _id: editingAppointment._id };
      console.log(updatedData);

      const response = await axios.put(
        `${
          import.meta.env.VITE_BACKEND_URI
        }/api/receptionists/update-appointment`,
        updatedData,
        { withCredentials: true }
      );

      const updatedAppointments = appointments[formatDate(selectedDate)].map(
        (appt) =>
          appt._id === editingAppointment._id ? { ...appt, ...data } : appt
      );

      setAppointments((prev) => ({
        ...prev,
        [formatDate(selectedDate)]: updatedAppointments,
      }));

      toast.success("Patient details updated successfully!");
      closeEditModal();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update details.");
      toast.error(err.response?.data?.message || "Failed to update details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const date = formatDate(currentWeek);
    getScheduleAppointments(date);
  }, [currentWeek]);

  const weekDates = getWeekDates(currentWeek);

  const handleWeekChange = (direction) => {
    const newWeek = new Date(currentWeek);
    newWeek.setDate(newWeek.getDate() + direction * 7);
    setCurrentWeek(newWeek);
  };

  const openEditModal = (appointment) => {
    setEditingAppointment(appointment);
    setIsModalOpen(true);
    reset({
      fullName: appointment.fullName,
      mobileNo: appointment.mobileNo,
      emailId: appointment.emailId,
      location: appointment.location,
      date: appointment.date,
      service: appointment.service,
      timeSlot: appointment.timeSlot,
      status: appointment.status,
      age: appointment.age, // Add age here for the modal
      paymentAmount: appointment.paymentAmount || "",
      paymentStatus: appointment.paymentStatus || "",
    });
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
    setEditingAppointment(null);
  };

  return (
    <div className='mx-auto p-6 bg-white shadow-md rounded-lg'>
      <h2 className='text-3xl font-bold text-gray-800 mb-6 text-center'>
        Dental Clinic Schedule
      </h2>

      <div className='flex justify-between items-center mb-6'>
        <button
          className='p-2 bg-blue-500 text-white rounded-lg shadow-md font-bold hover:bg-blue-600'
          onClick={() => handleWeekChange(-1)}>
          &lt;
        </button>
        <div className='text-lg font-bold text-gray-600'>
          {weekDates[0].toDateString()} - {weekDates[6].toDateString()}
        </div>
        <button
          className='p-2 bg-blue-500 text-white rounded-lg font-bold shadow-md hover:bg-blue-600'
          onClick={() => handleWeekChange(1)}>
          &gt;
        </button>
      </div>

      <div className='flex flex-wrap gap-4 justify-center mb-6'>
        {weekDates.map((date, index) => (
          <button
            key={index}
            className={`min-w-32 flex-grow p-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg text-xl hover:scale-105 transform transition ${
              selectedDate?.toDateString() === date.toDateString()
                ? "ring-2 ring-yellow-400"
                : ""
            }`}
            onClick={() => {
              setSelectedDate(date);
              getScheduleAppointments(formatDate(date));
            }}>
            <span className='block font-bold'>
              {date.toDateString().split(" ")[0]}
            </span>
            <span>{date.getDate()}</span>
          </button>
        ))}
      </div>

      {selectedDate && (
        <div className='bg-gray-50 p-4 rounded-lg shadow-md'>
          <h3 className='text-xl font-semibold text-gray-700 mb-4'>
            Appointments for {selectedDate.toDateString()}
          </h3>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className='text-red-500'>{error}</p>
          ) : appointments[formatDate(selectedDate)]?.length > 0 ? (
            <>
              {/* Table for Desktop View */}
              <div className='hidden lg:block overflow-x-auto'>
                <table className='min-w-full border border-gray-300'>
                  <thead>
                    <tr className='bg-blue-500 text-white text-left'>
                      <th className='py-2 px-4'>Patient Name</th>
                      <th className='py-2 px-4'>Contact</th>
                      <th className='py-2 px-4'>Age</th>
                      <th className='py-2 px-4'>Operation</th>
                      <th className='py-2 px-4'>Time-Slot</th>
                      <th className='py-2 px-4'>Date</th>
                      <th className='py-2 px-4'>Amount (₹)</th>
                      <th className='py-2 px-4'>Payment Status</th>
                      <th className='py-2 px-4'>Operation Status</th>
                      <th className='py-2 px-4'>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments[formatDate(selectedDate)]?.map((appt) => (
                      <tr key={appt._id} className='border-t'>
                        <td className='py-2 px-4'>{appt.fullName}</td>
                        <td className='py-2 px-4'>{appt.mobileNo}</td>
                        <td className='py-2 px-4'>{appt.age}</td>
                        <td className='py-2 px-4'>{appt.service}</td>
                        <td className='py-2 px-4'>{appt.timeSlot}</td>
                        <td className='py-2 px-4'>
                          {new Date(appt.date).toISOString().split("T")[0]}
                        </td>
                        <td className='py-2 px-4'>
                          {appt.paymentAmount
                            ? `${appt.paymentAmount}`
                            : "Not Set"}
                        </td>
                        <td className='py-2 px-4'>
                          {appt.paymentStatus || "Pending"}
                        </td>
                        <td
                          className={`py-2 px-4 ${getStatusColor(
                            appt.status
                          )}`}>
                          {appt.status}
                        </td>
                        <td className='py-2 px-4'>
                          <button
                            className='bg-blue-500 text-white px-2 py-1 rounded'
                            onClick={() => openEditModal(appt)}>
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Cards for Mobile View */}
              <div className='block lg:hidden space-y-4'>
                {appointments[formatDate(selectedDate)]?.map((appt) => (
                  <div
                    key={appt._id}
                    className='p-4 border border-gray-300 rounded-lg shadow'>
                    <p>
                      <span className='font-semibold'>Name:</span>{" "}
                      {appt.fullName}
                    </p>
                    <p>
                      <span className='font-semibold'>Contact:</span>{" "}
                      {appt.mobileNo}
                    </p>
                    <p>
                      <span className='font-semibold'>Age:</span> {appt.age}
                    </p>
                    <p>
                      <span className='font-semibold'>Operation:</span>{" "}
                      {appt.service}
                    </p>
                    <p>
                      <span className='font-semibold'>Time Slot:</span>{" "}
                      {appt.timeSlot}
                    </p>
                    <p>
                      <span className='font-semibold'>Date:</span>{" "}
                      {new Date(appt.date).toISOString().split("T")[0]}
                    </p>
                    <p>
                      <span className='font-semibold'>Payment Amount:</span>{" "}
                      {appt.paymentAmount
                        ? `₹ ${appt.paymentAmount}`
                        : "Not Set"}
                    </p>
                    <p>
                      <span className='font-semibold'>Payment Status:</span>{" "}
                      {appt.paymentStatus || "Pending"}
                    </p>
                    <p>
                      <span className='font-semibold'>Status:</span>
                      <span className={`ml-2 ${getStatusColor(appt.status)}`}>
                        {appt.status}
                      </span>
                    </p>
                    <button
                      className='bg-blue-500 text-white px-4 py-2 mt-2 rounded'
                      onClick={() => openEditModal(appt)}>
                      Edit
                    </button>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className='text-gray-500'>No appointments for this day.</p>
          )}
        </div>
      )}

      {/* Modal for editing appointment */}
      {isModalOpen && editingAppointment && (
        <div className='fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center'>
          <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-xl max-h-[90vh] overflow-y-auto'>
            <h3 className='text-2xl font-semibold text-gray-700 mb-4'>
              Edit Appointment
            </h3>
            <form onSubmit={handleSubmit(updatePatient)}>
              <div className='mb-3'>
                <label className='block text-gray-700'>Patient Name</label>
                <input
                  type='text'
                  {...register("fullName")}
                  className='w-full p-2 border border-gray-300 rounded-lg'
                />
              </div>
              <div className='mb-3'>
                <label className='block text-gray-700'>Contact</label>
                <input
                  type='text'
                  {...register("mobileNo")}
                  className='w-full p-2 border border-gray-300 rounded-lg'
                />
              </div>
              <div className='mb-3'>
                <label className='block text-gray-700'>Age</label>
                <input
                  type='number'
                  {...register("age")}
                  className='w-full p-2 border border-gray-300 rounded-lg'
                  placeholder='Enter the patient age'
                />
              </div>
              <div className='mb-3'>
                <label className='block text-gray-700'>Time Slot</label>
                <input
                  type='text'
                  {...register("timeSlot")}
                  className='w-full p-2 border border-gray-300 rounded-lg'
                />
              </div>
              <div className='mb-3'>
                <label className='block text-gray-700'>
                  Payment Amount (₹)
                </label>
                <input
                  type='number'
                  {...register("paymentAmount")}
                  className='w-full p-2 border border-gray-300 rounded-lg'
                  placeholder='Enter the payment amount'
                />
              </div>
              <div className='mb-3'>
                <label className='block text-gray-700'>Payment Status</label>
                <select
                  {...register("paymentStatus")}
                  className='w-full p-2 border border-gray-300 rounded-lg'>
                  <option value='Pending'>Pending</option>
                  <option value='Paid'>Paid</option>
                </select>
              </div>
              <div className='mb-3'>
                <label className='block text-gray-700'>Status</label>
                <select
                  {...register("status")}
                  className='w-full p-2 border border-gray-300 rounded-lg'>
                  <option value='Postponed'>Postponed</option>
                  <option value='Completed'>Completed</option>
                  <option value='Cancelled'>Cancelled</option>
                </select>
              </div>

              <div className='flex justify-end'>
                <button
                  type='button'
                  onClick={closeEditModal}
                  className='bg-gray-300 px-4 py-2 rounded-lg mr-4'>
                  Cancel
                </button>
                <button
                  type='submit'
                  className='bg-blue-500 text-white px-4 py-2 rounded-lg'>
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleAppointment;
