import React from 'react';
import { Network, BookOpen } from 'lucide-react';
import { BrandConfig } from '../../BrandConfig';

const Logo = ({ className = "", variant = "dark" }) => {
  const isLight = variant === "light";
  
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative flex items-center justify-center">
        <div className={`w-12 h-12 ${isLight ? 'bg-white' : 'bg-[#0F172A]'} rounded-xl flex items-center justify-center shadow-lg transform rotate-3 transition-transform hover:rotate-0`}>
          <BookOpen className={`${isLight ? 'text-[#0F172A]' : 'text-white'} w-6 h-6 absolute z-10`} />
          <Network className={`${isLight ? 'text-[#3B82F6]' : 'text-[#3B82F6]'} w-10 h-10 opacity-40 animate-pulse`} />
        </div>
        <div className={`absolute -inset-1 bg-gradient-to-tr ${isLight ? 'from-white/20' : 'from-[#3B82F6]/20'} to-transparent blur rounded-xl`}></div>
      </div>

      <div className="flex flex-col leading-none">
        <h1 className={`text-xl sm:text-2xl font-black ${isLight ? 'text-white' : 'text-[#0F172A]'} tracking-tighter uppercase leading-none`}>
          {BrandConfig.logoTitle}
        </h1>
        <p className={`text-[8px] sm:text-[10px] font-black ${isLight ? 'text-[#3B82F6]' : 'text-[#3B82F6]'} tracking-[0.2em] sm:tracking-[0.3em] uppercase mt-0.5 sm:mt-1`}>
          {BrandConfig.logoSubtitle}
        </p>
      </div>
    </div>
  );
};

export default Logo;
