import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { 
  Users, 
  GamepadIcon, 
  DollarSign, 
  TrendingUp, 
  Activity 
} from 'lucide-react';
import { useAdminContext } from '../../context/AdminContext';

const AdminDashboard = () => {
  const { dashboardStats, salesData, recentActivities } = useAdminContext();

  const statCards = [
    { 
      icon: Users, 
      title: 'Total Users', 
      value: dashboardStats.totalUsers,
      bgColor: 'bg-blue-600'
    },
    { 
      icon: GamepadIcon, 
      title: 'Total Games', 
      value: dashboardStats.totalGames,
      bgColor: 'bg-green-600'
    },
    { 
      icon: DollarSign, 
      title: 'Total Revenue', 
      value: `$${dashboardStats.totalRevenue.toLocaleString()}`,
      bgColor: 'bg-purple-600'
    },
    { 
      icon: TrendingUp, 
      title: 'New Users', 
      value: dashboardStats.newUsersThisMonth,
      bgColor: 'bg-orange-600'
    }
  ];

  return (
    <div className="bg-gray-900 min-h-screen p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        {statCards.map((card, index) => (
          <div 
            key={index} 
            className={`${card.bgColor} p-4 rounded-lg flex items-center space-x-4`}
          >
            <card.icon className="w-8 h-8" />
            <div>
              <p className="text-sm text-gray-200">{card.title}</p>
              <p className="text-2xl font-bold">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Monthly Sales Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Recent Activities</h2>
          <div className="space-y-3">
            {recentActivities.map(activity => (
              <div 
                key={activity.id} 
                className="flex items-center space-x-3 bg-gray-700 p-3 rounded"
              >
                <Activity className="w-6 h-6 text-indigo-400" />
                <div>
                  <p className="text-sm">{activity.description}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(activity.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;