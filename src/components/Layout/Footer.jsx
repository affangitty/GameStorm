import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2 } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Gamepad2 className="h-8 w-8 mr-2" />
              <span className="font-bold text-xl">GameStorm</span>
            </div>
            <p className="text-gray-400">Your one-stop destination for all gaming needs.</p>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/categories" className="text-gray-400 hover:text-white">Games</Link></li>
              <li><Link to="/categories" className="text-gray-400 hover:text-white">Pre-orders</Link></li>
              <li><Link to="/categories" className="text-gray-400 hover:text-white">Accessories</Link></li>
              <li><Link to="/gift-cards" className="text-gray-400 hover:text-white">Gift Cards</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact Us</Link></li>
              <li><Link to="/faqs" className="text-gray-400 hover:text-white">FAQs</Link></li>
              <li><Link to="/shipping" className="text-gray-400 hover:text-white">Shipping Policy</Link></li>
              <li><Link to="/returns" className="text-gray-400 hover:text-white">Returns</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Subscribe</h3>
            <p className="text-gray-400 mb-2">Stay updated with latest games and exclusive offers.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="p-2 rounded-l-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
              />
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 rounded-r-lg cursor-pointer">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between">
          <p className="text-sm text-gray-400">© 2025 GameStorm. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <span className="text-sm text-gray-400">Follow us:</span>
            <div className="flex space-x-4 mt-2">
              <Link to="#" className="text-gray-400 hover:text-white">Twitter</Link>
              <Link to="#" className="text-gray-400 hover:text-white">Facebook</Link>
              <Link to="#" className="text-gray-400 hover:text-white">Instagram</Link>
              <Link to="#" className="text-gray-400 hover:text-white">Discord</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;