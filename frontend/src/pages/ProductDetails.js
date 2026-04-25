import React, { useContext, useEffect, useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import SummaryApi from '../common'
import { FaStar, FaStarHalf } from 'react-icons/fa'
import displayINRCurrency from '../helpers/displayCurrency'
import VerticalCardProduct from '../components/VerticalCardProduct'
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay'
import addToCart from '../helpers/addToCart'
import Context from '../context'

const ProductDetails = () => {
  const [data,setData] = useState({
    productName:"",
    brandName:"",
    category:"",
    productImage:[],
    description:"",
    price:"",
    sellingPrice:"",
  })
  const navigate = useNavigate()
  const params = useParams()
  const [loading,setLoading] = useState(false)
  const productImageLoading = new Array(4).fill(null)
  const [activeImage,setActiveImage] = useState("")
  const [zoomImageportion,setZoomImagePortion] = useState({
    x:0,
    y:0,
  })
  const [zoomImage,setZoomImage] = useState(false);
  
  const fetchProductDetails = async()=>{
    try{
      setLoading(true)
      const apiresponse = await fetch(SummaryApi.productDetails.url,{
        method:SummaryApi.productDetails.method,
        headers: {
          "content-type" : "application/json"
        },
        body: JSON.stringify({
          productId: params?.id,
        }),
      })
      setLoading(false)
      const apidata = await apiresponse.json();
      if(apidata.success){
        setData(apidata?.data);
        setActiveImage(apidata?.data?.productImage[0])
      }
    }
    catch(err){
      console.log("error occured in productDetails Page during api call")
    }
  }
  
  useEffect(()=>{
    fetchProductDetails()
  },[params])
  
  const handleMouseHover = (imageUrl)=>{
    setActiveImage(imageUrl)
  }
  
  const handleZoomImage=(e)=>{
    setZoomImage(true)
    const {left,top,width,height} = e.target.getBoundingClientRect()
    const x = (e.clientX-left)/width
    const y = (e.clientY-top)/height
    setZoomImagePortion({x,y})
  }
  
  const handleZoomOutImage=()=>{
    setZoomImage(false);
  }

  const {fetchUserAddToCart} = useContext(Context)
  const handleAddToCart = async(e,id)=>{
    await addToCart(e,id)
    fetchUserAddToCart()
  }
  
  const handleBuyButton = async(e,id)=>{
    await addToCart(e,id)
    fetchUserAddToCart()
    navigate('/cart')
  }
  
  return (
    <div className='container mx-auto px-4 py-4'>
      <div className='relative min-h-[200px] flex flex-col lg:flex-row gap-6 lg:gap-8'>
        {/* product image  */}
        <div className="w-full lg:w-[480px] xl:w-[540px] flex-shrink-0">
          <div className='sticky top-24 flex flex-col gap-4'>
            <div className='h-96 flex gap-3 flex-col lg:flex-row-reverse'>
              <div className='h-[300px] w-full bg-slate-100 dark:bg-dark-hover border-2 dark:border-dark-border lg:h-96 lg:w-96 relative rounded-lg' >
                <img src={activeImage} className='h-full w-full p-3 object-scale-down mix-blend-multiply dark:mix-blend-normal cursor-pointer' onMouseMove={(e)=>handleZoomImage(e)} onMouseLeave={handleZoomOutImage}/>
                {
                  zoomImage && (
                    <div className='hidden lg:block absolute min-w-[500px] min-h-[500px] z-40 bg-slate-200 dark:bg-dark-card p-1 -right-[520px] top-0 overflow-hidden rounded-lg border dark:border-dark-border' >
                      <div className='w-full bg-slate-100 dark:bg-dark-hover mix-blend-multiply dark:mix-blend-normal h-full min-h-[500px] min-w-[500px] scale-150 '
                        style={{
                          backgroundImage: `url(${activeImage})`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: `${zoomImageportion.x*100}% ${zoomImageportion.y*100}%`
                        }}>
                      </div>
                    </div>
                  )
                }
              </div>

              <div className=''>
                {
                  loading ? (
                    <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                      {
                        productImageLoading.map((e1,index)=>{
                          return(
                            <div className='h-28 lg:min-h-16 w-28 lg:min-w-16 bg-slate-200 dark:bg-dark-hover rounded animate-pulse' key={"loadingImage"+index}>
                            </div>
                          )
                        })
                      }
                    </div>
                  ):
                  (
                    <div className='flex w-full cursor-pointer gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                      {
                        data?.productImage?.map((image,index)=>{
                          return(
                            <div className='min-h-24 max-h-24 lg:max-h-24 min-w-20 max-w-20 lg:max-w-20 bg-slate-100 dark:bg-dark-hover border-2 dark:border-dark-border rounded' key={index}>
                              <img onMouseEnter={()=>handleMouseHover(image)} src={image} className='w-full h-full object-scale-down mix-blend-multiply dark:mix-blend-normal'/>
                            </div>
                          )
                        })
                      }
                    </div>
                  )
                }
              </div>
            </div>
          </div>
        </div>
        
        {/* product details */}
        {
          loading? (
            <div className='flex flex-col gap-5 w-full lg:w-1/2'>
              <p className='bg-slate-200 dark:bg-dark-hover h-6 w-full animate-pulse px-2 rounded-full inline-block'></p>
              <h2 className='h-6 w-full bg-slate-200 dark:bg-dark-hover animate-pulse px-2'></h2>
              <p className='h-6 w-full bg-slate-200 dark:bg-dark-hover animate-pulse px-2'></p>
              <div className='flex gap-1 w-full'>
                <p className='bg-slate-200 dark:bg-dark-hover h-6 w-6 animate-pulse'></p>
                <p className='bg-slate-200 dark:bg-dark-hover h-6 w-6 animate-pulse'></p>
                <p className='bg-slate-200 dark:bg-dark-hover h-6 w-6 animate-pulse'></p>
                <p className='bg-slate-200 dark:bg-dark-hover h-6 w-6 animate-pulse'></p>
                <p className='bg-slate-200 dark:bg-dark-hover h-6 w-6 animate-pulse'></p>
              </div>
              <div className='flex items-center gap-2 my-1'>
                <p className='h-6 w-full bg-slate-200 dark:bg-dark-hover animate-pulse px-2'></p>
                <p className='h-6 w-full bg-slate-200 dark:bg-dark-hover animate-pulse px-2'></p>
              </div>
              <div className='flex items-center gap-3 my-2 w-full'>
                <button className='h-6 w-full bg-slate-200 dark:bg-dark-hover animate-pulse px-2'></button>
                <button className='h-6 w-full bg-slate-200 dark:bg-dark-hover animate-pulse px-2'></button>
              </div>
              <div>
                <p className='h-6 w-full bg-slate-200 dark:bg-dark-hover animate-pulse px-2'></p>
                <p className='h-16 w-full bg-slate-200 dark:bg-dark-hover animate-pulse px-2'></p>
              </div>
            </div>
          ):
          (
            <div className='flex flex-col gap-1 w-full lg:w-1/2'>
              <p className='capitalize mt-6 lg:mt-0 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-2 rounded-full inline-block w-fit'>
                {data?.brandName}
              </p>
              <h2 className='capitalize text-2xl lg:text-4xl font-medium dark:text-white'>
                {data?.productName}
              </h2>
              <p className='capitalize text-slate-400 dark:text-gray-500'>
                {data?.category}
              </p>
              <div className='flex gap-1 text-red-600 dark:text-red-400'>
                <FaStar/>
                <FaStar/>
                <FaStar/>
                <FaStar/>
                <FaStarHalf/>
              </div>
              <div className='flex items-center gap-2 text-xl lg:text-2xl my-1 font-semibold'>
                <p className='text-red-600 dark:text-red-400'>{displayINRCurrency(data?.sellingPrice)}</p>
                <p className='text-slate-500 dark:text-gray-500 line-through'>{displayINRCurrency(data?.price)}</p>
              </div>
              <div className='flex items-center gap-3 my-2'>
                <button className='px-3 py-2 font-medium border-2 border-primary-600 dark:border-primary-400 text-primary-600 dark:text-primary-400 hover:text-white hover:bg-primary-700 dark:hover:bg-primary-600 hover:scale-105 transition-all rounded min-w-[120px]' onClick={(e)=>handleBuyButton(e,data?._id)}>Buy</button>
                <button className='px-3 py-2 font-medium border-2 bg-primary-600 dark:bg-primary-500 text-white hover:border-primary-600 dark:hover:border-primary-400 hover:bg-white dark:hover:bg-dark-card hover:text-primary-600 dark:hover:text-primary-400 hover:scale-105 transition-all rounded min-w-[120px]' onClick={(e)=>handleAddToCart(e,data?._id)}>Add To Cart</button>
              </div>
              <div>
                <p className='text-slate-600 dark:text-gray-400 font-medium my-1'>
                  Description:
                </p>
                <p className='dark:text-gray-300'>
                  {data?.description}
                </p>
              </div>
            </div>
          )
        }
      </div>
      {
        data?.category && 
        <CategoryWiseProductDisplay category={`${data?.category}`} heading={"Recommended Products"}/>
      }
    </div>
  )
}

export default ProductDetails
