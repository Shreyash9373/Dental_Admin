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
import AdminDashboardLayout from "./pages/layouts/AdminDashboardLayout";
import LoginPage from "./pages/LoginPage";
import AuthProvider from "./context/AuthContext";

function App() {
  const [isMobile, setIsMobile] = useState(false);

  return (
    <div className='h-screen flex lg:block'>
      <BrowserRouter>
        <ToastContainer
          position='top-right'
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
            path='/admin/login'
            element={
              <AuthProvider>
                <LoginPage />
              </AuthProvider>
            }
          />

          {/* Admin Dashboard */}
          <Route
            path='/admin/dashboard'
            element={
              <AuthProvider>
                <AdminDashboardLayout />
              </AuthProvider>
            }>
            {/* Redirect from /admin/dashboard to /admin/dashboard/user-enquiry */}
            <Route index element={<Navigate to='user-enquiry' />} />

            <Route path='user-enquiry' element={<UsersEnquiry />} />
            <Route
              path='schedule-appointments'
              element={<ScheduleAppointment />}
            />
            <Route path='book-apointment' element={<BookApointment />} />
            <Route path='add-event' element={<AddEvent />} />
            <Route path='blogs' element={<Blogs />} />
            <Route path='see-appointment' element={<SeeAppointment />} />
          </Route>

          {/* Wildcard to catch anything else */}
          <Route path='*' element={<Navigate to='/admin/login' />} />
        </Routes>

        {/* <div className=' -translate-x-64 h-auto flex flex-row lg:-translate-x-0'>
          <Sidebar
            className='w-64 bg-gray-800 text-white'
            isHamburgerOpen={isHamburgerOpen}
            setIsHamburgerOpen={setIsHamburgerOpen}
          />

          <div className='flex-1 flex flex-col bg-gray-200 min-h-screen w-screen'>
            <Navbar
              isHamburgerOpen={isHamburgerOpen}
              setIsHamburgerOpen={setIsHamburgerOpen}
            />

            <div className='flex-1 p-4 overflow-y-auto'>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/usersenquiry' element={<UsersEnquiry />} />
                <Route
                  path='/scheduleappointments'
                  element={<ScheduleAppointment />}
                />
                <Route path='/bookapointment' element={<BookApointment />} />
                <Route path='/addevent' element={<AddEvent />} />
                <Route path='/blogs' element={<Blogs />} />
                <Route path='/seeappointment' element={<SeeAppointment />} />
                <Route path='*' element={<Navigate to='/' />} />
              </Routes>
            </div>
          </div>
        </div> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
