import React, { createContext, useState, useContext, useMemo } from 'react';
import initialItems from '../data/Items_data';

// Create the context
const ItemsContext = createContext();

// Provider component
export const ItemsProvider = ({ children }) => {
  const [items, setItems] = useState(initialItems);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);

  // Filtered items based on category, search, and price
  const filteredItems = useMemo(() => {
    let result = [
      ...items.featuredItems, 
      ...items.newArrivals
    ];

    // Filter by category
    if (activeCategory !== 'All') {
      result = result.filter(item => item.category === activeCategory);
    }

    // Filter by search query
    if (searchQuery) {
      result = result.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by price range
    result = result.filter(item => 
      item.price >= priceRange[0] && item.price <= priceRange[1]
    );

    return result;
  }, [activeCategory, searchQuery, priceRange, items]);

  // Item management functions
  const addItem = (item) => {
    setItems(prev => ({
      ...prev,
      featuredItems: [...prev.featuredItems, item]
    }));
  };

  const removeItem = (itemId) => {
    setItems(prev => ({
      ...prev,
      featuredItems: prev.featuredItems.filter(item => item.id !== itemId),
      newArrivals: prev.newArrivals.filter(item => item.id !== itemId)
    }));
  };

  // Context value
  const contextValue = {
    items,
    filteredItems,
    categories: items.categories,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    priceRange,
    setPriceRange,
    addItem,
    removeItem
  };

  return (
    <ItemsContext.Provider value={contextValue}>
      {children}
    </ItemsContext.Provider>
  );
};

// Custom hook to use the ItemsContext
export const useItemsContext = () => {
  const context = useContext(ItemsContext);
  if (!context) {
    throw new Error('useItemsContext must be used within an ItemsProvider');
  }
  return context;
};

export default ItemsContext;