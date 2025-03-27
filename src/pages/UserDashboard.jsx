import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, ShoppingCart, Heart, Star, Settings, CreditCard, Lock } from 'lucide-react';
import mystic from "../images/mystic.jpg";
import cyber from "../images/cyberpunk2077.jpg";

const UserDashboard = () => {
  const [activeSection, setActiveSection] = useState('profile');

  const recentOrders = [
    { id: 'ORD-001', date: '2025-03-15', total: 129.99, status: 'Delivered' },
    { id: 'ORD-002', date: '2025-03-10', total: 59.99, status: 'Shipped' },
    { id: 'ORD-003', date: '2025-02-28', total: 89.99, status: 'Completed' }
  ];

  const wishlistItems = [
    { 
      id: 1, 
      title: 'Cyber Legends', 
      price: 59.99, 
      platform: 'PC, PS5', 
      image: cyber
    },
    { 
      id: 2, 
      title: 'Mystic Quest', 
      price: 49.99, 
      platform: 'Xbox, Switch', 
      image: mystic
    }
  ];

  const renderContent = () => {
    switch(activeSection) {
      case 'profile':
        return (
          <div className="bg-gray-800 p-6 rounded-lg text-white">
            <h2 className="text-2xl font-bold mb-4">Profile Information</h2>
            <div className="flex items-center mb-6">
              <div className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center mr-4">
                <User className="w-12 h-12 text-gray-300" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">John Gamer</h3>
                <p className="text-gray-400">john.gamer@example.com</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 font-bold mb-2">First Name</label>
                <input 
                  type="text" 
                  placeholder="Enter first name" 
                  className="w-full p-2 border border-gray-600 bg-gray-700 rounded-lg text-white placeholder-gray-500"
                />
              </div>
              <div>
                <label className="block text-gray-300 font-bold mb-2">Last Name</label>
                <input 
                  type="text" 
                  placeholder="Enter last name"
                  className="w-full p-2 border border-gray-600 bg-gray-700 rounded-lg text-white placeholder-gray-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-300 font-bold mb-2">Email</label>
                <input 
                  type="email" 
                  placeholder="Enter email address"
                  className="w-full p-2 border border-gray-600 bg-gray-700 rounded-lg text-white placeholder-gray-500"
                />
              </div>
            </div>
          </div>
        );
      case 'orders':
        return (
          <div className="bg-gray-800 p-6 rounded-lg text-white">
            <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-700">
                    <th className="p-3 text-left">Order ID</th>
                    <th className="p-3 text-left">Date</th>
                    <th className="p-3 text-left">Total</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map(order => (
                    <tr key={order.id} className="border-b border-gray-700">
                      <td className="p-3">{order.id}</td>
                      <td className="p-3">{order.date}</td>
                      <td className="p-3">${order.total}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          order.status === 'Delivered' ? 'bg-green-600 text-white' :
                          order.status === 'Shipped' ? 'bg-yellow-600 text-white' :
                          'bg-blue-600 text-white'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="p-3">
                        <Link 
                          to={`/order/${order.id}`} 
                          className="text-indigo-300 hover:text-indigo-100"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'wishlist':
        return (
          <div className="bg-gray-800 p-6 rounded-lg text-white">
            <h2 className="text-2xl font-bold mb-4">Wishlist</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {wishlistItems.map(item => (
                <div 
                  key={item.id} 
                  className="border border-gray-700 rounded-lg overflow-hidden hover:border-indigo-500 transition"
                >
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-3">
                    <h3 className="font-bold">{item.title}</h3>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-lg font-bold">${item.price}</span>
                      <div className="flex space-x-2">
                        <button className="bg-indigo-600 text-white px-2 py-1 rounded text-xs hover:bg-indigo-700">
                          Add to Cart
                        </button>
                        <button className="text-red-400 hover:text-red-300 p-1 rounded">
                          <Heart className="w-4 h-4 fill-current" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="grid md:grid-cols-4 gap-6 w-full">
          {/* Sidebar Navigation */}
          <div className="bg-gray-800 rounded-lg p-4 h-fit">
            <div className="space-y-2">
              {[
                { icon: User, label: 'Profile', key: 'profile' },
                { icon: ShoppingCart, label: 'Orders', key: 'orders' },
                { icon: Heart, label: 'Wishlist', key: 'wishlist' },
                { icon: CreditCard, label: 'Payment Methods', key: 'payment' },
                { icon: Settings, label: 'Account Settings', key: 'settings' },
                { icon: Lock, label: 'Privacy & Security', key: 'security' }
              ].map(item => (
                <button
                  key={item.key}
                  onClick={() => setActiveSection(item.key)}
                  className={`w-full flex items-center space-x-2 p-2 rounded-lg cursor-pointer ${
                    activeSection === item.key 
                      ? 'bg-indigo-600 text-white' 
                      : 'hover:bg-gray-700 text-gray-300'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Main Content */}
          <div className="md:col-span-3">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;