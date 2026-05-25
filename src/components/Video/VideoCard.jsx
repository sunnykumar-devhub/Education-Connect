import React, { useState, useEffect } from 'react';
import { Play, Clock, User, Eye, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatVideoDuration, getVideoProgressPercentage } from '../../utils/videoUtils';

const VideoCard = ({ video, onSelect }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check cached progress from localStorage
    const savedProgress = getVideoProgressPercentage(video.id, video.duration);
    setProgress(savedProgress);
  }, [video.id, video.duration]);

  const isCompleted = progress >= 95;

  return (
    <motion.div 
      whileHover={{ y: -8 }}
      onClick={() => onSelect(video)}
      className="bg-white rounded-[2rem] overflow-hidden border border-slate-150 shadow-lg hover:shadow-2xl hover:shadow-blue-500/5 transition-all group cursor-pointer flex flex-col relative"
    >
      {/* Thumbnail section with play state overlays */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
        <img 
          src={video.thumbnail} 
          alt={video.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />

        {/* Center Hover Play Overlay */}
        <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
          <motion.div 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-14 h-14 bg-[#3B82F6] text-white rounded-full flex items-center justify-center shadow-xl border-2 border-white/20"
          >
            <Play className="w-5 h-5 fill-white ml-0.5" />
          </motion.div>
        </div>

        {/* Runtimes and View counts overlays */}
        <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest text-slate-200 border border-white/5 z-10 flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-[#3B82F6]" />
          {formatVideoDuration(video.duration)}
        </div>

        <div className="absolute bottom-3 right-3 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest text-slate-200 border border-white/5 z-10 flex items-center gap-1.5">
          <Eye className="w-3.5 h-3.5 text-[#3B82F6]" />
          {video.views}
        </div>

        {/* Category Chip */}
        <div className="absolute top-3 left-3 bg-[#3B82F6] text-white text-[8px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg z-10 shadow-lg shadow-blue-500/10">
          {video.category}
        </div>

        {/* Completed Checkmark */}
        {isCompleted && (
          <div className="absolute top-3 right-3 bg-green-500 text-white p-1.5 rounded-lg z-10 shadow-lg shadow-green-500/20 flex items-center justify-center">
            <CheckCircle className="w-4 h-4" />
          </div>
        )}
      </div>

      {/* Progress bar under the thumbnail (Coursera style) */}
      {progress > 0 && (
        <div className="w-full bg-slate-100 h-1.5 relative overflow-hidden">
          <div 
            className={`h-full transition-all duration-300 ${isCompleted ? 'bg-green-500' : 'bg-[#3B82F6]'}`} 
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Course metadata card details */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[8px] font-black bg-blue-50 text-[#3B82F6] px-2 py-1 rounded uppercase tracking-wider">{video.grade}</span>
            <span className="text-[8px] font-black bg-slate-50 text-slate-400 px-2 py-1 rounded uppercase tracking-wider">{video.instructor.split(' ')[0]}</span>
          </div>

          <h4 className="font-black text-[#0F172A] text-sm uppercase tracking-tight leading-snug group-hover:text-[#3B82F6] transition-colors line-clamp-2">
            {video.title}
          </h4>
          <p className="text-slate-400 text-[11px] font-medium mt-3 leading-relaxed line-clamp-2">
            {video.description}
          </p>
        </div>

        <div className="flex items-center gap-2.5 mt-6 pt-4 border-t border-slate-50">
          <div className="w-6 h-6 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-[10px] font-black text-slate-700">
            {video.instructor.charAt(0)}
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{video.instructor}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default VideoCard;
