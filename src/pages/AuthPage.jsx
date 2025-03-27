import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';
import { Gamepad2 } from 'lucide-react';

const AuthPage = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(
    location.pathname === '/auth/register' ? 'register' : 'login'
  );

  const handleSwitchToRegister = () => {
    setActiveTab('register');
  };

  const handleSwitchToLogin = () => {
    setActiveTab('login');
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
      {/* Header */}
      <header className="bg-indigo-700 text-white py-4 shadow-md">
        <div className="container mx-auto px-4 flex items-center justify-center">
          <Gamepad2 className="h-8 w-8 mr-2" />
          <span className="font-bold text-xl">GameStorm</span>
        </div>
      </header>

      {/* Auth Container */}
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Tab Navigation */}
          <div className="mb-6 flex justify-center">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md inline-flex">
              <button
                className={`px-6 py-2 rounded-l-lg transition-colors cursor-pointer ${
                  activeTab === 'login'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={() => setActiveTab('login')}
              >
                Login
              </button>
              <button
                className={`px-6 py-2 rounded-r-lg transition-colors cursor-pointer ${
                  activeTab === 'register'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={() => setActiveTab('register')}
              >
                Register
              </button>
            </div>
          </div>

          {/* Dynamic Content */}
          {activeTab === 'login' ? (
            <Login onSwitchToRegister={handleSwitchToRegister} />
          ) : (
            <Register onSwitchToLogin={handleSwitchToLogin} />
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-400">
            © 2025 GameStorm. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AuthPage;