import { useState } from 'react';
import { useCart } from '../context/CartContext';

export const useCartActions = () => {
  const [isRemoving, setIsRemoving] = useState(false);
  const { 
    cart, 
    addToCart, 
    removeFromCart, 
    updateQuantity, 
    clearCart,
    calculateTotal,
    getTotalItems
  } = useCart();

  const handleAddToCart = (game) => {
    addToCart(game);
  };

  const handleRemoveFromCart = (gameId) => {
    setIsRemoving(true);
    removeFromCart(gameId);
    setTimeout(() => setIsRemoving(false), 300);
  };

  const handleUpdateQuantity = (gameId, quantity) => {
    updateQuantity(gameId, quantity);
  };

  return {
    cart,
    isRemoving,
    addToCart: handleAddToCart,
    removeFromCart: handleRemoveFromCart,
    updateQuantity: handleUpdateQuantity,
    clearCart,
    calculateTotal,
    getTotalItems
  };
};