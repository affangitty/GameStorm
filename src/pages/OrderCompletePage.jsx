import React from 'react';
import { CheckCircle, Home, Package } from 'lucide-react';
import { Link } from 'react-router-dom';

const OrderCompletePage = () => {
  const orderDetails = {
    orderNumber: 'GS-' + Math.floor(Math.random() * 900000 + 100000),
    date: new Date(),
    total: 197.96,
    shippingAddress: {
      firstName: 'John',
      lastName: 'Doe',
      address: '123 Gaming Street',
      city: 'Pixel City',
      state: 'Virtual State',
      zipCode: '12345',
      country: 'United States'
    },
    payment: {
      cardNumber: '4111111111111111'
    },
    items: [
      { 
        id: 1, 
        title: 'Stellar Odyssey', 
        platform: 'PC', 
        price: 59.99, 
        quantity: 2,
        image: '/api/placeholder/100/100'
      },
      { 
        id: 2, 
        title: 'Dragon Age: Rebirth', 
        platform: 'PS5', 
        price: 69.99, 
        quantity: 1,
        image: '/api/placeholder/100/100'
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <CheckCircle className="h-16 w-16 mx-auto text-green-500 mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Order Completed!</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Thank you for your purchase from GameStorm.
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
                <Home className="mr-2 text-indigo-600" /> Shipping Address
              </h2>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <p className="font-medium">
                  {orderDetails.shippingAddress.firstName} {orderDetails.shippingAddress.lastName}
                </p>
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
          
          <div className="mt-8 text-center space-x-4">
            <Link 
              to="/" 
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors inline-flex items-center"
            >
              <Home className="mr-2" />
              Back to Home
            </Link>
            <Link 
              to="/orders" 
              className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-6 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors inline-flex items-center"
            >
              <Package className="mr-2" />
              View Orders
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCompletePage;