import React from 'react';
import { motion } from 'framer-motion';
import { Book, GraduationCap, Zap, BookOpen, ShieldCheck, Layers, ArrowRight, Clock, User, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BOOKS } from '../../utils/books';

const ResourcesContainer = () => {
  const classes = [
    { name: 'Class 1-5', icon: Book, color: 'text-blue-600', bg: 'bg-blue-50' },
    { name: 'Class 6-8', icon: Layers, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { name: 'Class 9', icon: GraduationCap, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { name: 'Class 10', icon: Zap, color: 'text-amber-600', bg: 'bg-amber-50' },
    { name: 'Class 11', icon: BookOpen, color: 'text-purple-600', bg: 'bg-purple-50' },
    { name: 'Class 12', icon: ShieldCheck, color: 'text-rose-600', bg: 'bg-rose-50' }
  ];

  const toTitleCase = (str) => {
    return str.toLowerCase().split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 sm:pt-32 pb-32 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-4"
          >
            <span className="inline-block w-fit bg-blue-600 text-white text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em]">
              Resource Repository
            </span>
            <h1 className="text-4xl sm:text-6xl font-black text-[#0f172a] uppercase tracking-tighter">
              Academic <span className="text-blue-600">Vault</span>
            </h1>
            <p className="text-slate-400 font-medium max-w-2xl text-base sm:text-lg">
              Curated study materials and interactive textbooks organized by academic grade level for a focused learning experience.
            </p>
          </motion.div>
        </div>

        {/* Sectioned Rows Layout */}
        <div className="space-y-24 sm:space-y-32">
          {classes.map((cls, idx) => {
            const classMaterials = BOOKS.filter(m => m.grade === cls.name).slice(0, 4);
            
            return (
              <div key={cls.name} className="flex flex-col lg:flex-row gap-10 xl:gap-16">
                
                {/* Left Side: Class Header (25%) */}
                <div className="w-full lg:w-1/4 lg:sticky lg:top-32 h-fit">
                  <div className="flex flex-col gap-6">
                    <div className={`${cls.bg} ${cls.color} w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm border border-slate-100`}>
                      <cls.icon className="w-8 h-8" />
                    </div>
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-black text-[#0f172a] uppercase tracking-tight mb-2">
                        {cls.name}
                      </h2>
                      <p className="text-slate-400 text-sm font-medium mb-6 leading-relaxed">
                        Comprehensive resources specifically curated for {cls.name} curriculum.
                      </p>
                      <Link 
                        to={`/category/grade/${cls.name.toLowerCase().replace(/ /g, '-')}`}
                        className={`inline-flex items-center gap-2 font-black uppercase text-[10px] tracking-widest transition-all hover:gap-4 ${cls.color}`}
                      >
                        View All Materials <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Right Side: Resource Grid (75%) */}
                <div className="w-full lg:w-3/4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                    {classMaterials.map((book) => (
                      <motion.div
                        key={book.id}
                        whileHover={{ y: -5 }}
                        className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg hover:shadow-slate-200 transition-all duration-300 flex h-44 sm:h-48"
                      >
                        {/* Card Image */}
                        <div className="w-1/3 h-full relative overflow-hidden bg-slate-100">
                          <img 
                            src={book.cover} 
                            alt={book.title} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                          />
                          <div className="absolute top-2 left-2 z-10">
                            <span className="bg-white/90 backdrop-blur-sm text-[#0f172a] text-[7px] font-black px-2 py-1 rounded-md uppercase tracking-wider shadow-sm border border-slate-100">
                              {book.subject}
                            </span>
                          </div>
                        </div>

                        {/* Card Content */}
                        <div className="w-2/3 p-5 sm:p-6 flex flex-col justify-between">
                          <div className="space-y-1.5">
                            <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors">
                              {toTitleCase(book.title)}
                            </h3>
                            <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                              <User className="w-3 h-3" />
                              <span className="truncate">{book.author}</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-1 text-slate-400 text-[10px] font-bold uppercase">
                                <Clock className="w-3 h-3" />
                                <span>12m</span>
                              </div>
                              <div className="flex items-center gap-1 text-amber-500 text-[10px] font-bold">
                                <Star className="w-3 h-3 fill-current" />
                                <span>4.9</span>
                              </div>
                            </div>
                            <Link to={`/read/${book.id}`} className="text-slate-300 group-hover:text-blue-600 transition-colors">
                                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    
                    {classMaterials.length === 0 && (
                      <div className="col-span-full py-16 bg-white rounded-2xl border border-slate-200 border-dashed flex flex-col items-center justify-center text-slate-300">
                        <BookOpen className="w-10 h-10 mb-4 opacity-20" />
                        <p className="font-black uppercase text-[10px] tracking-widest">Repository Updating...</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ResourcesContainer;
