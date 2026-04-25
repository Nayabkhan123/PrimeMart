import React, { useContext, useEffect, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayINRCurrency from '../helpers/displayCurrency'
import { Link } from 'react-router-dom'
import addToCart from '../helpers/addToCart'
import Context from '../context'
import scrollTop from '../helpers/scrollTop'

const CategoryWiseProductDisplay = ({category,heading}) => {
    const [data,setData]=useState([])
    const [loading,setLoading] = useState(true)
    const loadingList = new Array(13).fill(null)

    const fetchData = async()=>{
        setLoading(true)
        const categoryProduct = await fetchCategoryWiseProduct(category)
        setLoading(false)

        setData(categoryProduct?.data)
    }
    const {fetchUserAddToCart} = useContext(Context)
    
    const handleAddToCart = async(e,id)=>{
        await addToCart(e,id)
        fetchUserAddToCart()  
    }
    useEffect(()=>{
        fetchData()
    },[category])

    
  return (
    <div className='w-full px-0 my-6 relative'>
        <h2 className='text-2xl font-semibold py-4 dark:text-white'>
            {heading}
        </h2>
        {/* <VerticalProduct loading={loading} data={data}/> */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
                
            { loading ? 
                (
                    loadingList.map((index)=>{
                        return(
                            <div className='w-full bg-white dark:bg-dark-card rounded-sm shadow-md dark:shadow-gray-900/50 border dark:border-dark-border'>
                                <div className='bg-slate-200 dark:bg-dark-bg animate-pulse h-44 p-3 flex justify-center items-center'></div>
                                <div className='p-3 grid gap-2'>
                                    <h2 className='bg-slate-200 dark:bg-dark-bg p-2 animate-pulse w-full rounded-full'></h2>
                                    <p className='bg-slate-200 dark:bg-dark-bg p-1.5 animate-pulse w-full rounded-full'></p>
                                    <div className='flex gap-2'>
                                        <p className='bg-slate-200 dark:bg-dark-bg p-1.5 animate-pulse w-full rounded-full'></p>
                                        <p className='bg-slate-200 dark:bg-dark-bg p-1.5 animate-pulse w-full rounded-full'></p>
                                    </div>
                                    <button className='p-2 bg-slate-200 dark:bg-dark-bg rounded-full animate-pulse'></button>
                                </div>
                            </div>
                        )
                    })
                )
                :
                (
                    data.map((product,index)=>{
                        return(
                            <Link to={"/product/"+product?._id}
                                    onClick={scrollTop}
                                    className='w-full bg-white dark:bg-dark-card rounded-sm shadow-md dark:shadow-gray-900/50 border dark:border-dark-border hover:shadow-lg dark:hover:shadow-gray-900/70 transition-all'>
                                <div className='bg-slate-100 dark:bg-dark-bg shadow-sm h-44 p-3 flex justify-center items-center'>
                                    <img src={product?.productImage[0]} 
                                        alt={product?.productName}
                                        className='object-scale-down h-32 hover:scale-110 transition-all mix-blend-multiply dark:mix-blend-normal'/>
                                </div>
                                <div className='p-3 grid gap-2'>
                                    <h2 className='font-medium capitalize text-sm md:text-base text-ellipsis line-clamp-2 dark:text-white'>{product?.productName}</h2>
                                    <p className='capitalize text-xs text-slate-500 dark:text-gray-400'>{product?.category}</p>
                                    <div className='flex flex-col gap-1'>
                                        <p className='text-red-600 dark:text-red-400 font-medium text-base'>{displayINRCurrency(product?.sellingPrice)}</p>
                                        <p className='text-slate-500 dark:text-gray-500 line-through text-xs'>{displayINRCurrency(product?.price)}</p>
                                    </div>
                                    <button className='text-sm bg-primary-600 dark:bg-primary-500 hover:bg-blue-900 dark:hover:bg-primary-600 text-white py-1.5 px-3 rounded-full duration-75' onClick={(e)=>{handleAddToCart(e,product?._id)}}>Add to cart</button>
                                </div>
                            </Link>
                        )
                    })
                )
                
            }
        </div>

        
    </div>
  )
}

export default CategoryWiseProductDisplay
