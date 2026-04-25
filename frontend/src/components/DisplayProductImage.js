import React from 'react'
import { GrClose } from "react-icons/gr";

const DisplayProductImage = ({imageUrl,onClose}) => {
  return (
    <div className='fixed top-0 bottom-0 right-0 left-0 bg-white dark:bg-dark-bg bg-opacity-80 dark:bg-opacity-90 flex flex-col justify-center items-center'>
        <div className='absolute top-20 right-20 text-3xl hover:scale-125 transition-all cursor-pointer text-gray-900 dark:text-white' onClick={onClose}>
            <GrClose/>
        </div>
        <div className='max-h-[80vh] max-w-[80vw] bg-white dark:bg-dark-card p-4 rounded-lg shadow-xl dark:shadow-gray-900/50'>
            <img className='h-full w-full dark:mix-blend-normal' src={imageUrl} alt='Product Image not Load'/>
        </div>        
    </div>
  )
}

export default DisplayProductImage
