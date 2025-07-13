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
    <div className=''>
        {/* grid grid-cols-[repeat(auto-fit,minmax(260px,300px))] */}
        <div className='flex flex-wrap justify-center items-start md:justify-start md:gap-4 overflow-scroll scrollbar-none transition-all' >
                
                { loading ? 
                    (
                        loadingList.map((index)=>{
                            return(
                                <div className='w-full min-w-[280px] md:min-w-[300px] max-w-[280px] md:max-w-[300px] bg-white rounded-sm shadow-md'>
                                    <div className='bg-slate-200 animate-pulse h-60 p-4 min-w-[120px] md:min-w-[145px] flex justify-center items-center'>
                                    </div>
                                    <div className='p-4 grid gap-2'>
                                        <h2 className='bg-slate-200 p-2 animate-pulse w-full rounded-full'></h2>
                                        <p className='bg-slate-200 p-2 animate-pulse w-full rounded-full'></p>
                                        <div className='flex gap-3 '>
                                            <p className='bg-slate-200 p-2 animate-pulse w-full rounded-full'></p>
                                            <p className='bg-slate-200 p-2 animate-pulse w-full rounded-full'></p>
                                        </div>
                                        <button className='p-3 bg-slate-200 rounded-full animate-pulse'></button>
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
                                        className='w-full lg:min-w-[280px] md:min-w-[100px] max-w-[180px] lg:max-w-[300px] bg-white rounded-sm shadow-md'>
                                    <div className='bg-slate-100 p-4 min-w-[80px] md:min-w-[145px] flex justify-center items-center'>
                                        <img src={product?.productImage[0]} 
                                            className='object-scale-down h-28 lg:h-48 hover:scale-110 transition-all mix-blend-multiply'/>
                                    </div>
                                    <div className='p-4 grid gap-2'>
                                        <h2 className='font-medium capitalize text-base lg-text-lg text-ellipsis line-clamp-1'>{product?.productName}</h2>
                                        <p className='capitalize'>{product?.category}</p>
                                        <div className='flex gap-3'>
                                            <p className='text-red-600 font-medium'>{displayINRCurrency(product?.sellingPrice)}</p>
                                            <p className='text-slate-500 line-through text-sm'>{displayINRCurrency(product?.price)}</p>
                                        </div>
                                        <button className='text-sm bg-blue-600 hover:bg-blue-900 text-white py-1 px-2 rounded-full duration-75' onClick={(e)=>{handleAddToCart(e,product?._id)}}>Add to cart</button>
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