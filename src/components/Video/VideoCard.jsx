import React, { memo, useMemo } from 'react';
import { Clock3, Eye, Play, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatVideoDuration, getVideoProgressPercentage } from '../../utils/videoUtils';

const VideoCard = ({ video, onSelect, priority = false }) => {
  const progress = useMemo(
    () => getVideoProgressPercentage(video.id, video.duration),
    [video.id, video.duration]
  );

  const completed = progress >= 95;

  return (
    <motion.button
      whileHover={{ y: -6 }}
      onClick={() => onSelect(video)}
      className="group relative w-full overflow-hidden rounded-3xl border border-slate-200 bg-white text-left shadow-sm transition-all hover:shadow-xl hover:shadow-slate-300/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      aria-label={`Open ${video.title}`}
    >
      <div className="relative aspect-video overflow-hidden bg-slate-900">
        <img
          src={video.thumbnail}
          alt={video.title}
          loading={priority ? 'eager' : 'lazy'}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
        <div className="absolute left-3 top-3 rounded-full bg-blue-600/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
          {video.category}
        </div>
        {completed && (
          <div className="absolute right-3 top-3 rounded-full bg-emerald-500 p-1.5 text-white">
            <CheckCircle2 className="h-4 w-4" />
          </div>
        )}
        <div className="absolute bottom-3 left-3 flex items-center gap-3 text-[10px] font-semibold text-white">
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-900/80 px-2 py-1">
            <Clock3 className="h-3.5 w-3.5" />
            {formatVideoDuration(video.duration)}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-900/80 px-2 py-1">
            <Eye className="h-3.5 w-3.5" />
            {video.views}
          </span>
        </div>
        <div className="absolute inset-0 grid place-items-center opacity-0 transition-opacity group-hover:opacity-100">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-blue-600 shadow-xl">
            <Play className="h-5 w-5 fill-current" />
          </span>
        </div>
      </div>

      {progress > 0 && (
        <div className="h-1.5 w-full bg-slate-100">
          <div className={`h-full ${completed ? 'bg-emerald-500' : 'bg-blue-600'}`} style={{ width: `${progress}%` }} />
        </div>
      )}

      <div className="space-y-3 p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
          <span className="rounded-full bg-blue-50 px-2 py-1 text-blue-700">{video.grade}</span>
          <span>{video.instructor}</span>
        </div>
        <h3 className="line-clamp-2 text-sm font-extrabold leading-tight text-slate-900 group-hover:text-blue-700 sm:text-base">
          {video.title}
        </h3>
        <p className="line-clamp-2 text-xs text-slate-500 sm:text-sm">{video.description}</p>
      </div>
    </motion.button>
  );
};

export default memo(VideoCard);
