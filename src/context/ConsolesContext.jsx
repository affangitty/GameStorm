import React, { createContext, useState, useContext, useMemo } from 'react';
import initialConsoles from '../data/consoles_data';

// Create the context
const ConsolesContext = createContext();

// Provider component
export const ConsolesProvider = ({ children }) => {
  const [consoles, setConsoles] = useState(initialConsoles);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);

  // Filtered consoles based on category, search, and price
  const filteredConsoles = useMemo(() => {
    let result = [
      ...consoles.featuredConsoles, 
      ...consoles.newArrivals
    ];

    // Filter by category
    if (activeCategory !== 'All') {
      result = result.filter(console => console.category === activeCategory);
    }

    // Filter by search query
    if (searchQuery) {
      result = result.filter(console => 
        console.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        console.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by price range
    result = result.filter(console => 
      console.price >= priceRange[0] && console.price <= priceRange[1]
    );

    return result;
  }, [activeCategory, searchQuery, priceRange, consoles]);

  // Console management functions
  const addConsole = (console) => {
    setConsoles(prev => ({
      ...prev,
      featuredConsoles: [...prev.featuredConsoles, console]
    }));
  };

  const removeConsole = (consoleId) => {
    setConsoles(prev => ({
      ...prev,
      featuredConsoles: prev.featuredConsoles.filter(console => console.id !== consoleId),
      newArrivals: prev.newArrivals.filter(console => console.id !== consoleId)
    }));
  };

  // Context value
  const contextValue = {
    consoles,
    filteredConsoles,
    categories: consoles.categories,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    priceRange,
    setPriceRange,
    addConsole,
    removeConsole
  };

  return (
    <ConsolesContext.Provider value={contextValue}>
      {children}
    </ConsolesContext.Provider>
  );
};

// Custom hook to use the ConsolesContext
export const useConsolesContext = () => {
  const context = useContext(ConsolesContext);
  if (!context) {
    throw new Error('useConsolesContext must be used within a ConsolesProvider');
  }
  return context;
};

export default ConsolesContext;