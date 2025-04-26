// src/components/Navbar.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex justify-between items-center">
        <div 
          className="font-semibold text-blue-600 cursor-pointer"
          onClick={() => navigate('/')}
        >
          AI Summarizer
        </div>
        
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => navigate('/history')}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            History
          </button>
          <button 
            onClick={() => navigate('/settings')}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Settings
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;