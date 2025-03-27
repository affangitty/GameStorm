import React from 'react';
import { CheckCircle, Package, MapPin, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';

const OrderConfirmation = ({ orderDetails }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <CheckCircle className="h-16 w-16 mx-auto text-green-500 mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Order Confirmed!</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Thank you for your purchase. Your order has been successfully placed.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <Package className="mr-2 text-indigo-600" /> Order Details
            </h2>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <div className="mb-2">
                <span className="font-medium">Order Number:</span>
                <span className="ml-2 text-gray-600 dark:text-gray-300">
                  {orderDetails.orderNumber}
                </span>
              </div>
              <div className="mb-2">
                <span className="font-medium">Date:</span>
                <span className="ml-2 text-gray-600 dark:text-gray-300">
                  {new Date(orderDetails.date).toLocaleDateString()}
                </span>
              </div>
              <div>
                <span className="font-medium">Total:</span>
                <span className="ml-2 text-indigo-600 font-bold">
                  ${orderDetails.total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <MapPin className="mr-2 text-indigo-600" /> Shipping Address
            </h2>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <p className="font-medium">{orderDetails.shippingAddress.firstName} {orderDetails.shippingAddress.lastName}</p>
              <p>{orderDetails.shippingAddress.address}</p>
              <p>
                {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state} {' '}
                {orderDetails.shippingAddress.zipCode}
              </p>
              <p>{orderDetails.shippingAddress.country}</p>
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <CreditCard className="mr-2 text-indigo-600" /> Payment Method
          </h2>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <p>
              <span className="font-medium">Card Ending In:</span>
              <span className="ml-2 text-gray-600 dark:text-gray-300">
                **** **** **** {orderDetails.payment.cardNumber.slice(-4)}
              </span>
            </p>
          </div>
        </div>
        
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Purchased Items</h2>
          <div className="space-y-4">
            {orderDetails.items.map((item) => (
              <div 
                key={item.id} 
                className="flex items-center border-b pb-4 last:border-b-0"
              >
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-16 h-16 object-cover rounded mr-4" 
                />
                <div className="flex-grow">
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {item.platform} | Quantity: {item.quantity}
                  </p>
                </div>
                <div className="font-bold">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-8 text-center flex justify-center space-x-4">
          <Link 
            to="/" 
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Continue Shopping
          </Link>
          <Link 
            to={`/feedback/${orderDetails.orderNumber}`} 
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Give Feedback
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;