//ANIKET
import React, { useState } from "react";
import { FaLessThan } from "react-icons/fa";
import { FaGreaterThan } from "react-icons/fa";

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
      message: "I need a consultation for a toothache. Please schedule an appointment for me.I need a consultation for a toothache. Please schedule an appointment for me.I need a consultation for a toothache. Please schedule an appointment for me.I need a consultation for a toothache. Please schedule an appointment for me.I need a consultation for a toothache. Please schedule an appointment for me.I need a consultation for a toothache. Please schedule an appointment for me.I need a consultation for a toothache.",
    },
    {
      name: "Aniket Tambe",
      email: "aniket@gmail.com",
      phone: "+8411988255",
      preferredDate: "2025-01-12",
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
      email: "anjali@gmail.com",
      phone: "+7897897890",
      preferredDate: "2025-02-01",
      message: "I want to book an appointment for a routine dental checkup.",
    },
    {
      name: "Vishal Joshi",
      email: "vishal@gmail.com",
      phone: "+9876543210",
      preferredDate: "2025-02-05",
      message: "I need to consult for my cavities. Please let me know the slots.",
    },
    {
      name: "Ritika Kaur",
      email: "ritika@gmail.com",
      phone: "+7418529630",
      preferredDate: "2025-02-10",
      message: "I would like to schedule a dental cleaning appointment. Can you confirm availability?",
    },
    {
      name: "Amit Yadav",
      email: "amit@gmail.com",
      phone: "+9712345678",
      preferredDate: "2025-02-15",
      message: "I am looking for a consultation regarding dental implants.",
    },
    {
      name: "Neha Gupta",
      email: "neha@gmail.com",
      phone: "+7896541230",
      preferredDate: "2025-02-20",
      message: "I need to book an appointment for a wisdom tooth extraction.",
    },
    {
      name: "Rahul Deshmukh",
      email: "rahul@gmail.com",
      phone: "+8523697410",
      preferredDate: "2025-02-25",
      message: "I am interested in a dental consultation for my teeth alignment.",
    },
    {
      name: "Madhuri Patil",
      email: "madhuri@gmail.com",
      phone: "+9911223344",
      preferredDate: "2025-03-01",
      message: "I need an appointment for a regular dental checkup.",
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const usersPerPage = 10;

  const filteredInquiries = userEnquiries.filter(
    (inquiry) =>
      inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.phone.includes(searchTerm)
  );

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

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedUsers(currentUsers.map((user) => user.email));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleUserSelection = (email) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(email)
        ? prevSelected.filter((user) => user !== email)
        : [...prevSelected, email]
    );
  };

  const handleDeleteSelected = () => {
    const updatedEnquiries = userEnquiries.filter(
      (user) => !selectedUsers.includes(user.email)
    );
    setUserEnquiries(updatedEnquiries);
    setSelectedUsers([]);
  };

  return (
    <div className="min-h-screen rounded-xl p-4 bg-white flex flex-col items-center overflow-y-auto">
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
              <th className="px-4 py-2 border-b text-left text-sm font-semibold">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={currentUsers.length === selectedUsers.length}
                />
              </th>
              <th className="px-4 py-2 border-b text-left text-sm font-semibold">Name</th>
              <th className="px-4 py-2 border-b text-left text-sm font-semibold">Email</th>
              <th className="px-4 py-2 border-b text-left text-sm font-semibold">Phone</th>
              <th className="px-4 py-2 border-b text-left text-sm font-semibold">
                Inquiry Date
              </th>
              <th className="px-4 py-2 border-b text-left text-sm font-semibold">Message</th>
              <th className="px-4 py-2 border-b text-left text-sm font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.length > 0 ? (
              currentUsers.map((inquiry, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border-b text-sm">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(inquiry.email)}
                      onChange={() => handleUserSelection(inquiry.email)}
                    />
                  </td>
                  <td className="px-4 py-2 border-b text-sm">{inquiry.name}</td>
                  <td className="px-4 py-2 border-b text-sm">{inquiry.email}</td>
                  <td className="px-4 py-2 border-b text-sm">{inquiry.phone}</td>
                  <td className="px-4 py-2 border-b text-sm">{inquiry.preferredDate}</td>
                  <td className="px-4 py-2 border-b text-sm">
                    {truncateMessage(inquiry.message)}
                  </td>
                  <td className="px-4 py-2 border-b text-sm">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteInquiry(index);
                      }}
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
          className="px-4 py-2 bg-blue-500 text-white rounded-lg mr-2 "
          disabled={currentPage === 1}
        >
          <FaLessThan />
        </button>
        <span className="mx-2 text-lg">
          {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => paginate(currentPage + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg ml-2 "
          disabled={currentPage === totalPages}
        >
          <FaGreaterThan />
        </button>
      </div>

      {/* Delete Button */}
      {selectedUsers.length > 0 && (
        <div className="flex justify-end mt-4">
          <button
            onClick={handleDeleteSelected}
            className="px-6 py-2 bg-red-500 text-white rounded-lg"
          >
            Delete Selected
          </button>
        </div>
      )}
    </div>
  );
};

export default UsersEnquiry;
