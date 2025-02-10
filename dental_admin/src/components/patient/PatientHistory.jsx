import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";

import SimpleLoader from "../SimpleLoader";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const PatientHistory = ({ patientId }) => {
  const [visits, setVisits] = useState(undefined);

  const { authUser } = useAuth();

  // fetch visits for this patient
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URI}/api/visits/patient/${patientId}`,
          { withCredentials: true }
        );
        setVisits(response.data.visits);
      } catch (error) {
        setVisits(null);
      }
    })();
  }, []);

  const pendingVisits = useMemo(() => {
    return visits?.filter((visit) => visit.paymentStatus !== "PAID").length;
  }, [visits]); // Recalculate only when visits change

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
    <div>
      <div className='flex flex-col gap-2'>
        <div className='flex justify-between items-center'>
          <h1 className='text-2xl font-semibold md:text-3xl lg:text-4xl'>
            Patient History
          </h1>
          {/* payment status */}
          {pendingVisits ? (
            <div className='w-min text-nowrap px-3 py-1 text-sm rounded-md self-end text-orange-500 bg-orange-200 md:px-5 md:py-2 md:text-base'>
              ({pendingVisits}) Payment Pending`
            </div>
          ) : (
            <div className='w-min text-nowrap px-3 py-1 text-sm rounded-md self-end text-green-500 bg-green-200 md:px-5 md:py-2 md:text-base'>
              No pending payments
            </div>
          )}
        </div>
        {/* list of visits */}
        <div className='divide-y divide-gray-400 flex flex-col [&>*]:py-4'>
          {/* visit */}
          {visits?.length > 0 ? (
            visits.map((visit, index) => (
              <Link
                to={`/admin/dashboard/${authUser.role}/visit/${visit._id}`}
                state={visit}
                key={index}
                className='flex justify-between items-center px-3 py-1 md:px-5 md:py-2'>
                <span className='text-gray-600'>
                  {new Date(visit.createdAt).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                  - Visit #{index + 1}
                </span>
                <div
                  className={`${
                    visit.paymentStatus === "PAID"
                      ? "text-green-500 bg-green-200"
                      : "text-orange-500 bg-orange-200"
                  } w-min text-nowrap px-3 py-1 rounded-md self-end md:px-5 md:py-2`}>
                  {visit.paymentStatus}
                </div>
              </Link>
            ))
          ) : (
            <div className='text-gray-400 text-3xl w-full h-[30vh] flex justify-center items-center'>
              No Visits for this patient
            </div>
          )}

          {/* <div className='flex justify-between items-center px-3 py-1 md:px-5 md:py-2'>
            <span className='text-gray-600'>08 Feb, 2025 - Visit #01</span>
            <div className='w-min text-nowrap px-3 py-1 rounded-md self-end text-orange-500 bg-orange-200 md:px-5 md:py-2'>
              PENDING
            </div>
          </div> */}

          {/* <div className='flex justify-between items-center px-3 py-1 md:px-5 md:py-2'>
            <span className='text-gray-600'>08 Feb, 2025 - Visit #01</span>
            <div className='w-min text-nowrap px-3 py-1 rounded-md self-end text-green-500 bg-green-200 md:px-5 md:py-2'>
              PAID
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default PatientHistory;
