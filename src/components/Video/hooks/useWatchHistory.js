import { useEffect, useState } from 'react';
import { getWatchHistory } from '../../../utils/videoUtils';

export const useWatchHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setHistory(getWatchHistory());
    const onFocus = () => setHistory(getWatchHistory());
    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, []);

  return history;
};
