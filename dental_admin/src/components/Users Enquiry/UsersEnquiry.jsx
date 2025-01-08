// // import React from 'react';

// // const UsersEnquiry = () => {
// //   // Dummy data for the inquiries
// //   const userInquiries = [
// //     {
// //       name: "Shreyas Raut",
// //       email: "shreyas@gmail.com",
// //       phone: "+1234567890",
// //       preferredDate: "2025-01-10",
// //       message: "I would like to schedule a dental checkup appointment. Please let me know the available slots."
// //     },
// //     {
// //       name: "Smit Bharshankar",
// //       email: "smit@gmail.com",
// //       phone: "+9876543210",
// //       preferredDate: "2025-01-15",
// //       message: "I need a consultation for a toothache. Please schedule an appointment for me."
// //     },
// //     {
// //       name: "Aniket Tambe",
// //       email: "aniket@gmail.com",
// //       phone: "+9876543210",
// //       preferredDate: "2025-01-15",
// //       message: "I need a consultation for a toothache. Please schedule an appointment for me."
// //     }
// //   ];

// //   return (
// //     <div className=" min-h-screen">
// //       <h2 className="text-3xl font-bold bg-gray-100 rounded-md text-gray-800 mb-6 border-b py-6 px-3 shadow-lg shadow-gray-400">User Inquiries</h2>
// //       <div className=" flex flex-row items-center justify-start gap-4">

// //         {/* {Card } */}
// //         {userInquiries.map((inquiry, index) => (
// //           <div key={index} className="bg-white shadow-md rounded-lg max-w-md">
// //             <div className="space-y-4 p-4 shadow-md shadow-gray-400">
// //               <p className="text-gray-700"><span className="font-semibold">Name:</span> {inquiry.name}</p>
// //               <p className="text-gray-700"><span className="font-semibold">Email:</span> {inquiry.email}</p>
// //               <p className="text-gray-700"><span className="font-semibold">Phone:</span> {inquiry.phone}</p>
// //               <p className="text-gray-700"><span className="font-semibold">Preferred Date:</span> {inquiry.preferredDate}</p>
// //               <p className="text-gray-700"><span className="font-semibold">Message:</span> {inquiry.message}</p>
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default UsersEnquiry;





// import React from 'react';

// const UsersEnquiry = () => {
//   // Dummy data for the inquiries
//   const userInquiries = [
//     {
//       name: "Shreyas Raut",
//       email: "shreyas@gmail.com",
//       phone: "+1234567890",
//       preferredDate: "2025-01-10",
//       message: "I would like to schedule a dental checkup appointment. Please let me know the available slots."
//     },
//     {
//       name: "Smit Bharshankar",
//       email: "smit@gmail.com",
//       phone: "+9876543210",
//       preferredDate: "2025-01-15",
//       message: "I need a consultation for a toothache. Please schedule an appointment for me."
//     },
//     {
//       name: "Aniket Tambe",
//       email: "aniket@gmail.com",
//       phone: "+9876543210",
//       preferredDate: "2025-01-15",
//       message: "I need a consultation for a toothache. Please schedule an appointment for me."
//     },
//     {
//       name: "Rohit Sharma",
//       email: "rohit@gmail.com",
//       phone: "+1231231234",
//       preferredDate: "2025-01-20",
//       message: "I am interested in teeth whitening. Please provide available dates."
//     },
//     {
//       name: "Priya Verma",
//       email: "priya@gmail.com",
//       phone: "+4564564567",
//       preferredDate: "2025-01-25",
//       message: "I need a consultation for braces. Let me know your availability."
//     },
//     {
//       name: "Anjali Mehta",
//       email: "anjali@gmail.com",
//       phone: "+7897897890",
//       preferredDate: "2025-01-30",
//       message: "I want to book an appointment for a routine dental checkup."
//     }
//   ];

//   return (
//     <div className="min-h-screen p-4 bg-gradient-to-br from-blue-300 via-blue-400 to-blue-500 rounded-xl">
//       {/* <h2 className="text-3xl font-bold bg-gray-100 rounded-md text-gray-800 mb-6 border-b py-6 px-3 shadow-lg shadow-gray-400">
//         User Inquiries
//       </h2> */}
//       <h2 className="text-3xl font-bold text-white mb-6 py-6 px-3 text-center">
//         User Inquiries
//       </h2>
//       <div className="grid grid-cols-3 gap-4">
//         {/* Cards */}
//         {userInquiries.map((inquiry, index) => (
//           <div
//             key={index}
//             className="bg-white shadow-md rounded-lg flex flex-col justify-between p-4"
//             // style={{ height: "250px" }} // Adjust height as needed 
//           >
//             <div className="space-y-2">
//               <p className="text-gray-700">
//                 <span className="font-semibold">Name:</span> {inquiry.name}
//               </p>
//               <p className="text-gray-700">
//                 <span className="font-semibold">Email:</span> {inquiry.email}
//               </p>
//               <p className="text-gray-700">
//                 <span className="font-semibold">Phone:</span> {inquiry.phone}
//               </p>
//               <p className="text-gray-700">
//                 <span className="font-semibold">Preferred Date:</span> {inquiry.preferredDate}
//               </p>
//             </div>
//             <p className="text-gray-700 mt-2">
//               <span className="font-semibold">Message:</span> {inquiry.message}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default UsersEnquiry;







import React, { useState } from "react";

const UsersEnquiry = () => {
  // Dummy data for the inquiries
  const userInquiries = [
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
  ];

  const [searchTerm, setSearchTerm] = useState(""); // State for the search input

  // Filter the inquiries based on the search term
  const filteredInquiries = userInquiries.filter((inquiry) =>
    inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inquiry.phone.includes(searchTerm) // Assuming phone numbers are stored as strings
  );
  

  return (
    // <div className="min-h-screen rounded-xl p-4 bg-gradient-to-br from-blue-300 via-blue-400 to-blue-500 flex flex-col items-center">
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

      {/* Inquiries */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl ">
        {filteredInquiries.length > 0 ? (
          filteredInquiries.map((inquiry, index) => (
            <div
              key={index}
              // className="bg-blue-500 shadow-md rounded-lg flex flex-col justify-between p-4"
              className="bg-gradient-to-r from-blue-500 to-blue-700 shadow-md rounded-lg flex flex-col justify-between p-4"
            >
              <div className="space-y-2">
                <p className="text-white">
                  <span className="font-semibold">Name:</span> {inquiry.name}
                </p>
                <p className="text-white">
                  <span className="font-semibold">Email:</span> {inquiry.email}
                </p>
                <p className="text-white">
                  <span className="font-semibold">Phone:</span> {inquiry.phone}
                </p>
                <p className="text-white">
                  <span className="font-semibold">Preferred Date:</span> {inquiry.preferredDate}
                </p>
              </div>
              <p className="text-white mt-2">
                <span className="font-semibold">Message:</span> {inquiry.message}
              </p>
            </div>
          ))
        ) : (
          <p className="text-white text-center text-lg col-span-3">
            No inquiries found for "{searchTerm}"
          </p>
        )}
      </div>
    </div>
  );
};

export default UsersEnquiry;
