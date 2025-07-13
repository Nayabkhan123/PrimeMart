import React,{useState,useEffect,useContext} from 'react'
import SummaryApi from '../common'
import Context from '../context'
import { FaMinus, FaPlus } from 'react-icons/fa'
import { MdDelete } from "react-icons/md";
import displayINRCurrency from '../helpers/displayCurrency'
import { toast } from 'react-toastify'
import {loadStripe} from '@stripe/stripe-js'
import noItemsFound from '../assest/no-items-found.webp'

const Cart = () => {
  const [data,setData] = useState([])
  const [loading,setLoading] = useState(false)
  const context = useContext(Context)
  const loadingCart = new Array (context.countTotalCartProducts).fill(null)
  const fetchCartData = async()=>{
    try{
      
      const apiresponse = await fetch(SummaryApi.addToCartProductView.url,{
        method:SummaryApi.addToCartProductView.method,
        credentials: `include`,
        headers:{
          "content-type":"application/json",
        }
      })
      
      const apidata = await apiresponse.json()
      
      if(apidata.success){
        setData(apidata.data)
      }
      console.log("abhiiiiiiiiiiiiiiii", apidata.data)
    }catch(err){
      console.log("Error while fetching cart data")
    }
  }
  useEffect(()=>{
    const fetchCart = async()=>{
      setLoading(true)
      await fetchCartData()
      setLoading(false)
    }
    fetchCart()
    
  },[])
  const changeQty = async(id,qty,sign)=> {
    const quantity = sign==="plus"? (qty+1) : (qty-1)
    try{
      const apiresponse = await fetch(SummaryApi.updateCartProduct.url,{
        method: SummaryApi.updateCartProduct.method,
        credentials: `include`,
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          quantity: quantity,
          id: id,
        })
      })
      const apidata = await apiresponse.json()
      if(apidata.success){
        fetchCartData()
      }
    }
    catch(err){
      console.log("Error while increasing product quantity")
    }
  }
  const increaseQty = async(id,qty)=>{
    changeQty(id,qty,"plus")
  }
  const decreaseQty = async(id,qty)=>{
    if(qty>1)
    changeQty(id,qty,"minus")
    else{
      try{
        const apiresponse = await fetch(SummaryApi.removeProductCart.url,{
          method: SummaryApi.removeProductCart.method,
          credentials: `include`,
          headers:{
            "content-type": "application/json"
          },
          body: JSON.stringify({
            productId: id
          })
        })
        const apidata = await apiresponse.json()

        if(apidata.success){
          fetchCartData()
          context.fetchUserAddToCart()
          toast.success("Item Removed Successfully")
        } 
      }catch(err){
        console.log("Error while removing the product from cart")
      }
    }

  }

  const handlePayment = async()=>{
    // console.log("key",process.env.REACT_APP_STRIPE_PUBLIC_KEY)
    const stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)

    const apiresponse = await fetch(SummaryApi.payment.url,{
      method:SummaryApi.payment.method,
      credentials:'include',
      headers:{
        "content-type": 'application/json',
      },
      body: JSON.stringify({
        cartItems : data
      })
    })
    const apidata = await apiresponse.json()

    if(apidata?.id){
      stripePromise.redirectToCheckout({sessionId :apidata.id})
    }
    console.log("payment response", apidata)
  }
  const totalQty = data.reduce((prevVal,currVal)=>prevVal+currVal?.quantity,0)
  const totalValue = data.reduce((prevVal,currVal)=>prevVal+(currVal?.quantity)*currVal?.productId?.sellingPrice,0)

  console.log("totalQty",totalValue)
  return (
    <div className="container mx-auto">
      <div className={`${data?.length ? 'h-full' : 'h-[calc(100vh-115px)]'}`}>
        {
          data.length === 0 && !loading && (
            <div className='flex items-center justify-center flex-col h-full'>
            <img className='' src={noItemsFound} height={200} width={200}/>
            <p className="font-bold text-2xl py-2">No Data</p>
            </div>
          )
        }
      </div>
      <div className="flex flex-col lg:flex-row gap-8 lg:justify-between p-4">
        <div className="w-full max-w-3xl my-2">
          {
            loading ? (
              loadingCart.map((el,index)=>{
                return (
                  <div key={index+"Add To Cart Loading"} className="w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse">
                  </div>
                )
              })
            ):(
                data?.map((product,index)=>{
                    return(
                      <div key={product?._id+"Add To Cart Loading"} className="w-full bg-white h-32 my-2 border border-slate-300 rounded grid grid-cols-[128px,1fr]">
                        <div className="h-32 w-28 bg-slate-200">
                          <img src={product?.productId?.productImage[0]} className="w-full h-full object-scale-down mix-blend-multiply"/>
                        </div>
                        <div className="p-4 flex justify-between">
                          <div>
                            <h2 className="text-base lg:text-xl text-ellipsis line-clamp-1">{product?.productId?.productName}</h2>
                            <p className="capitalize text-slate-500">{product?.productId?.category}</p>
                            <p className="text-blue-700">{displayINRCurrency(product?.productId?.sellingPrice)}</p>                          
                          </div>
                          <div className="flex flex-col gap-4 items-center justify-center ">
                            <div className='flex gap-4'>
                              <button className={`border rounded-full p-1 ${product?.quantity===1 ?'text-red-700 hover:bg-red-700 border-red-700 scale-105' :'text-blue-700 hover:bg-blue-700 border-blue-700'}  hover:text-white`} onClick={()=>decreaseQty(product?._id,product?.quantity)}>
                                {
                                  (product?.quantity)==1?(<MdDelete/>) : (<FaMinus/>)
                                }
                              </button>
                              <span>{product?.quantity}</span>
                              <button className="border border-blue-700 rounded-full p-1 text-blue-700 hover:bg-blue-700 hover:text-white" onClick={()=>increaseQty(product?._id,product?.quantity)}><FaPlus/></button>
                            </div>
                            <p className="text-slate-500">{displayINRCurrency((product?.productId?.sellingPrice) * product?.quantity)}</p>

                          </div>
                        </div>
                      </div>
                    )
                })
            )
          }
        </div>
        {/* Total Summary  */}
        {
          data?.length ? (
            <div className="mt-5 lg:mt-4 w-full max-w-sm">
              {
                loading ? (
                  <div className="h-36 bg-slate-200 border border-slate-300 animate-pulse">
                  </div>
                ):(
                  <div className="h-36 bg-slate-200 rounded-lg">
                    <h2 className='text-white rounded-lg bg-slate-600 px-4 py-1 font-bold text-xl'>Summary</h2>
                    <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                      <p>Quantity</p>
                      <p>{totalQty}</p>
                    </div>
                    <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                      <p>Total Amount</p>
                      <p>{displayINRCurrency(totalValue)}</p>
                    </div>
                    <button className='bg-blue-600 rounded-lg py-2 text-white w-full mt-6' onClick={handlePayment}>Payment</button>
                  </div>
                )
              }
            </div>
          ):(
            <div></div>
          )
        }
        
      </div>
    </div>
  )
}

export default Cart