export const formatVideoDuration = (seconds) => {
  if (isNaN(seconds) || seconds < 0) return '0:00';
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hrs > 0) return `${hrs}h ${mins}m`;
  if (mins > 0) return `${mins}m ${secs < 10 ? '0' : ''}${secs}s`;
  return `${secs}s`;
};

export const isGoogleDriveUrl = (url = '') => typeof url === 'string' && url.includes('drive.google.com');

export const extractGoogleDriveFileId = (url = '') => {
  const fileDRegex = /\/file\/d\/([a-zA-Z0-9_-]+)/;
  const idParamRegex = /[?&]id=([a-zA-Z0-9_-]+)/;
  const dMatch = url.match(fileDRegex);
  if (dMatch) return dMatch[1];
  const paramMatch = url.match(idParamRegex);
  if (paramMatch) return paramMatch[1];
  return null;
};

export const buildGoogleDriveCandidates = (url = '') => {
  const fileId = extractGoogleDriveFileId(url);
  if (!fileId) return [];

  return [
    // Primary: Direct download endpoint with virus scan bypass
    { src: `https://drive.google.com/uc?export=download&id=${fileId}&confirm=t`, type: 'video/mp4', quality: 'auto', label: 'Drive Direct' },
    // Secondary: Usercontent domain directly (often redirects here anyway)
    { src: `https://drive.usercontent.google.com/download?id=${fileId}&export=download&authuser=0&confirm=t`, type: 'video/mp4', quality: 'auto', label: 'Drive Proxy' },
    // Fallback: The view endpoint, just in case it's a smaller file
    { src: `https://drive.google.com/uc?export=view&id=${fileId}`, type: 'video/mp4', quality: 'auto', label: 'Drive View' },
  ];
};

export const buildGoogleDrivePreviewUrl = (url = '') => {
  const fileId = extractGoogleDriveFileId(url);
  if (!fileId) return '';
  return `https://drive.google.com/file/d/${fileId}/preview`;
};

export const normalizeVideoSources = (videoSrc, videoSources = []) => {
  const normalized = (videoSources.length ? videoSources : [videoSrc]).flatMap((source) => {
    if (!source) return [];
    if (typeof source === 'string') {
      if (isGoogleDriveUrl(source)) return buildGoogleDriveCandidates(source);
      return [{ src: source, type: source.includes('.m3u8') ? 'application/x-mpegURL' : 'video/mp4', quality: 'auto', label: 'Auto' }];
    }
    if (typeof source === 'object' && source.src) {
      if (isGoogleDriveUrl(source.src)) return buildGoogleDriveCandidates(source.src);
      return [{ type: source.src.includes('.m3u8') ? 'application/x-mpegURL' : 'video/mp4', quality: 'auto', label: 'Auto', ...source }];
    }
    return [];
  });

  const seen = new Set();
  return normalized.filter((item) => {
    if (seen.has(item.src)) return false;
    seen.add(item.src);
    return true;
  });
};

export const filterSourcesByQuality = (sources, selectedQuality) => {
  if (!selectedQuality || selectedQuality === 'auto') return sources;
  const filtered = sources.filter((source) => source.quality === selectedQuality);
  return filtered.length > 0 ? filtered : sources;
};

export const getVideoPrimarySource = (video) => {
  if (video?.playback?.sources?.length) return video.playback.sources[0].src;
  if (video?.sources?.length) return typeof video.sources[0] === 'string' ? video.sources[0] : video.sources[0]?.src;
  return video?.url || '';
};

export const getVideoSources = (video) => {
  if (video?.playback?.sources?.length) return video.playback.sources;
  return video?.sources || [];
};

export const getVideoProgressTime = (videoId) => {
  const saved = localStorage.getItem(`video_progress_${videoId}`);
  return saved ? parseFloat(saved) : 0;
};

export const getVideoProgressPercentage = (videoId, duration) => {
  if (!duration || duration <= 0) return 0;
  const time = getVideoProgressTime(videoId);
  return Math.min(100, Math.round((time / duration) * 100));
};

export const saveVideoProgressTime = (videoId, time) => {
  if (!videoId) return;
  localStorage.setItem(`video_progress_${videoId}`, Math.max(0, time).toString());
};

const WATCH_HISTORY_KEY = 'video_watch_history_v1';

export const getWatchHistory = () => {
  const raw = localStorage.getItem(WATCH_HISTORY_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const saveWatchHistory = (videoId, currentTime, duration) => {
  if (!videoId || !duration) return;
  const history = getWatchHistory().filter((entry) => entry.videoId !== videoId);
  history.unshift({
    videoId,
    currentTime,
    duration,
    watchedAt: Date.now(),
    progress: Math.min(100, Math.round((currentTime / duration) * 100)),
  });
  localStorage.setItem(WATCH_HISTORY_KEY, JSON.stringify(history.slice(0, 40)));
};
