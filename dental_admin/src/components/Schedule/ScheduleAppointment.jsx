import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useForm } from "react-hook-form";

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
        "http://localhost:4000/api/reception/get-patient",
        { date: formattedDate }
      );

      setAppointments((prev) => ({
        ...prev,
        [formattedDate]: response.data.patient || [],
      }));

      console.log("Patient Data: ", response.data.patient);
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

      // Include the _id in the data object
      const updatedData = { ...data, _id: editingAppointment._id };
      console.log(updatedData);
      // Send the updated patient data to the API, with _id in the body
      const response = await axios.put(
        "http://localhost:4000/api/reception/update-patient",
        updatedData
      );

      // Update local state to reflect the changes made
      const updatedAppointments = appointments[formatDate(selectedDate)].map(
        (appt) =>
          appt._id === editingAppointment._id ? { ...appt, ...data } : appt
      );

      setAppointments((prev) => ({
        ...prev,
        [formatDate(selectedDate)]: updatedAppointments,
      }));

      toast.success("Patient details updated successfully!");
      closeEditModal(); // Close the modal after saving the changes
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
    });
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
    setEditingAppointment(null);
  };

  // const handleSaveEdit = async (data) => {
  //   const updatedAppointments = appointments[formatDate(selectedDate)].map(
  //     (appt) =>
  //       appt._id === editingAppointment._id
  //         ? { ...appt, ...data }
  //         : appt
  //   );

  //   setAppointments((prev) => ({
  //     ...prev,
  //     [formatDate(selectedDate)]: updatedAppointments,
  //   }));

  //   closeEditModal();

  //   // Optionally update the database here:
  //   try {
  //     await axios.put(
  //       `http://localhost:4000/api/reception/update-patient/${editingAppointment._id}`,
  //       data
  //     );
  //     toast.success("Patient details updated!");
  //   } catch (err) {
  //     toast.error("Failed to update patient details");
  //   }
  // };

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
            <table className='min-w-full border border-gray-300'>
              <thead>
                <tr className='bg-blue-500 text-white text-left'>
                  <th className='py-2'>Patient Name</th>
                  <th className='py-2'>Contact</th>
                  <th className='py-2'>Operation</th>
                  <th className='py-2'>Time-Slot</th>
                  <th className='py-2'>Date</th>
                  <th className='py-2'>Status</th>
                  <th className='py-2'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments[formatDate(selectedDate)]?.map((appt) => (
                  <tr key={appt._id}>
                    <td>{appt.fullName}</td>
                    <td>{appt.mobileNo}</td>
                    <td>{appt.service}</td>
                    <td>{appt.timeSlot}</td>
                    <td>{new Date(appt.date).toISOString().split("T")[0]}</td>
                    <td>{appt.status}</td>
                    <td>
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
          ) : (
            <p className='text-gray-500'>No appointments for this day.</p>
          )}
        </div>
      )}

      {/* Modal for editing appointment */}
      {isModalOpen && editingAppointment && (
        <div className='fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center'>
          <div className='bg-white p-6 rounded-lg shadow-lg w-96'>
            <h3 className='text-2xl font-semibold text-gray-700 mb-4'>
              Edit Appointment
            </h3>
            <form onSubmit={handleSubmit(updatePatient)}>
              <div className='mb-4'>
                <label className='block text-gray-700'>Patient Name</label>
                <input
                  type='text'
                  {...register("fullName")}
                  className='w-full p-2 border border-gray-300 rounded-lg'
                />
              </div>
              <div className='mb-4'>
                <label className='block text-gray-700'>Contact</label>
                <input
                  type='text'
                  {...register("mobileNo")}
                  className='w-full p-2 border border-gray-300 rounded-lg'
                />
              </div>
              <div className='mb-4'>
                <label className='block text-gray-700'>Time Slot</label>
                <input
                  type='text'
                  {...register("timeSlot")}
                  className='w-full p-2 border border-gray-300 rounded-lg'
                />
              </div>
              <div className='mb-4'>
                <label className='block text-gray-700'>Status</label>
                <select
                  {...register("status")}
                  className='w-full p-2 border border-gray-300 rounded-lg'>
                  <option value='Scheduled'>Scheduled</option>
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
