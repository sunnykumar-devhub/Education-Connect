import React from 'react';
import { motion } from 'framer-motion';
import { Book, GraduationCap, Zap, BookOpen, ShieldCheck, Layers, ArrowRight, Star, Clock, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MATERIALS } from '../../data/materials';

const ResourcesContainer = () => {
  const classes = [
    { name: 'Class 1-5', icon: Book, color: 'bg-blue-500', theme: '#3B82F6' },
    { name: 'Class 6-8', icon: Layers, color: 'bg-indigo-500', theme: '#6366F1' },
    { name: 'Class 9', icon: GraduationCap, color: 'bg-emerald-500', theme: '#10B981' },
    { name: 'Class 10', icon: Zap, color: 'bg-amber-500', theme: '#F59E0B' },
    { name: 'Class 11', icon: BookOpen, color: 'bg-purple-500', theme: '#8B5CF6' },
    { name: 'Class 12', icon: ShieldCheck, color: 'bg-rose-500', theme: '#F43F5E' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-24 sm:pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block bg-[#3B82F6]/10 text-[#3B82F6] text-[8px] sm:text-[10px] font-black px-3 sm:px-4 py-1.5 sm:py-2 rounded-full uppercase tracking-widest mb-4"
          >
            Academic Library
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-6xl font-black text-[#0f172a] uppercase tracking-tighter mb-4 sm:mb-6"
          >
            Class-wise <span className="text-[#3B82F6]">Resources</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 font-medium max-w-2xl mx-auto text-base sm:text-lg px-4"
          >
            Access curated study materials, interactive textbooks, and research papers organized by grade level.
          </motion.p>
        </div>

        {/* Classes Grid */}
        <div className="space-y-16 sm:space-y-24">
          {classes.map((cls, idx) => {
            const classMaterials = MATERIALS.filter(m => m.grade === cls.name).slice(0, 4);
            
            return (
              <motion.div 
                key={cls.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="flex flex-col lg:flex-row gap-8 sm:gap-12 items-start">
                  {/* Class Info Sidebar */}
                  <div className="w-full lg:w-1/4 lg:sticky lg:top-32">
                    <div className="bg-white p-8 sm:p-10 rounded-[2rem] sm:rounded-[3rem] shadow-xl border border-slate-100">
                      <div className={`${cls.color} w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mb-6 shadow-2xl`}>
                        <cls.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-black text-[#0f172a] uppercase tracking-tighter mb-3 sm:mb-4">{cls.name}</h2>
                      <p className="text-slate-400 text-xs sm:text-sm font-medium mb-6 sm:mb-8">Comprehensive digital vault for {cls.name} students.</p>
                      <Link 
                        to={`/category/grade/${cls.name.toLowerCase().replace(/ /g, '-')}`}
                        className="flex items-center justify-center gap-2 bg-[#0f172a] text-white py-3.5 sm:py-4 rounded-xl font-black uppercase text-[9px] sm:text-[10px] tracking-widest hover:bg-[#3B82F6] transition-all shadow-xl active:scale-95"
                      >
                        Enter Full Vault <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>

                  {/* Materials Preview */}
                  <div className="w-full lg:w-3/4 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                    {classMaterials.map((book) => (
                      <Link 
                        to={`/read/${book.id}`}
                        key={book.id}
                        className="group bg-white rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-lg hover:shadow-2xl transition-all flex flex-col sm:flex-row h-auto sm:h-48"
                      >
                        <div className="w-full sm:w-1/3 h-40 sm:h-full relative overflow-hidden">
                          <img src={book.cover} alt={book.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                        </div>
                        <div className="w-full sm:w-2/3 p-5 sm:p-6 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-[7px] sm:text-[8px] font-black text-[#3B82F6] uppercase tracking-widest bg-[#3B82F6]/5 px-2 py-1 rounded-md">{book.subject}</span>
                            </div>
                            <h3 className="text-base sm:text-lg font-black text-[#0f172a] line-clamp-1 group-hover:text-[#3B82F6] transition-colors uppercase tracking-tight">{book.title}</h3>
                            <p className="text-slate-400 text-[10px] sm:text-xs font-medium line-clamp-2 mt-1 sm:mt-2">{book.description}</p>
                          </div>
                          <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-slate-50 mt-4 sm:mt-0">
                            <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                              <User className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#3B82F6]" />
                              {book.author}
                            </div>
                            <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                              <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                              12m read
                            </div>
                            <div className="flex items-center gap-1 text-amber-500">
                              <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current" />
                              <span className="text-[9px] sm:text-[10px] font-black">4.9</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                    {classMaterials.length === 0 && (
                      <div className="col-span-full py-16 sm:py-20 bg-white/50 rounded-[2rem] sm:rounded-[3rem] border-4 border-dashed border-slate-100 flex flex-col items-center justify-center">
                        <BookOpen className="w-10 h-10 sm:w-12 sm:h-12 text-slate-200 mb-4" />
                        <p className="text-slate-400 font-black uppercase text-[10px] sm:text-xs tracking-widest">Coming Soon</p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ResourcesContainer;
