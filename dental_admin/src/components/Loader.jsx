import React from "react";
import { ClipLoader } from "react-spinners";

{
  /* <Loader loading={!authUser.isLoggedIn} color={"#062335"} /> */
}

const Loader = ({ loading, size = 50, color }) => {
  return (
    <div className='h-screen flex items-center justify-center'>
      <ClipLoader loading={loading} size={size} color={color} />
    </div>
  );
};

export default Loader;
