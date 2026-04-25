import React, { useEffect, useState } from 'react'
import { UploadProduct } from '../components/UploadProduct'
import SummaryApi from '../common'
import { AdminCartProduct } from '../components/AdminCartProduct'

export const AllProducts = () => {
  const [openUploadProduct,setOpenUploadProduct] = useState(false)
  const [allProducts,setAllProduct] = useState([])
  
  const fetchAllProduct = async()=>{
    try{
      const apiresponse = await fetch(SummaryApi.getAllProducts.url,{
        method:SummaryApi.getAllProducts.method,
      })
      const apidata = await apiresponse.json()
      if(apidata.success){
        setAllProduct(apidata?.data || [])
      }
    }
    catch(err){
      console.log(err)
    }
  }
  
  useEffect(()=>{
    fetchAllProduct()
  },[])
  
  return (
    <div className='bg-gray-50 dark:bg-dark-bg min-h-screen p-4 md:p-6'>
      {/* Header Section */}
      <div className='bg-white dark:bg-dark-card rounded-xl shadow-lg dark:shadow-gray-900/50 p-6 mb-6 border dark:border-dark-border'>
        <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
          <div>
            <h2 className='font-bold text-3xl md:text-4xl text-gray-900 dark:text-white mb-2'>All Products</h2>
            <p className='text-gray-600 dark:text-gray-400'>Manage your product inventory</p>
          </div>
          <button 
            onClick={()=>setOpenUploadProduct(true)} 
            className='bg-primary-600 dark:bg-primary-500 text-white hover:bg-primary-700 dark:hover:bg-primary-600 rounded-lg px-6 py-3 font-semibold shadow-md hover:shadow-lg transition-all hover:scale-105 flex items-center gap-2'
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Upload Product
          </button>
        </div>
        
        {/* Stats */}
        <div className='mt-6 pt-6 border-t dark:border-dark-border'>
          <div className='flex items-center gap-2 text-gray-700 dark:text-gray-300'>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <span className='font-semibold text-lg'>{allProducts.length}</span>
            <span className='text-sm'>Total Products</span>
          </div>
        </div>
      </div>
      
      {openUploadProduct &&
        <UploadProduct onclose={()=>setOpenUploadProduct(false)}
        fetchAllProduct={fetchAllProduct}/>
      }

      {/* Products Grid */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4'>
        {
          allProducts.map((product,index)=>{
            return (
              <AdminCartProduct data={product} key = {index + "allProduct"} fetchAllProduct={fetchAllProduct}/>
            )
          })
        }
      </div>
      
      {allProducts.length === 0 && (
        <div className='bg-white dark:bg-dark-card rounded-xl shadow-lg dark:shadow-gray-900/50 p-12 text-center border dark:border-dark-border'>
          <svg className="w-24 h-24 mx-auto text-gray-400 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>No Products Yet</h3>
          <p className='text-gray-600 dark:text-gray-400 mb-6'>Start by uploading your first product</p>
          <button 
            onClick={()=>setOpenUploadProduct(true)} 
            className='bg-primary-600 dark:bg-primary-500 text-white hover:bg-primary-700 dark:hover:bg-primary-600 rounded-lg px-6 py-3 font-semibold transition-all inline-flex items-center gap-2'
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Upload Product
          </button>
        </div>
      )}
    </div>
  )
}
