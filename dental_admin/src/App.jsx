//ANIKET
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UsersEnquiry from "./components/receptionist/UsersEnquiry";
import ScheduleAppointment from "./components/receptionist/ScheduleAppointment";
import BookApointment from "./components/receptionist/BookApointment";
import AddEvent from "./components/doctor/AddEvent";
import Blogs from "./components/doctor/Blogs";
import SeeAppointment from "./components/doctor/SeeAppointment";
import AdminDashboardLayout from "./pages/layouts/AdminDashboardLayout";
import LoginPage from "./pages/LoginPage";
import AuthProvider from "./context/AuthContext";
import Profile from "./components/doctor/Profile";
import DoctorLayout from "./pages/layouts/DoctorLayout";
import ReceptionistLayout from "./pages/layouts/ReceptionistLayout";
import RoleBasedRedirect from "./components/RoleBasedRedirect";
import AddAccount from "./components/doctor/AddAccount";
import ManageAccount from "./components/doctor/ManageAccount";
import Patients from "./components/Patients";
import Patient from "./components/Patient";
import Visit from "./components/Visit";

function App() {
  const [isMobile, setIsMobile] = useState(false);

  return (
    <div className='min-h-screen w-screen lg:block'>
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

        <AuthProvider>
          <Routes>
            {/* Admin Login Route */}
            <Route path='/admin/login' element={<LoginPage />} />

            {/* Admin Dashboard Routes */}
            <Route path='/admin/dashboard' element={<AdminDashboardLayout />}>
              {/* Redirect based on role */}
              <Route index element={<RoleBasedRedirect />} />

              {/* Doctor Routes */}
              <Route path='doctor' element={<DoctorLayout />}>
                {/* Redirect from /admin/dashboard to /admin/dashboard/add-event */}
                <Route index element={<Navigate to='see-appointment' />} />
                <Route path='add-event' element={<AddEvent />} />
                <Route path='blogs' element={<Blogs />} />
                <Route path='see-appointment' element={<SeeAppointment />} />
                <Route path='profile' element={<Profile />} />
                <Route path='add-account' element={<AddAccount />} />
                <Route path='manage-account' element={<ManageAccount />} />
                <Route path='patients' element={<Patients />} />
                <Route path='patient/:patientId' element={<Patient />} />
                <Route path='visit/:visitId' element={<Visit />} />
              </Route>

              {/* Receptionist Routes */}
              <Route path='receptionist' element={<ReceptionistLayout />}>
                {/* Redirect from /admin/dashboard to /admin/dashboard/user-enquiry */}
                <Route index element={<Navigate to='user-enquiry' />} />
                <Route path='user-enquiry' element={<UsersEnquiry />} index />
                <Route
                  path='schedule-appointments'
                  element={<ScheduleAppointment />}
                />
                <Route path='book-apointment' element={<BookApointment />} />
                <Route path='patients' element={<Patients />} />
                <Route path='patient/:patientId' element={<Patient />} />
                <Route path='visit/:visitId' element={<Visit />} />
              </Route>
            </Route>

            {/* Wildcard to catch anything else */}
            <Route path='*' element={<Navigate to='/admin/login' />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
