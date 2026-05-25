import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Lock, 
  ShieldCheck, 
  User, 
  Mail, 
  Send, 
  ArrowLeft,
  List,
  Download,
  Bookmark,
  MessageSquare,
  FileText,
  Home
} from 'lucide-react';
import { BOOKS } from '../../utils/books';
import PDFViewer from '../../components/Reader/PDFViewer';

const ReaderContainer = () => {
  const { id: bookId } = useParams();
  const navigate = useNavigate();
  const book = BOOKS.find(b => b.id === bookId);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  const isLocked = false;

  if (!book) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="text-center bg-white p-12 rounded-[2.5rem] shadow-xl border border-slate-200">
          <h2 className="text-3xl font-bold text-[#0F172A] mb-4 uppercase tracking-tight">Book Not Found</h2>
          <p className="text-slate-500 mb-8 font-medium">The resource you are looking for does not exist.</p>
          <button 
            onClick={() => navigate('/')}
            className="bg-[#3B82F6] text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg"
          >
            Return to Library
          </button>
        </div>
      </div>
    );
  }

  const handleNext = () => {
    if (currentPage < book.chapters.length) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    setCurrentPage(prev => Math.max(1, prev - 1));
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-slate-50 pt-20">
      {/* Sidebar - Table of Contents */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 340 : 0 }}
        className="bg-white border-r border-slate-200 overflow-hidden flex flex-col shadow-sm z-20 h-[calc(100vh-80px)] sticky top-20"
      >
        <div className="p-8 border-b border-slate-100 bg-white">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-slate-500 hover:text-[#3B82F6] font-bold text-[10px] uppercase tracking-widest mb-8 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Library
          </button>
          
          <div className="flex gap-4">
            <img src={book.cover} alt={book.title} className="w-16 h-20 object-cover rounded-lg shadow-md border border-slate-100" />
            <div className="flex flex-col justify-center">
              <h4 className="font-bold text-[#0F172A] leading-tight line-clamp-2 text-sm uppercase tracking-tight">{book.title}</h4>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[8px] font-black bg-blue-50 text-[#3B82F6] px-2 py-1 rounded uppercase">{book.grade}</span>
                <span className="text-[8px] font-black bg-slate-50 text-slate-500 px-2 py-1 rounded uppercase">{book.subject}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 space-y-3 bg-white">
          <div className="flex items-center gap-2 px-2 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">
            <List className="w-3.5 h-3.5" />
            Contents
          </div>
          {book.chapters.map((chapter, idx) => {
            const chapterLocked = false;
            return (
              <button 
                key={chapter.id}
                onClick={() => !chapterLocked && setCurrentPage(idx + 1)}
                className={`w-full text-left px-5 py-4 rounded-xl text-sm font-bold transition-all border ${
                  currentPage === idx + 1 
                  ? 'bg-blue-50 text-[#3B82F6] border-blue-200 shadow-sm' 
                  : chapterLocked 
                    ? 'bg-slate-50 text-slate-400 border-slate-100 cursor-not-allowed opacity-70'
                    : 'text-slate-700 hover:bg-slate-50 border-transparent hover:border-slate-100'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="truncate pr-4">{idx + 1}. {chapter.title}</span>
                  {chapterLocked && <Lock className="w-3 h-3" />}
                </div>
              </button>
            );
          })}
        </div>

        <div className="p-6 bg-slate-50 border-t border-slate-100">
          <button className="w-full flex items-center justify-center gap-3 bg-[#3B82F6] text-white py-4 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20">
            <Download className="w-4 h-4" />
            Download Resource
          </button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-slate-50 min-h-[calc(100vh-80px)]">
        <div className="flex-1 overflow-y-auto pt-6 pb-20 px-6 sm:px-10">
          <AnimatePresence mode="wait">
            {!isLocked ? (
              <motion.div 
                key="viewer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="max-w-5xl mx-auto"
              >
                <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden min-h-[800px] flex items-center justify-center">
                  <PDFViewer fileUrl={book.pdfUrl} pageNumber={currentPage} setPageNumber={setCurrentPage} />
                </div>
              </motion.div>
            ) : (
              /* High-Contrast Premium Access Form */
              <motion.div 
                key="gate"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-lg mx-auto py-8"
              >
                <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-8 sm:p-10 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-[#3B82F6]"></div>
                  
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-blue-50 text-[#3B82F6] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner border border-blue-100">
                      <ShieldCheck className="w-8 h-8" />
                    </div>
                    <h2 className="text-2xl font-bold text-[#0F172A] mb-3 tracking-tight">Unlock Full Course Access</h2>
                    <p className="text-slate-500 font-medium text-sm max-w-[280px] mx-auto">
                      Please verify your student credentials to continue reading the full material.
                    </p>
                  </div>

                  <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block ml-1">Student Full Name</label>
                      <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#3B82F6] transition-colors" />
                        <input 
                          type="text" 
                          placeholder="Enter your full name"
                          className="w-full bg-white border border-slate-300 rounded-xl py-3 pl-11 pr-6 text-sm text-slate-900 focus:ring-2 focus:ring-[#3B82F6] focus:border-[#3B82F6] outline-none transition-all font-semibold"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block ml-1">Institutional Email</label>
                      <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#3B82F6] transition-colors" />
                        <input 
                          type="email" 
                          placeholder="student@school.edu"
                          className="w-full bg-white border border-slate-300 rounded-xl py-3 pl-11 pr-6 text-sm text-slate-900 focus:ring-2 focus:ring-[#3B82F6] focus:border-[#3B82F6] outline-none transition-all font-semibold"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block ml-1">Request Message / Student ID</label>
                      <div className="relative group">
                        <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-slate-400 group-focus-within:text-[#3B82F6] transition-colors" />
                        <textarea 
                          placeholder="Provide your student ID or reason for access..."
                          rows="3"
                          className="w-full bg-white border border-slate-300 rounded-xl py-3 pl-11 pr-6 text-sm text-slate-900 focus:ring-2 focus:ring-[#3B82F6] focus:border-[#3B82F6] outline-none transition-all font-semibold resize-none"
                        ></textarea>
                      </div>
                    </div>

                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl w-full shadow-lg hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-3 group">
                      <span className="text-xs uppercase tracking-widest">Submit Access Request</span>
                      <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                  </form>

                  <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-center gap-6">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      <Mail className="w-3.5 h-3.5" />
                      admin@educationconnect.com
                    </div>
                    <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-slate-200"></div>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Support: +91 98765 43210
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default ReaderContainer;
