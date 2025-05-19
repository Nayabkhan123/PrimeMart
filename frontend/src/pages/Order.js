import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import moment from 'moment'
import displayINRCurrency from '../helpers/displayCurrency';
const Order = () => {
  const [data,setData] = useState([]);
  const fetchOrderDetails = async()=>{
    try{
      const apiresponse = await fetch(SummaryApi.getOrder.url,{
        method:SummaryApi.getOrder.method,
        credentials:'include'
      })
      const apidata = await apiresponse.json()
      console.log("first",apidata)
      setData(apidata.data)
    }catch(err){
      console.log("Error while fetching orders", err)
    }

  }
  useEffect(()=>{
    fetchOrderDetails()
  },[])
  console.log("first",data)
  return (
    <div>
      {
        data.length===0 && (
          <p>No Order Available</p>
        )
      }
      <div className='p-4 w-full max-w-full bg-slate-100'>
        {
          data.map((item,index)=>{
            return(
              <div>
                <div><p className='font-medium text-lg'>{moment(item.createdAt).format('LL')}</p></div>
                <div key={item.userid+index} className='bg-slate-200 p-4'>
                  
                  <div className='border rounded'>
                    <div className='flex justify-between flex-col lg:flex-row'>
                      <div className='grid gap-1 w-full'>
                        {
                          item?.productDetails.map((product,index)=>{
                            return (
                              <div key={product.productId+index} className='flex gap-3 lg:w-4/5 bg-slate-200'>
                                <img
                                  src={product.image[0]}
                                  className='w-28 h-28 bg-white object-scale-down p-2'
                                />
                                <div>
                                  <div className='font-medium text-lg text-ellipsis line-clamp-1'>{product.name}</div>
                                  <div className='flex mt-1 items-center gap-5'>
                                    <div className='text-lg text-red-600 '>{displayINRCurrency(product.price)}</div>
                                    <p>Quantity: {product.quantity}</p>
                                  </div>
                                </div>
                              </div>
                            )
                          })
                        }
                      </div>
                      <div className='flex flex-col gap-4 p-2 w-fit itemsend justify-center'>
                        <div className=''>
                          <div className='text-lg font-medium'>Payment Details : </div>
                          <p className='ml-1'>Payment method : <span>{item.paymentDetails.payment_method_type[0]}</span></p>
                          <p className='ml-1'>Payment status : {item.paymentDetails.payment_status}</p>
                        </div>
                        <div>
                          <div className='text-lg font-medium'>Shipping Details</div>
                          {
                            item.shipping_options.map((shipping,index)=>{
                              return (
                                <div key={shipping.shipping_rate} className='ml-1'>
                                  Shipping Amount : {shipping.shipping_amount}
                                </div>
                              )
                            })
                          }
                        </div>
                      </div>
                    </div>

                    <div className='font-semibold ml-auto w-fit text-lg'>
                      Total Amount : {item.totalAmount}
                    </div>
                  </div>
                </div> 
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Order