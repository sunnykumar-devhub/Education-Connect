import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  AlertCircle,
  Captions,
  Loader2,
  Maximize,
  Minimize,
  Minimize2,
  Pause,
  PictureInPicture2,
  Play,
  RotateCcw,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { PLAYBACK_SPEEDS, QUALITY_OPTIONS } from './constants/videoConfig';
import {
  buildGoogleDrivePreviewUrl,
  filterSourcesByQuality,
  isGoogleDriveUrl,
  normalizeVideoSources,
  saveWatchHistory,
} from '../../utils/videoUtils';
import { useVideoProgress } from './hooks/useVideoProgress';

const format = (value) => {
  const m = Math.floor(value / 60);
  const s = Math.floor(value % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
};

const VideoPlayer = ({
  videoSrc,
  videoSources = [],
  thumbnail,
  videoId = 'lecture_video',
  title = 'Lecture Video',
  onNext,
  autoplayNext = false,
  subtitles = [],
  originalUrl,
}) => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isBuffering, setIsBuffering] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMini, setIsMini] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('Unable to play this video source in-app.');
  const [subtitlesEnabled, setSubtitlesEnabled] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [quality, setQuality] = useState('auto');
  const [sourceIndex, setSourceIndex] = useState(0);
  const [compatMode, setCompatMode] = useState(false);

  const allSources = useMemo(
    () => normalizeVideoSources(videoSrc, videoSources),
    [videoSrc, videoSources]
  );

  const sourcePool = useMemo(
    () => filterSourcesByQuality(allSources, quality),
    [allSources, quality]
  );

  const activeSource = sourcePool[sourceIndex]?.src || allSources[sourceIndex]?.src || '';
  const hasDriveSource = Boolean(originalUrl && isGoogleDriveUrl(originalUrl));
  const drivePreviewUrl = hasDriveSource ? buildGoogleDrivePreviewUrl(originalUrl) : '';

  const { initialTime } = useVideoProgress(videoId, duration, currentTime, isPlaying);

  useEffect(() => {
    setSourceIndex(0);
    setError(false);
    setErrorMessage('Unable to play this video source in-app.');
    setIsLoading(true);
    setIsBuffering(false);
    setCurrentTime(0);
    setDuration(0);
    setCompatMode(false);
  }, [videoId, quality, videoSrc, videoSources]);

  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = initialTime || 0;
    setCurrentTime(initialTime || 0);
  }, [initialTime, activeSource]);

  useEffect(() => {
    const onFullscreen = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', onFullscreen);
    return () => document.removeEventListener('fullscreenchange', onFullscreen);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    const timeout = window.setTimeout(() => setShowControls(false), 2200);
    return () => window.clearTimeout(timeout);
  }, [isPlaying, currentTime]);

  useEffect(() => {
    const onKey = (e) => {
      const tag = e.target?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea' || tag === 'select') return;
      if (e.code === 'Space' || e.key.toLowerCase() === 'k') {
        e.preventDefault();
        handlePlayPause();
      }
      if (e.key === 'ArrowRight') seek(10);
      if (e.key === 'ArrowLeft') seek(-10);
      if (e.key.toLowerCase() === 'm') toggleMute();
      if (e.key.toLowerCase() === 'f') toggleFullscreen();
      if (e.key.toLowerCase() === 'n' && onNext) onNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  useEffect(() => {
    if (!videoRef.current) return;
    const tracks = videoRef.current.textTracks;
    for (let i = 0; i < tracks.length; i += 1) {
      tracks[i].mode = subtitlesEnabled ? 'showing' : 'disabled';
    }
  }, [subtitlesEnabled]);

  const toggleFullscreen = async () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) await containerRef.current.requestFullscreen();
    else await document.exitFullscreen();
  };

  const handlePlayPause = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().then(() => setIsPlaying(true)).catch(() => setError(true));
    } else {
      v.pause();
      setIsPlaying(false);
    }
    setShowControls(true);
  };

  const seek = (delta) => {
    if (!videoRef.current) return;
    const next = Math.min(Math.max(0, videoRef.current.currentTime + delta), duration || 0);
    videoRef.current.currentTime = next;
    setCurrentTime(next);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    videoRef.current.muted = nextMuted;
    if (!nextMuted && volume === 0) {
      const restored = 0.6;
      setVolume(restored);
      videoRef.current.volume = restored;
    }
  };

  const retryFromStart = () => {
    setError(false);
    setErrorMessage('Unable to play this video source in-app.');
    setSourceIndex(0);
    setIsLoading(true);
    setIsBuffering(false);
  };

  const miniClasses = isMini && !isFullscreen
    ? 'fixed bottom-4 right-4 z-[160] w-[min(94vw,420px)] shadow-2xl'
    : 'w-full';

  return (
    <div className={miniClasses}>
      <div
        ref={containerRef}
        className="group relative flex w-full flex-col justify-center overflow-hidden rounded-2xl border border-slate-800 bg-black shadow-2xl transition-all"
        style={{ aspectRatio: '16/9', maxHeight: '85vh' }}
        onMouseMove={() => setShowControls(true)}
      >
        {!compatMode ? (
          <video
            key={activeSource}
            ref={videoRef}
            src={activeSource}
            poster={thumbnail}
            className="h-full w-full object-contain"
            playsInline
            preload="metadata"
            referrerPolicy="no-referrer"
            onClick={handlePlayPause}
            onTimeUpdate={() => {
              if (!videoRef.current) return;
              const now = videoRef.current.currentTime;
              setCurrentTime(now);
              saveWatchHistory(videoId, now, duration);
              if (autoplayNext && onNext && duration > 0 && now >= duration - 0.5) onNext();
            }}
            onLoadedMetadata={() => {
              setDuration(videoRef.current?.duration || 0);
              setIsLoading(false);
              setError(false);
            }}
            onWaiting={() => {
              setIsBuffering(true);
              setIsLoading(true);
            }}
            onPlaying={() => {
              setIsLoading(false);
              setIsBuffering(false);
              setIsPlaying(true);
            }}
            onPause={() => setIsPlaying(false)}
            onError={() => {
              if (sourceIndex < sourcePool.length - 1) {
                setSourceIndex((prev) => prev + 1);
                setIsLoading(true);
                setIsBuffering(false);
                return;
              }
              if (drivePreviewUrl) {
                setCompatMode(true);
                setError(false);
                setIsLoading(false);
                setIsBuffering(false);
                return;
              }
              setError(true);
              setIsLoading(false);
              setIsBuffering(false);
              setErrorMessage('Playback failed for all available sources. Please retry or use a verified CDN stream.');
            }}
          >
            {subtitles.map((track) => (
              <track key={track.src} kind="subtitles" srcLang={track.lang} label={track.label} src={track.src} />
            ))}
          </video>
        ) : (
          <iframe
            src={drivePreviewUrl}
            title={title}
            className="h-full w-full border-none"
            allow="autoplay; fullscreen"
            allowFullScreen
          />
        )}

        {(isLoading || isBuffering) && (
          <div className="absolute inset-0 z-20 grid place-items-center bg-slate-950/65">
            <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
          </div>
        )}

        <AnimatePresence>
          {!compatMode && !isPlaying && !isLoading && !error && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handlePlayPause}
              className="absolute inset-0 z-20 grid place-items-center bg-slate-950/40"
              aria-label="Play"
            >
              <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white text-blue-600 shadow-xl">
                <Play className="h-6 w-6 fill-current" />
              </span>
            </motion.button>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showControls && !error && !compatMode && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute inset-x-0 bottom-0 z-30 flex flex-col justify-end bg-gradient-to-t from-black/95 via-black/50 to-transparent px-3 pb-3 pt-12 sm:px-5 sm:pb-5"
            >
              <input
                type="range"
                min={0}
                max={duration || 0}
                value={currentTime}
                onChange={(e) => {
                  const t = Number(e.target.value);
                  if (videoRef.current) videoRef.current.currentTime = t;
                  setCurrentTime(t);
                }}
                className="mb-3 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/20 accent-blue-500 hover:h-2 hover:bg-white/30"
                aria-label="Seek"
              />

              <div className="flex flex-wrap items-center gap-1.5 text-white sm:gap-2.5">
                <button onClick={handlePlayPause} className="rounded-lg p-2 hover:bg-white/10" aria-label="Play pause">
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 fill-current" />}
                </button>
                <button onClick={() => seek(-10)} className="rounded-lg p-2 hover:bg-white/10" aria-label="Skip backward"><SkipBack className="h-5 w-5" /></button>
                <button onClick={() => seek(10)} className="rounded-lg p-2 hover:bg-white/10" aria-label="Skip forward"><SkipForward className="h-5 w-5" /></button>
                <button onClick={retryFromStart} className="rounded-lg p-2 hover:bg-white/10" aria-label="Retry stream"><RotateCcw className="h-4.5 w-4.5" /></button>

                <button onClick={toggleMute} className="rounded-lg p-2 hover:bg-white/20 hover:text-blue-400 transition" aria-label="Mute">
                  {isMuted ? <VolumeX className="h-5 w-5 text-red-400" /> : <Volume2 className="h-5 w-5" />}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={isMuted ? 0 : volume}
                  onChange={(e) => {
                    const v = Number(e.target.value);
                    setVolume(v);
                    if (videoRef.current) {
                      videoRef.current.volume = v;
                      videoRef.current.muted = v === 0;
                    }
                    setIsMuted(v === 0);
                  }}
                  className="hidden h-1.5 w-16 cursor-pointer appearance-none rounded-full bg-white/20 accent-white hover:bg-white/30 sm:block sm:w-20"
                  aria-label="Volume"
                />

                <span className="text-[11px] font-semibold text-slate-200 sm:text-xs">{format(currentTime)} / {format(duration)}</span>

                <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
                  <button
                    onClick={() => setSubtitlesEnabled((prev) => !prev)}
                    className={`rounded-lg p-2 transition ${subtitlesEnabled ? 'bg-blue-600/80 text-white' : 'hover:bg-white/20 hover:text-blue-400'}`}
                    aria-label="Toggle subtitles"
                  >
                    <Captions className="h-5 w-5" />
                  </button>

                  <select
                    value={playbackRate}
                    onChange={(e) => {
                      const rate = Number(e.target.value);
                      setPlaybackRate(rate);
                      if (videoRef.current) videoRef.current.playbackRate = rate;
                    }}
                    className="rounded-lg border border-white/20 bg-black/30 px-2 py-1 text-[11px] sm:text-xs"
                    aria-label="Playback speed"
                  >
                    {PLAYBACK_SPEEDS.map((rate) => <option key={rate} value={rate}>{rate}x</option>)}
                  </select>

                  <select
                    value={quality}
                    onChange={(e) => setQuality(e.target.value)}
                    className="rounded-lg border border-white/20 bg-black/30 px-2 py-1 text-[11px] sm:text-xs"
                    aria-label="Quality"
                  >
                    {QUALITY_OPTIONS.map((q) => <option key={q.value} value={q.value}>{q.label}</option>)}
                  </select>

                  <button onClick={async () => {
                    if (!videoRef.current || !document.pictureInPictureEnabled) return;
                    if (document.pictureInPictureElement) await document.exitPictureInPicture();
                    else await videoRef.current.requestPictureInPicture();
                  }} className="rounded-lg p-2 hover:bg-white/10" aria-label="Picture in picture"><PictureInPicture2 className="h-5 w-5" /></button>

                  <button onClick={() => setIsMini((prev) => !prev)} className="rounded-lg p-2 hover:bg-white/10" aria-label="Mini player">
                    {isMini ? <X className="h-5 w-5" /> : <Minimize2 className="h-5 w-5" />}
                  </button>

                  <button onClick={toggleFullscreen} className="rounded-lg p-2 hover:bg-white/10" aria-label="Fullscreen">
                    {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {error && (
          <div className="absolute inset-0 z-40 grid place-items-center bg-slate-950/95 p-6 text-center">
            <div className="w-full max-w-3xl rounded-2xl border border-red-400/30 bg-red-500/10 p-4 text-red-200 sm:p-8">
              <AlertCircle className="mx-auto h-10 w-10" />
              <p className="mt-3 text-sm font-semibold sm:text-lg">{errorMessage}</p>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                <button onClick={retryFromStart} className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white">
                  Retry Playback
                </button>
                {originalUrl && (
                  <a href={originalUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold underline">
                    Open original source
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-2 flex flex-wrap items-center justify-between gap-2 px-1 text-[11px] text-slate-400">
        <span className="line-clamp-1 font-semibold">{title}</span>
        <span>{compatMode ? 'Drive compatibility mode' : 'Shortcuts: K, M, F, N'}</span>
      </div>
    </div>
  );
};

export default VideoPlayer;
