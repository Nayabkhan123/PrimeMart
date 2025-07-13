import React, { useState } from 'react'
import { MdEdit } from "react-icons/md";
import { AdminEditProduct } from './AdminEditProduct';
import displayINRCurrency from '../helpers/displayCurrency';

export const AdminCartProduct = ({data,fetchAllProduct}) => {
  const [editProduct,setEditProduct] = useState(false)
  return (
    <div className='p-4 bg-white rounded shadow-lg flex flex-col'>
        <div className='w-48'>
          <div className='w-48 h-36 mx-auto flex justify-center items-center'>
            <img className='bg-white object-contain h-full rounded' src={data?.productImage[0]}/>
          </div>
          <div className='w-full '>
          <h1 className='text-ellipsis line-clamp-2'>{data?.productName}</h1>
          </div>
        </div>

        <div className='flex '>
          <p className=''>
            {
              displayINRCurrency(data.sellingPrice)
            }
          </p>
          <div onClick={()=>setEditProduct(true)}
          className=' w-fit ml-auto p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer'>
            <MdEdit />
          </div>
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
