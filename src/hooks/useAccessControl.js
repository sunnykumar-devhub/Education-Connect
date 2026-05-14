import { useState, useCallback } from 'react';

/**
 * Custom hook to handle study material access logic.
 * Tracks the current page and determines if content should be locked.
 */
export const useAccessControl = (initialPage = 1, limit = 3) => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const isLocked = currentPage > limit;

  const nextPage = useCallback(() => {
    setCurrentPage(prev => prev + 1);
  }, []);

  const prevPage = useCallback(() => {
    setCurrentPage(prev => (prev > 1 ? prev - 1 : 1));
  }, []);

  const goToPage = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  return {
    currentPage,
    isLocked,
    nextPage,
    prevPage,
    goToPage,
    setCurrentPage
  };
};
