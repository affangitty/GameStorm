import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, Gamepad2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  return (
    <nav className="sticky top-0 bg-indigo-700 text-white shadow-md z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Gamepad2 className="h-8 w-8 mr-2" />
            <Link to="/" className="font-bold text-xl">GameStorm</Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="font-medium hover:text-indigo-200">Home</Link>
            <Link to="/games" className="font-medium hover:text-indigo-200">Games</Link>
            <Link to="/consoles" className="font-medium hover:text-indigo-200">Consoles</Link>
            <Link to="/items" className="font-medium hover:text-indigo-200">Items</Link>
          </div>
          
          {/* Cart, User */}
          <div className="flex items-center space-x-4">
          <div className="w-12"></div>
            <Link to="/cart" className="p-1 rounded-full hover:bg-indigo-600 relative">
              <ShoppingCart className="h-6 w-6" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Link>
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <User 
                  className="h-6 w-6 cursor-pointer" 
                  onClick={toggleUserDropdown}
                />
                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg z-[100]">
                    <Link 
                      to="/dashboard" 
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setIsUserDropdownOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button 
                      onClick={() => {
                        logout();
                        setIsUserDropdownOpen(false);
                      }} 
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/auth" className="p-1 rounded-full hover:bg-indigo-600">
                <User className="h-6 w-6" />
              </Link>
            )}
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden p-1 rounded-full hover:bg-indigo-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-indigo-800 py-2">
          <div className="container mx-auto px-4 space-y-2">
            <Link to="/" className="block py-2 hover:bg-indigo-700 px-2 rounded">Home</Link>
            <Link to="/categories" className="block py-2 hover:bg-indigo-700 px-2 rounded">Games</Link>
            <Link to="/consoles" className="block py-2 hover:bg-indigo-700 px-2 rounded">Consoles</Link>
            <Link to="/items" className="block py-2 hover:bg-indigo-700 px-2 rounded">Items</Link>
            {!user && (
              <Link to="/auth" className="block py-2 hover:bg-indigo-700 px-2 rounded">Login/Register</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;