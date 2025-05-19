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
      console.log("apidata : ",allProducts)
    }
    catch(err){
      console.log(err)
    }
  }
  useEffect(()=>{
    fetchAllProduct()
  },[])
  return (
    <div>
      <div className='bg-white py-2 px-4 flex justify-between items-center'>
      <h2 className='font-bold text-lg'>All Product</h2>
      <button onClick={()=>setOpenUploadProduct(true)} className='border-2 border-blue-600 text-blue-600 hover:bg-blue-700 hover:text-white rounded-full px-4 py-2 font-semibold shadow-md transition-all'>Upload Product</button>
      </div>
      {/* upload product components */}
      {
        openUploadProduct&&
        <UploadProduct onclose={()=>setOpenUploadProduct(false)}
        fetchAllProduct={fetchAllProduct}/>
      }

      <div className='flex items-center gap-5 py-4 px-4 mx-4 flex-wrap'>
        {
          allProducts.map((product,index)=>{
            return (
              <AdminCartProduct data={product} key = {index + "allProduct"} fetchAllProduct={fetchAllProduct}/>
            )
          })
        }
      </div>
      
    </div>

    
  )
}