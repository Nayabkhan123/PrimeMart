import React, { useEffect, useState } from 'react'
import SummaryApi from '../common';
import { Link } from 'react-router-dom';

const CategoryList = () => {
    const [categoryProduct,setCategoryProduct]= useState([]);
    const [loading,setLoading] = useState(false)
    
    const fetchCategoryProduct = async()=>{
        try{
            setLoading(true)
            const apiresponse = await fetch(SummaryApi.categoryProduct.url)
            const apidata = await apiresponse.json()
            setLoading(false)
            console.log("first",apidata)
            setCategoryProduct(apidata.data);
        }
        catch(err){
            console.log("error while fetching category product")
        }
        
    }
    useEffect(()=>{
        try{
            fetchCategoryProduct()
        }catch(err){
            console.log("error in fetchCategoryProduct inside CategoryList")
        }

    },[])
  return (
    <div className='container mx-auto p-4'>
        <div className='flex items-center gap-4 justify-between overflow-scroll scrollbar-none'>
            {
                loading ? (
                    <div className='w-full h-16 flex justify-center items-center'>
                        <div className='loader'></div>
                    </div>
                ):
                (
                    categoryProduct.map((product,index)=>{
                        return (
                            <Link to={"/product-category?category="+product?.category} className='cursor-pointer'>
                                <div className='md:w-20 w-16 h-16 md:h-20 flex rounded-full overflow-hidden p-3 bg-slate-200 items-center justify-center'>
                                    <img src={product?.productImage[0]} alt={product?.category}
                                        className='h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all'/>
                                </div>
                                <p className='capitalize text-center text-sm md:text-base'>{product.category}</p>
                            </Link>
                        )
                    })
                )
            }
        </div>
    </div>
  )
}

export default CategoryList