import React, { createContext, useState, useContext, useMemo } from 'react';
import initialGames from '../data/games_data';

// Create the context
const GameContext = createContext();

// Provider component
export const GameProvider = ({ children }) => {
  const [games, setGames] = useState(initialGames);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [sortBy, setSortBy] = useState('default');

  // Filtered games based on multiple criteria
  const filteredGames = useMemo(() => {
    let result = [
      ...games.featuredGames, 
      ...games.newArrivals
    ];

    // Filter by category
    if (activeCategory !== 'All') {
      result = result.filter(game => game.category === activeCategory);
    }

    // Filter by search query
    if (searchQuery) {
      result = result.filter(game => 
        game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.developer.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by price range
    result = result.filter(game => 
      game.price >= priceRange[0] && game.price <= priceRange[1]
    );

    // Filter by platforms
    if (selectedPlatforms.length > 0) {
      result = result.filter(game => 
        selectedPlatforms.some(platform => 
          game.platform.includes(platform)
        )
      );
    }

    // Sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
        break;
      default:
        // Default sorting (could be by recent or featured)
        break;
    }

    return result;
  }, [activeCategory, searchQuery, priceRange, selectedPlatforms, sortBy, games]);

  // Game management functions
  const addGame = (game) => {
    setGames(prev => ({
      ...prev,
      featuredGames: [...prev.featuredGames, game]
    }));
  };

  const removeGame = (gameId) => {
    setGames(prev => ({
      ...prev,
      featuredGames: prev.featuredGames.filter(game => game.id !== gameId),
      newArrivals: prev.newArrivals.filter(game => game.id !== gameId)
    }));
  };

  // Context value
  const contextValue = {
    games,
    filteredGames,
    categories: games.categories,
    platforms: games.platforms,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    priceRange,
    setPriceRange,
    selectedPlatforms,
    setSelectedPlatforms,
    sortBy,
    setSortBy,
    addGame,
    removeGame
  };

  return (
    <GameContext.Provider value={contextValue}>
      {children}
    </GameContext.Provider>
  );
};

// Custom hook to use the GameContext
export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
};

export default GameContext;