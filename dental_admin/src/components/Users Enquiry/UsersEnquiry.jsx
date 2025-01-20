//ANIKET
import React, { useEffect, useState } from "react";
import { FaLessThan, FaGreaterThan } from "react-icons/fa";
import axios from "axios";


const UsersEnquiry = () => {
  const [userEnquiries, setUserEnquiries] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const usersPerPage = 10;

  useEffect(() => {
    
      const fetchUserEnquiry = async () => {
        try {
          const response = await axios.get(
            `http://localhost:4000/api/reception/get-Enquiry`,{withCredentials:true}
          );

          // Assuming the backend sends available slots in `response.data.availableSlots`
          setUserEnquiries(response.data.enquiryData || []);
          console.log("users enquiry:",response.data.enquiryData);
        } catch (error) {
          console.error("Error fetching User's Inquiries:", error);
          setUserEnquiries([]); // Reset available slots on error
        }
      };

      fetchUserEnquiry();
    
  }, []);

  const filteredInquiries = userEnquiries.filter(
    (inquiry) =>
      inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.phone.includes(searchTerm)
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredInquiries.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
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
      <div className="flex flex-col items-center justify-center w-full py-10">
        <h2 className="text-3xl font-bold text-black mb-6 text-center">User Inquiries</h2>
        <div className="w-full max-w-md">
          <input
            type="text"
            placeholder="Search by name, email, phone no."
            className="w-full p-3 rounded-full border-2 border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
            // value={searchTerm}
            // onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      
  {/* Card Layout for Mobile View */}
<div className="md:hidden w-full space-y-4">
  {currentUsers.length > 0 && (
    <div className="flex items-center justify-between px-4 py-2 bg-gray-200 rounded-lg">
      {/* Select All Checkbox */}
      <div className="flex items-center">
        <input
          type="checkbox"
          onChange={handleSelectAll}
          checked={currentUsers.length > 0 && selectedUsers.length === currentUsers.length}
          className="mr-2"
        />
        <h3 className="text-lg font-semibold">Select All</h3>
      </div>
      {/* Delete Button */}
      {selectedUsers.length > 0 && (
        <button
          onClick={handleDeleteSelected}
          className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm"
        >
          Delete 
        </button>
      )}
    </div>
  )}
  {currentUsers.length > 0 ? (
    currentUsers.map((inquiry, index) => (
      <div
        key={index}
        className="p-4 bg-gray-100 rounded-lg shadow-md flex flex-col"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold">{inquiry.name}</h3>
          <input
            type="checkbox"
            checked={selectedUsers.includes(inquiry.email)}
            onChange={() => handleUserSelection(inquiry.email)}
          />
        </div>
        <p className="text-sm text-gray-600 mt-1">
          <strong>Email:</strong> {inquiry.email}
        </p>
        <p className="text-sm text-gray-600 mt-1">
          <strong>Phone:</strong> {inquiry.phone}
        </p>
        <p className="text-sm text-gray-600 mt-1">
          <strong>Preferred Date:</strong> {inquiry.createdAt}
        </p>
        <p className="text-sm text-gray-600 mt-1">
          <strong>Message:</strong> {inquiry.message}
        </p>
      </div>
    ))
  ) : (
    <p className="text-center text-lg text-gray-500">
      No inquiries found for "{searchTerm}"
    </p>
  )}
</div>



      {/* Table Layout for Desktop View */}
      <div className="w-full max-w-6xl hidden md:table">
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
            </tr>
          </thead>
          <tbody>
            {userEnquiries.map((inquiry, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="px-4 py-2 border-b text-sm">
                  <input
                    type="checkbox"
                    // checked={selectedUsers.includes(inquiry.email)}
                    // onChange={() => handleUserSelection(inquiry.email)}
                  />
                </td>
                <td className="px-4 py-2 border-b text-sm">{inquiry.name}</td>
                <td className="px-4 py-2 border-b text-sm">{inquiry.email}</td>
                <td className="px-4 py-2 border-b text-sm">{inquiry.phone}</td>
                <td className="px-4 py-2 border-b text-sm">{inquiry.createdAt}</td>
                <td className="px-4 py-2 border-b text-sm">{inquiry.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-4">
        <button
          onClick={() => paginate(currentPage - 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg mr-2"
          disabled={currentPage === 1}
        >
          <FaLessThan />
        </button>
        <span className="mx-2 text-lg">
          {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => paginate(currentPage + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg ml-2"
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
