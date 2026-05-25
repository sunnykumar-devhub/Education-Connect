import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  Settings, 
  Maximize, 
  Minimize, 
  Loader2 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const VideoPlayer = ({ videoSrc, thumbnail, videoId = 'featured_tutorial' }) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Load saved progress on mount
  useEffect(() => {
    const saved = localStorage.getItem(`video_progress_${videoId}`);
    if (saved && videoRef.current) {
      const parsedTime = parseFloat(saved);
      videoRef.current.currentTime = parsedTime;
      setCurrentTime(parsedTime);
    }
  }, [videoId]);

  // Save progress periodically when playing
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        if (videoRef.current) {
          localStorage.setItem(`video_progress_${videoId}`, videoRef.current.currentTime.toString());
        }
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, videoId]);

  // Control overlay hide timeout
  useEffect(() => {
    let timeout;
    if (isPlaying && isHovered) {
      timeout = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [isPlaying, isHovered, currentTime]);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().catch(err => console.log('Playback error:', err));
        setIsPlaying(true);
      }
      setShowControls(true);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      setIsLoading(false);
    }
  };

  const handleProgressScrub = (e) => {
    if (videoRef.current && duration > 0) {
      const scrubTime = parseFloat(e.target.value);
      videoRef.current.currentTime = scrubTime;
      setCurrentTime(scrubTime);
    }
  };

  const handleVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (videoRef.current) {
      videoRef.current.volume = newVol;
      videoRef.current.muted = newVol === 0;
    }
    setIsMuted(newVol === 0);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const newMutedState = !isMuted;
      videoRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
      if (newMutedState) {
        videoRef.current.volume = 0;
      } else {
        videoRef.current.volume = volume > 0 ? volume : 0.5;
        if (volume === 0) setVolume(0.5);
      }
    }
  };

  const handleSpeedChange = (rate) => {
    setPlaybackRate(rate);
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen()
        .then(() => setIsFullscreen(true))
        .catch(err => console.error('Fullscreen Error:', err));
    } else {
      document.exitFullscreen()
        .then(() => setIsFullscreen(false));
    }
  };

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleRestart = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(err => console.log(err));
      setIsPlaying(true);
    }
  };

  return (
    <div 
      ref={containerRef}
      onMouseEnter={() => {
        setIsHovered(true);
        setShowControls(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        if (isPlaying) setShowControls(false);
      }}
      className={`relative w-full rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl transition-all aspect-video select-none ${
        isFullscreen ? 'h-screen w-screen rounded-none border-none' : ''
      }`}
    >
      {/* HTML5 video element */}
      <video
        ref={videoRef}
        src={videoSrc}
        poster={thumbnail}
        onClick={handlePlayPause}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onWaiting={() => setIsLoading(true)}
        onPlaying={() => setIsLoading(false)}
        className="w-full h-full object-cover cursor-pointer"
        playsInline
      />

      {/* Buffering/Loading Spinner */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-30 pointer-events-none">
          <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
        </div>
      )}

      {/* Big Center Play/Pause Indicator (Only show if not playing or paused) */}
      <AnimatePresence>
        {!isPlaying && !isLoading && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={handlePlayPause}
            className="absolute inset-0 flex items-center justify-center bg-black/35 z-25 cursor-pointer"
          >
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center shadow-3xl hover:scale-110 active:scale-95 transition-all border-4 border-white/20">
              <Play className="w-8 h-8 text-white fill-white ml-1" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom Control Bar Overlay */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col gap-4 z-30 pt-16"
          >
            {/* Timeline slider control */}
            <div className="flex items-center gap-4 w-full">
              <input
                type="range"
                min={0}
                max={duration || 100}
                value={currentTime}
                onChange={handleProgressScrub}
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-white/20 focus:outline-none transition-all accent-blue-500 hover:h-2"
                style={{
                  background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${
                    duration > 0 ? (currentTime / duration) * 100 : 0
                  }%, rgba(255,255,255,0.2) ${
                    duration > 0 ? (currentTime / duration) * 100 : 0
                  }%, rgba(255,255,255,0.2) 100%)`
                }}
              />
            </div>

            {/* Sub-controls line */}
            <div className="flex items-center justify-between">
              {/* Play/Pause & Time */}
              <div className="flex items-center gap-4">
                <button 
                  onClick={handlePlayPause}
                  className="p-2 text-white hover:text-blue-400 transition-colors active:scale-95"
                >
                  {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white" />}
                </button>

                <button 
                  onClick={handleRestart}
                  className="p-2 text-white hover:text-blue-400 transition-colors active:scale-95"
                  title="Restart Tutorial"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <span className="text-xs text-slate-300 font-bold tracking-tight">
                  {formatTime(currentTime)} <span className="text-slate-500 mx-1">/</span> {formatTime(duration)}
                </span>
              </div>

              {/* Volume, Speed and Fullscreen */}
              <div className="flex items-center gap-6">
                {/* Volume bar */}
                <div className="flex items-center gap-2 group/volume">
                  <button 
                    onClick={toggleMute}
                    className="p-2 text-white hover:text-blue-400 transition-colors"
                  >
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </button>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.05}
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-0 opacity-0 group-hover/volume:w-16 group-hover/volume:opacity-100 h-1 rounded-full appearance-none cursor-pointer bg-white/20 focus:outline-none transition-all accent-white"
                  />
                </div>

                {/* Speed Controls Selector */}
                <div className="relative group/speed py-2">
                  <button className="flex items-center gap-1 text-xs text-white bg-white/10 px-3 py-1.5 rounded-lg hover:bg-white/20 transition-all font-black uppercase tracking-wider">
                    <Settings className="w-3.5 h-3.5" />
                    {playbackRate === 1 ? 'Normal' : `${playbackRate}x`}
                  </button>
                  <div className="absolute bottom-full right-0 mb-2 w-24 bg-slate-950/95 border border-white/10 shadow-2xl rounded-xl py-1.5 opacity-0 invisible group-hover/speed:opacity-100 group-hover/speed:visible transition-all flex flex-col overflow-hidden">
                    {[0.5, 1, 1.5, 2].map((rate) => (
                      <button
                        key={rate}
                        onClick={() => handleSpeedChange(rate)}
                        className={`px-4 py-2 text-left text-xs font-bold transition-all hover:bg-blue-600 hover:text-white ${
                          playbackRate === rate ? 'text-blue-400' : 'text-slate-300'
                        }`}
                      >
                        {rate === 1 ? 'Normal' : `${rate}x`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Fullscreen Button */}
                <button 
                  onClick={toggleFullscreen}
                  className="p-2 text-white hover:text-blue-400 transition-colors active:scale-95"
                >
                  {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VideoPlayer;
