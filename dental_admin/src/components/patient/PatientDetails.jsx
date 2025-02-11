import React, { useState } from "react";
import { toast } from "react-toastify";
import { IoCopy } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { IoIosSave } from "react-icons/io";
import axios from "axios";

const PatientDetails = ({ patient, patientId }) => {
  const [formData, setFormData] = useState(patient);
  const [isEditing, setIsEditing] = useState(false);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(formData.prn)
      .then(() => {
        toast.success("PRN copied to clipboard");
      })
      .catch(() => {
        toast.error("Error copying to clipboard. Please copy manually");
      });
  };

  const handlePatientUpdate = () => {
    try {
      (async () => {
        const response = await axios.put(
          `${import.meta.env.VITE_BACKEND_URI}/api/patients/${patientId}`,
          formData,
          {
            withCredentials: true,
          }
        );
        toast.success(response.data.message);
      })();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsEditing(false);
    }
  };

  return (
    <div className='flex flex-col gap-5'>
      <h1 className='text-2xl font-semibold md:text-3xl lg:text-4xl'>
        Patient Details
      </h1>
      <div className='flex flex-col gap-2.5 px-2.5 py-5 border border-gray-400'>
        {isEditing ? (
          <button
            onClick={handlePatientUpdate}
            autoFocus={false}
            className='flex justify-center items-center gap-1 self-end outline-none transition-all duration-200 text-green-600 hover:text-green-900'>
            Save <IoIosSave />
          </button>
        ) : (
          <button
            onClick={(e) => setIsEditing(true)}
            className='flex justify-center items-center gap-1 self-end outline-none text-gray-600 hover:text-gray-900'>
            Edit <CiEdit />
          </button>
        )}

        <div className='grid grid-cols-1 gap-10 md:grid-cols-2'>
          <div className='flex flex-col gap-2'>
            <label className='text-lg font-medium text-left' htmlFor='prn'>
              PRN
            </label>
            <div className='relative'>
              <input
                className='w-full rounded-md outline-none border border-gray-400 focus:border-blue-500 disabled:border-none disabled:bg-gray-200 px-3 py-1 md:px-5 md:py-2 md:text-lg'
                type='text'
                name='prn'
                id='prn'
                disabled={true}
                value={formData.prn}
              />
              <button
                onClick={handleCopy}
                className='absolute top-1/2 -translate-y-1/2 right-2 text-lg text-gray-600'>
                <IoCopy />
              </button>
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <label className='text-lg font-medium text-left' htmlFor='name'>
              Name
            </label>
            <input
              className='w-full rounded-md outline-none border border-gray-400 px-3 py-1 focus:border-blue-500 disabled:border-none md:px-5 md:py-2 md:text-lg'
              type='text'
              name='name'
              id='name'
              disabled={!isEditing}
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder='No name'
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label className='text-lg font-medium text-left' htmlFor='mobile'>
              Mobile
            </label>
            <input
              className='w-full rounded-md outline-none border border-gray-400 px-3 py-1 focus:border-blue-500 disabled:border-none md:px-5 md:py-2 md:text-lg'
              type='text'
              name='mobile'
              id='mobile'
              disabled={!isEditing}
              value={formData.mobile}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, mobile: e.target.value }))
              }
              placeholder='No mobile'
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label className='text-lg font-medium text-left' htmlFor='age'>
              Age
            </label>
            <input
              className='w-full rounded-md outline-none border border-gray-400 px-3 py-1 focus:border-blue-500 disabled:border-none md:px-5 md:py-2 md:text-lg'
              type='text'
              name='age'
              id='age'
              disabled={!isEditing}
              value={formData.age}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, age: e.target.value }))
              }
              placeholder='No age'
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label className='text-lg font-medium text-left' htmlFor='email'>
              Email
            </label>
            <input
              className='w-full rounded-md outline-none border border-gray-400 px-3 py-1 focus:border-blue-500 disabled:border-none md:px-5 md:py-2 md:text-lg'
              type='text'
              name='email'
              id='email'
              disabled={!isEditing}
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              placeholder='No email'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;
