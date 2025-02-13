import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaNotesMedical } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { SlOptionsVertical } from "react-icons/sl";

import { useAuth } from "../../context/AuthContext";
import SimpleLoader from "../SimpleLoader";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";

const defaultFormData = {
  doctor: "",
  patientId: "",
  condition: "",
  prescription: "",
  totalAmount: "",
  isDoctorVisiting: false,
};

const PatientHistory = ({ patientId, patient }) => {
  const [visits, setVisits] = useState(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ ...defaultFormData, patientId });
  const [doctors, setDoctors] = useState(undefined);

  const { authUser } = useAuth();

  // fetch doctors
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URI}/api/visits/doctors`,
          { withCredentials: true }
        );
        // console.log(response.data);
        setDoctors(response.data.doctors);
        setFormData((prev) => ({
          ...prev,
          doctor: response.data.doctors[0]._id,
        }));
      } catch (error) {
        console.log(error);
        setDoctors(null);
      }
    })();
  }, []);

  const fetchVisits = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URI}/api/visits/patient/${patientId}`,
        { withCredentials: true }
      );
      setVisits(response.data.visits);
    } catch (error) {
      setVisits(null);
    }
  };

  // fetch visits for this patient
  useEffect(() => {
    fetchVisits();
  }, []);

  const handleVisitDelete = (visitId) => {
    (async () => {
      try {
        const response = await axios.delete(
          `${import.meta.env.VITE_BACKEND_URI}/api/visits/${visitId}`,
          { withCredentials: true }
        );
        toast.success(response.data.message);
        await fetchVisits();
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong");
      } finally {
        // activeElement is a property of document
        // Reference - https://stackoverflow.com/questions/54056596/reactjs-unfocusing-a-button-element-using-blur
        document.activeElement.blur();
      }
    })();
  };

  const pendingVisits = useMemo(() => {
    return visits?.filter((visit) => visit.paymentStatus !== "PAID").length;
  }, [visits]); // Recalculate only when visits change

  const handleAddVisit = () => {
    (async () => {
      try {
        console.warn(formData);
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URI}/api/visits`,
          { ...formData },
          { withCredentials: true }
        );
        console.log(response);
        toast.success(response.data.message);
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || "Something went wrong");
      } finally {
        setFormData(defaultFormData);
        setIsModalOpen(false);
        await fetchVisits();
      }
    })();
  };

  if (visits === undefined)
    return (
      <div className='text-5xl w-full h-1/2 flex justify-center items-center'>
        <SimpleLoader />
      </div>
    );

  if (visits === null)
    return (
      <div className='text-3xl text-gray-400 font-light w-full h-1/2 flex justify-center items-center'>
        Something went wrong
      </div>
    );

  return (
    <div className='flex flex-col gap-2'>
      {/* <div className='flex flex-col gap-5'> */}
      <div className='flex justify-between items-center px-3 py-1 md:px-5 md:py-2'>
        <h1 className='text-2xl font-semibold md:text-3xl lg:text-4xl'>
          Patient History
        </h1>
      </div>
      <div className='flex justify-between items-center px-3 py-1 md:px-5 md:py-2'>
        <button
          onClick={(e) => setIsModalOpen((prev) => true)}
          className='flex items-center gap-2 border border-blue-800 text-blue-800 self-start rounded-md px-3 py-1 hover:bg-blue-800 hover:text-white focus:bg-blue-800 focus:text-white md:px-5 md:py-2'>
          Add Visit <FaNotesMedical />
        </button>
        {/* payment status */}
        {pendingVisits ? (
          <div className='w-min text-nowrap px-3 py-1 text-sm rounded-md self-end text-orange-500 bg-orange-200 md:px-5 md:py-2 md:text-base'>
            (<span className='font-bold'>{pendingVisits}</span>) Payment Pending
          </div>
        ) : (
          <div className='w-min text-nowrap px-3 py-1 text-sm rounded-md self-end text-green-500 bg-green-200 md:px-5 md:py-2 md:text-base'>
            No pending payments
          </div>
        )}
      </div>
      {/* </div> */}
      {/* list of visits */}
      <div className='divide-y divide-gray-400 flex flex-col [&>*]:py-4'>
        {/* visit */}
        {visits?.length > 0 ? (
          visits.map((visit, index) => (
            <Link
              to={`/admin/dashboard/${authUser.role}/visit/${visit._id}`}
              state={patient}
              key={index}
              className='flex justify-between items-center px-3 py-1 md:px-5 md:py-2'>
              <span className='text-gray-600'>
                {new Date(visit.createdAt).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                - Visit #{index + 1}
              </span>
              <div className='flex items-center gap-3'>
                <div
                  className={`${
                    visit.paymentStatus === "PAID"
                      ? "text-green-500 bg-green-200"
                      : "text-orange-500 bg-orange-200"
                  } w-min text-nowrap px-3 py-1 rounded-md self-end md:px-5 md:py-2`}>
                  {visit.paymentStatus}
                </div>
                <div className='relative group'>
                  <button
                    onClick={(e) => e.preventDefault()}
                    className='text-gray-400 outline-none hover:text-gray-600'>
                    <SlOptionsVertical />
                  </button>
                  <div className='absolute bg-white shadow-md px-3 py-1 right-2/3 hidden flex-col gap-1 group-focus-within:flex'>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleVisitDelete(visit._id);
                      }}
                      className='text-red-500 flex items-center gap-3 text-lg hover:text-red-600'>
                      <span>Delete</span>
                      <MdDelete />
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className='text-gray-400 text-3xl w-full h-[30vh] flex justify-center items-center'>
            No Visits for this patient
          </div>
        )}
      </div>
      {/* modal */}
      {isModalOpen && (
        <div className='fixed inset-0 z-50 flex justify-center items-center'>
          {/* overlay */}
          <div className='absolute inset-0 z-10 bg-black/60'></div>
          {/* modal container */}
          <div className='absolute z-20 w-11/12  flex flex-col gap-4 justify-center rounded-md bg-white px-3 py-1 md:px-5 md:py-14'>
            {/* close button */}
            <button
              onClick={(e) => setIsModalOpen((prev) => false)}
              className='absolute top-1 right-1'>
              <IoClose className='text-gray-600 text-xl lg:text-3xl' />
            </button>
            <div className='flex items-center gap-1'>
              <input
                className='peer w-4 h-4 outline-none accent-blue-800'
                type='checkbox'
                name='is-doctor-visiting'
                id='is-doctor-visiting'
                checked={formData?.isDoctorVisiting}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    isDoctorVisiting: e.target.checked,
                    doctor: e.target.checked ? "" : doctors[0]._id,
                  }))
                }
              />
              <label
                className='cursor-pointer text-gray-400 text-lg peer-checked:text-blue-500 peer-checked:font-semibold'
                htmlFor='is-doctor-visiting'>
                Is Doctor Visiting
              </label>
            </div>
            {/* form */}
            <form className='grid grid-cols-1 gap-10 xl:grid-cols-2'>
              {/* doctor field */}
              <div className='flex flex-col gap-2'>
                <label
                  className='text-lg font-medium text-left'
                  htmlFor='doctor'>
                  {formData?.isDoctorVisiting
                    ? "Enter Visiting Doctor name"
                    : "Select doctor"}
                </label>
                {formData?.isDoctorVisiting ? (
                  <input
                    className='w-full rounded-md outline-none border border-gray-400 px-3 py-1 focus:border-blue-500 disabled:border-none md:px-5 md:py-2 md:text-lg'
                    type='text'
                    name='doctor'
                    id='doctor'
                    value={formData?.doctor}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        doctor: e.target.value,
                      }))
                    }
                    placeholder='Enter visiting doctor name'
                  />
                ) : doctors === undefined ? (
                  <div className='w-min mx-auto'>
                    <SimpleLoader />
                  </div>
                ) : doctors === null ? (
                  <span className='text-gray-600'>Something went wrong</span>
                ) : (
                  <select
                    className='px-3 py-1 outline-none border border-gray-400 focus:border-blue-500 disabled:border-none md:px-5 md:py-2'
                    id='doctor'
                    value={doctors[0]._id}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        doctor: e.target.value,
                      }));
                    }}>
                    {doctors.map((doctor, index) => (
                      <option
                        // selected={formData?.doctor === doctor._id}
                        key={index}
                        value={doctor._id}>
                        {doctor.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              {/* patient name */}
              <div className='flex flex-col gap-2'>
                <label
                  className='text-lg font-medium text-left'
                  htmlFor='patient-name'>
                  Patient name
                </label>
                <input
                  className='font-medium w-full rounded-md outline-none border border-gray-400 px-3 py-1 focus:border-blue-500 disabled:border-none disabled:bg-gray-200 md:px-5 md:py-2 md:text-lg'
                  type='text'
                  name='patient-name'
                  id='patient-name'
                  disabled={true}
                  defaultValue={patient.name}
                  placeholder='No patient name'
                />
              </div>
              {/* condition */}
              <div className='flex flex-col gap-2'>
                <label
                  className='text-lg font-medium text-left'
                  htmlFor='condition'>
                  Condition
                </label>
                <input
                  className='w-full rounded-md outline-none border border-gray-400 px-3 py-1 focus:border-blue-500 disabled:border-none md:px-5 md:py-2 md:text-lg'
                  type='text'
                  name='condition'
                  id='condition'
                  value={formData?.condition}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      condition: e.target.value,
                    }))
                  }
                  placeholder='Add condition'
                />
              </div>
              {/* prescription */}
              <div className='flex flex-col gap-2'>
                <label
                  className='text-lg font-medium text-left'
                  htmlFor='prescription'>
                  Prescription
                </label>
                <input
                  className='w-full rounded-md outline-none border border-gray-400 px-3 py-1 focus:border-blue-500 disabled:border-none md:px-5 md:py-2 md:text-lg'
                  type='text'
                  name='prescription'
                  id='prescription'
                  value={formData?.prescription}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      prescription: e.target.value,
                    }))
                  }
                  placeholder='Add prescription'
                />
              </div>
              {/* total amount */}
              <div className='flex flex-col gap-2'>
                <label
                  className='text-lg font-medium text-left'
                  htmlFor='total-amount'>
                  Total Amount
                </label>
                <input
                  className='w-full rounded-md outline-none border border-gray-400 px-3 py-1 focus:border-blue-500 disabled:border-none md:px-5 md:py-2 md:text-lg'
                  type='text'
                  name='total-amount'
                  id='total-amount'
                  value={formData?.totalAmount}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      totalAmount: e.target.value,
                    }))
                  }
                  placeholder='Add total amount'
                />
              </div>
            </form>
            <button
              onClick={handleAddVisit}
              className='bg-blue-500 text-white rounded-md w-1/2 mx-auto px-3 py-1 hover:bg-blue-800 md:px-5 md:py-2'>
              Add Visit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientHistory;
