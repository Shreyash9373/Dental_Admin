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
//     }
//   ];

//   return (
//     <div className=" min-h-screen">
//       <h2 className="text-3xl font-bold bg-gray-100 rounded-md text-gray-800 mb-6 border-b py-6 px-3 shadow-lg shadow-gray-400">User Inquiries</h2>
//       <div className=" flex flex-row items-center justify-start gap-4">

//         {/* {Card } */}
//         {userInquiries.map((inquiry, index) => (
//           <div key={index} className="bg-white shadow-md rounded-lg max-w-md">
//             <div className="space-y-4 p-4 shadow-md shadow-gray-400">
//               <p className="text-gray-700"><span className="font-semibold">Name:</span> {inquiry.name}</p>
//               <p className="text-gray-700"><span className="font-semibold">Email:</span> {inquiry.email}</p>
//               <p className="text-gray-700"><span className="font-semibold">Phone:</span> {inquiry.phone}</p>
//               <p className="text-gray-700"><span className="font-semibold">Preferred Date:</span> {inquiry.preferredDate}</p>
//               <p className="text-gray-700"><span className="font-semibold">Message:</span> {inquiry.message}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default UsersEnquiry;





import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';


const UsersEnquiry = () => {
  const [userEnquiries, setUserEnquiries] = useState([{}]);
  // Dummy data for the inquiries
  const userInquiries = [
    {
      name: "Shreyas Raut",
      email: "shreyas@gmail.com",
      phone: "+1234567890",
      preferredDate: "2025-01-10",
      message: "I would like to schedule a dental checkup appointment. Please let me know the available slots."
    },
    {
      name: "Smit Bharshankar",
      email: "smit@gmail.com",
      phone: "+9876543210",
      preferredDate: "2025-01-15",
      message: "I need a consultation for a toothache. Please schedule an appointment for me."
    },
    {
      name: "Aniket Tambe",
      email: "aniket@gmail.com",
      phone: "+9876543210",
      preferredDate: "2025-01-15",
      message: "I need a consultation for a toothache. Please schedule an appointment for me."
    },
    {
      name: "Rohit Sharma",
      email: "rohit@gmail.com",
      phone: "+1231231234",
      preferredDate: "2025-01-20",
      message: "I am interested in teeth whitening. Please provide available dates."
    },
    {
      name: "Priya Verma",
      email: "priya@gmail.com",
      phone: "+4564564567",
      preferredDate: "2025-01-25",
      message: "I need a consultation for braces. Let me know your availability."
    },
    {
      name: "Anjali Mehta",
      email: "anjali@gmail.com",
      phone: "+7897897890",
      preferredDate: "2025-01-30",
      message: "I want to book an appointment for a routine dental checkup."
    }
  ];
  useEffect(() => {
    async function getEnquiry(){
      try {
      const response = await axios.get('http://localhost:4000/api/reception/get-Enquiry');
      if (response.data && response.data.enquiryData) {
        console.log(response.data);
        setUserEnquiries(response.data.enquiryData);
      }
      } catch (error) {
        console.log(error)
      }
      finally{
        console.log(userEnquiries);
      }
      
    }
    getEnquiry();
  }, [])
  


  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-blue-300 via-blue-400 to-blue-500 rounded-xl">
      {/* <h2 className="text-3xl font-bold bg-gray-100 rounded-md text-gray-800 mb-6 border-b py-6 px-3 shadow-lg shadow-gray-400">
        User Inquiries
      </h2> */}
      <h2 className="text-3xl font-bold text-white mb-6 py-6 px-3 text-center">
        User Inquiries
      </h2>
      <div className="grid grid-cols-3 gap-4">
        {/* Cards */}
        {userEnquiries.map((inquiry, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg flex flex-col justify-between p-4"
            // style={{ height: "250px" }} // Adjust height as needed 
          >
            <div className="space-y-2">
              <p className="text-gray-700">
                <span className="font-semibold">Name:</span> {inquiry.name}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Email:</span> {inquiry.email}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Phone:</span> {inquiry.phone}
              </p> 
            </div>
            <p className="text-gray-700 mt-2">
              <span className="font-semibold">Message:</span> {inquiry.message}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersEnquiry;
