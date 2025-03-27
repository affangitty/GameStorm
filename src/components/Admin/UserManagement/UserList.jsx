import React, { useState } from 'react';
import { Users, Shield, Ban, Lock, Unlock } from 'lucide-react';
import { useAdminContext } from '../../../context/AdminContext';

const UserList = () => {
  const { users, updateUserStatus } = useAdminContext();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(user => 
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getUserStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-600';
      case 'banned': return 'bg-red-600';
      case 'suspended': return 'bg-yellow-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg text-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold flex items-center space-x-2">
          <Users className="w-6 h-6" />
          <span>User Management</span>
        </h2>
      </div>

      <div className="mb-4">
        <input 
          type="text" 
          placeholder="Search users..." 
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
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-b border-gray-700">
                <td className="p-3">{user.id}</td>
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">
                  <div className="flex items-center space-x-2">
                    {user.role === 'admin' && <Shield className="w-4 h-4 text-blue-400" />}
                    {user.role}
                  </div>
                </td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-full text-xs text-white ${getUserStatusColor(user.status)}`}>
                    {user.status}
                  </span>
                </td>
                <td className="p-3 space-x-2">
                  <button 
                    className="text-red-400 hover:text-red-300"
                    onClick={() => updateUserStatus(user.id, 'banned')}
                    title="Ban User"
                  >
                    <Ban className="w-5 h-5" />
                  </button>
                  {user.status === 'banned' ? (
                    <button 
                      className="text-green-400 hover:text-green-300"
                      onClick={() => updateUserStatus(user.id, 'active')}
                      title="Unban User"
                    >
                      <Unlock className="w-5 h-5" />
                    </button>
                  ) : (
                    <button 
                      className="text-yellow-400 hover:text-yellow-300"
                      onClick={() => updateUserStatus(user.id, 'suspended')}
                      title="Suspend User"
                    >
                      <Lock className="w-5 h-5" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;