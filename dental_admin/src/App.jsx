import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ScheduleAppointment from './components/Schedule/ScheduleAppointment';
import BookApointment from './components/Book Apointment/BookApointment';
import UsersFriendly from "./components/Users Enquiry/UsersFriendly";

function App() {
  return (
    <div className="h-screen flex overflow-hidden">
      <BrowserRouter>
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 ml-64 flex flex-col bg-gray-200">
          {/* Navbar */}
          <Navbar />

          {/* Routes */}
          <div className="flex-1 p-4 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/usersenquiry" element={<UsersFriendly />} />
              <Route path="/scheduleappointments" element={<ScheduleAppointment />} />
              <Route path="/bookapointment" element={<BookApointment />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;