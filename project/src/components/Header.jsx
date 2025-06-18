import React from 'react';
import { Menu, Clock, Newspaper } from 'lucide-react';

const Header = ({ setSidebarOpen }) => {
  const currentTime = new Date().toLocaleString();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <button
              type="button"
              className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="lg:ml-0 ml-4 flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <Newspaper className="h-8 w-8 text-blue-600" />
                <h1 className="ml-3 text-2xl font-bold text-gray-900">
                  AI Journalism Platform
                </h1>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-2" />
              <span>{currentTime}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;