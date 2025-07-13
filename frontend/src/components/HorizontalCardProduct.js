import React, { useEffect, useRef, useState,useContext } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayINRCurrency from '../helpers/displayCurrency'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import addToCart from '../helpers/addToCart'
import ProductDetails from '../pages/ProductDetails'
import Context from '../context'

const HorizontalCardProduct = ({category,heading}) => {
    const [data,setData]=useState([])
    const [loading,setLoading] = useState(false)
    const loadingList = new Array(13).fill(null)

    const [scroll,setScroll] = useState(0)
    const scrollElement = useRef()


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
    },[])

    const scrollRight = ()=>{
        scrollElement.current.scrollLeft+=300
    }
    const scrollLeft = ()=>{
        scrollElement.current.scrollLeft-=300
    }
  return (
    <div className='container mx-auto px-4 my-6 relative'>
        <h2 className='text-2xl font-semibold py-4 '>
            {heading}
        </h2>

        <div className='flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all' ref={scrollElement}>
                <button onClick={scrollLeft} className='bg-white rounded-full shadow-md p-1 absolute left-0 text-lg hidden md:block'><FaAngleLeft/></button>
                <button onClick={scrollRight} className='bg-white rounded-full shadow-md p-1 absolute right-0 text-lg hidden md:block'><FaAngleRight/></button>
            {   loading ? 
                (
                    loadingList.map((el)=>{
                        return(
                            <div className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-44 bg-white rounded-lg shadow-md flex'>
                                <div className='bg-slate-200 rounded-lg h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse'>
                                    
                                </div>
                                <div className='p-4 grid gap-2 w-full'>
                                    <h2 className='w-full bg-slate-200 animate-pulse rounded-full'></h2>
                                    <p className='w-full bg-slate-200 animate-pulse rounded-full'></p>
                                    <div className='flex gap-3'>
                                        <p className='w-full bg-slate-200 animate-pulse rounded-full'></p>
                                        <p className='w-full bg-slate-200 animate-pulse rounded-full'></p>
                                    </div>
                                    <button className='py-1 px-2 w-full bg-slate-200 animate-pulse rounded-full'></button>
                                </div>
                            </div>
                        )
                    })
                )
                :
                (
                    data?.map((product,index)=>{
                        return(
                            <Link to={"product/"+product?._id} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-44 bg-white rounded-3xl shadow-md flex'>
                                <div className='bg-slate-100 h-full p-4 min-w-[120px] md:min-w-[145px]'>
                                    <img src={product?.productImage[0]} 
                                        className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply'/>
                                </div>
                                <div className='p-4 grid'>
                                    <h2 className='font-medium capitalize text-base md:text-lg text-ellipsis line-clamp-1'>{product?.productName}</h2>
                                    <p className='capitalize'>{product?.category}</p>
                                    <div className='flx gap-3'>
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

export default HorizontalCardProduct