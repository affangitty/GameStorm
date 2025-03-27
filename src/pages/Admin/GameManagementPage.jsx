import React from 'react';
import { Outlet } from 'react-router-dom';
import { GamepadIcon, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAdminContext } from '../../context/AdminContext';

const GameManagementPage = () => {
  const { dashboardStats } = useAdminContext();
  const { gameStats } = dashboardStats;

  return (
    <div className="bg-gray-900 min-h-screen p-6 text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold flex items-center space-x-2">
          <GamepadIcon className="w-8 h-8" />
          <span>Game Management</span>
        </h1>
        <Link 
          to="/admin/games/add" 
          className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg"
        >
          <PlusCircle className="w-5 h-5" />
          <span>Add New Game</span>
        </Link>
      </div>
      
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-xl font-bold mb-2">Total Games</h3>
          <p className="text-3xl text-blue-400">{gameStats.total}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-xl font-bold mb-2">Active Games</h3>
          <p className="text-3xl text-green-400">{gameStats.active}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-xl font-bold mb-2">Pending Games</h3>
          <p className="text-3xl text-yellow-400">{gameStats.pending}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-xl font-bold mb-2">Discontinued</h3>
          <p className="text-3xl text-red-400">{gameStats.discontinued}</p>
        </div>
      </div>

      <Outlet />
    </div>
  );
};

export default GameManagementPage;