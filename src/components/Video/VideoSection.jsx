import React, { useState, useMemo, useCallback } from 'react';
import { Play, Search, Filter, LayoutGrid, List, X, BookOpen, Clock, ArrowRight, Film } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { VIDEOS } from '../../data/videos';
import VideoCard from './VideoCard';
import VideoPlayer from './VideoPlayer';

const VideoSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeVideo, setActiveVideo] = useState(null);
  const [isGridView, setIsGridView] = useState(true);

  // Extract categories dynamically
  const categories = useMemo(() => ['All', ...Array.from(new Set(VIDEOS.map(v => v.category)))], []);

  // Filter videos based on selection and search text
  const filteredVideos = useMemo(() => {
    return VIDEOS.filter(video => {
      const matchCategory = selectedCategory === 'All' || video.category === selectedCategory;
      const matchSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          video.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          video.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleVideoSelect = useCallback((video) => {
    setActiveVideo(video);
  }, []);

  const handleCloseTheater = useCallback(() => {
    setActiveVideo(null);
  }, []);

  return (
    <div className="space-y-12">
      {/* Streaming Hub Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-150 pb-8">
        <div className="flex items-center gap-4">
          <div className="bg-[#3B82F6] p-3 rounded-2xl shadow-lg shadow-blue-500/10 text-white">
            <Film className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-[#0f172a] uppercase tracking-tight">Interactive Lectures</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                {VIDEOS.length} Digital Lectures Ready
              </span>
            </div>
          </div>
        </div>

        {/* Filters and search parameters */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Search bar */}
          <div className="relative group min-w-[240px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#3B82F6] transition-colors" />
            <input 
              type="text" 
              placeholder="Search lectures or teacher..."
              className="bg-white border border-slate-200 rounded-2xl pl-11 pr-5 py-3.5 text-xs text-[#0f172a] outline-none w-full focus:border-[#3B82F6] transition-all font-bold"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#0f172a]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Subject category filters */}
          <div className="flex bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/50">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-[10px] font-black uppercase tracking-wider rounded-xl transition-all ${
                  selectedCategory === cat 
                    ? 'bg-white text-[#3B82F6] shadow-sm border border-slate-200/30' 
                    : 'text-slate-500 hover:text-[#0f172a]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Layout type toggle buttons */}
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button 
              onClick={() => setIsGridView(true)} 
              className={`p-2 rounded-lg transition-all ${isGridView ? 'bg-white text-[#3B82F6] shadow-sm' : 'text-slate-400 hover:text-slate-700'}`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setIsGridView(false)} 
              className={`p-2 rounded-lg transition-all ${!isGridView ? 'bg-white text-[#3B82F6] shadow-sm' : 'text-slate-400 hover:text-slate-700'}`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Dynamic streaming items catalog list */}
      <AnimatePresence mode="wait">
        {filteredVideos.length > 0 ? (
          isGridView ? (
            /* GRID VIEW LAYOUT */
            <motion.div 
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredVideos.map((video) => (
                <VideoCard key={video.id} video={video} onSelect={handleVideoSelect} />
              ))}
            </motion.div>
          ) : (
            /* LIST VIEW LAYOUT (Coursera style row items) */
            <motion.div 
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {filteredVideos.map((video) => (
                <motion.div 
                  key={video.id}
                  whileHover={{ x: 6 }}
                  onClick={() => handleVideoSelect(video)}
                  className="bg-white rounded-3xl p-5 border border-slate-150 shadow-md hover:shadow-xl transition-all cursor-pointer flex flex-col sm:flex-row items-center gap-6 group"
                >
                  {/* Left thumbnail column */}
                  <div className="relative aspect-video w-full sm:w-48 bg-slate-900 rounded-2xl overflow-hidden flex-shrink-0">
                    <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-10 h-10 bg-[#3B82F6] text-white rounded-full flex items-center justify-center">
                        <Play className="w-4 h-4 fill-white ml-0.5" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 left-2 bg-black/70 px-2 py-1 rounded text-[8px] font-black text-white uppercase tracking-wider">
                      {Math.round(video.duration / 60)} mins
                    </div>
                  </div>

                  {/* Right metadata column */}
                  <div className="flex-1 w-full text-center sm:text-left space-y-2">
                    <div className="flex items-center justify-center sm:justify-start gap-2">
                      <span className="text-[8px] font-black bg-blue-50 text-[#3B82F6] px-2 py-0.5 rounded uppercase">{video.category}</span>
                      <span className="text-[8px] font-black bg-slate-50 text-slate-400 px-2 py-0.5 rounded uppercase">{video.grade}</span>
                    </div>
                    <h4 className="text-[#0f172a] font-black text-sm uppercase tracking-tight group-hover:text-[#3B82F6] transition-colors">
                      {video.title}
                    </h4>
                    <p className="text-slate-400 text-xs font-medium line-clamp-2 pr-6">
                      {video.description}
                    </p>
                    <div className="flex items-center justify-center sm:justify-start gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest pt-2">
                      <span>{video.instructor}</span>
                      <span>•</span>
                      <span>{video.views}</span>
                    </div>
                  </div>

                  <div className="hidden lg:block pr-4">
                    <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-[#3B82F6] group-hover:translate-x-1.5 transition-all" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )
        ) : (
          /* SKELETON EMPTY STATE */
          <motion.div 
            key="empty"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-24 bg-white rounded-[2.5rem] border border-slate-150 p-12"
          >
            <BookOpen className="w-16 h-16 text-slate-200 mx-auto mb-6" />
            <h4 className="text-lg font-black text-[#0f172a] uppercase tracking-tight">No Lectures Matching Search</h4>
            <p className="text-slate-400 text-xs mt-2 max-w-sm mx-auto leading-relaxed">
              We couldn't find any lectures matching your query. Check your spelling or clear your subject filters.
            </p>
            <button 
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-8 bg-[#3B82F6] hover:bg-blue-600 text-white font-bold px-8 py-4 rounded-xl text-xs uppercase tracking-widest shadow-xl shadow-blue-500/20"
            >
              Clear All Filters
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* IMMERSIVE CINEMA THEATER OVERLAY VIEWER MODAL */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md"
          >
            {/* Modal Box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="bg-white rounded-2xl sm:rounded-[2.5rem] shadow-2xl border border-slate-200 max-h-[90vh] sm:max-h-[95vh] max-w-5xl w-full flex flex-col overflow-y-auto custom-scrollbar"
            >
              {/* Theater Header controls */}
              <div className="bg-slate-50 border-b border-slate-200 px-8 py-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-[9px] font-black bg-blue-50 text-[#3B82F6] px-2.5 py-1 rounded-lg uppercase tracking-wider">
                    {activeVideo.category}
                  </span>
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                    {activeVideo.grade}
                  </span>
                </div>
                <button 
                  onClick={handleCloseTheater}
                  className="p-2.5 hover:bg-slate-200 rounded-xl text-slate-500 hover:text-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Theater Video Body Player */}
              <div className="bg-slate-950 p-2 sm:p-6 flex items-center justify-center">
                <VideoPlayer 
                  videoSrc={activeVideo.url} 
                  thumbnail={activeVideo.thumbnail}
                  videoId={activeVideo.id}
                  title={activeVideo.title}
                />
              </div>

              {/* Theater Footer course details */}
              <div className="p-8 sm:p-10 space-y-4">
                <h3 className="text-xl font-black text-[#0f172a] uppercase tracking-tight leading-snug">
                  {activeVideo.title}
                </h3>
                <p className="text-slate-500 text-sm font-medium leading-relaxed">
                  {activeVideo.description}
                </p>
                <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-xs font-black text-slate-700">
                      {activeVideo.instructor.charAt(0)}
                    </div>
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-widest">{activeVideo.instructor}</span>
                  </div>
                  <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-slate-200"></div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                    <Clock className="w-4 h-4 text-[#3B82F6]" />
                    Duration: {Math.round(activeVideo.duration / 60)} mins
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VideoSection;
