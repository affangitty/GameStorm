import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const CartSummary = () => {
  const { cart, calculateTotal } = useCart();

  const subtotal = calculateTotal();
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Order Summary</h3>
      
      <div className="space-y-2 border-b border-gray-200 dark:border-gray-700 pb-4">
        <div className="flex justify-between text-gray-700 dark:text-gray-300">
          <span>Subtotal</span>
          <span className="font-semibold text-gray-900 dark:text-gray-100">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-700 dark:text-gray-300">
          <span>Shipping</span>
          <span className="font-semibold text-gray-900 dark:text-gray-100">
            {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
          </span>
        </div>
        <div className="flex justify-between text-gray-700 dark:text-gray-300">
          <span>Tax</span>
          <span className="font-semibold text-gray-900 dark:text-gray-100">${tax.toFixed(2)}</span>
        </div>
      </div>
      
      <div className="flex justify-between font-bold mt-4 text-gray-900 dark:text-gray-100">
        <span>Total</span>
        <span className="text-indigo-700 dark:text-indigo-400">${total.toFixed(2)}</span>
      </div>
      
      <Link 
        to="/checkout" 
        className={`w-full mt-6 text-white py-2 rounded text-center block ${
          cart.length === 0 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600'
        }`}
        disabled={cart.length === 0}
      >
        Proceed to Checkout
      </Link>
      
      {cart.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-4">Your cart is empty</p>
      )}
    </div>
  );
};

export default CartSummary;