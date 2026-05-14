import React from 'react';
import { GraduationCap, Search } from 'lucide-react';
import Button from '../common/Button';

const Navbar = ({ searchQuery, setSearchQuery }) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-academic-600 p-2 rounded-xl text-white">
            <GraduationCap size={28} />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight text-slate-800 uppercase">Academia</h1>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold -mt-1">Digital Library</p>
          </div>
        </div>

        <div className="hidden md:flex items-center bg-slate-100 px-4 py-2 rounded-full w-96 group focus-within:ring-2 ring-academic-200 transition-all">
          <Search className="text-slate-400 group-focus-within:text-academic-500" size={18} />
          <input 
            type="text" 
            placeholder="Search materials, books, or authors..."
            className="bg-transparent border-none outline-none px-3 text-sm w-full text-slate-700"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-4">
          <button className="hidden sm:block text-sm font-semibold text-slate-600 hover:text-academic-600">My Collections</button>
          <Button variant="primary">Sign In</Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
