import React from 'react';

const UsersEnquiry = () => {
  // Dummy data for the inquiries
  const userInquiries = [
    {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1234567890",
      preferredDate: "2025-01-10",
      message: "I would like to schedule a dental checkup appointment. Please let me know the available slots."
    },
    {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+9876543210",
      preferredDate: "2025-01-15",
      message: "I need a consultation for a toothache. Please schedule an appointment for me."
    }
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold rounded-md text-gray-800 mb-6 border-b py-6 px-3 shadow-lg shadow-gray-400">User Inquiries</h2>
      <div className=" flex flex-row items-center justify-start gap-4">

        {/* {Card } */}
        {userInquiries.map((inquiry, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg max-w-md w-full">
            <div className="space-y-4 p-4 shadow-md shadow-gray-400">
              <p className="text-gray-700"><span className="font-semibold">Name:</span> {inquiry.name}</p>
              <p className="text-gray-700"><span className="font-semibold">Email:</span> {inquiry.email}</p>
              <p className="text-gray-700"><span className="font-semibold">Phone:</span> {inquiry.phone}</p>
              <p className="text-gray-700"><span className="font-semibold">Preferred Date:</span> {inquiry.preferredDate}</p>
              <p className="text-gray-700"><span className="font-semibold">Message:</span> {inquiry.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersEnquiry;
