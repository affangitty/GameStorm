import React from 'react';
import { ChevronDown, Search, Filter } from 'lucide-react';
import GameCard from '../components/Games/GameCard';
import { useItemsContext } from '../context/ItemsContext';

const ItemsPage = () => {
  const { 
    categories, 
    activeCategory, 
    setActiveCategory, 
    filteredItems, 
    searchQuery, 
    setSearchQuery,
    priceRange,
    setPriceRange 
  } = useItemsContext();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter Section */}
        <div className="mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex-grow relative">
                <input 
                  type="text" 
                  placeholder="Search items..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full p-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              <div className="flex flex-wrap gap-2 items-center">
                <div className="relative">
                  <button className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-4 py-2 rounded-lg cursor-pointer">
                    <Filter className="w-4 h-4 mr-2" />
                    <span>Filters</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </div>
                <div className="relative">
                  <button className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-4 py-2 rounded-lg cursor-pointer">
                    <span>Price</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
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

        {/* Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map(item => (
            <GameCard key={item.id} game={item} variant="item" />
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500">
              No items found matching your selected filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemsPage;