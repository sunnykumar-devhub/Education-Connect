import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const BookCard = ({ book, isNewPath = false }) => {
  const path = isNewPath ? `/read/${book.id}` : `/reader/${book.id}`;

  const toTitleCase = (str) => {
    return str.toLowerCase().split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <Link to={path} className="block h-full">
      <motion.div 
        whileHover={{ y: -8 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl cursor-pointer transition-all duration-300 group flex flex-col h-full hover:border-blue-500/30"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <img 
            src={book.cover} 
            alt={book.title} 
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1543004218-ee141104338e?q=80&w=1974&auto=format&fit=crop';
              e.target.onerror = null;
            }}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          <div className="absolute top-3 left-3 z-10">
            <span className="bg-blue-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm">
              {book.subject}
            </span>
          </div>

          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-center gap-2 mb-2 text-slate-500 text-xs font-medium">
            <BookOpen className="w-3.5 h-3.5" />
            {book.grade}
          </div>
          
          <h3 className="text-lg font-bold text-slate-900 leading-tight mb-4 group-hover:text-blue-600 transition-colors flex-1">
            {toTitleCase(book.title)}
          </h3>
          
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <User className="w-4 h-4 text-slate-400" />
              <span className="truncate max-w-[120px] font-medium">{book.author}</span>
            </div>
            <div className="text-blue-600 group-hover:text-blue-700 transition-colors">
              <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1.5 transition-transform" />
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default BookCard;
