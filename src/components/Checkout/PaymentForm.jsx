import React, { useState } from 'react';
import { CreditCard, Lock } from 'lucide-react';

const PaymentForm = ({ total, onPaymentSubmit }) => {
  const [paymentData, setPaymentData] = useState({
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    billingZip: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Format card number
    if (name === 'cardNumber') {
      const formattedValue = value
        .replace(/\D/g, '')  // Remove non-digits
        .replace(/(\d{4})(?=\d)/g, '$1 ');  // Add space every 4 digits
      setPaymentData(prev => ({ ...prev, [name]: formattedValue }));
    } 
    // Format expiry date
    else if (name === 'expiryDate') {
      const formattedValue = value
        .replace(/\D/g, '')  // Remove non-digits
        .replace(/(\d{2})(?=\d)/g, '$1/');  // Add / after 2 digits
      setPaymentData(prev => ({ ...prev, [name]: formattedValue }));
    }
    else {
      setPaymentData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    const requiredFields = ['cardName', 'cardNumber', 'expiryDate', 'cvv', 'billingZip'];
    const isValid = requiredFields.every(field => paymentData[field].trim() !== '');

    if (isValid) {
      onPaymentSubmit(paymentData);
    } else {
      alert('Please fill in all payment details');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex items-center mb-6">
        <CreditCard className="h-6 w-6 mr-2 text-indigo-600" />
        <h2 className="text-2xl font-bold">Payment Details</h2>
      </div>
      
      <div className="mb-6 bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 p-4 rounded-lg">
        <div className="flex justify-between">
          <span className="font-bold">Total to Pay</span>
          <span className="text-xl font-bold text-indigo-600">${total.toFixed(2)}</span>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Name on Card
          </label>
          <input
            type="text"
            id="cardName"
            name="cardName"
            value={paymentData.cardName}
            onChange={handleChange}
            required
            placeholder="John Doe"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
          />
        </div>
        
        <div>
          <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Card Number
          </label>
          <div className="relative">
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={paymentData.cardNumber}
              onChange={handleChange}
              required
              maxLength="19"
              placeholder="1234 5678 9012 3456"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
            />
            <CreditCard className="absolute right-3 top-3 text-gray-400" />
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Expiry Date
            </label>
            <input
              type="text"
              id="expiryDate"
              name="expiryDate"
              value={paymentData.expiryDate}
              onChange={handleChange}
              required
              maxLength="5"
              placeholder="MM/YY"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
            />
          </div>
          <div>
            <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              CVV
            </label>
            <div className="relative">
              <input
                type="text"
                id="cvv"
                name="cvv"
                value={paymentData.cvv}
                onChange={handleChange}
                required
                maxLength="3"
                placeholder="123"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
              />
              <Lock className="absolute right-3 top-3 text-gray-400" />
            </div>
          </div>
        </div>
        
        <div>
          <label htmlFor="billingZip" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Billing Zip Code
          </label>
          <input
            type="text"
            id="billingZip"
            name="billingZip"
            value={paymentData.billingZip}
            onChange={handleChange}
            required
            placeholder="12345"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center cursor-pointer"
        >
          <Lock className="mr-2" />
          Complete Payment
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;