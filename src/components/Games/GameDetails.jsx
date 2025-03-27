import React, { useState } from 'react';
import { Star, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const GameDetails = ({ game }) => {
  const [selectedEdition, setSelectedEdition] = useState('standard');
  const { addToCart } = useCart();

  const editions = {
    standard: {
      price: game.price,
      features: ['Base Game', 'Standard Edition Content']
    },
    deluxe: {
      price: game.price * 1.5,
      features: [
        'Base Game', 
        'Deluxe Edition Content', 
        'Bonus Digital Content', 
        'Early Access'
      ]
    }
  };

  const handleAddToCart = () => {
    addToCart({
      ...game,
      price: editions[selectedEdition].price,
      edition: selectedEdition
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Game Image */}
        <div>
          <img 
            src={game.image} 
            alt={game.title} 
            className="w-full rounded-lg shadow-md"
          />
        </div>

        {/* Game Details */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{game.title}</h1>
          
          <div className="flex items-center mb-4">
            <div className="flex items-center mr-4">
              <Star className="h-5 w-5 text-yellow-500 fill-current" />
              <span className="ml-1 text-lg">{game.rating}</span>
            </div>
            <span className="text-gray-500">{game.platform}</span>
          </div>

          {/* Description */}
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            {game.description}
          </p>

          {/* Developer and Release Info */}
          <div className="mb-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Developer: {game.developer}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Release Date: {new Date(game.releaseDate).toLocaleDateString()}
            </p>
          </div>

          {/* Edition Selection */}
          <div className="mb-6">
            <h3 className="font-bold mb-2">Select Edition</h3>
            <div className="flex space-x-4">
              <button
                className={`px-4 py-2 rounded-lg border ${
                  selectedEdition === 'standard' 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-gray-100 text-gray-800'
                }`}
                onClick={() => setSelectedEdition('standard')}
              >
                Standard Edition
                <p className="text-sm font-normal">
                  ${editions.standard.price.toFixed(2)}
                </p>
              </button>
              <button
                className={`px-4 py-2 rounded-lg border ${
                  selectedEdition === 'deluxe' 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-gray-100 text-gray-800'
                }`}
                onClick={() => setSelectedEdition('deluxe')}
              >
                Deluxe Edition
                <p className="text-sm font-normal">
                  ${editions.deluxe.price.toFixed(2)}
                </p>
              </button>
            </div>
          </div>

          {/* Edition Features */}
          <div className="mb-6">
            <h3 className="font-bold mb-2">Edition Features</h3>
            <ul className="list-disc list-inside">
              {editions[selectedEdition].features.map((feature, index) => (
                <li key={index} className="text-gray-700">{feature}</li>
              ))}
            </ul>
          </div>

          {/* Add to Cart */}
          <div className="flex items-center space-x-4">
            <button
              onClick={handleAddToCart}
              className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </button>
            <span className="text-xl font-bold">
              ${editions[selectedEdition].price.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetails;