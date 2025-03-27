import React, { useState } from 'react';
import { ChevronDown, Search, Star, Filter, X } from 'lucide-react';
import GameCard from '../components/Games/GameCard';
import { useGameContext } from '../context/GameContext';

const GamesPage = () => {
  const { 
    categories, 
    platforms,
    activeCategory, 
    setActiveCategory, 
    filteredGames, 
    searchQuery, 
    setSearchQuery,
    priceRange,
    setPriceRange,
    selectedPlatforms,
    setSelectedPlatforms,
    sortBy,
    setSortBy
  } = useGameContext();

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Handle platform selection
  const togglePlatform = (platform) => {
    setSelectedPlatforms(prev => 
      prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  // Sort options
  const sortOptions = [
    { value: 'default', label: 'Default' },
    { value: 'price-low', label: 'Low Price' },
    { value: 'price-high', label: 'High Price' },
    { value: 'rating', label: 'Top Rated' },
    { value: 'newest', label: 'Newest' }
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter Section */}
        <div className="mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
              {/* Search Input */}
              <div className="flex-grow relative">
                <input 
                  type="text" 
                  placeholder="Search games..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full p-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>

              {/* Filters and Sorting */}
              <div className="flex flex-wrap gap-2 items-center">
                {/* Filters Dropdown */}
                <div className="relative">
                  <button 
                    className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-4 py-2 rounded-lg cursor-pointer"
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    <span>Filters</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>

                  {/* Filter Dropdown */}
                  {isFilterOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-700 rounded-lg shadow-lg z-50 p-4">
                      {/* Price Range */}
                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">
                          Price Range: ${priceRange[0]} - ${priceRange[1]}
                        </label>
                        <input 
                          type="range" 
                          min="0" 
                          max="100" 
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                          className="w-full"
                        />
                      </div>

                      {/* Platforms */}
                      <div>
                        <label className="block text-sm font-medium mb-2">Platforms</label>
                        <div className="flex flex-wrap gap-2">
                          {platforms.map(platform => (
                            <button
                              key={platform}
                              className={`px-3 py-1 rounded-full text-sm ${
                                selectedPlatforms.includes(platform)
                                  ? 'bg-indigo-600 text-white'
                                  : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                              }`}
                              onClick={() => togglePlatform(platform)}
                            >
                              {platform}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Sort Dropdown */}
                <div className="relative">
                  <div className="relative">
                    <select 
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none w-32 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-2 py-2 pl-3 pr-8 rounded-lg cursor-pointer text-sm"
                    >
                      {sortOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="flex overflow-x-auto pb-2 space-x-2 categories-scroll mb-8">
          {categories.map(category => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full whitespace-nowrap cursor-pointer ${
                activeCategory === category
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Active Filters */}
        <div className="flex flex-wrap gap-2 mb-4">
          {selectedPlatforms.map(platform => (
            <div 
              key={platform} 
              className="flex items-center bg-indigo-100 dark:bg-indigo-800 px-3 py-1 rounded-full text-sm"
            >
              {platform}
              <button 
                onClick={() => togglePlatform(platform)}
                className="ml-2"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
          {searchQuery && (
            <div 
              className="flex items-center bg-indigo-100 dark:bg-indigo-800 px-3 py-1 rounded-full text-sm"
            >
              "{searchQuery}"
              <button 
                onClick={() => setSearchQuery('')}
                className="ml-2"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {/* Game Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredGames.map(game => (
            <GameCard key={game.id} game={game} variant="featured" />
          ))}
        </div>

        {filteredGames.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500">
              No games found matching your selected filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GamesPage;