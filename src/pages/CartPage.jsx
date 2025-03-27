import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ChevronLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import CartItem from '../components/Cart/CartItem';
import CartSummary from '../components/Cart/CartSummary';

const CartPage = () => {
  const { cart } = useCart();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Navigation Bar */}
      <nav className="sticky top-0 bg-indigo-700 text-white shadow-md z-0">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center hover:text-indigo-200">
              <ChevronLeft className="h-5 w-5 mr-1" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </nav>

      {/* Cart Content */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

        {cart.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
            <p className="text-xl mb-4">Your cart is empty</p>
            <Link 
              to="/" 
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg"
            >
              Browse Games
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Cart Items ({cart.length})</h2>
              {cart.map(item => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            {/* Cart Summary */}
            <div>
              <CartSummary />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;