import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, GraduationCap } from 'lucide-react';
import Modal from '../../components/common/Modal';
import ContactForm from '../ContactForm/ContactForm';
import { useAccessControl } from '../../hooks/useAccessControl';

const BookReader = ({ book, onBack }) => {
  const { currentPage, isLocked, nextPage, prevPage, goToPage } = useAccessControl(1, 3);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Reader Nav */}
      <nav className="border-b border-slate-100 px-6 py-4 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-10">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-600 hover:text-academic-600 transition-colors">
          <ChevronLeft size={20} />
          <span className="font-medium">Library</span>
        </button>
        <div className="text-center">
          <h2 className="font-bold text-slate-800 line-clamp-1">{book.title}</h2>
          <p className="text-xs text-slate-400">Page {currentPage} of {book.pages.length}</p>
        </div>
        <div className="w-20"></div>
      </nav>

      {/* Content */}
      <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className={`prose prose-slate lg:prose-xl ${isLocked ? 'blur-content select-none pointer-events-none' : ''}`}
          >
            <span className="text-academic-600 font-bold text-sm uppercase tracking-wider mb-4 block">Chapter {currentPage}</span>
            <p className="text-slate-700 leading-relaxed text-lg">
              {book.pages[currentPage - 1]}
            </p>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer Controls */}
      <footer className="border-t border-slate-100 p-6 flex justify-center items-center gap-8 bg-slate-50/50">
        <button 
          disabled={currentPage === 1}
          onClick={prevPage}
          className="p-3 rounded-full hover:bg-white shadow-sm disabled:opacity-30 transition-all border border-transparent hover:border-slate-200"
        >
          <ChevronLeft size={24} />
        </button>
        <div className="flex gap-2">
          {book.pages.map((_, i) => (
            <button 
              key={i}
              onClick={() => goToPage(i + 1)}
              className={`w-10 h-10 rounded-lg font-bold transition-all ${currentPage === i + 1 ? 'bg-academic-600 text-white shadow-lg shadow-academic-200' : 'bg-white text-slate-400 hover:text-academic-600'}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <button 
          disabled={currentPage === book.pages.length}
          onClick={nextPage}
          className="p-3 rounded-full hover:bg-white shadow-sm disabled:opacity-30 transition-all border border-transparent hover:border-slate-200 rotate-180"
        >
          <ChevronLeft size={24} />
        </button>
      </footer>

      {/* Lock Modal */}
      <Modal 
        isOpen={isLocked} 
        onClose={() => goToPage(3)} 
        title="Restricted Access"
        icon={GraduationCap}
      >
        <ContactForm onSuccess={() => goToPage(3)} />
      </Modal>
    </div>
  );
};

export default BookReader;
