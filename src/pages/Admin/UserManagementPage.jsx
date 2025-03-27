import React from 'react';
import { Outlet } from 'react-router-dom';
import { Users, Shield, Ban, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAdminContext } from '../../context/AdminContext';

const UserManagementPage = () => {
  const { dashboardStats } = useAdminContext();
  const { userStats } = dashboardStats;

  return (
    <div className="bg-gray-900 min-h-screen p-6 text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold flex items-center space-x-2">
          <Users className="w-8 h-8" />
          <span>User Management</span>
        </h1>
        <Link 
          to="/admin/users/actions" 
          className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg"
        >
          <UserPlus className="w-5 h-5" />
          <span>User Actions</span>
        </Link>
      </div>
      
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-xl font-bold mb-2">Total Users</h3>
          <p className="text-3xl text-blue-400">
            {userStats.active + userStats.suspended + userStats.banned}
          </p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-xl font-bold mb-2">Active Users</h3>
          <p className="text-3xl text-green-400">{userStats.active}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-xl font-bold mb-2">Suspended</h3>
          <p className="text-3xl text-yellow-400">{userStats.suspended}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-xl font-bold mb-2">Banned</h3>
          <p className="text-3xl text-red-400">{userStats.banned}</p>
        </div>
      </div>

      <Outlet />
    </div>
  );
};

export default UserManagementPage;