import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const BookCard = ({ book, isNewPath = false }) => {
  const path = isNewPath ? `/read/${book.id}` : `/reader/${book.id}`;

  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-lg hover:shadow-2xl transition-all duration-500 group"
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <img 
          src={book.cover} 
          alt={book.title} 
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1543004218-ee141104338e?q=80&w=1974&auto=format&fit=crop';
            e.target.onerror = null;
          }}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-[#0f172a]/60 backdrop-blur-md text-white text-[9px] font-black px-4 py-2 rounded-xl shadow-xl uppercase tracking-widest border border-white/10">
            {book.grade}
          </span>
        </div>

        <div className="absolute bottom-4 left-4 right-4 z-10 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <Link 
            to={path}
            className="w-full bg-[#3B82F6] text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 shadow-2xl shadow-[#3B82F6]/40 active:scale-95 transition-all"
          >
            Start Reading
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
      
      <div className="p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-4 text-[#3B82F6] text-[9px] font-black uppercase tracking-[0.3em]">
          <BookOpen className="w-3.5 h-3.5" />
          {book.subject}
        </div>
        
        <h3 className="text-xl font-black text-[#0f172a] mb-4 leading-[1.1] line-clamp-2 min-h-[3.8rem] group-hover:text-[#3B82F6] transition-colors uppercase tracking-tighter">
          {book.title}
        </h3>
        
        <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-50">
          <div className="flex items-center gap-2.5 text-slate-400 text-[9px] font-bold uppercase tracking-widest">
            <div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center">
              <User className="w-3 h-3" />
            </div>
            <span className="truncate max-w-[100px]">{book.author}</span>
          </div>
          <Link to={path} className="text-[#0f172a] hover:text-[#3B82F6] transition-colors group-hover:translate-x-1 transition-transform">
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default BookCard;
