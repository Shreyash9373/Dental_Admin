// import React, { useState } from "react";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";

// const getWeekDates = (date) => {
//   const startOfWeek = new Date(date);
//   const daysOfWeek = [];

//   startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
//   for (let i = 0; i < 7; i++) {
//     daysOfWeek.push(new Date(startOfWeek.getTime()));
//     startOfWeek.setDate(startOfWeek.getDate() + 1);
//   }

//   return daysOfWeek;
// };

// const initialAppointmentsData = {
//   "2025-01-01": [
//     {
//       id: 1,
//       name: "John Doe",
//       contact: "123-456-7890",
//       operation: "Teeth Cleaning",
//       doctor: "Dr. Smith",
//       time: "10:00 AM",
//       status: "Pending",
//     },
//     {
//       id: 2,
//       name: "Jane Smith",
//       contact: "234-567-8901",
//       operation: "Cavity Filling",
//       doctor: "Dr. Brown",
//       time: "11:30 AM",
//       status: "Pending",
//     },
//   ],
//   "2025-01-02": [
//     {
//       id: 3,
//       name: "Alice Brown",
//       contact: "345-678-9012",
//       operation: "Root Canal",
//       doctor: "Dr. Green",
//       time: "2:00 PM",
//       status: "Pending",
//     },
//   ],
//   "2025-01-06": [
//     {
//       id: 4,
//       name: "Aniket Tambe",
//       contact: "456-789-0123",
//       operation: "Teeth Cleaning",
//       doctor: "Dr. White",
//       time: "1:00 PM",
//       status: "Pending",
//     },
//     {
//       id: 5,
//       name: "Shreyas Raut",
//       contact: "567-890-1234",
//       operation: "Dental Checkup",
//       doctor: "Dr. White",
//       time: "3:00 PM",
//       status: "Pending",
//     },
//   ],
// };

// const ScheduleAppointment = () => {
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [showCalendar, setShowCalendar] = useState(false);
//   const [appointments, setAppointments] = useState(initialAppointmentsData);

//   const today = new Date();
//   const weekDates = getWeekDates(today);

//   const handleDateClick = (date) => {
//     setSelectedDate(date);
//     setShowCalendar(false);
//   };

//   const formatDate = (date) => date.toISOString().split("T")[0];

//   const handleCancel = (date, id) => {
//     setAppointments((prev) => ({
//       ...prev,
//       [date]: prev[date].map((appt) =>
//         appt.id === id ? { ...appt, status: "Canceled" } : appt
//       ),
//     }));
//   };

//   // const handleDelete = (date, id) => {
//   //   setAppointments((prev) => ({
//   //     ...prev,
//   //     [date]: prev[date].filter((appt) => appt.id !== id),
//   //   }));
//   // };

//   const handleDone = (date, id) => {
//     setAppointments((prev) => ({
//       ...prev,
//       [date]: prev[date].map((appt) =>
//         appt.id === id ? { ...appt, status: "Completed" } : appt
//       ),
//     }));
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
//       <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
//         Dental Clinic Schedule
//       </h2>

//       {/* Calendar Icon */}
//       {/* <div className="flex justify-center mb-6">
//         <button
//           className="p-3 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 focus:outline-none"
//           onClick={() => setShowCalendar(!showCalendar)}
//           title="Toggle Calendar"
//         >
//           📅
//         </button>
//       </div> */}

//       {/* Calendar */}
//       {showCalendar && (
//         <div className="flex justify-center mb-6">
//           <Calendar
//             className="react-calendar border-none shadow-lg rounded-lg"
//             onChange={handleDateClick}
//             value={selectedDate || today}
//           />
//         </div>
//       )}

//       {/* Week Buttons */}
//       <div className="grid grid-cols-7 gap-4 mb-6">
//         {weekDates.map((date, index) => (
//           <button
//             key={index}
//             className="p-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg text-xl hover:scale-105 transform transition"
//             onClick={() => handleDateClick(date)}
//           >
//             <span className="block font-bold">
//               {date.toDateString().split(" ")[0]}
//             </span>
//             <span>{date.getDate()}</span>
//           </button>
//         ))}
//       </div>

//       {/* Appointments */}
//       {selectedDate && (
//         <div className="bg-gray-50 p-6 rounded-lg shadow-md">
//           <h3 className="text-xl font-semibold text-gray-700 mb-4">
//             Appointments for {selectedDate.toDateString()}
//           </h3>
//           {appointments[formatDate(selectedDate)] && appointments[formatDate(selectedDate)].length > 0 ? (

//             <div className="overflow-x-auto">
//               <table className="min-w-full table-auto border-collapse border border-gray-300 shadow-lg rounded-lg">
//                 <thead>
//                   <tr className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
//                     <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Patient</th>
//                     <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Contact</th>
//                     <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Operation</th>
//                     <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Doctor</th>
//                     <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Time</th>
//                     <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Status</th>
//                     <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {appointments[formatDate(selectedDate)].map((appointment) => (
//                     <tr key={appointment.id} className="hover:bg-blue-50 transition duration-150 ease-in-out">
//                       <td className="border border-gray-300 px-4 py-2">{appointment.name}</td>
//                       <td className="border border-gray-300 px-4 py-2">{appointment.contact}</td>
//                       <td className="border border-gray-300 px-4 py-2">{appointment.operation}</td>
//                       <td className="border border-gray-300 px-4 py-2">{appointment.doctor}</td>
//                       <td className="border border-gray-300 px-4 py-2">{appointment.time}</td>
//                       <td className="border border-gray-300 px-4 py-2">
//                         <span
//                           className={`px-2 py-1 rounded-full text-sm font-medium ${appointment.status === "Pending"
//                               ? "bg-yellow-100 text-yellow-800"
//                               : appointment.status === "Completed"
//                                 ? "bg-green-100 text-green-800"
//                                 : "bg-red-100 text-red-800"
//                             }`}
//                         >
//                           {appointment.status}
//                         </span>
//                       </td>
//                       <td className="border border-gray-300 px-4 py-2">
//                         <div className="flex space-x-2">
//                           <button
//                             className="bg-yellow-500 text-white px-3 py-1 rounded-full hover:bg-yellow-600 shadow-md"
//                             onClick={() => handleCancel(formatDate(selectedDate), appointment.id)}
//                           >
//                             Cancel
//                           </button>
//                           {/* <button
//                             className="bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 shadow-md"
//                             onClick={() => handleDelete(formatDate(selectedDate), appointment.id)}
//                           >
//                             Delete
//                           </button> */}
//                           <button
//                             className="bg-green-500 text-white px-3 py-1 rounded-full hover:bg-green-600 shadow-md"
//                             onClick={() => handleDone(formatDate(selectedDate), appointment.id)}
//                           >
//                             Done
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//           ) : (
//             <p className="text-gray-500">No appointments for this day.</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ScheduleAppointment;






import React, { useState } from "react";

const getWeekDates = (date) => {
  const startOfWeek = new Date(date);
  const daysOfWeek = [];

  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
  for (let i = 0; i < 7; i++) {
    daysOfWeek.push(new Date(startOfWeek.getTime()));
    startOfWeek.setDate(startOfWeek.getDate() + 1);
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
