const adminData = {
  dashboardStats: {
    totalUsers: 5274,
    totalGames: 342,
    totalRevenue: 456789.50,
    activeUsers: 3912,
    newUsersThisMonth: 487,
    userStats: {
      active: 4523,
      suspended: 421,
      banned: 330
    },
    gameStats: {
      total: 342,
      active: 298,
      pending: 22,
      discontinued: 22
    }
  },
  users: [
    { 
      id: 1, 
      name: 'John Doe', 
      email: 'john@example.com', 
      role: 'admin', 
      status: 'active' 
    },
    { 
      id: 2, 
      name: 'Jane Smith', 
      email: 'jane@example.com', 
      role: 'moderator', 
      status: 'active' 
    }
    // More user data...
  ],
  recentActivities: [
    { 
      id: 1, 
      type: 'user_registration', 
      description: 'New user John Doe registered', 
      timestamp: '2025-03-20T14:30:00Z' 
    },
    { 
      id: 2, 
      type: 'game_added', 
      description: 'New game "Cyber Legends" added', 
      timestamp: '2025-03-21T09:15:00Z' 
    }
  ],
  games: [
    {
      id: 1,
      title: 'Cyber Legends',
      description: 'Futuristic action RPG',
      price: 59.99,
      platform: 'PC',
      genre: 'Action',
      image: '',
      trailer: '',
      releaseDate: '2025-06-15'
    }
    // More game data...
  ],
  salesData: [
    { month: 'Jan', revenue: 75000, orders: 342 },
    { month: 'Feb', revenue: 89000, orders: 412 },
    { month: 'Mar', revenue: 105000, orders: 487 }
  ]
};

export default adminData;