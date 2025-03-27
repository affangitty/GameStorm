import React, { useState } from 'react';
import { CreditCard, Lock, ShoppingCart } from 'lucide-react';
import PaymentForm from '../components/Checkout/PaymentForm';
import OrderConfirmation from '../components/Checkout/OrderConfirmation';

const PaymentPage = () => {
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    firstName: 'John',
    lastName: 'Doe',
    address: '123 Gaming Street',
    city: 'Pixel City',
    state: 'Virtual State',
    zipCode: '12345',
    country: 'United States'
  });
  const orderTotal = 197.96; // Example total from cart

  const cartItems = [
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
  ];

  const handlePaymentSubmit = (paymentData) => {
    // In a real app, you'd process payment here
    setIsPaymentComplete(true);
  };

  const orderDetails = {
    orderNumber: 'GS-' + Math.floor(Math.random() * 900000 + 100000),
    date: new Date(),
    total: orderTotal,
    shippingAddress: shippingAddress,
    payment: {
      cardNumber: '4111111111111111'
    },
    items: cartItems
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {!isPaymentComplete ? (
            <div>
              {/* Payment Header */}
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center">
                  <CreditCard className="h-8 w-8 mr-2 text-indigo-600" />
                  <h1 className="text-3xl font-bold">Payment</h1>
                </div>
                <div className="flex items-center space-x-2">
                  <ShoppingCart className="h-6 w-6 text-gray-500" />
                  <Lock className="h-6 w-6 text-gray-500" />
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <ShoppingCart className="mr-2 text-indigo-600" /> Order Summary
                </h2>
                <div className="space-y-4">
                  {cartItems.map((item) => (
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
                        <p className="text-gray-600 dark:text-gray-400">
                          {item.platform} | Quantity: {item.quantity}
                        </p>
                      </div>
                      <div className="font-bold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex justify-between">
                  <span className="font-medium">Total</span>
                  <span className="text-xl font-bold text-indigo-600">${orderTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Payment Form */}
              <PaymentForm 
                total={orderTotal} 
                onPaymentSubmit={handlePaymentSubmit} 
              />
            </div>
          ) : (
            <OrderConfirmation orderDetails={orderDetails} />
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;