import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import VisitDetails from "./visit/VisitDetails";
import VisitPayments from "./visit/VisitPayments";

const Visit = () => {
  const { visitId } = useParams();
  // const location = useLocation();
  // const [visit, setVisit] = useState(location.state || null);

  const visit = location.state || null;

  return (
    <div className='flex flex-col gap-10'>
      {!visitId ? (
        <div className='text-gray-400 font-light text-center text-xl md:text-2xl lg:text-3xl'>
          This visit does not exists
        </div>
      ) : (
        <>
          <VisitDetails visitId={visitId} />
          <VisitPayments
            visitId={visitId}
            // visit={visit}
            // payments={visit.payments}
            // setVisit={setVisit}
          />
          {/* <PatientDetails patient={patient} patientId={patientId} />
          <PatientHistory patientId={patientId} /> */}
        </>
      )}
    </div>
  );
};

export default Visit;
