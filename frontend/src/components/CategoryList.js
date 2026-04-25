import React, { useEffect, useState, useMemo, useCallback } from 'react'
import SummaryApi from '../common';
import { Link } from 'react-router-dom';

// Cache for category data
let cachedCategoryData = null;
let cacheTimestamp = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const CategoryList = React.memo(() => {
    const [categoryProduct, setCategoryProduct] = useState(cachedCategoryData || []);
    const [loading, setLoading] = useState(false)
    
    const categoryList = useMemo(() => new Array(13).fill(null), [])
    
    const fetchCategoryProduct = useCallback(async() => {
        // Check if we have valid cached data
        const now = Date.now();
        if (cachedCategoryData && cacheTimestamp && (now - cacheTimestamp) < CACHE_DURATION) {
            setCategoryProduct(cachedCategoryData);
            return;
        }
        
        try{
            setLoading(true)
            const apiresponse = await fetch(SummaryApi.categoryProduct.url)
            const apidata = await apiresponse.json()
            setLoading(false)
            
            if (apidata.data) {
                // Update cache
                cachedCategoryData = apidata.data;
                cacheTimestamp = Date.now();
                setCategoryProduct(apidata.data);
            }
        }
        catch(err){
            console.log("error while fetching category product")
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchCategoryProduct()
    }, [fetchCategoryProduct])

    return (
        <div className='container mx-auto p-4'>
            <div className='flex items-center gap-4 justify-between overflow-scroll scrollbar-none'>
                {loading && !cachedCategoryData ? (
                    categoryList.map((_, index) => (
                        <div key={index} className='cursor-pointer animate-pulse'>
                            <div className='animate-pulse md:w-20 w-16 h-16 md:h-20 flex rounded-full overflow-hidden p-3 bg-slate-200 dark:bg-dark-hover'>
                                <div className='animate-pulse h-full transition-all'/>
                            </div>
                            <p className='animate-pulse'></p>
                        </div>
                    ))
                ) : (
                    categoryProduct.map((product, index) => (
                        <Link key={product._id || index} to={`/product-category?category=${product?.category}`} className='cursor-pointer group'>
                            <div className='md:w-20 w-16 h-16 md:h-20 flex rounded-full overflow-hidden p-3 bg-slate-100 dark:bg-dark-card border-[0.1px] border-slate-200 dark:border-dark-border items-center justify-center hover:shadow-lg dark:hover:shadow-gray-900/50 transition-all duration-200 group-hover:scale-110'>
                                <img 
                                    src={product?.productImage[0]} 
                                    alt={product?.category}
                                    loading="lazy"
                                    className='h-full object-scale-down mix-blend-multiply dark:mix-blend-normal scale-125 md:scale-105 md:group-hover:scale-125 transition-all'
                                />
                            </div>
                            <p className='capitalize text-center text-sm md:text-base dark:text-white mt-2'>{product.category}</p>
                        </Link>
                    ))
                )}
            </div>
        </div>
    )
})

CategoryList.displayName = 'CategoryList'

export default CategoryList
