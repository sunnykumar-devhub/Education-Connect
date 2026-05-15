import React, { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, BookOpen, GraduationCap, LayoutGrid, ArrowRight, Book, Layers, ShieldCheck, Zap, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import BookCard from '../../components/BookCard';
import { BOOKS } from '../../utils/books';

const Home = () => {
  const [selectedGrade, setSelectedGrade] = useState('All');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const grades = useMemo(() => ['All', ...Array.from(new Set(BOOKS.map(m => m.grade)))], []);
  const subjects = useMemo(() => ['All', ...Array.from(new Set(BOOKS.map(m => m.subject)))], []);

  const filteredMaterials = useMemo(() => {
    return BOOKS.filter(material => {
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
    <div className="pb-24 bg-slate-50 min-h-screen">
      <section className="bg-[#0f172a] text-white relative min-h-[85vh] flex items-center overflow-hidden pt-20">
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
            <div className="flex justify-center mb-10">
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md shadow-2xl">
                <span className="flex h-2 w-2 rounded-full bg-[#3B82F6] animate-pulse"></span>
                <span className="text-[10px] sm:text-xs font-bold text-slate-300 uppercase tracking-[0.2em]">
                  ✨ Introducing the Education Connect Vault
                </span>
              </div>
            </div>
            
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] font-black mb-10 leading-[1.1] tracking-tight uppercase">
              Digital <br/>
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Connection
              </span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-slate-300 mb-12 leading-relaxed max-w-2xl mx-auto font-medium">
              Education Connect's mission is to bridge the gap between students and high-quality study materials through a seamless, tech-driven digital library experience.
            </p>
            
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

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-start">
          
          {/* Left Sidebar - Sticky */}
          <aside className="lg:col-span-3 sticky top-8 h-auto lg:h-[calc(100vh-6rem)] overflow-y-auto scrollbar-hide">
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200">
              <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-100">
                <div className="bg-blue-600 p-2 rounded-lg shadow-sm">
                  <LayoutGrid className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 tracking-tight">Class Resources</h3>
              </div>
              
              <div className="space-y-1">
                {[
                  { name: 'Class 1-5', count: 12 },
                  { name: 'Class 6-8', count: 8 },
                  { name: 'Class 9', count: 15 },
                  { name: 'Class 10', count: 22 },
                  { name: 'Class 11', count: 18 },
                  { name: 'Class 12', count: 25 }
                ].map((cls) => (
                  <button 
                    key={cls.name}
                    onClick={() => setSelectedGrade(cls.name)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                      selectedGrade === cls.name 
                        ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600 font-bold' 
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-sm">
                      {cls.name}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-medium ${selectedGrade === cls.name ? 'text-blue-400' : 'text-slate-400'}`}>{cls.count} Books</span>
                      <ChevronRight className={`w-4 h-4 transition-colors ${selectedGrade === cls.name ? 'text-blue-500' : 'text-slate-300'}`} />
                    </div>
                  </button>
                ))}
              </div>

              <Link 
                to="/resources"
                className="mt-8 w-full flex items-center justify-center gap-2 bg-slate-900 text-white py-4 rounded-xl font-bold text-xs hover:bg-blue-600 transition-all shadow-lg shadow-slate-900/10"
              >
                View Full Repository
              </Link>
            </div>
          </aside>

          {/* Right Content - Natural Scroll */}
          <main className="lg:col-span-9">
             <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-[#0f172a] bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent rounded-2xl p-8 sm:p-12 text-white relative overflow-hidden mb-8 sm:mb-12 border border-white/5"
              >
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                <div className="relative z-10">
                   <span className="bg-blue-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest mb-6 inline-block">Featured Material</span>
                   <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight mb-4">Mastering Digital <br/> Literacies</h2>
                   <p className="text-slate-300 font-medium text-base sm:text-lg max-w-md mb-8 leading-relaxed">Access our latest interactive guide for Class 10-12 students on navigating the digital academic landscape.</p>
                   <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-sm hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 transition-all active:scale-95">
                      Explore Now
                   </button>
                </div>
             </motion.div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {BOOKS.slice(0, 4).map(material => (
                   <BookCard key={material.id} book={material} isNewPath={true} />
                ))}
             </div>
          </main>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 -mt-8 sm:-mt-16 relative z-20">
        <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-12 border border-slate-200">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 sm:gap-10 mb-8 sm:mb-16 border-b border-slate-100 pb-8 sm:pb-12">
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="bg-slate-900 p-4 rounded-xl shadow-lg shadow-slate-900/10">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Library Catalog</h2>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                  <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">{filteredMaterials.length} Materials Live</p>
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
