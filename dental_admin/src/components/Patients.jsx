import React from "react";

import AddPatient from "./patient/AddPatient";
import SearchPatient from "./patient/SearchPatient";

const Patients = () => {
  return (
    <div className='px-6 py-4 flex flex-col gap-10'>
      <SearchPatient />
      <AddPatient />
    </div>
  );
};

export default Patients;
