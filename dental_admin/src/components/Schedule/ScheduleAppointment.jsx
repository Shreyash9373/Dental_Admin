import React, { useState } from "react";

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
  "2025-01-06": [
    {
      id: 3,
      name: "Shreyas Raut",
      contact: "123-456-7890",
      operation: "Teeth Cleaning",
      doctor: "Dr. Smith",
      time: "10:00 AM",
      status: "Pending",
    },
    {
      id: 4,
      name: "Aniket Tambe",
      contact: "234-567-8901",
      operation: "Cavity Filling",
      doctor: "Dr. Brown",
      time: "11:30 AM",
      status: "Pending",
    },
    {
      id: 5,
      name: "Smit Bharshankar",
      contact: "234-567-8901",
      operation: "Dental Checkup",
      doctor: "Dr. Brown",
      time: "12:30 AM",
      status: "Pending",
    },
  ],
};

const ScheduleAppointment = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [appointments, setAppointments] = useState(initialAppointmentsData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);

  const weekDates = getWeekDates(currentWeek);

  const formatDate = (date) => date.toISOString().split("T")[0];

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
        appt.id === editingAppointment.id ? { ...editingAppointment } : appt
      ),
    }));
    closeEditModal();
  };

  return (
    // <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
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
          {/* Week of {weekDates[0].toDateString()} - {weekDates[6].toDateString()} */}
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
            className={`p-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg text-xl hover:scale-105 font-bo transform transition ${
              selectedDate?.toDateString() === date.toDateString()
                ? "ring-2 ring-yellow-400"
                : ""
            }`}
            onClick={() => setSelectedDate(date)}
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
          {appointments[formatDate(selectedDate)] &&
          appointments[formatDate(selectedDate)].length > 0 ? (
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
                      Doctor
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                      Time
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                      Status
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {appointments[formatDate(selectedDate)].map((appointment) => (
                    <tr key={appointment.id}>
                      <td className="border px-4 py-2">{appointment.name}</td>
                      <td className="border px-4 py-2">{appointment.contact}</td>
                      <td className="border px-4 py-2">{appointment.operation}</td>
                      <td className="border px-4 py-2">{appointment.doctor}</td>
                      <td className="border px-4 py-2">{appointment.time}</td>
                      <td className="border px-4 py-2">{appointment.status}</td>
                      <td className="border px-4 py-2">
                        <button
                          className="bg-blue-500 text-white px-2 py-1 rounded-lg hover:bg-blue-600"
                          onClick={() => openEditModal(appointment)}
                        >
                          Edit
                        </button>
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

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-xl font-bold text-gray-700 mb-4">
              Edit Appointment
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-600">Patient Name</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-lg w-full p-2"
                  value={editingAppointment.name}
                  onChange={(e) =>
                    setEditingAppointment({
                      ...editingAppointment,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-gray-600">Contact</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-lg w-full p-2"
                  value={editingAppointment.contact}
                  onChange={(e) =>
                    setEditingAppointment({
                      ...editingAppointment,
                      contact: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-gray-600">Operation</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-lg w-full p-2"
                  value={editingAppointment.operation}
                  onChange={(e) =>
                    setEditingAppointment({
                      ...editingAppointment,
                      operation: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-gray-600">Doctor</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-lg w-full p-2"
                  value={editingAppointment.doctor}
                  onChange={(e) =>
                    setEditingAppointment({
                      ...editingAppointment,
                      doctor: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-gray-600">Time</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-lg w-full p-2"
                  value={editingAppointment.time}
                  onChange={(e) =>
                    setEditingAppointment({
                      ...editingAppointment,
                      time: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-gray-600">Status</label>
                <select
                  className="border border-gray-300 rounded-lg w-full p-2"
                  value={editingAppointment.status}
                  onChange={(e) =>
                    setEditingAppointment({
                      ...editingAppointment,
                      status: e.target.value,
                    })
                  }
                >
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                  <option value="Canceled">Canceled</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2"
                onClick={closeEditModal}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                onClick={handleSaveEdit}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleAppointment;
