import React, { useState } from 'react'
import { MdEdit } from "react-icons/md";
import { AdminEditProduct } from './AdminEditProduct';
import displayINRCurrency from '../helpers/displayCurrency';

export const AdminCartProduct = ({data,fetchAllProduct}) => {
  const [editProduct,setEditProduct] = useState(false)
  return (
    <div className='p-4 bg-white dark:bg-dark-card rounded-lg shadow-lg dark:shadow-gray-900/50 flex flex-col border dark:border-dark-border hover:shadow-xl dark:hover:shadow-gray-900/70 transition-all'>
        <div className='w-full'>
          <div className='w-full h-40 mx-auto flex justify-center items-center bg-slate-50 dark:bg-dark-bg rounded-lg overflow-hidden mb-3'>
            <img 
              className='w-full h-full object-contain p-2 dark:mix-blend-normal' 
              src={data?.productImage[0]}
              alt={data?.productName}
            />
          </div>
          <div className='w-full mb-2'>
            <h1 className='text-sm font-medium text-ellipsis line-clamp-2 dark:text-white min-h-[40px]'>{data?.productName}</h1>
          </div>
        </div>

        <div className='flex items-center justify-between mt-auto pt-2 border-t dark:border-dark-border'>
          <p className='dark:text-gray-400 font-semibold text-sm'>
            {
              displayINRCurrency(data.sellingPrice)
            }
          </p>
          <button 
            onClick={()=>setEditProduct(true)}
            className='p-2 bg-green-100 dark:bg-green-900/30 hover:bg-green-600 dark:hover:bg-green-700 rounded-lg hover:text-white dark:text-green-400 dark:hover:text-white cursor-pointer transition-all hover:scale-110'
            aria-label="Edit product"
          >
            <MdEdit />
          </button>
        </div>


        
        {
          editProduct && (
            <AdminEditProduct productData={data}
            onclose={()=>{setEditProduct(false)}}
            fetchAllProduct={fetchAllProduct}/>
          )
        }
    </div>
  )
}

