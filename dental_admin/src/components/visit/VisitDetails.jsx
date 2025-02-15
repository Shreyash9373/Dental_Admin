import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { IoIosSave } from "react-icons/io";
import axios from "axios";
import { FaWhatsapp } from "react-icons/fa";
import { IoCopy } from "react-icons/io5";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import SimpleLoader from "../SimpleLoader";

const VisitDetails = ({ visitId, patient }) => {
  //   const WHATSAPP_REVIEW_MSG = `Thank you for visiting Pakhare Dental Clinic.
  // Use the following link to leave a review fo `
  const REVIEW_LINK = `${import.meta.env.VITE_MAIN_SITE_URI}/${visitId}/review`;
  const WHATSAPP_REVIEW_MSG = `Hi ${patient.name}! 👋

We hope you had a great experience during your recent visit to Pakhare Dental Clinic! 😊 We'd love to hear your feedback and kindly ask if you could take a moment to leave us a review. Your thoughts are important to us and help us improve our services!

Please click the link below to share your experience:

${encodeURI(REVIEW_LINK)}

Thank you for choosing Pakhare Dental Clinic! 🦷✨

Best regards,
The Pakhare Dental Team`;

  const [formData, setFormData] = useState(undefined);
  const [isEditing, setIsEditing] = useState(false);
  const [doctors, setDoctors] = useState(undefined);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(`${import.meta.env.VITE_MAIN_SITE_URI}/${visitId}/review`)
      .then(() => {
        toast.success("Review link copied to clipboard");
      })
      .catch(() => {
        toast.error("Error copying to clipboard. Please copy manually");
      });
  };

  const fetchVisit = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URI}/api/visits/visit/${visitId}`,
        { withCredentials: true }
      );
      setFormData(response.data.visit);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
      setFormData(null);
    }
  };

  // fetch visit for this patient
  useEffect(() => {
    fetchVisit();
  }, []);

  // fetch doctors
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URI}/api/visits/doctors`,
          { withCredentials: true }
        );
        setDoctors(response.data.doctors);
      } catch (error) {
        console.log(error);
        setDoctors(null);
      }
    })();
  }, []);

  const handleVisitUpdate = () => {
    (async () => {
      try {
        const response = await axios.put(
          `${import.meta.env.VITE_BACKEND_URI}/api/visits/${visitId}`,
          formData,
          {
            withCredentials: true,
          }
        );
        toast.success(response.data.message);
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong");
        await fetchVisit();
      } finally {
        setIsEditing(false);
      }
    })();
  };

  if (formData === undefined)
    return (
      <div className='text-5xl w-full flex justify-center items-center'>
        <SimpleLoader />
      </div>
    );

  if (formData === null)
    return (
      <div className='text-3xl text-gray-400 font-light w-full h-1/2 flex justify-center items-center'>
        Something went wrong
      </div>
    );

  return (
    <div className='flex flex-col gap-5'>
      <h1 className='text-2xl font-semibold md:text-3xl lg:text-4xl'>
        Visit Details
      </h1>
      <div className='flex flex-col gap-2.5 px-2.5 py-5 border border-gray-400'>
        {isEditing ? (
          <button
            onClick={handleVisitUpdate}
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
            <label
              className={`text-lg font-medium text-left ${
                isEditing ? "" : "text-gray-400"
              }`}
              htmlFor='review-link'>
              Review Link
            </label>
            <div className='relative'>
              <input
                className='w-full rounded-md outline-none border border-gray-400 focus:border-blue-500 disabled:border-none disabled:bg-gray-200 px-3 py-1 md:px-5 md:py-2 md:text-lg'
                type='text'
                name='review-link'
                id='review-link'
                disabled={true}
                value={REVIEW_LINK.substring(0, 25) + "..."}
              />
              <button
                onClick={handleCopy}
                className='absolute top-1/2 -translate-y-1/2 right-2 text-lg text-gray-600'>
                <IoCopy />
              </button>
              <Link
                // to={`https://wa.me/+91${patient.mobile}?text=Hello world`}
                to={`https://web.whatsapp.com/send?phone=+91${
                  patient.mobile
                }&text=${encodeURIComponent(WHATSAPP_REVIEW_MSG)}`}
                target='_blank'
                rel='noopener noreferrer'
                className='absolute top-1/2 -translate-y-1/2 right-8 text-lg text-gray-600'>
                <FaWhatsapp />
              </Link>
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <div className='flex flex-col gap-2'>
              <div className='flex items-center gap-1'>
                <input
                  className='peer w-4 h-4 outline-none accent-blue-800'
                  type='checkbox'
                  name='is-doctor-visiting'
                  id='is-doctor-visiting'
                  disabled={!isEditing}
                  checked={formData.isDoctorVisiting}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      isDoctorVisiting: e.target.checked,
                      doctor: e.target.checked ? "" : doctors[0]._id,
                    }))
                  }
                />
                <label
                  className={`text-gray-600 text-lg peer-checked:text-blue-500 peer-checked:font-semibold ${
                    isEditing
                      ? "cursor-pointer"
                      : "text-gray-400 peer-checked:text-blue-200"
                  }`}
                  htmlFor='is-doctor-visiting'>
                  Is Doctor Visiting
                </label>
              </div>
              <label
                className={`text-lg font-medium text-left ${
                  isEditing ? "" : "text-gray-400"
                }`}
                htmlFor='doctor'>
                {formData.isDoctorVisiting
                  ? "Enter Visiting Doctor name"
                  : "Select doctor"}
              </label>
              {formData.isDoctorVisiting ? (
                <input
                  className='w-full rounded-md outline-none border border-gray-400 px-3 py-1 focus:border-blue-500 disabled:border-none md:px-5 md:py-2 md:text-lg'
                  type='text'
                  name='doctor'
                  id='doctor'
                  disabled={!isEditing}
                  value={formData.doctor}
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
                  disabled={!isEditing}
                  value={formData.doctor._id}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      doctor: e.target.value,
                    }));
                  }}>
                  {doctors.map((doctor, index) => (
                    <option
                      // selected={formData.doctor === doctor._id}
                      key={index}
                      value={doctor._id}>
                      {doctor.name}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <label
              className={`text-lg font-medium text-left ${
                isEditing ? "" : "text-gray-400"
              }`}
              htmlFor='name'>
              Patient Name
            </label>
            <input
              className='w-full rounded-md outline-none border border-gray-400 px-3 py-1 focus:border-blue-500 disabled:border-none disabled:bg-gray-200 md:px-5 md:py-2 md:text-lg'
              type='text'
              name='name'
              id='name'
              disabled={true}
              value={patient?.name}
              placeholder='No name'
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label
              className={`text-lg font-medium text-left ${
                isEditing ? "" : "text-gray-400"
              }`}
              htmlFor='condition'>
              Condition
            </label>
            <input
              className='w-full rounded-md outline-none border border-gray-400 px-3 py-1 focus:border-blue-500 disabled:border-none md:px-5 md:py-2 md:text-lg'
              type='text'
              name='condition'
              id='condition'
              disabled={!isEditing}
              value={formData.condition}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, condition: e.target.value }))
              }
              placeholder='No condition'
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label
              className={`text-lg font-medium text-left ${
                isEditing ? "" : "text-gray-400"
              }`}
              htmlFor='prescription'>
              Prescription
            </label>
            <input
              className='w-full rounded-md outline-none border border-gray-400 px-3 py-1 focus:border-blue-500 disabled:border-none md:px-5 md:py-2 md:text-lg'
              type='text'
              name='prescription'
              id='prescription'
              disabled={!isEditing}
              value={formData.prescription}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  prescription: e.target.value,
                }))
              }
              placeholder='No prescription'
            />
          </div>
          {/* <div className='flex flex-col gap-2'>
            <label
              className={`text-lg font-medium text-left ${isEditing ? "" : "text-gray-400"}`}
              htmlFor='payment-status'>
              Payment Status
            </label>
            <input
              className='w-full rounded-md outline-none border border-gray-400 px-3 py-1 focus:border-blue-500 disabled:border-none md:px-5 md:py-2 md:text-lg'
              type='text'
              name='payment-status'
              id='payment-status'
              disabled={!isEditing}
              value={formData.paymentStatus}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  paymentStatus: e.target.value,
                }))
              }
              placeholder='No payment status'
            />
          </div> */}
          {/* <div className='flex flex-col gap-2'>
            <label
              className={`text-lg font-medium text-left ${isEditing ? "" : "text-gray-400"}`}
              htmlFor='payment-amount'>
              Paid Amount
            </label>
            <input
              className='w-full rounded-md outline-none border border-gray-400 px-3 py-1 focus:border-blue-500 disabled:border-none md:px-5 md:py-2 md:text-lg'
              type='text'
              name='payed-amount'
              id='payed-amount'
              disabled={!isEditing}
              value={formData.payedAmount}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  payedAmount: e.target.value,
                }))
              }
              placeholder='No paid amount'
            />
          </div> */}
          <div className='flex flex-col gap-2'>
            <label
              className={`text-lg font-medium text-left ${
                isEditing ? "" : "text-gray-400"
              }`}
              htmlFor='total-amount'>
              Total Amount (₹)
            </label>
            <input
              className='w-full rounded-md outline-none border border-gray-400 px-3 py-1 focus:border-blue-500 disabled:border-none md:px-5 md:py-2 md:text-lg'
              type='text'
              name='total-amount'
              id='total-amount'
              disabled={!isEditing}
              value={formData.totalAmount}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  totalAmount: e.target.value,
                }))
              }
              placeholder='No total amount'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitDetails;
