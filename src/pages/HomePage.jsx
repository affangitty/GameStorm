import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Search, Star, Filter } from "lucide-react";
import { motion } from "framer-motion";
import GameCard from "../components/Games/GameCard";
import GameCoverCarousel from "../components/Games/GameCoverCarousel";
import { useGameContext } from "../context/GameContext";
import springsale from "../images/springsale.jpg";

const HomePage = () => {
  const {
    games: { featuredGames, newArrivals },
    categories,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    priceRange,
    setPriceRange,
    filteredGames,
  } = useGameContext();

  const [showPriceFilter, setShowPriceFilter] = useState(false);

  // Prepare carousel games with rich descriptions
  const carouselGames = featuredGames.slice(0, 4).map(game => ({
    ...game,
    description: game.description || "Experience an epic gaming adventure like never before!",
  }));

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      {/* Hero Section with Enhanced Carousel */}
      <section className="relative">
        <GameCoverCarousel games={carouselGames} />

        {/* Search and Filter Bar */}
        <div className="container mx-auto px-4 mt-4 relative z-40">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-800 rounded-lg shadow-2xl p-4 border border-gray-700"
          >
            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex-grow relative">
                <input
                  type="text"
                  placeholder="Search games, genres, platforms..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full p-3 pl-12 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
              </div>
              
              <div className="flex flex-wrap gap-2 items-center">
                <div className="relative">
                  <button
                    onClick={() => setShowPriceFilter(!showPriceFilter)}
                    className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 px-4 py-3 rounded-lg cursor-pointer"
                  >
                    <Filter className="h-4 w-4 text-gray-300" />
                    <span>
                      Price: ${priceRange[0]} - ${priceRange[1]}
                    </span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  {showPriceFilter && (
                    <div className="absolute right-0 z-10 mt-2 w-64 bg-gray-800 rounded-lg shadow-2xl p-4 border border-gray-700">
                      <div className="flex justify-between mb-2 text-sm">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="1"
                        value={priceRange[1]}
                        onChange={(e) =>
                          setPriceRange([0, Number(e.target.value)])
                        }
                        className="w-full"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex overflow-x-auto pb-2 space-x-2 categories-scroll">
          {categories.map((category) => (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              key={category}
              className={`px-4 py-2 rounded-full whitespace-nowrap cursor-pointer transition-all duration-300 ${
                activeCategory === category
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </section>

      {/* Featured Games */}
      <section className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Featured Games</h2>
          <Link
            to="/categories"
            className="text-indigo-400 hover:text-indigo-300 transition flex items-center"
          >
            View All <ChevronDown className="ml-1 h-5 w-5" />
          </Link>
        </div>

        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: { 
                delayChildren: 0.2,
                staggerChildren: 0.1 
              }
            }
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {filteredGames
            .filter((game) =>
              featuredGames.some((featured) => featured.id === game.id)
            )
            .map((game) => (
              <motion.div
                key={game.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <GameCard game={game} variant="featured" />
              </motion.div>
            ))}
        </motion.div>
      </section>

      {/* New Arrivals */}
      <section className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">New Arrivals</h2>
          <Link
            to="/categories"
            className="text-indigo-400 hover:text-indigo-300 transition flex items-center"
          >
            View All <ChevronDown className="ml-1 h-5 w-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {filteredGames
            .filter((game) =>
              newArrivals.some((arrival) => arrival.id === game.id)
            )
            .map((game) => (
              <GameCard key={game.id} game={game} variant="new-arrival" />
            ))}
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="container mx-auto px-4 py-6">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-r from-purple-800 to-indigo-900 rounded-2xl overflow-hidden shadow-2xl"
        >
          <div className="p-8 md:p-12 flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 text-white mb-6 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
                Epic Spring Gaming Blowout
              </h2>
              <p className="mb-6 text-lg text-gray-300">
                Massive discounts up to 70% off on top titles. Limited time offer - upgrade your gaming library now!
              </p>
              <Link
                to="/deals"
                className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-8 rounded-lg transition transform hover:scale-105 inline-block"
              >
                Explore Mega Deals
              </Link>
            </div>
            <div className="md:w-1/3 hidden md:block">
              <img
                src={springsale}
                alt="Spring Sale"
                className="rounded-xl shadow-lg transform hover:rotate-3 transition-transform"
              />
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default HomePage;