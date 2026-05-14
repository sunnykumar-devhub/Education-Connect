import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, List, ArrowLeft, Bookmark, Download, Lock, Send, User, Mail, MessageSquare } from 'lucide-react';
import { BOOKS } from '../../utils/books';

const ReaderContainer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const book = BOOKS.find(b => b.id === id);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  if (!book) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
        <div className="bg-white p-12 rounded-[3rem] shadow-xl text-center max-w-md border border-slate-100">
          <div className="w-20 h-20 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Lock className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-black text-[#0f172a] uppercase tracking-tighter mb-4">Resource Not Found</h2>
          <p className="text-slate-500 font-medium mb-8">The material you are looking for might have been moved or removed.</p>
          <button 
            onClick={() => navigate('/')}
            className="w-full bg-[#3B82F6] text-white py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-blue-500/20"
          >
            Return to Library
          </button>
        </div>
      </div>
    );
  }

  const handleNext = () => {
    if (currentPage < 4) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return (
    <div className="flex h-[calc(100vh-80px)] bg-[#f8fafc] overflow-hidden">
      {/* Reader Sidebar - Deep Navy Theme */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 340 : 0 }}
        className="bg-white border-r border-slate-100 overflow-hidden flex flex-col shadow-xl z-20"
      >
        <div className="p-8 border-b border-slate-50">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-slate-400 hover:text-[#3B82F6] font-bold text-[10px] uppercase tracking-widest mb-8 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Library
          </button>
          
          <div className="flex gap-5">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#3B82F6] to-blue-600 rounded-lg blur opacity-20"></div>
              <img src={book.cover} alt={book.title} className="relative w-20 h-28 object-cover rounded-lg shadow-md" />
            </div>
            <div className="flex flex-col justify-center">
              <h4 className="font-black text-[#0f172a] leading-tight line-clamp-2 mb-2 uppercase tracking-tighter text-lg">{book.title}</h4>
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-black bg-blue-50 text-[#3B82F6] px-2 py-1 rounded-md uppercase tracking-wider">{book.grade}</span>
                <span className="text-[9px] font-black bg-slate-100 text-slate-500 px-2 py-1 rounded-md uppercase tracking-wider">{book.subject}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 space-y-3 custom-scrollbar">
          <div className="flex items-center gap-2 px-2 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-50 mb-4">
            <List className="w-3.5 h-3.5" />
            Contents
          </div>
          {book.chapters.map((chapter, idx) => (
            <button 
              key={chapter.id}
              onClick={() => setCurrentPage(idx + 1)}
              className={`w-full text-left px-5 py-4 rounded-2xl text-sm font-bold transition-all border ${
                currentPage === idx + 1 
                ? 'bg-blue-50 text-[#3B82F6] border-[#3B82F6]/20 shadow-sm' 
                : 'text-slate-500 hover:bg-slate-50 border-transparent'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="truncate pr-4">{chapter.id}. {chapter.title}</span>
                {idx >= 3 && (
                  <div className="bg-slate-200 p-1 rounded-lg">
                    <Lock className="w-3 h-3 text-slate-500" />
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        <div className="p-6 bg-slate-50/50 border-t border-slate-100">
          <button className="w-full flex items-center justify-center gap-3 bg-[#3B82F6] text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20">
            <Download className="w-4 h-4" />
            Download Resource
          </button>
        </div>
      </motion.aside>

      {/* Main Reader Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Reader Toolbar */}
        <div className="bg-white border-b border-slate-100 px-8 py-5 flex items-center justify-between z-10">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-3 hover:bg-slate-50 rounded-xl transition-all text-slate-400 hover:text-[#0f172a] border border-transparent hover:border-slate-100"
          >
            <List className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-6 bg-slate-50 px-6 py-3 rounded-2xl border border-slate-100 shadow-inner">
            <button 
              disabled={currentPage === 1}
              onClick={handlePrev}
              className="p-1 text-slate-400 hover:text-[#3B82F6] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex flex-col items-center min-w-[100px]">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Page</span>
              <span className="text-sm font-black text-[#0f172a]">{currentPage} <span className="text-slate-300 font-medium">/ 4</span></span>
            </div>
            <button 
              disabled={currentPage === 4}
              onClick={handleNext}
              className="p-1 text-slate-400 hover:text-[#3B82F6] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <button className="p-3 text-slate-400 hover:text-[#3B82F6] transition-all border border-transparent hover:border-slate-100 rounded-xl">
            <Bookmark className="w-5 h-5" />
          </button>
        </div>

        {/* Content Viewer */}
        <div className="flex-1 overflow-y-auto p-10 md:p-16 flex justify-center custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentPage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl w-full"
            >
              {currentPage < 4 ? (
                <div className="bg-white shadow-[0_40px_80px_-15px_rgba(0,0,0,0.05)] rounded-[3rem] min-h-full p-16 md:p-24 border border-slate-100 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#3B82F6] to-indigo-500 opacity-50"></div>
                  
                  <h1 className="text-4xl font-black text-[#0f172a] mb-12 border-b border-slate-50 pb-10 uppercase tracking-tighter">
                    {book.chapters[currentPage - 1].title}
                  </h1>
                  
                  <div className="text-slate-600 leading-[1.8] text-lg space-y-8 font-medium">
                    <p className="first-letter:text-5xl first-letter:font-black first-letter:text-[#3B82F6] first-letter:mr-3 first-letter:float-left">
                      {book.chapters[currentPage - 1].content}
                    </p>
                    <p>
                      In the pursuit of academic excellence, it is essential to master the fundamental concepts presented in this chapter. 
                      Education Connect provides these tools to empower every student on their journey toward success.
                    </p>
                    <div className="bg-slate-50 p-10 rounded-[2rem] border border-slate-100 italic relative">
                      <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#3B82F6] text-white rounded-2xl flex items-center justify-center shadow-lg">
                        <Star className="w-6 h-6" />
                      </div>
                      <p className="text-[#0f172a] font-bold text-xl leading-relaxed">
                        "Education is the most powerful weapon which you can use to change the world."
                      </p>
                      <cite className="block mt-4 text-slate-400 font-black uppercase text-[10px] tracking-widest not-italic">— Nelson Mandela</cite>
                    </div>
                  </div>
                  
                  <div className="mt-20 flex justify-between pt-12 border-t border-slate-50">
                    <button 
                      onClick={handlePrev}
                      disabled={currentPage === 1}
                      className="flex items-center gap-3 font-black uppercase text-xs tracking-widest text-[#0f172a] hover:text-[#3B82F6] disabled:opacity-20 transition-all group"
                    >
                      <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                      Previous Page
                    </button>
                    <button 
                      onClick={handleNext}
                      className="flex items-center gap-3 font-black uppercase text-xs tracking-widest text-[#3B82F6] hover:text-[#0f172a] transition-all group"
                    >
                      Next Page
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              ) : (
                /* Contact Admin Access Form - Page 4 Lock */
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white shadow-[0_50px_100px_-20px_rgba(15,23,42,0.1)] rounded-[3rem] p-16 md:p-24 border border-slate-100 text-center relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-full bg-[#0f172a] opacity-[0.02] pointer-events-none"></div>
                  <div className="relative z-10">
                    <div className="w-24 h-24 bg-blue-50 text-[#3B82F6] rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-inner">
                      <Lock className="w-10 h-10" />
                    </div>
                    
                    <h2 className="text-4xl font-black text-[#0f172a] uppercase tracking-tighter mb-4 leading-none">Premium Content Locked</h2>
                    <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.3em] mb-12">Complete the form below to request full access</p>
                    
                    <div className="max-w-md mx-auto space-y-6">
                      <div className="relative group">
                        <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-[#3B82F6] transition-colors" />
                        <input 
                          type="text" 
                          placeholder="Full Name"
                          className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl py-4 pl-14 pr-6 outline-none focus:border-[#3B82F6]/30 focus:bg-white transition-all font-bold text-sm"
                        />
                      </div>
                      
                      <div className="relative group">
                        <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-[#3B82F6] transition-colors" />
                        <input 
                          type="email" 
                          placeholder="Email Address"
                          className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl py-4 pl-14 pr-6 outline-none focus:border-[#3B82F6]/30 focus:bg-white transition-all font-bold text-sm"
                        />
                      </div>
                      
                      <div className="relative group">
                        <MessageSquare className="absolute left-5 top-5 w-5 h-5 text-slate-300 group-focus-within:text-[#3B82F6] transition-colors" />
                        <textarea 
                          placeholder="Message to Administrator"
                          rows="4"
                          className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl py-4 pl-14 pr-6 outline-none focus:border-[#3B82F6]/30 focus:bg-white transition-all font-bold text-sm resize-none"
                        ></textarea>
                      </div>
                      
                      <button className="w-full bg-[#3B82F6] text-white py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-[#0f172a] transition-all shadow-xl shadow-blue-200 flex items-center justify-center gap-3 group">
                        <span>Send Access Request</span>
                        <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </button>
                    </div>
                    
                    <div className="mt-12 pt-10 border-t border-slate-50 flex flex-col items-center">
                      <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-4">Or Contact Us Directly</p>
                      <div className="flex gap-4">
                        <span className="text-xs font-black text-[#0f172a]">admin@educationconnect.com</span>
                        <div className="w-1 h-1 bg-slate-200 rounded-full my-auto"></div>
                        <span className="text-xs font-black text-[#0f172a]">+91 98765 43210</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default ReaderContainer;
