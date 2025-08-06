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
    <section className="p-4 w-full max-w-7xl mx-auto">
      {data.length === 0 ? (
        <p className="text-center text-lg text-slate-500 py-10">No Orders Available</p>
      ) : (
        data.map((item, index) => (
          <div key={item._id + index} className="mb-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-2">
              Order Date: {moment(item.createdAt).format('LLLL')}
            </h2>
            <div className="bg-white shadow rounded-lg p-4">
              <div className="flex flex-col lg:flex-row lg:justify-between gap-6">
                {/* Products */}
                <div className="flex flex-col gap-4 w-full lg:w-3/5">
                  {item?.productDetails.map((product, idx) => (
                    <div
                      key={product.productId + idx}
                      className="flex gap-4 border p-3 rounded-md hover:shadow"
                    >
                      <img
                        src={product.image[0]}
                        alt={product.name}
                        className="max-w-24 max-h-24 min-w-24 min-h-24 shadow-lg object-contain p-2 rounded"
                      />
                      <div className="flex flex-col justify-center">
                        <h3 className="font-medium text-lg line-clamp-1">{product.name}</h3>
                        <div className="flex gap-4 text-slate-600 mt-1">
                          <span className="text-red-600 font-semibold">
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
                  <div className="border p-4 rounded-md bg-slate-50">
                    <h4 className="font-semibold mb-2 text-slate-700">Payment Details</h4>
                    <p>
                      <span className="font-medium">Method:</span>{' '}
                      {item.paymentDetails?.payment_method_type?.[0] || 'N/A'}
                    </p>
                    <p>
                      <span className="font-medium">Status:</span>{' '}
                      {item.paymentDetails?.payment_status || 'N/A'}
                    </p>
                  </div>

                  <div className="border p-4 rounded-md bg-slate-50">
                    <h4 className="font-semibold mb-2 text-slate-700">Shipping Details</h4>
                    {item.shipping_options.map((shipping) => (
                      <p key={shipping.shipping_rate}>
                        <span className="font-medium">Shipping Amount:</span>{' '}
                        {displayINRCurrency(shipping.shipping_amount)}
                      </p>
                    ))}
                  </div>

                  <div className="mt-auto text-right font-semibold text-lg text-green-700">
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
