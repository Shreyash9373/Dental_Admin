//ANIKET
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import UsersEnquiry from "./components/Users Enquiry/UsersEnquiry";
import ScheduleAppointment from "./components/Schedule/ScheduleAppointment";
import BookApointment from "./components/Book Apointment/BookApointment";
import AddEvent from "./components/Doctor Module/AddEvent";
import Blogs from "./components/Doctor Module/Blogs";
import SeeAppointment from "./components/Doctor Module/SeeAppointment";
import AdminDashboardLayout from "./pages/layouts/AdminDashboardLayout";
import LoginPage from "./pages/LoginPage";
import AuthProvider from "./context/AuthContext";
import UpdatePassword from "./components/UpdatePassword/UpdatePassword";

function App() {
  const [isMobile, setIsMobile] = useState(false);

  return (
    <div className='h-screen flex overflow-hidden lg:block'>
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
        
        <Routes>
          {/* Login Route */}
          <Route
            path="/admin/login"
            element={
              <AuthProvider>
                <LoginPage />
              </AuthProvider>
            }
          />

          {/* Admin Dashboard */}
          <Route
            path="/admin/dashboard"
            element={
              <AuthProvider>
                <AdminDashboardLayout />
              </AuthProvider>
            }
          >
            {/* Redirect from /admin/dashboard to /admin/dashboard/user-enquiry */}
            <Route index element={<Navigate to="user-enquiry" />} />

            <Route path='user-enquiry' element={<UsersEnquiry />} index />
            <Route
              path="schedule-appointments"
              element={<ScheduleAppointment />}
            />
            <Route path="book-apointment" element={<BookApointment />} />
            <Route path="add-event" element={<AddEvent />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="see-appointment" element={<SeeAppointment />} />
            <Route path="updatepassword" element={<UpdatePassword />} />
          </Route>

          {/* Wildcard to catch anything else */}
          <Route path="*" element={<Navigate to="/admin/login" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
