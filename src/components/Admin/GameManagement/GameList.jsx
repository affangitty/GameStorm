import React, { useState } from 'react';
import { Edit, Trash2, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useGameContext } from '../../../context/GameContext';

const GameList = () => {
  const { games } = useGameContext();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredGames = games.filter(game => 
    game.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-800 p-6 rounded-lg text-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Game Management</h2>
        <Link 
          to="/admin/games/add" 
          className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg"
        >
          <PlusCircle className="w-5 h-5" />
          <span>Add New Game</span>
        </Link>
      </div>

      <div className="mb-4">
        <input 
          type="text" 
          placeholder="Search games..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-700">
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Platform</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredGames.map((game) => (
              <tr key={game.id} className="border-b border-gray-700">
                <td className="p-3">{game.id}</td>
                <td className="p-3">
                  <div className="flex items-center space-x-2">
                    <img 
                      src={game.image || "/api/placeholder/50/50"} 
                      alt={game.title} 
                      className="w-10 h-10 object-cover rounded"
                    />
                    <span>{game.title}</span>
                  </div>
                </td>
                <td className="p-3">${game.price}</td>
                <td className="p-3">{game.platform}</td>
                <td className="p-3 space-x-2">
                  <Link 
                    to={`/admin/games/edit/${game.id}`} 
                    className="text-blue-400 hover:text-blue-300"
                  >
                    <Edit className="w-5 h-5" />
                  </Link>
                  <button 
                    className="text-red-400 hover:text-red-300"
                    // Add delete game functionality
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GameList;