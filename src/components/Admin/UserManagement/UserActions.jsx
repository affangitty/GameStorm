import React, { useState } from 'react';
import { Send, Search, Filter } from 'lucide-react';
import { useAdminContext } from '../../../context/AdminContext';

const UserActions = () => {
  const { users, sendBulkNotification } = useAdminContext();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [filterType, setFilterType] = useState('all');

  const handleUserSelect = (userId) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    setSelectedUsers(
      selectedUsers.length === filteredUsers.length 
        ? [] 
        : filteredUsers.map(user => user.id)
    );
  };

  const filteredUsers = users.filter(user => {
    switch(filterType) {
      case 'admin': return user.role === 'admin';
      case 'active': return user.status === 'active';
      case 'banned': return user.status === 'banned';
      default: return true;
    }
  });

  const handleSendNotification = () => {
    if (selectedUsers.length > 0 && message.trim()) {
      sendBulkNotification(selectedUsers, message);
      setMessage('');
      setSelectedUsers([]);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg text-white space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">User Actions</h2>
        <div className="flex items-center space-x-2">
          <label className="text-gray-300">Filter:</label>
          <select 
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-gray-700 p-2 rounded"
          >
            <option value="all">All Users</option>
            <option value="admin">Admins</option>
            <option value="active">Active</option>
            <option value="banned">Banned</option>
          </select>
        </div>
      </div>

      <div className="bg-gray-700 p-4 rounded-lg">
        <div className="flex items-center mb-4">
          <input 
            type="checkbox"
            checked={selectedUsers.length === filteredUsers.length}
            onChange={handleSelectAll}
            className="mr-2"
          />
          <span>Select All ({selectedUsers.length} selected)</span>
        </div>

        <div className="max-h-64 overflow-y-auto">
          {filteredUsers.map(user => (
            <div 
              key={user.id} 
              className="flex items-center space-x-2 p-2 hover:bg-gray-600 rounded"
            >
              <input 
                type="checkbox"
                checked={selectedUsers.includes(user.id)}
                onChange={() => handleUserSelect(user.id)}
                className="mr-2"
              />
              <span>{user.name}</span>
              <span className="text-gray-400 ml-auto">{user.email}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-700 p-4 rounded-lg">
        <h3 className="font-bold mb-2">Send Bulk Notification</h3>
        <textarea 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here..."
          className="w-full p-2 bg-gray-800 rounded text-white h-24"
        />
        <div className="flex justify-end mt-2">
          <button
            onClick={handleSendNotification}
            disabled={selectedUsers.length === 0 || !message.trim()}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded flex items-center space-x-2 disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            <span>Send Notification</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserActions;