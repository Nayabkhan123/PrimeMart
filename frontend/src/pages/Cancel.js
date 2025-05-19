import React from 'react'
import cancelImage from '../assest/cancel.webp'
import { Link } from 'react-router-dom'
const Cancel = () => {
  return (
    <div className='bg-white w-full h-[100vh] mx-auto flex justify-center items-center flex-col p-4 mt-4 rounded'>
        <img
            src={cancelImage}
            width={350}
            className='rounded-full'
        />
        <p className='text-red-600 font-bold text-xl'>Payment Cancel</p>
        <Link to={"/cart"} className='p-2 px-3 mt-5 border-2 border-red-600 rounded font-semibold text-red-600 hover:bg-red-600 hover:text-white'>Go To Cart</Link>
    </div>
  )
}

export default Cancel