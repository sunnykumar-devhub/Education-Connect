import React, { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, BookOpen, GraduationCap, LayoutGrid, ArrowRight, Book, Layers, ShieldCheck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import BookCard from '../../components/BookCard';
import { MATERIALS } from '../../data/materials';

const Home = () => {
  const [selectedGrade, setSelectedGrade] = useState('All');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Memoize unique filters to avoid recalculating on every render
  const grades = useMemo(() => ['All', ...Array.from(new Set(MATERIALS.map(m => m.grade)))], []);
  const subjects = useMemo(() => ['All', ...Array.from(new Set(MATERIALS.map(m => m.subject)))], []);

  // Optimized filtering logic
  const filteredMaterials = useMemo(() => {
    return MATERIALS.filter(material => {
      const matchGrade = selectedGrade === 'All' || material.grade === selectedGrade;
      const matchSubject = selectedSubject === 'All' || material.subject === selectedSubject;
      const matchSearch = material.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          material.subject.toLowerCase().includes(searchQuery.toLowerCase());
      return matchGrade && matchSubject && matchSearch;
    });
  }, [selectedGrade, selectedSubject, searchQuery]);

  const resetFilters = useCallback(() => {
    setSelectedGrade('All');
    setSelectedSubject('All');
    setSearchQuery('');
  }, []);

  return (
    <div className="pb-24">
      {/* Hero Section - Redesigned for Premium SaaS Look */}
      <section className="bg-[#0f172a] text-white relative min-h-[85vh] flex items-center overflow-hidden pt-20">
        {/* Subtle Background Depth */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[70%] bg-[#3B82F6]/10 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-[10%] left-[-5%] w-[40%] h-[60%] bg-white/[0.02] blur-[100px] rounded-full"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-20 relative z-10 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-5xl mx-auto text-center"
          >
            {/* Pill Badge */}
            <div className="flex justify-center mb-10">
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md shadow-2xl">
                <span className="flex h-2 w-2 rounded-full bg-[#3B82F6] animate-pulse"></span>
                <span className="text-[10px] sm:text-xs font-bold text-slate-300 uppercase tracking-[0.2em]">
                  ✨ Introducing the Education Connect Vault
                </span>
              </div>
            </div>
            
            {/* Headline */}
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] font-black mb-10 leading-[1.1] tracking-tight uppercase">
              Digital <br/>
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Connection
              </span>
            </h1>
            
            {/* Subheadline */}
            <p className="text-base sm:text-lg md:text-xl text-slate-300 mb-12 leading-relaxed max-w-2xl mx-auto font-medium">
              Education Connect's mission is to bridge the gap between students and high-quality study materials through a seamless, tech-driven digital library experience.
            </p>
            
            {/* Premium Search Bar */}
            <div className="relative max-w-3xl mx-auto group">
              <div className="flex items-center bg-white rounded-[1.5rem] sm:rounded-[2.5rem] p-2 shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all focus-within:ring-4 focus-within:ring-[#3B82F6]/20">
                <div className="pl-6 flex items-center">
                  <Search className="w-5 h-5 sm:w-6 sm:h-6 text-slate-400" />
                </div>
                <input 
                  type="text"
                  placeholder="Search textbooks, literature, or subjects..."
                  className="flex-1 bg-transparent border-none py-4 sm:py-6 px-4 outline-none text-slate-900 text-sm sm:text-lg font-semibold placeholder:text-slate-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="bg-[#3B82F6] text-white px-8 sm:px-12 py-3.5 sm:py-5 rounded-xl sm:rounded-[2rem] font-bold text-sm sm:text-base transition-all hover:bg-blue-600 active:scale-95 shadow-lg shadow-blue-500/20">
                  Search
                </button>
              </div>
              
              {/* Search Suggestions (Subtle) */}
              <div className="flex flex-wrap justify-center gap-4 mt-6">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Trending:</span>
                {['Mathematics', 'Physics', 'History'].map(tag => (
                  <button 
                    key={tag}
                    onClick={() => setSearchQuery(tag)}
                    className="text-[10px] font-bold text-slate-400 hover:text-[#3B82F6] transition-colors uppercase tracking-widest"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Academic Hub Section - Refined */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="flex flex-col lg:flex-row gap-10 xl:gap-16 items-start">
          {/* Class Navigation - Matching User Image */}
          <div className="w-full lg:w-1/3 xl:w-1/4">
            <div className="lg:sticky lg:top-32 bg-white p-6 sm:p-10 rounded-[2rem] sm:rounded-[3rem] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-100">
              <div className="flex items-center gap-3 mb-6 sm:mb-10 pb-4 sm:pb-6 border-b border-slate-50">
                <div className="bg-[#3B82F6] p-2 rounded-lg">
                  <LayoutGrid className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-black text-[#0f172a] uppercase tracking-tighter">Class Resources</h3>
              </div>
              
              <div className="space-y-1 sm:space-y-2">
                {[
                  { name: 'Class 1-5', count: 12 },
                  { name: 'Class 6-8', count: 8 },
                  { name: 'Class 9', count: 15 },
                  { name: 'Class 10', count: 22 },
                  { name: 'Class 11', count: 18 },
                  { name: 'Class 12', count: 25 }
                ].map((cls) => (
                  <Link 
                    key={cls.name}
                    to={`/category/grade/${cls.name.toLowerCase().replace(/ /g, '-')}`}
                    className="flex items-center justify-between p-3 sm:p-4 rounded-xl sm:rounded-2xl hover:bg-slate-50 group transition-all"
                  >
                    <span className="text-xs sm:text-sm font-black text-[#0f172a] uppercase tracking-widest group-hover:text-[#3B82F6] transition-colors">
                      {cls.name}
                    </span>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <span className="text-[8px] sm:text-[10px] font-bold text-slate-300 group-hover:text-[#3B82F6]/50">{cls.count} Books</span>
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-slate-200 group-hover:text-[#3B82F6] group-hover:translate-x-1 transition-all" />
                    </div>
                  </Link>
                ))}
              </div>

              <Link 
                to="/resources"
                className="mt-8 sm:mt-10 w-full flex items-center justify-center gap-2 bg-[#3B82F6] text-white py-4 sm:py-5 rounded-xl sm:rounded-2xl font-black uppercase text-[9px] sm:text-[10px] tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-[#3B82F6]/20"
              >
                View Full Repository
              </Link>
            </div>
          </div>

          {/* Featured Content Area */}
          <div className="w-full lg:w-2/3 xl:w-3/4">
             <div className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-12 text-white relative overflow-hidden mb-8 sm:mb-12">
                <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-[#3B82F6]/20 blur-[60px] sm:blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
                <div className="relative z-10">
                   <span className="bg-[#3B82F6] text-white text-[8px] sm:text-[10px] font-black px-3 sm:px-4 py-1.5 rounded-full uppercase tracking-widest mb-4 sm:mb-6 inline-block">Featured Material</span>
                   <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter leading-none mb-4 sm:mb-6">Mastering Digital <br/> Literacies</h2>
                   <p className="text-white/60 font-medium text-base sm:text-lg max-w-md mb-8 sm:mb-10 leading-relaxed">Access our latest interactive guide for Class 10-12 students on navigating the digital academic landscape.</p>
                   <button className="bg-[#3B82F6] text-white px-8 sm:px-10 py-4 sm:py-5 rounded-xl sm:rounded-2xl font-black uppercase text-[10px] sm:text-xs tracking-widest hover:bg-blue-600 transition-all shadow-2xl active:scale-95">
                      Explore Now
                   </button>
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {MATERIALS.slice(0, 4).map(material => (
                   <BookCard key={material.id} book={material} isNewPath={true} />
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* Library Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 -mt-8 sm:-mt-16 relative z-20">
        <div className="bg-white rounded-[2rem] sm:rounded-[3rem] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.1)] p-6 sm:p-12 border border-slate-100">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 sm:gap-10 mb-8 sm:mb-16 border-b-2 border-slate-50 pb-8 sm:pb-12">
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="bg-[#0f172a] p-4 sm:p-5 rounded-2xl sm:rounded-[1.5rem] shadow-2xl shadow-[#0f172a]/20">
                <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-[#0f172a] uppercase tracking-tighter">Library Catalog</h2>
                <div className="flex items-center gap-2 sm:gap-3 mt-1 sm:mt-1.5">
                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-green-500 animate-pulse"></div>
                  <p className="text-slate-400 text-[8px] sm:text-[10px] font-black uppercase tracking-[0.2em]">{filteredMaterials.length} Materials Live</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 sm:gap-4">
              <div className="flex-1 sm:flex-none flex items-center gap-2 sm:gap-3 bg-slate-50 px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl border-2 border-slate-100 hover:border-[#0f172a]/20 transition-all group">
                <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-[#0f172a] group-hover:text-[#3B82F6] transition-colors" />
                <select 
                  className="bg-transparent text-[10px] sm:text-xs font-black text-[#0f172a] outline-none cursor-pointer uppercase tracking-widest w-full sm:w-auto"
                  value={selectedGrade}
                  onChange={(e) => setSelectedGrade(e.target.value)}
                >
                  {grades.map(grade => <option key={grade} value={grade}>{grade === 'All' ? 'All Grades' : grade}</option>)}
                </select>
              </div>

              <div className="flex-1 sm:flex-none flex items-center gap-2 sm:gap-3 bg-slate-50 px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl border-2 border-slate-100 hover:border-[#0f172a]/20 transition-all group">
                <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-[#0f172a] group-hover:text-[#3B82F6] transition-colors" />
                <select 
                  className="bg-transparent text-[10px] sm:text-xs font-black text-[#0f172a] outline-none cursor-pointer uppercase tracking-widest w-full sm:w-auto"
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                >
                  {subjects.map(sub => <option key={sub} value={sub}>{sub === 'All' ? 'All Subjects' : sub}</option>)}
                </select>
              </div>
            </div>
          </div>

          {filteredMaterials.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
              {filteredMaterials.map((material, index) => (
                <motion.div
                  key={material.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5,
                    delay: index * 0.05,
                    ease: [0.21, 0.45, 0.32, 0.9]
                  }}
                >
                  <BookCard book={material} isNewPath={true} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-32 bg-slate-50/50 rounded-[3rem] border-4 border-dashed border-slate-100 animate-in fade-in duration-500">
              <Search className="w-20 h-20 text-slate-200 mx-auto mb-8" />
              <h3 className="text-2xl font-black text-[#0f172a] uppercase tracking-tight">No Resources Matching Search</h3>
              <p className="text-slate-500 font-medium text-base mt-3 max-w-sm mx-auto">Try adjusting your filters or search term to discover more materials.</p>
              <button 
                onClick={resetFilters}
                className="mt-10 bg-[#3B82F6] text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-blue-500/20 hover:bg-blue-600 transition-all transform hover:scale-105"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
