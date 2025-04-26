// src/components/LoadingSpinner.jsx
import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
      <span className="ml-2">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;