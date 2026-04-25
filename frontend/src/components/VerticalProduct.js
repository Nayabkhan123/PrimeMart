import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import displayINRCurrency from '../helpers/displayCurrency'
import scrollTop from '../helpers/scrollTop'
import Context from '../context'
import addToCart from '../helpers/addToCart'

const VerticalProduct = ({loading,data=[]}) => {
    const loadingList = new Array(13).fill(null)
    const {fetchUserAddToCart} = useContext(Context)
            
    const handleAddToCart = async(e,id)=>{
        await addToCart(e,id)
        fetchUserAddToCart()  
    }
    return (
    <div className='w-full'>
        {/* grid grid-cols-[repeat(auto-fit,minmax(260px,300px))] */}
        <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4' >
                
                { loading ? 
                    (
                        loadingList.map((product,index)=>{
                            return(
                                <div key={index} className='w-full bg-white dark:bg-dark-card rounded-sm shadow-md dark:shadow-gray-900/50 border dark:border-dark-border'>
                                    <div className='bg-slate-200 dark:bg-dark-bg animate-pulse h-48 p-4 flex justify-center items-center'>
                                    </div>
                                    <div className='p-4 grid gap-2'>
                                        <h2 className='bg-slate-200 dark:bg-dark-bg p-2 animate-pulse w-full rounded-full'></h2>
                                        <p className='bg-slate-200 dark:bg-dark-bg p-2 animate-pulse w-full rounded-full'></p>
                                        <div className='flex gap-3 '>
                                            <p className='bg-slate-200 dark:bg-dark-bg p-2 animate-pulse w-full rounded-full'></p>
                                            <p className='bg-slate-200 dark:bg-dark-bg p-2 animate-pulse w-full rounded-full'></p>
                                        </div>
                                        <button className='p-3 bg-slate-200 dark:bg-dark-bg rounded-full animate-pulse'></button>
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
                                        key={product?._id}
                                        onClick={scrollTop}
                                        className='w-full bg-white dark:bg-dark-card rounded-sm shadow-md dark:shadow-gray-900/50 border dark:border-dark-border hover:shadow-lg dark:hover:shadow-gray-900/70 transition-all'>
                                    <div className='bg-slate-100 dark:bg-dark-bg h-48 p-2 flex justify-center items-center'>
                                        <img src={product?.productImage[0]} 
                                            className='object-scale-down h-full w-full hover:scale-110 transition-all mix-blend-multiply dark:mix-blend-normal'/>
                                    </div>
                                    <div className='p-3 grid gap-2'>
                                        <h2 className='font-medium capitalize text-sm md:text-base text-ellipsis line-clamp-2 dark:text-white'>{product?.productName}</h2>
                                        <p className='capitalize text-xs md:text-sm dark:text-gray-400'>{product?.category}</p>
                                        <div className='flex flex-col md:flex-row gap-1 md:gap-3'>
                                            <p className='text-red-600 dark:text-red-400 font-medium text-sm md:text-base'>{displayINRCurrency(product?.sellingPrice)}</p>
                                            <p className='text-slate-500 dark:text-gray-500 line-through text-xs md:text-sm'>{displayINRCurrency(product?.price)}</p>
                                        </div>
                                        <button className='text-xs md:text-sm bg-primary-600 dark:bg-primary-500 hover:bg-blue-900 dark:hover:bg-primary-600 text-white py-1 px-2 rounded-full duration-75' onClick={(e)=>{handleAddToCart(e,product?._id)}}>Add to cart</button>
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

export default VerticalProduct
