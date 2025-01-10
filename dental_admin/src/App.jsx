import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Ensure toastify styles are imported
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import ScheduleAppointment from "./components/Schedule/ScheduleAppointment";
import BookApointment from "./components/Book Apointment/BookApointment";
import UsersEnquiry from "./components/Users Enquiry/UsersEnquiry";
import Blogs from "./components/Doctor Module/Blogs";
import AddEvent from "./components/Doctor Module/AddEvent";
import SeeAppointment from "./components/Doctor Module/SeeAppointment";

function App() {
  const [isMobile, setIsMobile] = useState(false);

  return (
    <div className="h-screen flex overflow-hidden">
      <BrowserRouter>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          toastStyle={{
            maxWidth: "300px",
            borderRadius: "4px",
            fontSize: "0.875rem",
            padding: "8px",
            color: "#050505",
            fontFamily: "sans-serif",
          }}
        />
        {/* Main App Layout */}
        <div className="w-full h-auto flex flex-row">
          {/* Sidebar */}
          <Sidebar className="w-64 bg-gray-800 text-white" />

          {/* Main Content */}
          <div className="flex-1 flex flex-col bg-gray-200">
            {/* Navbar */}
            <Navbar />

            {/* Routes */}
            <div className="flex-1 p-4 overflow-y-auto">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/usersenquiry" element={<UsersEnquiry />} />
                <Route path="/scheduleappointments" element={<ScheduleAppointment />} />
                <Route path="/bookapointment" element={<BookApointment />} />
                <Route path="/addevent" element={<AddEvent />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/seeappointment" element={<SeeAppointment />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;