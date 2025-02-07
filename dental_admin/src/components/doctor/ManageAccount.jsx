import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { IoClose } from "react-icons/io5";

import Loader from "../Loader";

const ManageAccount = () => {
  const [accounts, setAccounts] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URI}/api/doctors/receptionists`,
          { withCredentials: true }
        );
        setAccounts(response.data.receptionists);
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong");
        setAccounts([]);
      }
    })();
  }, []);

  const handleReceptionistDelete = (email) => {
    (async () => {
      try {
        const response = await axios.delete(
          `${import.meta.env.VITE_BACKEND_URI}/api/doctors/receptionists`,
          { data: { email } },
          { withCredentials: true }
        );
        if (response.status === 200) {
          setAccounts((prev) => prev.filter((a) => a.email !== email));
        }
        toast.success(response.data.message);
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    })();
  };

  const handleReceptionistPasswordSubmit = (e) => {
    if (email && password) {
      try {
        (async () => {
          const response = await axios.post(
            `${
              import.meta.env.VITE_BACKEND_URI
            }/api/doctors/change-receptionist-password`,
            { email, password },
            {
              withCredentials: true,
            }
          );
          toast.success(response.data.message);
          setIsModalOpen(false);
          setEmail("");
          setPassword("");
        })();
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    }
  };

  return (
    <div className='flex flex-col items-center pt-10'>
      {/* Dropdown for role */}
      {/* <div className=''>
        <label className='text-xl font-semibold mr-2' htmlFor='role'>
          Role
        </label>
        <select
          className='px-3 py-1 outline-none border border-gray-400 rounded-md focus:border-blue-500 md:px-5 md:py-2'
          defaultValue='doctor'
          name='role'
          id='role'
          onChange={(e) => {
            setRole(e.target.value);
          }}>
          <option value='doctor'>Doctor</option>
          <option value='receptionist'>Receptionist</option>
        </select>
      </div> */}
      {/* List of accounts */}
      <div className='w-11/12 flex flex-col gap-5 md:w-4/5'>
        <h1 className='text-4xl font-bold text-blue-800 text-center md:text-5xl'>
          Accounts
        </h1>
        {/* list */}
        {accounts ? (
          accounts.length > 0 ? (
            <div className='flex flex-col gap-4 divide-y divide-gray-400'>
              {accounts.map((account, index) => (
                <div
                  key={index}
                  className='flex justify-between items-center px-3 py-1 rounded-md md:px-5 md:py-2'>
                  <div className='flex flex-col gap-0.5'>
                    <span className='text-lg font-semibold text-left md:text-xl'>
                      {account.email}
                    </span>
                    <button
                      onClick={() => {
                        setEmail(account.email);
                        setIsModalOpen(true);
                      }}
                      className='text-gray-600 outline-none text-sm focus:text-blue-500 text-left underline md:text-base'>
                      Change password
                    </button>
                  </div>
                  <button
                    onClick={() => handleReceptionistDelete(account.email)}
                    className='text-red-500 text-2xl md:text-3xl'>
                    <MdDelete />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className='text-center mt-10 text-xl text-gray-400 font-light md:text-4xl'>
              No Receptionist Accounts. Add one from 'Add Account' section
            </div>
          )
        ) : (
          <Loader size={80} />
        )}
      </div>
      {isModalOpen && (
        <div
          onBlur={(e) => setIsModalOpen(false)}
          className='absolute inset-0 z-50 flex justify-center items-center'>
          {/* overlay */}
          <div className='absolute inset-0 z-10 bg-black/60'></div>
          {/* form */}
          <div className='absolute z-20 w-11/12 h-1/4 flex flex-col gap-4 justify-center rounded-md bg-white lg:w-1/3'>
            {/* close button */}
            <button
              onClick={(e) => setIsModalOpen(false)}
              className='absolute top-1 right-1'>
              <IoClose className='text-gray-600 text-xl lg:text-3xl' />
            </button>
            {/* input field */}
            <input
              autoFocus={true}
              className='w-1/2 mx-auto px-3 py-1 md:px-5 md:py-2 rounded-md border outline-none border-gray-400 focus:border-blue-500'
              type='text'
              name='password'
              id='password'
              placeholder='Enter new password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={handleReceptionistPasswordSubmit}
              className='bg-blue-800 text-white rounded-md w-1/2 mx-auto px-3 py-1 hover:bg-blue-500 md:px-5 md:py-2'>
              Change Password
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageAccount;
