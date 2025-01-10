import React from "react";
import logo from "../assets/Dr.Pakhare1.jpeg";
import Login from "./Login";

const Home = () => {
  return (
    <div className='flex justify-center items-center h-screen md:w-[calc(100%-256px)]'>
      {/* <h1 className='text-3xl'>Welcome to Dr. Pakhare Dental Clinic Management System Dashboard</h1> */}

      <Login />
    </div>
  );
};

export default Home;
