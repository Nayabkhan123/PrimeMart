import React from 'react'
import successImage from '../assest/order_success.gif'
import { Link } from 'react-router-dom'
const Success = () => {
  return (
    <div className='bg-[#003241] dark:bg-dark-bg w-full h-[100vh] mx-auto flex justify-center items-center flex-col p-4 mt-4 rounded'>
        <img
            src={successImage}
            width={450}
            className='rounded-full'
        />
        <p className='text-green-600 dark:text-green-400 font-bold text-xl'>Payment Successfully</p>
        <Link to={"/order"} className='p-2 px-3 mt-5 border-2 border-green-600 dark:border-green-400 rounded font-semibold text-green-600 dark:text-green-400 hover:bg-green-600 dark:hover:bg-green-500 hover:text-white'>See Order</Link>
    </div>
  )
}

export default Success
