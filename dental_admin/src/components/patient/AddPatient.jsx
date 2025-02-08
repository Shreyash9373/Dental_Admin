import axios from "axios";
import React from "react";

const AddPatient = () => {
  const handleAddPatient = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const age = e.target.age.value;
    const mobile = e.target.mobile.value;
    const email = e.target.email.value;

    if (!name || !age || !mobile) {
      e.target.reset();
      return;
    }

    (async () => {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/api/patients/add-patient`,
        { name, age, mobile, email },
        {
          withCredentials: true,
        }
      );
      console.log(response);
    })();
  };

  return (
    <div className='flex flex-col gap-5'>
      <h1 className='text-2xl font-semibold md:text-3xl lg:text-4xl'>
        Add Patient
      </h1>
      <form
        onSubmit={handleAddPatient}
        className='flex flex-col justify-around items-center gap-8 lg:gap-16 lg:flex-row lg:flex-wrap'>
        <div className='w-11/12 flex flex-col gap-2 lg:w-2/5'>
          <label htmlFor='name'>Name</label>
          <input
            className='px-3 py-1 outline-none border border-gray-400 rounded-md focus:border-blue-500 md:px-5 md:py-2'
            type='text'
            name='name'
            id='name'
            placeholder='Enter patient name'
          />
        </div>
        <div className='w-11/12 flex flex-col gap-2 lg:w-2/5'>
          <label htmlFor='age'>Age</label>
          <input
            className='px-3 py-1 outline-none border border-gray-400 rounded-md focus:border-blue-500 md:px-5 md:py-2'
            type='text'
            name='age'
            id='age'
            placeholder='Enter patient age'
          />
        </div>
        <div className='w-11/12 flex flex-col gap-2 lg:w-2/5'>
          <label htmlFor='mobile'>Mobile</label>
          <input
            className='px-3 py-1 outline-none border border-gray-400 rounded-md focus:border-blue-500 md:px-5 md:py-2'
            type='text'
            name='mobile'
            id='mobile'
            placeholder='Enter patient mobile'
          />
        </div>
        <div className='w-11/12 flex flex-col gap-2 lg:w-2/5'>
          <label htmlFor='email'>Email</label>
          <input
            className='px-3 py-1 outline-none border border-gray-400 rounded-md focus:border-blue-500 md:px-5 md:py-2'
            type='text'
            name='email'
            id='email'
            placeholder='Enter patient email'
          />
        </div>
        <button
          className='w-1/4 rounded-md px-3 py-1 outline-none text-white bg-blue-800 hover:bg-blue-500 focus:bg-blue-500 md:px-5 md:py-2'
          type='submit'>
          Add Patient
        </button>
      </form>
    </div>
  );
};

export default AddPatient;
