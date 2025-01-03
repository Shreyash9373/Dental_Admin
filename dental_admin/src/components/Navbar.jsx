import React from 'react'

const Navbar = () => {
  return (
    <div className='z-10 w-full bg-gray-800 text-white p-4 sticky top-0'>
     <div className='w-full flex flex-row justify-between items-center px-6'>
     <div>
        Login | Register
        </div>
        <div>
            Logout
        </div>
     </div>
    </div>
  )
}

export default Navbar
