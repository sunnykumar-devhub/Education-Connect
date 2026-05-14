import React from 'react';

const Button = ({ children, onClick, variant = 'primary', className = '', disabled = false, type = 'button' }) => {
  const baseStyles = 'px-5 py-2.5 rounded-full text-sm font-bold transition-all flex items-center justify-center gap-2';
  
  const variants = {
    primary: 'bg-[#0F172A] text-white shadow-lg shadow-blue-100 hover:bg-[#3B82F6]',
    secondary: 'bg-[#3B82F6] text-white hover:bg-[#0F172A]',
    outline: 'border border-slate-200 text-slate-600 hover:border-[#3B82F6] hover:text-[#3B82F6]',
    ghost: 'text-slate-600 hover:text-[#3B82F6]',
  };

  return (
    <button 
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${disabled ? 'opacity-30 cursor-not-allowed' : ''} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
