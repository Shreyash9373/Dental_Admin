import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from 'axios';


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

const initialAppointmentsData = {
  "2025-01-01": [
    {
      id: 1,
      name: "John Doe",
      contact: "123-456-7890",
      operation: "Teeth Cleaning",
      doctor: "Dr. Smith",
      time: "10:00 AM",
      status: "Pending",
    },
    {
      id: 2,
      name: "Jane Smith",
      contact: "234-567-8901",
      operation: "Cavity Filling",
      doctor: "Dr. Brown",
      time: "11:30 AM",
      status: "Pending",
    },
  ],
  "2025-01-02": [
    {
      id: 3,
      name: "Alice Brown",
      contact: "345-678-9012",
      operation: "Root Canal",
      doctor: "Dr. Green",
      time: "2:00 PM",
      status: "Pending",
    },
  ],
  "2025-01-04": [
    {
      id: 4,
      name: "Bob Johnson",
      contact: "456-789-0123",
      operation: "Tooth Extraction",
      doctor: "Dr. Lee",
      time: "1:00 PM",
      status: "Pending",
    },
    {
      id: 5,
      name: "Charlie Lee",
      contact: "567-890-1234",
      operation: "Braces Adjustment",
      doctor: "Dr. White",
      time: "3:00 PM",
      status: "Pending",
    },
  ],
};

const ScheduleAppointment = () => {
  const[patientArray, setPatientArray] = useState([]);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [appointments, setAppointments] = useState(initialAppointmentsData);
  const [loading, setLoading] = useState(false); // Loading state
  
  const today = new Date();
  const weekDates = getWeekDates(today);

  const formatedDate = (dateString) => {
    const date = new Date(dateString); // Create a Date object
  
    // Extract year, month, and day
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");
  
    return `${year}-${month}-${day}`;
  };

  const handleDateClick = async (date) => {
    console.log(date);
    try {
      const sendDate = {
        date:formatedDate(date)
      } 
      console.log("Date data type:",typeof(sendDate));
      setLoading(true); // Start loading
      setError(null); // Reset any previous error
      console.log(sendDate);
      const response = await axios.post('http://localhost:4000/api/reception/get-patient', sendDate);
      console.log("Response from backend:", response.data);
      setPatientArray(response.data.patient);
      setResponseData(response.data);
      console.log("Usestate log",responseData);

    } catch (error) {
      setError(error.message);
      toast.error(error.response?.data?.message || "Failed to book appointment. Please try again.");
    } finally {
      setLoading(false); // Stop loading
      // console.log(responseData);
      console.log("Patient Array:",patientArray);
      
    }
        
    setSelectedDate(date);
    setShowCalendar(false);
  };

  const formatDate = (date) => date.toISOString().split("T")[0];

  const handleCancel = (date, id) => {
    setAppointments((prev) => ({
      ...prev,
      [date]: prev[date].map((appt) =>
        appt.id === id ? { ...appt, status: "Canceled" } : appt
      ),
    }));
  };

  const handleDelete = (date, id) => {
    setAppointments((prev) => ({
      ...prev,
      [date]: prev[date].filter((appt) => appt.id !== id),
    }));
  };

  const handleDone = (date, id) => {
    setAppointments((prev) => ({
      ...prev,
      [date]: prev[date].map((appt) =>
        appt.id === id ? { ...appt, status: "Completed" } : appt
      ),
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Dental Clinic Schedule
      </h2>

      {/* Calendar Icon */}
      <div className="flex justify-center mb-6">
        <button
          className="p-3 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 focus:outline-none"
          onClick={() => setShowCalendar(!showCalendar)}
          title="Toggle Calendar"
        >
          📅
        </button>
      </div>

      {/* Calendar */}
      {showCalendar && (
        <div className="flex justify-center mb-6">
          <Calendar
            className="react-calendar border-none shadow-lg rounded-lg"
            onChange={handleDateClick}
            value={selectedDate || today}
          />
        </div>
      )}

      {/* Week Buttons */}
      <div className="grid grid-cols-7 gap-4 mb-6">
        {weekDates.map((date, index) => (
          <button
            key={index}
            className="p-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg text-xl hover:scale-105 transform transition"
            onClick={() => handleDateClick(date)}
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
          {patientArray && Array.isArray(patientArray) && patientArray.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border-collapse border border-gray-300 shadow-lg rounded-lg">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold">FullName</th>
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold">MobileNo</th>
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Email-Id</th>
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Location</th>
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Date</th>
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Service</th>
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold">TimeSlot</th>
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Status</th>
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {patientArray.map((appointment) => (
                    <tr key={appointment.id} className="hover:bg-blue-50 transition duration-150 ease-in-out">
                      <td className="border border-gray-300 px-4 py-2">{appointment.fullName}</td>
                      <td className="border border-gray-300 px-4 py-2">{appointment.mobileNo}</td>
                      <td className="border border-gray-300 px-4 py-2">{appointment.emailId}</td>
                      <td className="border border-gray-300 px-4 py-2">{appointment.location}</td>
                      <td className="border border-gray-300 px-4 py-2">{appointment.date}</td>
                      <td className="border border-gray-300 px-4 py-2">{appointment.service}</td>
                      <td className="border border-gray-300 px-4 py-2">{appointment.timeSlot}</td>
                      <td className="border border-gray-300 px-4 py-2">
                        <span
                          className={`px-2 py-1 rounded-full text-sm font-medium ${appointment.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : appointment.status === "Completed"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                        >
                          {appointment.status}
                        </span>
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <div className="flex space-x-2">
                          <button
                            className="bg-yellow-500 text-white px-3 py-1 rounded-full hover:bg-yellow-600 shadow-md"
                            onClick={() => handleCancel(formatDate(selectedDate), appointment.id)}
                          >
                            Cancel
                          </button>
                          <button
                            className="bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 shadow-md"
                            onClick={() => handleDelete(formatDate(selectedDate), appointment.id)}
                          >
                            Delete
                          </button>
                          <button
                            className="bg-green-500 text-white px-3 py-1 rounded-full hover:bg-green-600 shadow-md"
                            onClick={() => handleDone(formatDate(selectedDate), appointment.id)}
                          >
                            Done
                          </button>
                        </div>
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

export default ScheduleAppointment;
