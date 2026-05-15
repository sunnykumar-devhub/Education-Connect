import React, { useState, useMemo, useCallback, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { ChevronLeft, ChevronRight, Loader2, AlertCircle, RefreshCcw, ZoomIn, ZoomOut, Maximize2, Minimize2, BookOpen, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PDFViewer = ({ fileUrl, pageNumber, setPageNumber }) => {
  const [numPages, setNumPages] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [scale, setScale] = useState(1.2);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef(null);

  const onDocumentLoadSuccess = useCallback(({ numPages }) => {
    setNumPages(numPages);
    setLoading(false);
    setError(null);
  }, []);

  const onDocumentLoadError = useCallback((err) => {
    console.error('PDF Load Error:', err);
    setError('Failed to load document. The file might be missing or corrupted.');
    setLoading(false);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div ref={containerRef} className={`flex flex-col items-center w-full transition-all duration-500 ${isFullscreen ? 'bg-[#0f172a] p-0' : 'max-w-5xl mx-auto px-4'}`}>
      {/* Premium E-Reader Toolbar */}
      <div className={`w-full flex items-center justify-between px-8 py-4 mb-6 rounded-3xl transition-all ${isFullscreen ? 'bg-white/10 backdrop-blur-md border-b border-white/5 sticky top-0 z-50 rounded-none' : 'bg-white shadow-xl border border-slate-100'}`}>
        <div className="flex items-center gap-4">
          <div className={`p-2.5 rounded-xl ${isFullscreen ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
            <BookOpen className="w-5 h-5" />
          </div>
          <div className="hidden sm:block">
            <h3 className={`text-sm font-black uppercase tracking-widest ${isFullscreen ? 'text-white' : 'text-[#0f172a]'}`}>Digital Library</h3>
            <p className={`text-[10px] font-bold uppercase tracking-tight ${isFullscreen ? 'text-slate-400' : 'text-slate-400'}`}>Premium Access</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-50/50 p-1.5 rounded-2xl border border-slate-100">
          <button 
            onClick={() => setScale(prev => Math.max(0.5, prev - 0.2))}
            className="p-2 hover:bg-white rounded-xl text-slate-500 hover:text-blue-600 transition-all active:scale-95"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-[10px] font-black text-[#0f172a] min-w-[50px] text-center">{Math.round(scale * 100)}%</span>
          <button 
            onClick={() => setScale(prev => Math.min(2.5, prev + 0.2))}
            className="p-2 hover:bg-white rounded-xl text-slate-500 hover:text-blue-600 transition-all active:scale-95"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={toggleFullscreen}
            className={`p-3 rounded-2xl transition-all active:scale-95 border ${isFullscreen ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' : 'bg-slate-50 border-slate-100 text-slate-600 hover:bg-slate-100'}`}
          >
            {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Immersive Reader Stage */}
      <div className={`relative w-full overflow-hidden transition-all duration-500 ${isFullscreen ? 'flex-1 flex items-center justify-center bg-[#0f172a]' : 'bg-white rounded-[3rem] shadow-2xl border border-slate-100 min-h-[700px]'}`}>
        <AnimatePresence mode="wait">
          {loading && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm z-20"
            >
              <div className="relative">
                <div className="w-20 h-20 border-4 border-blue-50 rounded-full animate-spin border-t-blue-600"></div>
                <Loader2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-blue-600 animate-pulse" />
              </div>
              <p className="mt-6 text-[#0f172a] font-black uppercase text-[10px] tracking-[0.4em] animate-pulse">Initializing Reader...</p>
            </motion.div>
          )}

          {error ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center p-16 text-center"
            >
              <div className="bg-red-50 p-8 rounded-[2rem] mb-8 text-red-500">
                <AlertCircle className="w-16 h-16" />
              </div>
              <h3 className="text-2xl font-black text-[#0f172a] uppercase tracking-tight mb-4">{error}</h3>
              <button 
                onClick={() => window.location.reload()}
                className="flex items-center gap-3 bg-[#0f172a] text-white px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-blue-500/20"
              >
                <RefreshCcw className="w-4 h-4" />
                Reload Document
              </button>
            </motion.div>
          ) : (
            <div className={`custom-pdf-document overflow-auto w-full flex justify-center p-4 sm:p-12 custom-scrollbar ${isFullscreen ? 'max-h-screen' : 'max-h-[85vh]'}`}>
              <Document
                file={fileUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentLoadError}
                loading=""
              >
                <motion.div
                  key={pageNumber}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                  className="shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] rounded-lg overflow-hidden border border-slate-200"
                >
                  <Page 
                    pageNumber={pageNumber} 
                    scale={scale}
                    renderTextLayer={true}
                    renderAnnotationLayer={true}
                  />
                </motion.div>
              </Document>
            </div>
          )}
        </AnimatePresence>

        {/* Floating Navigation Controls */}
        {!error && !loading && (
          <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-8 px-10 py-5 rounded-[2.5rem] shadow-2xl border transition-all duration-500 z-30 ${isFullscreen ? 'bg-white/10 backdrop-blur-xl border-white/20 text-white' : 'bg-[#0f172a] border-white/10 text-white'}`}>
            <button
              disabled={pageNumber <= 1}
              onClick={() => setPageNumber(prev => prev - 1)}
              className="p-3 hover:bg-white/10 rounded-full disabled:opacity-10 transition-all active:scale-90 group"
            >
              <ChevronLeft className="w-8 h-8 group-hover:-translate-x-1 transition-transform" />
            </button>
            
            <div className="flex flex-col items-center min-w-[140px]">
              <span className={`text-[10px] font-black uppercase tracking-[0.3em] mb-1 ${isFullscreen ? 'text-blue-400' : 'text-blue-500'}`}>Reading Now</span>
              <span className="text-xl font-black tracking-tighter">PAGE {pageNumber} <span className="text-slate-500 font-medium mx-1">/</span> {numPages || '...'}</span>
            </div>

            <button
              disabled={numPages && pageNumber >= numPages}
              onClick={() => setPageNumber(prev => prev + 1)}
              className="p-3 hover:bg-white/10 rounded-full disabled:opacity-10 transition-all active:scale-90 group"
            >
              <ChevronRight className="w-8 h-8 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PDFViewer;

