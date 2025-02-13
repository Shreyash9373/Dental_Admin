import React, { useEffect, useMemo, useState } from "react";
import { MdAddCard, MdDelete } from "react-icons/md";
import { SlOptionsVertical } from "react-icons/sl";

import { useAuth } from "../../context/AuthContext";
import SimpleLoader from "../SimpleLoader";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import { toast } from "react-toastify";

const VisitPayments = ({ visitId }) => {
  const [visit, setVisit] = useState(undefined);
  const [amount, setAmount] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { authUser } = useAuth();

  // fetch visit for this patient
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URI}/api/visits/visit/${visitId}`,
          { withCredentials: true }
        );
        setVisit(response.data.visit);
      } catch (error) {
        setVisit(null);
      }
    })();
  }, [visit]);

  // useEffect to disable scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : null;
  }, [isModalOpen]);

  const handleAddPayment = () => {
    (async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URI}/api/visits/payment/${visit._id}`,
          { amount },
          { withCredentials: true }
        );
        toast.success(response.data.message);
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || "Something went wrong");
      } finally {
        setAmount("");
        setIsModalOpen(false);
      }
    })();
  };

  const handlePaymentDelete = (id) => {
    (async () => {
      try {
        const response = await axios.delete(
          `${import.meta.env.VITE_BACKEND_URI}/api/visits/payment/${visit._id}`,
          { data: { id }, withCredentials: true }
        );
        console.log(response.data.visit);
        toast.success(response.data.message);
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || "Something went wrong");
      } finally {
        setAmount("");
        setIsModalOpen(false);
      }
    })();
  };

  const pendingAmount = useMemo(() => {
    return visit ? visit.totalAmount - visit.payedAmount : 0;
    // return payments?.reduce((acc, payment) => acc + payment.amount, 0);
  }, [visit]); // Recalculate only when payments change

  if (visit === undefined)
    return (
      <div className='text-5xl w-full flex justify-center items-center'>
        <SimpleLoader />
      </div>
    );

  if (visit === null)
    return (
      <div className='text-3xl text-gray-400 font-light w-full h-1/2 flex justify-center items-center'>
        Something went wrong
      </div>
    );

  return (
    <div className='flex flex-col gap-5'>
      <div className='flex flex-col gap-5'>
        <div className='flex justify-between items-center px-3 py-1 md:px-5 md:py-2'>
          <h1 className='text-2xl font-semibold md:text-3xl lg:text-4xl'>
            Payments
          </h1>
          <div className='text-xl md:text-3xl'>
            Total <span className='font-semibold'>{visit.totalAmount}</span>
          </div>
        </div>
        <div className='flex justify-between items-center px-3 py-1 md:px-5 md:py-2'>
          <button
            onClick={(e) => setIsModalOpen((prev) => true)}
            className='flex items-center gap-2 border border-green-500 text-green-500 self-start rounded-md px-3 py-1 hover:bg-green-500 hover:text-white focus:bg-green-500 focus:text-white md:px-5 md:py-2'>
            Add Payment <MdAddCard />
          </button>
          {/* payment status */}
          {pendingAmount ? (
            <div className='w-min text-nowrap px-3 py-1 text-sm rounded-md self-end text-orange-500 bg-orange-200 md:px-5 md:py-2 md:text-base'>
              Payment Pending (
              <span className='font-bold'>{pendingAmount}</span>)
            </div>
          ) : (
            <div className='w-min text-nowrap px-3 py-1 text-sm rounded-md self-end text-green-500 bg-green-200 md:px-5 md:py-2 md:text-base'>
              No pending payments
            </div>
          )}
        </div>
      </div>
      {/* list of payments */}
      <div className='divide-y divide-gray-400 flex flex-col [&>*]:py-4'>
        {/* payment */}
        {visit.payments?.length > 0 ? (
          <>
            <div className='text-2xl font-bold flex justify-between items-center px-3 py-1 md:px-5 md:py-2'>
              <span>Amount paid</span>
              <span className='text-green-500'>{visit.payedAmount}</span>
            </div>
            {visit.payments.map((payment, index) => (
              <div
                key={index}
                className='flex justify-between items-center px-3 py-1 md:px-5 md:py-2'>
                <span className='text-gray-600'>
                  {new Date(payment.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                  {new Date(payment.date).toLocaleTimeString()} - Payment #
                  {index + 1}
                </span>
                <div className='flex items-center gap-3'>
                  <div className='text-green-500 bg-green-200 font-semibold w-min text-nowrap px-3 py-1 md:px-5 md:py-2'>
                    {payment.amount}
                  </div>
                  <div className='relative group'>
                    <button className='text-gray-400 outline-none hover:text-gray-600'>
                      <SlOptionsVertical />
                    </button>
                    <div className='absolute bg-white shadow-md px-3 py-1 right-2/3 hidden flex-col gap-1 group-focus-within:flex'>
                      <button
                        onClick={(e) => handlePaymentDelete(payment._id)}
                        className='text-red-500 flex items-center gap-3 text-lg hover:text-red-600'>
                        <span>Delete</span>
                        <MdDelete />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className='text-gray-400 text-3xl w-full h-[30vh] flex justify-center items-center'>
            No payments for this visit
          </div>
        )}
      </div>
      {/* modal */}
      {isModalOpen && (
        <div className='fixed inset-0 z-50 flex justify-center items-center'>
          {/* overlay */}
          <div className='absolute inset-0 z-10 bg-black/60'></div>
          {/* form */}
          <div
            /* onBlur={(e) => {
              console.log("blur");
              setIsModalOpen((prev) => false);
            }} */
            className='absolute z-20 w-11/12 h-1/4 flex flex-col gap-4 justify-center rounded-md bg-white lg:w-1/3'>
            {/* close button */}
            <button
              onClick={(e) => setIsModalOpen((prev) => false)}
              className='absolute top-1 right-1'>
              <IoClose className='text-gray-600 text-xl lg:text-3xl' />
            </button>
            {/* amount field */}
            <input
              // onBlur={(e) => {
              //   console.log("blur");
              //   setIsModalOpen((prev) => false);
              // }}
              autoFocus={true}
              className='w-1/2 mx-auto px-3 py-1 md:px-5 md:py-2 rounded-md border outline-none border-gray-400 focus:border-green-500'
              type='text'
              name='amount'
              id='amount'
              placeholder='Enter new amount'
              value={amount}
              onChange={(e) => {
                console.log(e);
                setAmount(e.target.value);
              }}
              onKeyDown={(e) => e.key === "Enter" && handleAddPayment()}
            />
            <button
              onClick={handleAddPayment}
              className='bg-green-500 text-white rounded-md w-1/2 mx-auto px-3 py-1 hover:bg-green-800 md:px-5 md:py-2'>
              Add amount
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisitPayments;
