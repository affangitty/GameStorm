import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  calculateTotal: () => 0,
  getTotalItems: () => 0
});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (game) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === game.id);
      if (existingItem) {
        return prevCart.map(item => 
          item.id === game.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prevCart, { ...game, quantity: 1 }];
    });
  };

  const removeFromCart = (gameId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== gameId));
  };

  const updateQuantity = (gameId, quantity) => {
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === gameId 
          ? { ...item, quantity: Math.max(1, quantity) } 
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      calculateTotal,
      getTotalItems
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);