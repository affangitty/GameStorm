import React from 'react';
import { Trash2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity > 0) {
      updateQuantity(item.id, newQuantity);
    } else {
      // If quantity would become 0, remove the item from the cart
      removeFromCart(item.id);
    }
  };

  return (
    <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 py-4">
      <div className="flex items-center space-x-4">
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-20 h-20 object-cover rounded"
        />
        <div>
          <h3 className="font-bold text-gray-900 dark:text-gray-100">{item.title}</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm">{item.platform}</p>
          <p className="text-indigo-700 dark:text-indigo-400 font-semibold">${item.price.toFixed(2)}</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded">
          <button 
            onClick={() => handleQuantityChange(item.quantity - 1)}
            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer"
          >
            -
          </button>
          <span className="px-4 text-gray-900 dark:text-gray-100">{item.quantity}</span>
          <button 
            onClick={() => handleQuantityChange(item.quantity + 1)}
            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer"
          >
            +
          </button>
        </div>
        
        <div className="font-bold text-gray-900 dark:text-gray-100">
          ${(item.price * item.quantity).toFixed(2)}
        </div>
        
        <button 
          onClick={() => removeFromCart(item.id)}
          className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-500 cursor-pointer"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;