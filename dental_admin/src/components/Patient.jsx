import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PatientDetails from "./patient/PatientDetails";
import PatientHistory from "./patient/PatientHistory";
import axios from "axios";
import Loader from "./Loader";

const Patient = () => {
  const { patientId } = useParams();
  const [patient, setPatient] = useState(undefined);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URI
          }/api/patients/patient/${patientId}`,
          { withCredentials: true }
        );
        setPatient(response.data.patient);
      } catch (error) {
        setPatient(null);
      }
    })();
  }, []);

  if (patient === undefined) return <Loader />;

  return (
    <div className='flex flex-col gap-10'>
      {patient === null ? (
        <div className='text-gray-400 font-light text-center text-xl md:text-2xl lg:text-3xl'>
          Something went wrong
        </div>
      ) : (
        <>
          <PatientDetails patient={patient} patientId={patientId} />
          <PatientHistory patientId={patientId} patient={patient} />
        </>
      )}
    </div>
  );
};

export default Patient;
