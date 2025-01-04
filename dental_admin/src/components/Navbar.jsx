import React from 'react';
import logo from '../assets/Dr.Pakhare.png'

const Navbar = () => {

  return (
    <div className='z-10 w-full bg-gray-800 text-white sticky top-0'>
      <div className='w-full flex flex-row justify-between items-center px-10'>
        <img src={logo} alt="" className='h-16 w-16 rounded-xl' />
        <div>Login</div>
      </div>
    </div>
  )
}

export default Navbar
