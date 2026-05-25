import { useEffect, useMemo, useState } from 'react';
import { getVideoProgressPercentage, getVideoProgressTime, saveVideoProgressTime } from '../../../utils/videoUtils';

export const useVideoProgress = (videoId, duration, currentTime, isPlaying) => {
  const [initialTime, setInitialTime] = useState(0);

  useEffect(() => {
    setInitialTime(getVideoProgressTime(videoId));
  }, [videoId]);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = window.setInterval(() => {
      saveVideoProgressTime(videoId, currentTime);
    }, 2500);
    return () => window.clearInterval(interval);
  }, [videoId, currentTime, isPlaying]);

  const progress = useMemo(
    () => getVideoProgressPercentage(videoId, duration || 0),
    [videoId, duration, currentTime]
  );

  return { initialTime, progress };
};
