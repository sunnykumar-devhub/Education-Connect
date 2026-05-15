import React from 'react';
import { motion } from 'framer-motion';
import { FileQuestion, Home, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-lg w-full bg-white rounded-[2.5rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] border border-slate-100 p-8 sm:p-12 text-center relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-slate-50 rounded-full translate-y-1/2 -translate-x-1/2 opacity-50"></div>

        <div className="relative z-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-50 rounded-3xl mb-8">
            <FileQuestion className="w-10 h-10 text-blue-600" />
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-4">
            Oops! Resource Not Found
          </h1>
          
          <p className="text-slate-500 font-medium text-base sm:text-lg leading-relaxed mb-10 max-w-sm mx-auto">
            It looks like this study material was moved, deleted, or you followed a broken link.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/resources" 
              className="flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 active:scale-95"
            >
              <ArrowLeft className="w-4 h-4" />
              Return to Library
            </Link>
            
            <Link 
              to="/" 
              className="flex items-center justify-center gap-2 bg-slate-50 text-slate-900 px-8 py-4 rounded-2xl font-bold text-sm hover:bg-slate-100 transition-all border border-slate-200 active:scale-95"
            >
              <Home className="w-4 h-4" />
              Go to Homepage
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
