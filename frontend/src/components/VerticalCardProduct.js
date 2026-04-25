import React, { useEffect, useRef, useState, useContext, useMemo, useCallback } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayINRCurrency from '../helpers/displayCurrency'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import addToCart from '../helpers/addToCart'
import Context from '../context'

const VerticalCardProduct = React.memo(({category, heading}) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const scrollElement = useRef()
    const {fetchUserAddToCart} = useContext(Context)

    const loadingList = useMemo(() => new Array(13).fill(null), [])

    const fetchData = useCallback(async() => {
        setLoading(true)
        const categoryProduct = await fetchCategoryWiseProduct(category)
        setLoading(false)
        setData(categoryProduct?.data)
    }, [category])

    const handleAddToCart = useCallback(async(e, id) => {
        await addToCart(e, id)
        fetchUserAddToCart()  
    }, [fetchUserAddToCart])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    const scrollRight = useCallback(() => {
        scrollElement.current.scrollLeft += 300
    }, [])
    
    const scrollLeft = useCallback(() => {
        scrollElement.current.scrollLeft -= 300
    }, [])

    return (
        <div className='container mx-auto px-4 my-6 relative'>
            <h2 className='text-2xl font-semibold py-4 dark:text-white'>{heading}</h2>

            <div className='flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all' ref={scrollElement}>
                <button onClick={scrollLeft} className='bg-white dark:bg-dark-card rounded-full shadow-lg dark:shadow-gray-900/50 p-1 absolute left-0 text-lg hidden md:block hover:scale-110 transition-transform z-10 dark:text-white'><FaAngleLeft/></button>
                <button onClick={scrollRight} className='bg-white dark:bg-dark-card rounded-full shadow-lg dark:shadow-gray-900/50 p-1 absolute right-0 text-lg hidden md:block hover:scale-110 transition-transform z-10 dark:text-white'><FaAngleRight/></button>
                
                {loading ? (
                    loadingList.map((_, index) => (
                        <div key={index} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white dark:bg-dark-card rounded-lg shadow-md dark:shadow-gray-900/50'>
                            <div className='bg-slate-200 dark:bg-dark-hover animate-pulse h-60 p-4 min-w-[120px] md:min-w-[145px] flex justify-center items-center rounded-t-lg'></div>
                            <div className='p-4 grid gap-2'>
                                <h2 className='bg-slate-200 dark:bg-dark-hover p-2 animate-pulse w-full rounded-full'><span className="sr-only">Loading</span></h2>
                                <p className='bg-slate-200 dark:bg-dark-hover p-2 animate-pulse w-full rounded-full'></p>
                                <div className='flex gap-3'>
                                    <p className='bg-slate-200 dark:bg-dark-hover p-2 animate-pulse w-full rounded-full'></p>
                                    <p className='bg-slate-200 dark:bg-dark-hover p-2 animate-pulse w-full rounded-full'></p>
                                </div>
                                <button className='p-3 bg-slate-200 dark:bg-dark-hover rounded-full animate-pulse'></button>
                            </div>
                        </div>
                    ))
                ) : (
                    data?.map((product) => (
                        <Link to={`/product/${product._id}`} key={product._id} className='w-full min-w-[200px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white dark:bg-dark-card rounded-lg shadow-md dark:shadow-gray-900/50 hover:shadow-xl dark:hover:shadow-gray-900/70 transition-all duration-200 hover:scale-[1.02] border dark:border-dark-border overflow-hidden'>
                            <div className='bg-slate-200 dark:bg-dark-hover h-60 p-4 min-w-[120px] md:min-w-[145px] flex justify-center items-center overflow-hidden'>
                                <img 
                                    src={product?.productImage[0]} 
                                    alt={product?.productName}
                                    loading="lazy"
                                    className='object-contain max-h-full max-w-full hover:scale-110 transition-all mix-blend-multiply dark:mix-blend-normal'
                                />
                            </div>
                            <div className='p-4 grid gap-2'>
                                <h2 className='font-medium capitalize text-base text-ellipsis line-clamp-2 dark:text-white'>{product?.productName}</h2>
                                <p className='capitalize text-sm text-gray-600 dark:text-gray-400'>{product?.brandName}</p>
                                <div className='flex gap-3 items-center'>
                                    <p className='text-red-600 dark:text-red-400 font-medium text-lg'>{displayINRCurrency(product?.sellingPrice)}</p>
                                    <p className='text-slate-500 dark:text-gray-500 line-through text-sm'>{displayINRCurrency(product?.price)}</p>
                                </div>
                                <button 
                                    className='text-sm bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white py-2 px-3 rounded-full duration-75 hover:scale-105 hover:shadow-lg font-medium' 
                                    onClick={(e) => handleAddToCart(e, product._id)}
                                >
                                    Add to cart
                                </button>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    )
})

VerticalCardProduct.displayName = 'VerticalCardProduct'

export default VerticalCardProduct
