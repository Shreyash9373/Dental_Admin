import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AiOutlineLoading } from "react-icons/ai";
import { Link } from "react-router-dom";

import { useDebounce } from "../../hooks/useDebounce";
import { useAuth } from "../../context/AuthContext";

const SearchPatient = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm);
  const [patients, setPatients] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { authUser } = useAuth();

  useEffect(() => {
    (async () => {
      if (searchTerm.length > 0) {
        setIsLoading(true);
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URI}/api/patients/search-patient`,
            {
              params: { searchTerm: debouncedSearchTerm },
              withCredentials: true,
            }
          );
          setPatients(response.data.patients);
        } catch (error) {
          setPatients([]);
          toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
          setIsLoading(false);
        }
      } else {
        setPatients(null);
      }
    })();
  }, [debouncedSearchTerm]);

  return (
    <div className='flex flex-col gap-5'>
      <h1 className='text-2xl font-semibold md:text-3xl lg:text-4xl'>
        Search Patient
      </h1>
      <div className='group/search relative flex flex-col'>
        {/* search input */}
        <input
          className='peer/searchf px-3 py-1 border border-gray-400 rounded-md outline-none focus:border-blue-500 md:px-5 md:py-2'
          type='text'
          name='search'
          id='search'
          placeholder='Search Patient by name, mobile or email'
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {/* results */}
        {patients && (
          <div
            style={
              patients?.length > 0
                ? {
                    overflowY: "scroll",
                    maxHeight: `${4 * 72}px` /* This is a a rough estimate */,
                  }
                : undefined
            }
            className={`absolute top-11 left-0 right-0 w-full bg-white border border-gray-400 hidden group-focus-within/search:block ${
              patients?.length > 0 ? "md:w-min" : undefined
            } flex flex-col px-3 py-6`}>
            {/* loader */}
            {isLoading && (
              <div className='self-center text-5xl animate-spin'>
                <AiOutlineLoading />
              </div>
            )}
            {/* list of patients */}
            {patients.length > 0 ? (
              <div className='flex flex-col gap-2 divide-y divide-gray-400'>
                {patients.map((p, index) => (
                  <Link
                    to={`/admin/dashboard/${authUser.role}/patient/${p._id}`}
                    key={index}
                    className='flex justify-between gap-16 items-center lg:gap-40'>
                    <div className='flex flex-col'>
                      <span className='text-nowrap'>{p.name}</span>
                      <span className='text-sm text-nowrap text-gray-600'>
                        {p.mobile}
                      </span>
                    </div>
                    <span className='text-sm'>{p.email}</span>
                  </Link>
                ))}
              </div>
            ) : (
              <div className='text-xl text-center text-gray-400 font-light'>
                No patients found
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPatient;
