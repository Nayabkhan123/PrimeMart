import React from 'react'
import { GrClose } from "react-icons/gr";

const DisplayProductImage = ({imageUrl,onClose}) => {
  return (
    <div className='fixed top-0 bottom-0 right-0 left-0 bg-white bg-opacity-80 flex flex-col justify-center items-center'>
        <div className='absolute top-20 right-20 text-3xl hover:scale-125 transition-all cursor-pointer ' onClick={onClose}>
            <GrClose/>
        </div>
        <div className='max-h-[80vh] max-w-[80vw]'>
            <img className='h-full w-full' src={imageUrl} alt='Product Image not Load'/>
        </div>        
    </div>
  )
}

export default DisplayProductImage