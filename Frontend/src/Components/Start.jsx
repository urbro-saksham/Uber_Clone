import React from 'react'
import { Link } from 'react-router-dom'

export const Start = () => {
  return (
    <div className='w-[100vw] h-[100vh]'>
      {/* Set relative so the absolutely positioned logo works */}
      <div className='w-[100vw] h-[78vh] relative'>
        {/* Uber Logo (positioned on top) */}
        <img 
          src="/uberLogo.svg" 
          className='absolute top-5 left-3 h-[65px] rounded-2xl z-10' 
          alt="Uber Logo"
        />
         
        {/* Background Image */}
        <img 
          src="/TrafficLights.jpg" 
          className='h-full w-full object-cover' 
          alt="Traffic Lights Background" 
        />
      </div>

      {/* Text and Button Section */}
      <div className='ml-3'>
        <h2 className='text-[27px] font-semibold mt-2'>Get Started with Uber</h2>
        <Link 
          to='/userlogin' 
          className='flex text-xl items-center justify-center w-[95%] bg-black text-white py-3 rounded-lg mt-5'>
          Continue
        </Link>
      </div>
    </div>
  )
}
