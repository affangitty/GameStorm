import React from 'react';
import { Star } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const GameCard = ({ game, variant = 'featured' }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(game);
  };

  if (variant === 'featured') {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative">
          <img 
            src={game.image} 
            alt={game.title} 
            className="w-full object-cover h-48" 
          />
          {game.discount && (
            <div className="absolute top-2 right-2 bg-red-600 text-white text-sm font-bold px-2 py-1 rounded">
              {game.discount}% OFF
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg mb-1">{game.title}</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{game.platform}</p>
          <div className="flex items-center mb-2">
            <Star className="h-4 w-4 text-yellow-500 fill-current" />
            <span className="ml-1 text-sm">{game.rating}</span>
          </div>
          <div className="flex justify-between items-center">
            <div>
              {game.discount ? (
                <div>
                  <span className="text-gray-400 line-through text-sm">${game.price.toFixed(2)}</span>
                  <span className="text-lg font-bold ml-2">
                    ${(game.price * (1 - game.discount / 100)).toFixed(2)}
                  </span>
                </div>
              ) : (
                <span className="text-lg font-bold">${game.price.toFixed(2)}</span>
              )}
            </div>
            <button 
              onClick={handleAddToCart}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-lg text-sm cursor-pointer"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    );
  }

  // New Arrivals variant
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img 
        src={game.image} 
        alt={game.title} 
        className="w-full object-cover h-32" 
      />
      <div className="p-3">
        <h3 className="font-bold mb-1 text-sm">{game.title}</h3>
        <div className="flex items-center mb-1">
          <Star className="h-3 w-3 text-yellow-500 fill-current" />
          <span className="ml-1 text-xs">{game.rating}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-bold text-sm">${game.price.toFixed(2)}</span>
          <button 
            onClick={handleAddToCart}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-2 py-1 rounded text-xs cursor-pointer"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameCard;