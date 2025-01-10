import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

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
    setEditingAppointment({ ...appointment });
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
    setEditingAppointment(null);
  };

  const handleSaveEdit = () => {
    const date = formatDate(selectedDate);
    setAppointments((prev) => ({
      ...prev,
      [date]: prev[date].map((appt) =>
        appt.id === editingAppointment.id ? editingAppointment : appt , 
      ),
    }));
    closeEditModal();
  };

  return (
    <div className="mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Dental Clinic Schedule
      </h2>

      <div className="flex justify-between items-center mb-6">
        <button
          className="p-2 bg-blue-500 text-white rounded-lg shadow-md font-bold hover:bg-blue-600"
          onClick={() => handleWeekChange(-1)}
        >
          &lt;
        </button>
        <div className="text-lg font-bold text-gray-600">
          {weekDates[0].toDateString()} - {weekDates[6].toDateString()}
        </div>
        <button
          className="p-2 bg-blue-500 text-white rounded-lg font-bold shadow-md hover:bg-blue-600"
          onClick={() => handleWeekChange(1)}
        >
          &gt;
        </button>
      </div>

      <div className="grid grid-cols-7 gap-4 mb-6">
        {weekDates.map((date, index) => (
          <button
            key={index}
            className={`p-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg text-xl hover:scale-105 transform transition ${
              selectedDate?.toDateString() === date.toDateString()
                ? "ring-2 ring-yellow-400"
                : ""
            }`}
            onClick={() => {
              setSelectedDate(date);
              getScheduleAppointments(formatDate(date));
            }}
          >
            <span className="block font-bold">
              {date.toDateString().split(" ")[0]}
            </span>
            <span>{date.getDate()}</span>
          </button>
        ))}
      </div>

        {/* Appointments */}
      {selectedDate && (
        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Appointments for {selectedDate.toDateString()}
          </h3>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : appointments[formatDate(selectedDate)]?.length > 0 ? (
            <table className="min-w-full border border-gray-300">
              <thead>
                <tr className="bg-blue-500 text-white">
                  <th className="px-4 py-2">Patient</th>
                  <th className="px-4 py-2">Contact</th>
                  <th className="px-4 py-2">Operation</th>
                  <th className="px-4 py-2">Time-Slot</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Actions</th>
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
                    <td>{appt.location}</td>
                    <td>
                      <button
                        className="bg-blue-500 text-white px-2 py-1 rounded"
                        onClick={() => openEditModal(appt)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500">No appointments for this day.</p>
          )}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Edit Appointment</h3>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Patient Name
                </label>
                <input
                  type="text"
                  value={editingAppointment?.name || ""}
                  onChange={(e) =>
                    setEditingAppointment({
                      ...editingAppointment,
                      name: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Time
                </label>
                <input
                  type="time"
                  value={editingAppointment?.time || ""}
                  onChange={(e) =>
                    setEditingAppointment({
                      ...editingAppointment,
                      time: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-400 text-white rounded"
                  onClick={closeEditModal}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                  onClick={handleSaveEdit}
                >
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
