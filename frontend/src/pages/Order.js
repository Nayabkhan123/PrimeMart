import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import moment from 'moment';
import displayINRCurrency from '../helpers/displayCurrency';

const Order = () => {
  const [data, setData] = useState([]);

  const fetchOrderDetails = async () => {
    try {
      const apiresponse = await fetch(SummaryApi.getOrder.url, {
        method: SummaryApi.getOrder.method,
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
    <section className="p-4 w-full max-w-7xl mx-auto">
      {data.length === 0 ? (
        <p className="text-center text-lg text-slate-500 dark:text-gray-400 py-10">No Orders Available</p>
      ) : (
        data.map((item, index) => (
          <div key={item._id + index} className="mb-6">
            <h2 className="text-md md:text-xl font-semibold text-slate-800 dark:text-white mb-2">
              Order Date: {moment(item.createdAt).format('LLLL')}
            </h2>
            <div className="bg-white dark:bg-dark-card shadow rounded-lg p-4">
              <div className="flex flex-col lg:flex-row lg:justify-between gap-6">
                {/* Products */}
                <div className="flex flex-col gap-4 w-full lg:w-3/5">
                  {item?.productDetails.map((product, idx) => (
                    <div
                      key={product.productId + idx}
                      className="flex gap-4 border dark:border-dark-border p-3 rounded-md hover:shadow dark:hover:shadow-gray-900/50 bg-white dark:bg-dark-bg"
                    >
                      <img
                        src={product.image[0]}
                        alt={product.name}
                        className="max-w-24 max-h-24 min-w-24 min-h-24 object-contain shadow-lg dark:shadow-gray-900/50 p-2 rounded bg-white dark:bg-dark-card dark:mix-blend-normal"
                      />
                      <div className="flex flex-col justify-center">
                        <h3 className="font-medium line-clamp-2 md:line-clamp-1 text-md md:text-lg dark:text-white">{product.name}</h3>
                        <div className="flex gap-4 text-slate-600 dark:text-gray-400 mt-1">
                          <span className="text-red-600 dark:text-red-400 font-semibold">
                            {displayINRCurrency(product.price)}
                          </span>
                          <span>Qty: {product.quantity}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Payment & Shipping */}
                <div className="flex flex-col gap-4 lg:w-2/5">
                  <div className="border dark:border-dark-border p-4 rounded-md bg-slate-50 dark:bg-dark-bg">
                    <h4 className="font-semibold mb-2 text-slate-700 dark:text-white">Payment Details</h4>
                    <p className='dark:text-gray-400'>
                      <span className="font-medium dark:text-gray-300">Method:</span>{' '}
                      {item.paymentDetails?.payment_method_type?.[0] || 'N/A'}
                    </p>
                    <p className='dark:text-gray-400'>
                      <span className="font-medium dark:text-gray-300">Status:</span>{' '}
                      {item.paymentDetails?.payment_status || 'N/A'}
                    </p>
                  </div>

                  <div className="border dark:border-dark-border p-4 rounded-md bg-slate-50 dark:bg-dark-bg">
                    <h4 className="font-semibold mb-2 text-slate-700 dark:text-white">Shipping Details</h4>
                    {item.shipping_options.map((shipping) => (
                      <p key={shipping.shipping_rate} className='dark:text-gray-400'>
                        <span className="font-medium dark:text-gray-300">Shipping Amount:</span>{' '}
                        {displayINRCurrency(shipping.shipping_amount)}
                      </p>
                    ))}
                  </div>

                  <div className="mt-auto text-right font-semibold text-lg text-green-700 dark:text-green-400">
                    Total: {displayINRCurrency(item.totalAmount)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </section>
  );
};

export default Order;

