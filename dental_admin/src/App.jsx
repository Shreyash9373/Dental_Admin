import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import ScheduleAppointment from "./components/Schedule/ScheduleAppointment";
import BookApointment from "./components/Book Apointment/BookApointment";
import UsersFriendly from "./components/Users Enquiry/UsersFriendly";
import AdminPage from "./components/AdminPage";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAdminAuthenticated = localStorage.getItem("isAdminAuthenticated") === "true";
  return isAdminAuthenticated ? children : <Navigate to="/admin" />;
};

function App() {
  return (
    <div className="h-screen flex">
      <BrowserRouter>
        <div className="w-full h-auto flex-1 flex flex-col">
          <Navbar />
          <div className="flex flex-row">
            <Sidebar className="w-64 bg-gray-800 text-white" />
            <div className="flex-1 flex flex-col">
              <div className="flex-1 p-4 overflow-y-auto bg-gray-100">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route
                    path="/scheduleappointments"
                    element={
                      <ProtectedRoute>
                        <ScheduleAppointment />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/usersenquiry" element={<UsersFriendly />} />
                  <Route path="/bookapointment" element={<BookApointment />} />
                  <Route path="/admin" element={<AdminPage />} />
                </Routes>
              </div>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;