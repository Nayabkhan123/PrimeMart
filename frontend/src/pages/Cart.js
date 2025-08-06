import React, { useState, useEffect, useContext } from 'react'
import SummaryApi from '../common'
import Context from '../context'
import { FaMinus, FaPlus } from 'react-icons/fa'
import { MdDelete } from "react-icons/md";
import displayINRCurrency from '../helpers/displayCurrency'
import { toast } from 'react-toastify'
import { loadStripe } from '@stripe/stripe-js'
import noItemsFound from '../assest/no-items-found.webp'

const Cart = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const context = useContext(Context)
  const loadingCart = new Array(context.countTotalCartProducts).fill(null)

  const fetchCartData = async () => {
    try {
      const apiresponse = await fetch(SummaryApi.addToCartProductView.url, {
        method: SummaryApi.addToCartProductView.method,
        credentials: `include`,
        headers: {
          "content-type": "application/json",
        }
      })
      const apidata = await apiresponse.json()
      if (apidata.success) {
        setData(apidata.data)
      }
    } catch (err) {
      console.log("Error while fetching cart data")
    }
  }

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true)
      await fetchCartData()
      setLoading(false)
    }
    fetchCart()
  }, [])

  const changeQty = async (id, qty, sign) => {
    const quantity = sign === "plus" ? qty + 1 : qty - 1
    try {
      const apiresponse = await fetch(SummaryApi.updateCartProduct.url, {
        method: SummaryApi.updateCartProduct.method,
        credentials: `include`,
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          quantity,
          id,
        })
      })
      const apidata = await apiresponse.json()
      if (apidata.success) {
        fetchCartData()
      }
    } catch (err) {
      console.log("Error while changing quantity")
    }
  }

  const increaseQty = (id, qty) => {
    changeQty(id, qty, "plus")
  }

  const decreaseQty = async (id, qty) => {
    if (qty > 1) {
      changeQty(id, qty, "minus")
    } else {
      try {
        const apiresponse = await fetch(SummaryApi.removeProductCart.url, {
          method: SummaryApi.removeProductCart.method,
          credentials: `include`,
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify({ productId: id })
        })
        const apidata = await apiresponse.json()
        if (apidata.success) {
          fetchCartData()
          context.fetchUserAddToCart()
          toast.success("Item Removed Successfully")
        }
      } catch (err) {
        console.log("Error while removing product from cart")
      }
    }
  }

  const handlePayment = async () => {
    const stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)
    const apiresponse = await fetch(SummaryApi.payment.url, {
      method: SummaryApi.payment.method,
      credentials: 'include',
      headers: {
        "content-type": 'application/json',
      },
      body: JSON.stringify({ cartItems: data })
    })
    const apidata = await apiresponse.json()
    if (apidata?.id) {
      stripePromise.redirectToCheckout({ sessionId: apidata.id })
    }
  }

  const totalQty = data.reduce((prev, curr) => prev + curr?.quantity, 0)
  const totalValue = data.reduce((prev, curr) =>
    prev + (curr?.quantity) * curr?.productId?.sellingPrice, 0)

  return (
    <div className="container mx-auto min-h-screen px-4 py-6">
      {
        data.length === 0 && !loading && (
          <div className="flex flex-col items-center justify-center h-[calc(100vh-120px)] text-center">
            <img src={noItemsFound} alt="No items" className="w-40 h-40 object-contain mb-4" />
            <p className="font-bold text-xl md:text-2xl">No Items Found</p>
          </div>
        )
      }

      {data.length > 0 && (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Cart Items */}
          <div className="flex-1">
            {loading ? (
              loadingCart.map((_, idx) => (
                <div key={idx} className="w-full bg-slate-200 h-32 mb-4 rounded animate-pulse"></div>
              ))
            ) : (
              data.map(product => (
                <div
                  key={product._id}
                  className="flex flex-col sm:flex-row bg-white rounded border border-slate-300 mb-4 p-3"
                >
                  <div className="w-full sm:w-32 h-32 bg-slate-100 flex-shrink-0 flex justify-center items-center">
                    <img
                      src={product?.productId?.productImage[0]}
                      alt={product?.productId?.productName}
                      className="h-full object-contain mix-blend-multiply"
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 sm:justify-between sm:items-center flex-1 sm:pl-4 mt-4 sm:mt-0">
                    <div className="flex-1 mb-4 sm:mb-0">
                      <h2 className="text-base md:text-lg font-semibold line-clamp-1">{product?.productId?.productName}</h2>
                      <p className="text-slate-500">{product?.productId?.category}</p>
                      <p className="text-slate-500">{displayINRCurrency(product?.productId?.sellingPrice)}</p>
                    </div>
                    <div className="flex flex-row-reverse items-center gap-4">
                      <div className="flex sm:flex-col-reverse items-center justify-between w-full gap-3">
                        <p className="text-blue-700 font-semibold">
                          {displayINRCurrency(product?.productId?.sellingPrice * product?.quantity)}
                        </p>
                        <div className='flex items-center gap-2'>
                          <button
                            onClick={() => decreaseQty(product._id, product.quantity)}
                            className={`border rounded-full p-2 ${product.quantity === 1 ? 'text-red-600 border-red-600 hover:bg-red-600 hover:text-white' : 'text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white'}`}
                          >
                            {product.quantity === 1 ? <MdDelete /> : <FaMinus />}
                          </button>
                          <span className="font-medium">{product.quantity}</span>
                          <button
                            onClick={() => increaseQty(product._id, product.quantity)}
                            className="border border-blue-600 text-blue-600 rounded-full p-2 hover:bg-blue-600 hover:text-white"
                          >
                            <FaPlus />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Summary */}
          <div className="w-full lg:w-80 flex-shrink-0">
            {loading ? (
              <div className="h-40 bg-slate-200 rounded animate-pulse"></div>
            ) : (
              <div className="bg-slate-100 p-4 rounded shadow">
                <h2 className="text-lg font-bold mb-4">Order Summary</h2>
                <div className="flex justify-between mb-2">
                  <span className="text-slate-600">Items</span>
                  <span className="text-slate-700 font-medium">{totalQty}</span>
                </div>
                <div className="flex justify-between mb-4">
                  <span className="text-slate-600">Total</span>
                  <span className="text-slate-700 font-semibold">{displayINRCurrency(totalValue)}</span>
                </div>
                <button
                  onClick={handlePayment}
                  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
                >
                  Proceed to Payment
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
