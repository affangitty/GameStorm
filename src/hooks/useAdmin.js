import { useState, useEffect } from 'react';
import adminData from '../data/admin_data';
import adminPermissions from '../utils/adminPermissions';

export const useAdmin = () => {
  const [dashboardStats, setDashboardStats] = useState(adminData.dashboardStats);
  const [recentActivities, setRecentActivities] = useState(adminData.recentActivities);
  const [salesData, setSalesData] = useState(adminData.salesData);
  const [users, setUsers] = useState(adminData.users);
  const [games, setGames] = useState(adminData.games);

  const refreshDashboardStats = () => {
    // In a real app, this would fetch from an API
    setDashboardStats(adminData.dashboardStats);
  };

  const addRecentActivity = (activity) => {
    const newActivity = {
      ...activity,
      id: recentActivities.length + 1,
      timestamp: new Date().toISOString()
    };
    setRecentActivities(prev => [newActivity, ...prev].slice(0, 10));
  };

  const updateUserStatus = (userId, newStatus) => {
    const updatedUsers = users.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    );
    setUsers(updatedUsers);
    
    // Update dashboard stats
    const userStats = updatedUsers.reduce((acc, user) => {
      acc[user.status] = (acc[user.status] || 0) + 1;
      return acc;
    }, {});
    
    setDashboardStats(prev => ({
      ...prev,
      userStats: {
        active: userStats.active || 0,
        suspended: userStats.suspended || 0,
        banned: userStats.banned || 0
      }
    }));
  };

  const addGame = (gameData) => {
    const newGame = {
      ...gameData,
      id: Date.now()
    };
    const updatedGames = [...games, newGame];
    setGames(updatedGames);
    
    // Update dashboard stats
    setDashboardStats(prev => ({
      ...prev,
      gameStats: {
        ...prev.gameStats,
        total: updatedGames.length,
        active: updatedGames.filter(game => game.status !== 'discontinued').length
      }
    }));
  };

  const updateGame = (updatedGame) => {
    const updatedGames = games.map(game => 
      game.id === updatedGame.id ? updatedGame : game
    );
    setGames(updatedGames);
  };

  const deleteGame = (gameId) => {
    const updatedGames = games.filter(game => game.id !== gameId);
    setGames(updatedGames);
    
    // Update dashboard stats
    setDashboardStats(prev => ({
      ...prev,
      gameStats: {
        ...prev.gameStats,
        total: updatedGames.length,
        active: updatedGames.filter(game => game.status !== 'discontinued').length
      }
    }));
  };

  return {
    dashboardStats,
    recentActivities,
    salesData,
    users,
    games,
    refreshDashboardStats,
    addRecentActivity,
    updateUserStatus,
    addGame,
    updateGame,
    deleteGame,
    checkPermission: adminPermissions.checkPermission
  };
};