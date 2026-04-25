import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import moment from 'moment';
import displayINRCurrency from '../helpers/displayCurrency';

export const AllOrders = () => {
  const [data, setData] = useState([]);

  const fetchOrderDetails = async () => {
    try {
      const apiresponse = await fetch(SummaryApi.allOrders.url, {
        method: SummaryApi.allOrders.method,
        credentials: 'include',
      });
      const apidata = await apiresponse.json();
      setData(apidata.data || []);
    } catch (err) {
      console.log('Error while fetching orders', err);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  return (
    <section className="bg-gray-50 dark:bg-dark-bg min-h-screen p-4 md:p-6">
      {/* Header Section */}
      <div className='bg-white dark:bg-dark-card rounded-xl shadow-lg dark:shadow-gray-900/50 p-6 mb-6 border dark:border-dark-border'>
        <div className='flex flex-col items-start gap-2'>
          <h2 className='font-bold text-3xl md:text-4xl text-gray-900 dark:text-white'>All Orders</h2>
          <p className='text-gray-600 dark:text-gray-400'>View and manage customer orders</p>
        </div>
        
        {/* Stats */}
        <div className='mt-6 pt-6 border-t dark:border-dark-border'>
          <div className='flex items-center gap-2 text-gray-700 dark:text-gray-300'>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span className='font-semibold text-lg'>{data.length}</span>
            <span className='text-sm'>Total Orders</span>
          </div>
        </div>
      </div>

      {/* Orders List */}
      {data.length === 0 ? (
        <div className='bg-white dark:bg-dark-card rounded-xl shadow-lg dark:shadow-gray-900/50 p-12 text-center border dark:border-dark-border'>
          <svg className="w-24 h-24 mx-auto text-gray-400 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>No Orders Yet</h3>
          <p className='text-gray-600 dark:text-gray-400'>Orders will appear here once customers make purchases</p>
        </div>
      ) : (
        <div className='space-y-6'>
          {data.map((item, index) => (
            <div key={item._id + index} className="bg-white dark:bg-dark-card rounded-xl shadow-lg dark:shadow-gray-900/50 overflow-hidden border dark:border-dark-border">
              {/* Order Header */}
              <div className='bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 p-4 border-b dark:border-dark-border'>
                <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-2'>
                  <div className='flex items-center gap-3'>
                    <div className='w-10 h-10 rounded-full bg-primary-600 dark:bg-primary-500 flex items-center justify-center text-white font-bold'>
                      #{index + 1}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Order ID: {item._id.slice(-8).toUpperCase()}
                      </h3>
                      <p className='text-sm text-gray-600 dark:text-gray-400'>
                        {moment(item.createdAt).format('MMMM DD, YYYY [at] h:mm A')}
                      </p>
                    </div>
                  </div>
                  <div className='flex items-center gap-2'>
                    <span className='px-4 py-2 rounded-full text-sm font-semibold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'>
                      {item.paymentDetails?.payment_status || 'Pending'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Products */}
                  <div className="flex-1 space-y-4">
                    <h4 className='font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2'>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                      Products ({item?.productDetails.length})
                    </h4>
                    {item?.productDetails.map((product, idx) => (
                      <div
                        key={product.productId + idx}
                        className="flex gap-4 p-4 rounded-lg bg-gray-50 dark:bg-dark-bg border dark:border-dark-border hover:shadow-md dark:hover:shadow-gray-900/50 transition-all"
                      >
                        <img
                          src={product.image[0]}
                          alt={product.name}
                          className="w-20 h-20 object-contain rounded-lg bg-white dark:bg-dark-card p-2 dark:mix-blend-normal"
                        />
                        <div className="flex-1">
                          <h5 className="font-medium text-gray-900 dark:text-white mb-1">{product.name}</h5>
                          <div className="flex flex-wrap items-center gap-3 text-sm">
                            <span className="text-red-600 dark:text-red-400 font-semibold">
                              {displayINRCurrency(product.price)}
                            </span>
                            <span className='text-gray-600 dark:text-gray-400'>×</span>
                            <span className="px-2 py-1 bg-gray-200 dark:bg-dark-card rounded text-gray-700 dark:text-gray-300 font-medium">
                              Qty: {product.quantity}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Payment & Shipping Info */}
                  <div className="lg:w-80 space-y-4">
                    {/* Payment Details */}
                    <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                      <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-3 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                        Payment Details
                      </h4>
                      <div className='space-y-2 text-sm'>
                        <div className='flex justify-between'>
                          <span className="text-gray-600 dark:text-gray-400">Method:</span>
                          <span className='font-medium text-gray-900 dark:text-white'>
                            {item.paymentDetails?.payment_method_type?.[0] || 'N/A'}
                          </span>
                        </div>
                        <div className='flex justify-between'>
                          <span className="text-gray-600 dark:text-gray-400">Status:</span>
                          <span className='font-medium text-gray-900 dark:text-white'>
                            {item.paymentDetails?.payment_status || 'N/A'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Shipping Details */}
                    <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
                      <h4 className="font-semibold text-purple-900 dark:text-purple-300 mb-3 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                        </svg>
                        Shipping Details
                      </h4>
                      {item.shipping_options.map((shipping) => (
                        <div key={shipping.shipping_rate} className='text-sm'>
                          <div className='flex justify-between'>
                            <span className="text-gray-600 dark:text-gray-400">Shipping:</span>
                            <span className='font-medium text-gray-900 dark:text-white'>
                              {displayINRCurrency(shipping.shipping_amount)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Total */}
                    <div className="p-4 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-300 dark:border-green-700">
                      <div className='flex justify-between items-center'>
                        <span className="font-semibold text-gray-700 dark:text-gray-300">Order Total:</span>
                        <span className="text-2xl font-bold text-green-700 dark:text-green-400">
                          {displayINRCurrency(item.totalAmount)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

