import React, { useState, useMemo } from 'react';
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
  Home,
  Film,
  Play,
  X
} from 'lucide-react';
import { BOOKS } from '../../utils/books';
import PDFViewer from '../../components/Reader/PDFViewer';
import { VIDEOS } from '../../data/videos';
import VideoPlayer from '../../components/Video/VideoPlayer';
import VideoCard from '../../components/Video/VideoCard';

const ReaderContainer = () => {
  const { id: bookId } = useParams();
  const navigate = useNavigate();
  const book = BOOKS.find(b => b.id === bookId);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isVideosDrawerOpen, setIsVideosDrawerOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);

  const relatedVideos = useMemo(() => {
    if (!book) return [];
    
    // Filter by subject matching category, or matching grade
    const filtered = VIDEOS.filter(video => 
      video.category.toLowerCase() === book.subject.toLowerCase() ||
      video.grade.toLowerCase() === book.grade.toLowerCase()
    );

    // If no direct matches, return general tutorial/lectures as helpful resources
    if (filtered.length === 0) {
      return VIDEOS.slice(0, 3);
    }
    
    return filtered;
  }, [book]);
  
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

  const renderSidebarContent = () => (
    <div className="flex flex-col h-full bg-white">
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
        <div className="flex items-center justify-between px-2 py-4 mb-2">
          <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
            <List className="w-3.5 h-3.5" />
            Contents
          </div>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-1.5 hover:bg-slate-100 rounded-lg text-slate-400"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        {book.chapters.map((chapter, idx) => {
          const chapterLocked = false;
          return (
            <button 
              key={chapter.id}
              onClick={() => {
                if (!chapterLocked) {
                  setCurrentPage(idx + 1);
                  if (window.innerWidth < 1024) {
                    setIsSidebarOpen(false);
                  }
                }
              }}
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

      <div className="p-6 bg-slate-50 border-t border-slate-100 space-y-3">
        <button className="w-full flex items-center justify-center gap-3 bg-slate-900 text-white py-4 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10">
          <Download className="w-4 h-4" />
          Download Resource
        </button>
        <button 
          onClick={() => setIsVideosDrawerOpen(true)}
          className="w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-xs uppercase tracking-widest transition-all shadow-lg shadow-blue-500/20"
        >
          <Film className="w-4 h-4 animate-pulse" />
          Related Lectures ({relatedVideos.length})
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-slate-50 pt-20">
      {/* Sidebar - Table of Contents (Desktop inline, responsive hide/show) */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 340 : 0 }}
        className="hidden lg:flex bg-white border-r border-slate-200 overflow-hidden flex-col shadow-sm z-20 h-[calc(100vh-80px)] sticky top-20"
      >
        <div className="w-[340px] flex-shrink-0 flex flex-col h-full">
          {renderSidebarContent()}
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

      {/* Floating Table of Contents Chapters Button */}
      <div className="fixed bottom-6 left-6 z-[100]">
        <button 
          onClick={() => setIsSidebarOpen(prev => !prev)}
          className="flex items-center gap-2.5 bg-slate-900 hover:bg-slate-800 text-white px-6 py-4 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all border border-slate-800 font-black text-[10px] sm:text-xs uppercase tracking-widest flex items-center justify-center"
        >
          <List className="w-4 h-4" />
          {isSidebarOpen ? 'Hide Chapters' : 'Show Chapters'}
        </button>
      </div>

      {/* Mobile Table of Contents Drawer */}
      <AnimatePresence>
        {isSidebarOpen && (
          <div className="fixed inset-0 z-[120] lg:hidden">
            {/* Backdrop blur */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            />
            {/* Drawer container */}
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 240 }}
              className="absolute left-0 top-0 bottom-0 w-[320px] max-w-[85%] bg-white shadow-2xl flex flex-col border-r border-slate-200"
            >
              {renderSidebarContent()}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Related Lectures Button */}
      <div className="fixed bottom-6 right-6 z-[100]">
        <button 
          onClick={() => setIsVideosDrawerOpen(true)}
          className="flex items-center gap-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-4 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all border border-white/20 font-black text-[10px] sm:text-xs uppercase tracking-widest"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
          </span>
          <Film className="w-4 h-4 animate-pulse" />
          Related Lectures ({relatedVideos.length})
        </button>
      </div>

      {/* Right Side Drawer for Related Video Lectures */}
      <AnimatePresence>
        {isVideosDrawerOpen && (
          <>
            {/* Backdrop blur */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsVideosDrawerOpen(false)}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[110]"
            />
            {/* Drawer container */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 240 }}
              className="fixed right-0 top-0 bottom-0 w-full sm:w-[420px] bg-slate-900 text-slate-100 z-[120] shadow-2xl flex flex-col border-l border-slate-800"
            >
              {/* Header */}
              <div className="p-6 border-b border-slate-850 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-600 p-2 rounded-xl text-white">
                    <Film className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-black text-sm uppercase tracking-tight text-white">Related Lectures</h3>
                    <p className="text-[10px] font-bold text-[#3B82F6] uppercase tracking-widest mt-0.5">{book.subject} Curriculum</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsVideosDrawerOpen(false)}
                  className="p-2 hover:bg-slate-800 rounded-xl text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Related Videos List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {relatedVideos.map((video) => (
                  <div 
                    key={video.id}
                    onClick={() => setActiveVideo(video)}
                    className="bg-slate-850 hover:bg-slate-800/80 rounded-2xl p-4 border border-slate-800 hover:border-blue-500/50 transition-all cursor-pointer group flex gap-4"
                  >
                    <div className="relative aspect-video w-24 bg-slate-950 rounded-xl overflow-hidden flex-shrink-0">
                      <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/45 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="w-5 h-5 text-white fill-white" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0 space-y-1">
                      <span className="text-[8px] font-black bg-blue-900/40 text-blue-400 px-2 py-0.5 rounded uppercase tracking-wider">
                        {video.grade}
                      </span>
                      <h4 className="text-white font-bold text-xs uppercase tracking-tight line-clamp-2 leading-snug group-hover:text-blue-400 transition-colors">
                        {video.title}
                      </h4>
                      <p className="text-slate-400 text-[10px] font-medium truncate font-semibold">
                        {video.instructor}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer info message */}
              <div className="p-6 bg-slate-950 border-t border-slate-850 text-center">
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">
                  Interactive Video Hub • Education Connect
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Immersive Cinema Modal Overlay for Textbook Reader */}
      <AnimatePresence>
        {activeVideo && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden max-w-5xl w-full flex flex-col"
            >
              <div className="bg-slate-50 border-b border-slate-200 px-8 py-5 flex items-center justify-between text-slate-900">
                <div className="flex items-center gap-3">
                  <span className="text-[9px] font-black bg-blue-50 text-[#3B82F6] px-2.5 py-1 rounded-lg uppercase tracking-wider">{activeVideo.category}</span>
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">{activeVideo.grade}</span>
                </div>
                <button onClick={() => setActiveVideo(null)} className="p-2.5 hover:bg-slate-200 rounded-xl text-slate-500 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="bg-slate-950 p-6 flex items-center justify-center">
                <VideoPlayer videoSrc={activeVideo.url} thumbnail={activeVideo.thumbnail} videoId={activeVideo.id} title={activeVideo.title} />
              </div>
              <div className="p-8 sm:p-10 space-y-4 text-slate-900">
                <h3 className="text-xl font-black uppercase tracking-tight">{activeVideo.title}</h3>
                <p className="text-slate-500 text-sm font-medium leading-relaxed">{activeVideo.description}</p>
                <div className="flex items-center gap-2 pt-2 border-t border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-widest">
                  <span>Instructor: {activeVideo.instructor}</span>
                  <span>•</span>
                  <span>{activeVideo.views}</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReaderContainer;
