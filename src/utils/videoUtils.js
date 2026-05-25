/**
 * Reusable utility helper for parsing and converting Google Drive video links
 * into optimized embeddable preview URLs for inline iframe playback.
 */

/**
 * Automatically detects and transforms Google Drive links into preview embeds.
 * Supports file share, open, uc, direct download, and edit links.
 * 
 * @param {string} url - Raw Google Drive URL
 * @returns {string|null} - Embeddable preview URL or the original URL fallback
 */
export const getGoogleDriveEmbedUrl = (url) => {
  if (!url) return null;

  // Patterns to match Google Drive file IDs:
  // 1. /file/d/FILE_ID/view
  // 2. ?id=FILE_ID
  // 3. /open?id=FILE_ID
  const fileDRegex = /\/file\/d\/([a-zA-Z0-9_-]+)/;
  const idParamRegex = /[?&]id=([a-zA-Z0-9_-]+)/;

  const dMatch = url.match(fileDRegex);
  if (dMatch) {
    return `https://drive.google.com/file/d/${dMatch[1]}/preview`;
  }

  const paramMatch = url.match(idParamRegex);
  if (paramMatch) {
    return `https://drive.google.com/file/d/${paramMatch[1]}/preview`;
  }

  // If already an embed or standard link, return with preview format
  if (url.includes('drive.google.com') && !url.includes('/preview')) {
    if (url.endsWith('/view') || url.endsWith('/edit')) {
      return url.replace(/\/view$/, '/preview').replace(/\/edit$/, '/preview');
    }
  }

  return url;
};

/**
 * Checks if a URL is a valid Google Drive video link.
 * 
 * @param {string} url 
 * @returns {boolean}
 */
export const isGoogleDriveUrl = (url) => {
  if (!url) return false;
  return url.includes('drive.google.com');
};

/**
 * Formats seconds into a human-readable runtime description.
 * 
 * @param {number} seconds - Runtimes in seconds
 * @returns {string} - Formatted time string (e.g. "45m 12s" or "2h 15m")
 */
export const formatVideoDuration = (seconds) => {
  if (isNaN(seconds) || seconds < 0) return '0:00';
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hrs > 0) {
    return `${hrs}h ${mins}m`;
  }
  if (mins > 0) {
    return `${mins}m ${secs < 10 ? '0' : ''}${secs}s`;
  }
  return `${secs}s`;
};

/**
 * Retrieves cached watch progression from localStorage.
 * 
 * @param {string} videoId 
 * @returns {number} - Stored playback time in seconds
 */
export const getVideoProgressTime = (videoId) => {
  const saved = localStorage.getItem(`video_progress_${videoId}`);
  return saved ? parseFloat(saved) : 0;
};

/**
 * Retrieves cached watch progression percentage.
 * 
 * @param {string} videoId 
 * @param {number} duration - Video duration in seconds
 * @returns {number} - Stored percentage (0 to 100)
 */
export const getVideoProgressPercentage = (videoId, duration) => {
  if (!duration || duration <= 0) return 0;
  const time = getVideoProgressTime(videoId);
  return Math.min(100, Math.round((time / duration) * 100));
};

/**
 * Caches playback time to localStorage.
 * 
 * @param {string} videoId 
 * @param {number} time - Playback time in seconds
 */
export const saveVideoProgressTime = (videoId, time) => {
  if (!videoId) return;
  localStorage.setItem(`video_progress_${videoId}`, time.toString());
};
