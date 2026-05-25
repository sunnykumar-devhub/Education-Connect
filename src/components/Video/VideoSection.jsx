import React, { useMemo, useState } from 'react';
import { Film, Search, Sparkles, TrendingUp, History, Compass } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { VIDEOS } from '../../data/videos';
import { getVideoPrimarySource, getVideoProgressPercentage, getVideoSources } from '../../utils/videoUtils';
import VideoCard from './VideoCard';
import VideoPlayer from './VideoPlayer';
import VideoSkeleton from './components/VideoSkeleton';
import { useWatchHistory } from './hooks/useWatchHistory';

const FILTERS = ['All', 'Mathematics', 'Science', 'Tutorials'];
const sectionClass = 'rounded-3xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur-sm sm:p-6';

const getSubtitles = (video) => video.subtitles || [];

const VideoSection = () => {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All');
  const [activeVideo, setActiveVideo] = useState(null);
  const history = useWatchHistory();

  const normalized = query.trim().toLowerCase();

  const filtered = useMemo(() => {
    return VIDEOS.filter((video) => {
      const filterMatch = filter === 'All' || video.category === filter;
      const queryMatch = !normalized
        || video.title.toLowerCase().includes(normalized)
        || video.instructor.toLowerCase().includes(normalized)
        || video.description.toLowerCase().includes(normalized);
      return filterMatch && queryMatch;
    });
  }, [filter, normalized]);

  const featured = filtered[0] || VIDEOS[0];

  const continueWatching = useMemo(() => {
    return VIDEOS.filter((video) => {
      const p = getVideoProgressPercentage(video.id, video.duration);
      return p > 0 && p < 95;
    });
  }, [history]);

  const trending = useMemo(() => [...filtered].sort((a, b) => Number.parseFloat(b.views) - Number.parseFloat(a.views)).slice(0, 6), [filtered]);
  const recommended = useMemo(() => filtered.slice(0, 8), [filtered]);

  const open = (video) => setActiveVideo(video);

  const nextVideo = () => {
    if (!activeVideo || !filtered.length) return;
    const idx = filtered.findIndex((v) => v.id === activeVideo.id);
    setActiveVideo(filtered[(idx + 1) % filtered.length]);
  };

  return (
    <section className="space-y-8">
      <header className="overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-900 p-5 text-white shadow-xl sm:rounded-[2.5rem] sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em]">
              <Sparkles className="h-3.5 w-3.5" /> Premium Streaming Classroom
            </p>
            <h2 className="text-[clamp(1.35rem,3.5vw,2.2rem)] font-black leading-tight">Learn Faster With Guided Video Tracks</h2>
          </div>
          <div className="w-full max-w-md">
            <label className="relative block">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-300" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search videos, topic or mentor"
                className="h-11 w-full rounded-xl border border-white/20 bg-white/10 pl-10 pr-4 text-sm text-white placeholder:text-slate-300 focus:border-blue-400 focus:outline-none"
                aria-label="Search videos"
              />
            </label>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {FILTERS.map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition ${filter === item ? 'bg-white text-slate-900' : 'bg-white/10 text-slate-100 hover:bg-white/20'}`}
            >
              {item}
            </button>
          ))}
        </div>
      </header>

      <div className={sectionClass}>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="inline-flex items-center gap-2 text-sm font-extrabold uppercase tracking-wider text-slate-700"><Film className="h-4 w-4 text-blue-600" /> Featured Lesson</h3>
        </div>
        <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="lg:sticky lg:top-24">
            <VideoPlayer
              videoSrc={getVideoPrimarySource(featured)}
              videoSources={getVideoSources(featured)}
              thumbnail={featured.thumbnail}
              videoId={featured.id}
              title={featured.title}
              onNext={nextVideo}
              autoplayNext
              subtitles={getSubtitles(featured)}
              originalUrl={featured.driveUrl || featured.url}
            />
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {filtered.slice(1, 4).map((video) => (
              <VideoCard key={video.id} video={video} onSelect={open} />
            ))}
          </div>
        </div>
      </div>

      {continueWatching.length > 0 && (
        <div className={sectionClass}>
          <h3 className="mb-4 inline-flex items-center gap-2 text-sm font-extrabold uppercase tracking-wider text-slate-700"><History className="h-4 w-4 text-amber-600" /> Continue Watching</h3>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {continueWatching.map((video) => <VideoCard key={video.id} video={video} onSelect={open} />)}
          </div>
        </div>
      )}

      <div className={sectionClass}>
        <h3 className="mb-4 inline-flex items-center gap-2 text-sm font-extrabold uppercase tracking-wider text-slate-700"><TrendingUp className="h-4 w-4 text-rose-600" /> Trending Now</h3>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {trending.length ? trending.map((video) => <VideoCard key={video.id} video={video} onSelect={open} />) : Array.from({ length: 3 }).map((_, i) => <VideoSkeleton key={i} />)}
        </div>
      </div>

      <div className={sectionClass}>
        <h3 className="mb-4 inline-flex items-center gap-2 text-sm font-extrabold uppercase tracking-wider text-slate-700"><Compass className="h-4 w-4 text-emerald-600" /> Recommended For You</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {recommended.map((video) => <VideoCard key={video.id} video={video} onSelect={open} />)}
        </div>
      </div>

      <AnimatePresence>
        {activeVideo && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[170] bg-slate-950/85 p-3 backdrop-blur-md sm:p-6">
            <div className="mx-auto flex h-full w-full max-w-6xl flex-col gap-4 overflow-y-auto rounded-3xl border border-slate-700 bg-slate-900 p-4 sm:p-6">
              <VideoPlayer
                videoSrc={getVideoPrimarySource(activeVideo)}
                videoSources={getVideoSources(activeVideo)}
                thumbnail={activeVideo.thumbnail}
                videoId={activeVideo.id}
                title={activeVideo.title}
                onNext={nextVideo}
                autoplayNext
                subtitles={getSubtitles(activeVideo)}
                originalUrl={activeVideo.driveUrl || activeVideo.url}
              />
              <div className="space-y-3 rounded-2xl bg-slate-950/70 p-4 text-slate-200">
                <h4 className="text-lg font-extrabold">{activeVideo.title}</h4>
                <p className="text-sm text-slate-400">{activeVideo.description}</p>
                <button onClick={() => setActiveVideo(null)} className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white">Close</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default VideoSection;
