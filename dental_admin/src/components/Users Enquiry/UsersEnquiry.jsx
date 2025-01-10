// import React, { useState } from "react";

// const UsersEnquiry = () => {
//   const [userEnquiries, setUserEnquiries] = useState([{}]);
//   // Dummy data for the inquiries
//   const userInquiries = [
//     {
//       name: "Shreyas Raut",
//       email: "shreyas@gmail.com",
//       phone: "+1234567890",
//       preferredDate: "2025-01-10",
//       message: "I would like to schedule a dental checkup appointment. Please let me know the available slots.",
//     },
//     {
//       name: "Smit Bharshankar",
//       email: "smit@gmail.com",
//       phone: "+9876543210",
//       preferredDate: "2025-01-15",
//       message: "I need a consultation for a toothache. Please schedule an appointment for me.",
//     },
//     {
//       name: "Aniket Tambe",
//       email: "aniket@gmail.com",
//       phone: "+8411988255",
//       preferredDate: "2025-01-15",
//       message: "I need a consultation for a toothache. Please schedule an appointment for me.",
//     },
//     {
//       name: "Rohit Sharma",
//       email: "rohit@gmail.com",
//       phone: "+1231231234",
//       preferredDate: "2025-01-20",
//       message: "I am interested in teeth whitening. Please provide available dates.",
//     },
//     {
//       name: "Priya Verma",
//       email: "priya@gmail.com",
//       phone: "+4564564567",
//       preferredDate: "2025-01-25",
//       message: "I need a consultation for braces. Let me know your availability.",
//     },
//     {
//       name: "Anjali Mehta",
//       email: "shreya@gmail.com",
//       phone: "+7897897890",
//       preferredDate: "2025-01-30",
//       message: "I want to book an appointment for a routine dental checkup.",
//     },
//   ];

//   const [searchTerm, setSearchTerm] = useState(""); // State for the search input

//   // Filter the inquiries based on the search term
//   const filteredInquiries = userInquiries.filter((inquiry) =>
//     inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     inquiry.phone.includes(searchTerm) // Assuming phone numbers are stored as strings
//   );
  

//   return (
//     // <div className="min-h-screen rounded-xl p-4 bg-gradient-to-br from-blue-300 via-blue-400 to-blue-500 flex flex-col items-center">
//     <div className="min-h-screen rounded-xl p-4 bg-white flex flex-col items-center">
//       {/* Search Section */}
//       <div className="flex flex-col items-center justify-center w-full py-10 ">
//         <h2 className="text-3xl font-bold text-black mb-6 text-center">
//           User Inquiries
//         </h2>
//         <div className="w-full max-w-md">
//           <input
//             type="text"
//             placeholder="Search by name, email, phone no."
//             className="w-full p-3 rounded-full border-2 border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//       </div>

//       {/* Inquiries */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl ">
//         {filteredInquiries.length > 0 ? (
//           filteredInquiries.map((inquiry, index) => (
//             <div
//               key={index}
//               // className="bg-blue-500 shadow-md rounded-lg flex flex-col justify-between p-4"
//               className="bg-gradient-to-r from-blue-500 to-blue-700 shadow-md rounded-lg flex flex-col justify-between p-4"
//             >
//               <div className="space-y-2">
//                 <p className="text-white">
//                   <span className="font-semibold">Name:</span> {inquiry.name}
//                 </p>
//                 <p className="text-white">
//                   <span className="font-semibold">Email:</span> {inquiry.email}
//                 </p>
//                 <p className="text-white">
//                   <span className="font-semibold">Phone:</span> {inquiry.phone}
//                 </p>
//                 <p className="text-white">
//                   <span className="font-semibold">Preferred Date:</span> {inquiry.preferredDate}
//                 </p>
//               </div>
//               <p className="text-white mt-2">
//                 <span className="font-semibold">Message:</span> {inquiry.message}
//               </p>
//             </div>
//           ))
//         ) : (
//           <p className="text-white text-center text-lg col-span-3">
//             No inquiries found for "{searchTerm}"
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UsersEnquiry;





import React, { useState } from "react";

const UsersEnquiry = () => {
  const [userEnquiries, setUserEnquiries] = useState([
    {
      name: "Shreyas Raut",
      email: "shreyas@gmail.com",
      phone: "+1234567890",
      preferredDate: "2025-01-10",
      message: "I would like to schedule a dental checkup appointment. Please let me know the available slots.",
    },
    {
      name: "Smit Bharshankar",
      email: "smit@gmail.com",
      phone: "+9876543210",
      preferredDate: "2025-01-15",
      message: "I need a consultation for a toothache. Please schedule an appointment for me.",
    },
    {
      name: "Aniket Tambe",
      email: "aniket@gmail.com",
      phone: "+8411988255",
      preferredDate: "2025-01-15",
      message: "I need a consultation for a toothache. Please schedule an appointment for me.",
    },
    {
      name: "Rohit Sharma",
      email: "rohit@gmail.com",
      phone: "+1231231234",
      preferredDate: "2025-01-20",
      message: "I am interested in teeth whitening. Please provide available dates.",
    },
    {
      name: "Priya Verma",
      email: "priya@gmail.com",
      phone: "+4564564567",
      preferredDate: "2025-01-25",
      message: "I need a consultation for braces. Let me know your availability.",
    },
    {
      name: "Anjali Mehta",
      email: "shreya@gmail.com",
      phone: "+7897897890",
      preferredDate: "2025-01-30",
      message: "I want to book an appointment for a routine dental checkup.",
    },
    // Add more dummy data if needed for pagination
  ]);
  
  const [searchTerm, setSearchTerm] = useState(""); // State for the search input
  const [currentPage, setCurrentPage] = useState(1); // State for the current page
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility
  const [selectedInquiry, setSelectedInquiry] = useState(null); // State for selected inquiry
  const usersPerPage = 10; // Number of users to display per page

  // Filter the inquiries based on the search term
  const filteredInquiries = userEnquiries.filter((inquiry) =>
    inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inquiry.phone.includes(searchTerm)
  );

  // Get the current page's users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredInquiries.slice(indexOfFirstUser, indexOfLastUser);

  // Delete inquiry function
  const deleteInquiry = (index) => {
    const updatedInquiries = userEnquiries.filter((_, i) => i !== index);
    setUserEnquiries(updatedInquiries);
  };

  // Change page function
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle message truncation
  const truncateMessage = (message, length = 30) => {
    return message.length > length ? message.substring(0, length) + "..." : message;
  };

  // Modal open handler
  const openModal = (inquiry) => {
    setSelectedInquiry(inquiry);
    setModalVisible(true);
  };

  // Close modal handler
  const closeModal = () => {
    setModalVisible(false);
    setSelectedInquiry(null);
  };

  // Total pages calculation
  const totalPages = Math.ceil(filteredInquiries.length / usersPerPage);

  return (
    <div className="min-h-screen rounded-xl p-4 bg-white flex flex-col items-center">
      {/* Search Section */}
      <div className="flex flex-col items-center justify-center w-full py-10 ">
        <h2 className="text-3xl font-bold text-black mb-6 text-center">
          User Inquiries
        </h2>
        <div className="w-full max-w-md">
          <input
            type="text"
            placeholder="Search by name, email, phone no."
            className="w-full p-3 rounded-full border-2 border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Inquiries Table */}
      <div className="w-full max-w-6xl">
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b text-left text-sm font-semibold">Name</th>
              <th className="px-4 py-2 border-b text-left text-sm font-semibold">Email</th>
              <th className="px-4 py-2 border-b text-left text-sm font-semibold">Phone</th>
              <th className="px-4 py-2 border-b text-left text-sm font-semibold">Preferred Date</th>
              <th className="px-4 py-2 border-b text-left text-sm font-semibold">Message</th>
              <th className="px-4 py-2 border-b text-left text-sm font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.length > 0 ? (
              currentUsers.map((inquiry, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border-b text-sm">{inquiry.name}</td>
                  <td className="px-4 py-2 border-b text-sm">{inquiry.email}</td>
                  <td className="px-4 py-2 border-b text-sm">{inquiry.phone}</td>
                  <td className="px-4 py-2 border-b text-sm">{inquiry.preferredDate}</td>
                  <td className="px-4 py-2 border-b text-sm">
                    <span
                      onClick={() => openModal(inquiry)}
                      className="text-blue-500 cursor-pointer"
                    >
                      {truncateMessage(inquiry.message)}
                    </span>
                  </td>
                  <td className="px-4 py-2 border-b text-sm">
                    <button
                      onClick={() => deleteInquiry(index)}
                      className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-lg text-gray-500">
                  No inquiries found for "{searchTerm}"
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-4">
        <button
          onClick={() => paginate(currentPage - 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg mr-2 disabled:bg-gray-400"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="mx-2 text-lg">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => paginate(currentPage + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg ml-2 disabled:bg-gray-400"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {/* Modal (Popup) */}
      {modalVisible && selectedInquiry && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-xl font-semibold mb-4">Inquiry Details</h3>
            <p><strong>Name:</strong> {selectedInquiry.name}</p>
            <p><strong>Email:</strong> {selectedInquiry.email}</p>
            <p><strong>Phone:</strong> {selectedInquiry.phone}</p>
            <p><strong>Preferred Date:</strong> {selectedInquiry.preferredDate}</p>
            <p><strong>Message:</strong> {selectedInquiry.message}</p>
            <button
              onClick={closeModal}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersEnquiry;
