import React from 'react';

const Button = ({ children, className, disabled, onClick, type = 'button' }) => {
  return (
    <button
      type={type}
      className={`btn ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;