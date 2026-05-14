import React, { useState, useMemo, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { ChevronLeft, ChevronRight, Loader2, AlertCircle, RefreshCcw } from 'lucide-react';

// Setup PDF.js worker (CDN for maximum reliability in production)
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PDFViewer = ({ fileUrl, pageNumber, setPageNumber }) => {
  const [numPages, setNumPages] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Memoized page width for performance
  const pageWidth = useMemo(() => Math.min(window.innerWidth * 0.9, 800), []);

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

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    // Triggers re-render and re-fetch
  };

  return (
    <div className="flex flex-col items-center w-full max-w-5xl mx-auto px-4">
      <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100 relative min-h-[600px] w-full flex items-center justify-center">
        {loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50/80 backdrop-blur-sm z-20">
            <Loader2 className="w-12 h-12 text-[#3B82F6] animate-spin mb-4" />
            <p className="text-[#0f172a] font-black uppercase text-[10px] tracking-[0.3em]">Loading Digital Vault...</p>
          </div>
        )}

        {error ? (
          <div className="flex flex-col items-center p-12 text-center animate-in fade-in zoom-in duration-300">
            <div className="bg-red-50 p-6 rounded-3xl mb-6">
              <AlertCircle className="w-16 h-16 text-red-500" />
            </div>
            <h3 className="text-2xl font-black text-[#0f172a] uppercase tracking-tight mb-3">{error}</h3>
            <p className="text-slate-500 text-sm mb-8 max-w-md mx-auto">Please check your internet connection or verify the asset exists in the library folder.</p>
            <button 
              onClick={handleRetry}
              className="flex items-center gap-2 bg-[#0f172a] text-white px-8 py-4 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-[#3B82F6] transition-all"
            >
              <RefreshCcw className="w-4 h-4" />
              Try Reloading
            </button>
          </div>
        ) : (
          <div className="custom-pdf-document overflow-auto max-h-[85vh] w-full flex justify-center bg-slate-100 p-4 custom-scrollbar">
            <Document
              file={fileUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              loading=""
              rotate={0}
            >
              <Page 
                pageNumber={pageNumber} 
                width={pageWidth}
                renderTextLayer={true}
                renderAnnotationLayer={true}
                className="shadow-2xl border-8 border-white rounded-sm"
              />
            </Document>
          </div>
        )}
      </div>

      {/* Navigation Controls */}
      {!error && !loading && (
        <div className="mt-10 flex items-center gap-8 bg-[#0f172a] text-white px-10 py-4 rounded-[2rem] shadow-2xl border border-white/10 animate-in slide-in-from-bottom duration-500">
          <button
            disabled={pageNumber <= 1}
            onClick={() => setPageNumber(prev => prev - 1)}
            className="p-2 hover:bg-white/10 rounded-full disabled:opacity-20 transition-all active:scale-90"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          
          <div className="flex flex-col items-center min-w-[120px]">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#3B82F6] mb-1">Interactive Reader</span>
            <span className="text-lg font-black tracking-tighter">PAGE {pageNumber} OF {numPages || '...'}</span>
          </div>

          <button
            disabled={numPages && pageNumber >= numPages}
            onClick={() => setPageNumber(prev => prev + 1)}
            className="p-2 hover:bg-white/10 rounded-full disabled:opacity-20 transition-all active:scale-90"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>
      )}
    </div>
  );
};

export default PDFViewer;
