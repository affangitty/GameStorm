import React, { useState } from 'react';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import AddressForm from '../components/Checkout/AddressForm';
import PaymentForm from '../components/Checkout/PaymentForm';
import OrderConfirmation from '../components/Checkout/OrderConfirmation';

const CheckoutPage = () => {
  const { cart, calculateTotal } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [shippingAddress, setShippingAddress] = useState(null);
  const [paymentData, setPaymentData] = useState(null);

  const orderTotal = calculateTotal();
  const shipping = orderTotal > 50 ? 0 : 5.99;
  const tax = orderTotal * 0.08; // 8% tax
  const finalTotal = orderTotal + shipping + tax;

  const handleAddressSubmit = (addressData) => {
    setShippingAddress(addressData);
    setCurrentStep(2);
  };

  const handlePaymentSubmit = (paymentData) => {
    setPaymentData(paymentData);
    setCurrentStep(3);
  };

  const orderDetails = {
    orderNumber: 'GS-' + Math.floor(Math.random() * 900000 + 100000),
    date: new Date(),
    subtotal: orderTotal,
    shipping: shipping,
    tax: tax,
    total: finalTotal,
    shippingAddress: shippingAddress,
    payment: {
      cardNumber: paymentData?.cardNumber || '4111111111111111'
    },
    items: cart
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Checkout Stepper */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center">
              <ShoppingCart className="h-8 w-8 mr-2 text-indigo-600" />
              <h1 className="text-3xl font-bold">Checkout</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className={`h-2 w-16 rounded ${currentStep >= 1 ? 'bg-indigo-600' : 'bg-gray-300'}`}></div>
              <div className={`h-2 w-16 rounded ${currentStep >= 2 ? 'bg-indigo-600' : 'bg-gray-300'}`}></div>
              <div className={`h-2 w-16 rounded ${currentStep >= 3 ? 'bg-indigo-600' : 'bg-gray-300'}`}></div>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <ShoppingCart className="mr-2 text-indigo-600" /> Order Summary
            </h2>
            <div className="space-y-4">
              {cart.map((item) => (
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
            <div className="mt-4 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${orderTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-indigo-600">
                <span>Total</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Checkout Steps */}
          {currentStep === 1 && (
            <AddressForm onAddressSubmit={handleAddressSubmit} />
          )}

          {currentStep === 2 && (
            <PaymentForm 
              total={finalTotal} 
              onPaymentSubmit={handlePaymentSubmit} 
            />
          )}

          {currentStep === 3 && (
            <OrderConfirmation orderDetails={orderDetails} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;