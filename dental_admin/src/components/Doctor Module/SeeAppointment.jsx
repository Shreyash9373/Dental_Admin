import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const getWeekDates = (date) => {
  const currentDate = new Date(date);
  const daysOfWeek = [];

  // Start from 3 days before the given date
  currentDate.setDate(currentDate.getDate() - 3);

  // Collect 7 days (last 3 days, today, next 3 days)
  for (let i = 0; i < 7; i++) {
    daysOfWeek.push(new Date(currentDate.getTime()));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return daysOfWeek;
};

const SeeAppointment = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [appointments, setAppointments] = useState({});
  const [loading, setLoading] = useState(false); // Loading state
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

  return (
    <div className="mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Dental Clinic Schedule
      </h2>

      {/* Week Navigation Buttons */}
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

      {/* Week Buttons */}
      <div className="grid grid-cols-7 gap-4 mb-6">
        {weekDates.map((date, index) => (
          <button
            key={index}
            className={`p-2 text-white rounded-lg text-xl hover:scale-105 font-bold transform transition ${
              selectedDate?.toDateString() === date.toDateString()
                ? "bg-teal-500"
                : "bg-gradient-to-r from-blue-500 to-blue-700"
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
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border-collapse border border-gray-300 shadow-lg rounded-lg">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                      Patient
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                      Contact
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                      Operation
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                      Time
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {appointments[formatDate(selectedDate)]?.map((appointment) => (
                    <tr key={appointment._id}>
                      <td className="border px-4 py-2">{appointment.fullName}</td>
                      <td className="border px-4 py-2">{appointment.mobileNo}</td>
                      <td className="border px-4 py-2">{appointment.service}</td>
                      <td className="border px-4 py-2">{appointment.timeSlot}</td>
                      <td className="border px-4 py-2">
                        {new Date(appointment.date).toISOString().split("T")[0]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">No appointments for this day.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SeeAppointment;
