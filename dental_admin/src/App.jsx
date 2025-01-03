import React , { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Schedule from './components/Schedule/Schedule';
import BookApointment from './components/Book Apointment/BookApointment';

function App() {
  return (
    <div className="h-screen flex">
      <BrowserRouter>
        <div className="w-full h-auto flex-1 flex flex-col">
           
          <Navbar  />

      <div className="flex flex-row"> 
        <Sidebar className="w-64 bg-gray-800 text-white" />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">

          {/* Routes */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-100">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/bookapointment" element={<BookApointment />} />
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
