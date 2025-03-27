import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  GamepadIcon, 
  Settings, 
  ChevronRight 
} from 'lucide-react';

const AdminNavigation = () => {
  const location = useLocation();

  const navItems = [
    { 
      icon: LayoutDashboard, 
      label: 'Dashboard', 
      path: '/admin' 
    },
    { 
      icon: Users, 
      label: 'User Management', 
      path: '/admin/users' 
    },
    { 
      icon: GamepadIcon, 
      label: 'Game Management', 
      path: '/admin/games' 
    },
    { 
      icon: Settings, 
      label: 'Site Settings', 
      path: '/admin/settings' 
    }
  ];

  return (
    <div className="bg-gray-800 rounded-lg p-4 h-fit">
      <div className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`w-full flex items-center justify-between p-2 rounded-lg cursor-pointer ${
              location.pathname === item.path 
                ? 'bg-indigo-600 text-white' 
                : 'hover:bg-gray-700 text-gray-300'
            }`}
          >
            <div className="flex items-center space-x-2">
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </div>
            <ChevronRight className="w-4 h-4" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminNavigation;