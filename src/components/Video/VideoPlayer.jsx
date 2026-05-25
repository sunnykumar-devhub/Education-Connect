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
  Loader2, 
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  getGoogleDriveEmbedUrl, 
  isGoogleDriveUrl, 
  getVideoProgressTime, 
  saveVideoProgressTime 
} from '../../utils/videoUtils';

const VideoPlayer = ({ videoSrc, thumbnail, videoId = 'lecture_video', title = 'Lecture Video' }) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  const isDriveVideo = isGoogleDriveUrl(videoSrc);
  const driveEmbedUrl = isDriveVideo ? getGoogleDriveEmbedUrl(videoSrc) : null;

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [loadError, setLoadError] = useState(false);

  // Resume progress from localStorage
  useEffect(() => {
    if (!isDriveVideo && videoRef.current) {
      const savedTime = getVideoProgressTime(videoId);
      if (savedTime > 0) {
        videoRef.current.currentTime = savedTime;
        setCurrentTime(savedTime);
      }
    }
  }, [videoId, isDriveVideo]);

  // Periodic progress saving (HTML5 video only)
  useEffect(() => {
    if (!isDriveVideo && isPlaying) {
      const interval = setInterval(() => {
        if (videoRef.current) {
          saveVideoProgressTime(videoId, videoRef.current.currentTime);
        }
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, videoId, isDriveVideo]);

  // Controls auto-hide timer
  useEffect(() => {
    let timeout;
    if (isPlaying && isHovered && !isDriveVideo) {
      timeout = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [isPlaying, isHovered, currentTime, isDriveVideo]);

  const handlePlayPause = () => {
    if (isDriveVideo) return; // handled by drive player
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().catch(err => {
          console.error('Play failed:', err);
          setLoadError(true);
        });
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
      const newMuted = !isMuted;
      videoRef.current.muted = newMuted;
      setIsMuted(newMuted);
      if (newMuted) {
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
      className={`relative w-full rounded-[2rem] overflow-hidden bg-slate-950 border border-slate-900 shadow-2xl transition-all aspect-video select-none ${
        isFullscreen ? 'h-screen w-screen rounded-none border-none' : ''
      }`}
    >
      {isDriveVideo ? (
        /* GOOGLE DRIVE VIDEO IFRAME PLAYER */
        <div className="w-full h-full relative">
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0f172a] z-30">
              <Loader2 className="w-12 h-12 text-[#3B82F6] animate-spin mb-4" />
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 animate-pulse">
                Loading Google Drive Resource...
              </p>
            </div>
          )}
          <iframe
            src={driveEmbedUrl}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setLoadError(true);
              setIsLoading(false);
            }}
            className="w-full h-full object-cover"
            allow="autoplay; fullscreen"
            allowFullScreen
            title={title}
          />
          {/* Bezel Title Overlay */}
          <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md px-4 py-2 rounded-xl text-white border border-white/5 flex items-center gap-2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#3B82F6]">Drive Stream</span>
            <span className="text-xs font-bold">{title}</span>
          </div>
        </div>
      ) : (
        /* NATIVE CUSTOM HTML5 PLAYER */
        <div className="w-full h-full relative">
          <video
            ref={videoRef}
            src={videoSrc}
            poster={thumbnail}
            onClick={handlePlayPause}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onWaiting={() => setIsLoading(true)}
            onPlaying={() => setIsLoading(false)}
            onError={() => {
              setLoadError(true);
              setIsLoading(false);
            }}
            className="w-full h-full object-cover cursor-pointer"
            playsInline
          />

          {/* Buffering Indicator */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-30 pointer-events-none">
              <Loader2 className="w-12 h-12 text-[#3B82F6] animate-spin" />
            </div>
          )}

          {/* Center Play overlay */}
          <AnimatePresence>
            {!isPlaying && !isLoading && !loadError && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={handlePlayPause}
                className="absolute inset-0 flex items-center justify-center bg-black/35 z-20 cursor-pointer"
              >
                <div className="w-20 h-20 bg-[#3B82F6] rounded-full flex items-center justify-center shadow-3xl hover:scale-110 active:scale-95 transition-all border-4 border-white/20">
                  <Play className="w-8 h-8 text-white fill-white ml-1" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Custom controls bar */}
          <AnimatePresence>
            {showControls && !loadError && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/95 via-black/50 to-transparent flex flex-col gap-4 z-30 pt-16"
              >
                {/* Scrubbing timeline */}
                <div className="flex items-center w-full">
                  <input
                    type="range"
                    min={0}
                    max={duration || 100}
                    value={currentTime}
                    onChange={handleProgressScrub}
                    className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-white/25 focus:outline-none transition-all accent-[#3B82F6] hover:h-2"
                    style={{
                      background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${
                        duration > 0 ? (currentTime / duration) * 100 : 0
                      }%, rgba(255,255,255,0.2) ${
                        duration > 0 ? (currentTime / duration) * 100 : 0
                      }%, rgba(255,255,255,0.2) 100%)`
                    }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  {/* Left Controls */}
                  <div className="flex items-center gap-4 text-white">
                    <button onClick={handlePlayPause} className="p-2 hover:text-[#3B82F6] transition-colors active:scale-95">
                      {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white" />}
                    </button>
                    <button onClick={() => {
                      if (videoRef.current) {
                        videoRef.current.currentTime = 0;
                        videoRef.current.play().catch(e => console.log(e));
                        setIsPlaying(true);
                      }
                    }} className="p-2 hover:text-[#3B82F6] transition-colors active:scale-95">
                      <RotateCcw className="w-4 h-4" />
                    </button>
                    <span className="text-xs font-bold text-slate-300">
                      {formatTime(currentTime)} <span className="text-slate-500 mx-1">/</span> {formatTime(duration)}
                    </span>
                  </div>

                  {/* Right Controls */}
                  <div className="flex items-center gap-5 text-white">
                    {/* Volume Bar */}
                    <div className="flex items-center gap-1 group/volume">
                      <button onClick={toggleMute} className="p-2 hover:text-[#3B82F6] transition-colors">
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

                    {/* Speed selection */}
                    <div className="relative group/speed py-1">
                      <button className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider bg-white/10 px-3 py-1.5 rounded-lg hover:bg-white/20 transition-all">
                        <Settings className="w-3.5 h-3.5" />
                        {playbackRate === 1 ? 'Normal' : `${playbackRate}x`}
                      </button>
                      <div className="absolute bottom-full right-0 mb-2 w-24 bg-slate-950/95 border border-white/10 shadow-2xl rounded-xl py-1 opacity-0 invisible group-hover/speed:opacity-100 group-hover/speed:visible transition-all flex flex-col overflow-hidden">
                        {[0.5, 1, 1.5, 2].map((rate) => (
                          <button
                            key={rate}
                            onClick={() => handleSpeedChange(rate)}
                            className={`px-4 py-2 text-left text-xs font-bold hover:bg-[#3B82F6] hover:text-white transition-colors ${
                              playbackRate === rate ? 'text-[#3B82F6]' : 'text-slate-300'
                            }`}
                          >
                            {rate === 1 ? 'Normal' : `${rate}x`}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Fullscreen control */}
                    <button onClick={toggleFullscreen} className="p-2 hover:text-[#3B82F6] transition-colors">
                      {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Error Overlay */}
      {loadError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-[#0f172a] text-center z-40 border border-red-500/20">
          <div className="bg-red-500/10 p-5 rounded-2xl text-red-500 mb-4 border border-red-500/25">
            <AlertCircle className="w-12 h-12" />
          </div>
          <h4 className="text-lg font-black text-white uppercase tracking-tight">Stream Access Restricted</h4>
          <p className="text-slate-400 text-xs mt-2 max-w-sm leading-relaxed">
            The video could not be loaded directly. This occurs if permissions are private, or the link is broken.
          </p>
          <a
            href={videoSrc}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 flex items-center gap-2 bg-[#3B82F6] hover:bg-blue-600 text-white font-bold px-6 py-3.5 rounded-xl text-xs uppercase tracking-widest shadow-xl shadow-blue-500/20 transition-all active:scale-95"
          >
            <span>Open in Google Drive</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
