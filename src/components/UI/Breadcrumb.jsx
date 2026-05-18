import React from 'react';
import { ArrowLeft, ChevronRight, Home } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Breadcrumb = ({ items }) => {
  const navigate = useNavigate();

  return (
    <div className="mb-8 flex items-center gap-3 text-sm font-medium text-slate-500 overflow-x-auto pb-2 scrollbar-hide">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 hover:text-blue-600 transition-colors group px-3 py-1.5 bg-white rounded-full shadow-sm border border-slate-200 whitespace-nowrap"
      >
        <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
        <span>Back</span>
      </button>
      
      <div className="flex items-center gap-2 whitespace-nowrap bg-white px-4 py-1.5 rounded-full shadow-sm border border-slate-200">
        <Link to="/" className="flex items-center gap-1.5 hover:text-blue-600 transition-colors text-slate-400 hover:bg-slate-50 rounded-md">
          <Home className="w-4 h-4" />
        </Link>
        {items.length > 0 && <ChevronRight className="w-4 h-4 text-slate-300" />}
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {index > 0 && <ChevronRight className="w-4 h-4 text-slate-300" />}
            {item.link ? (
              <Link to={item.link} className="hover:text-blue-600 transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-slate-900 font-semibold">{item.label}</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Breadcrumb;
