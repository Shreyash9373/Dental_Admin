import React from "react";
import { AiOutlineLoading } from "react-icons/ai";

const SimpleLoader = () => {
  return (
    <div className='animate-spin'>
      <AiOutlineLoading />
    </div>
  );
};

export default SimpleLoader;
