import { useAppSelector } from './store';
import { useMemo } from 'react';

export const useInBookmarks = (movieId: string) => {
  const bookmarks = useAppSelector((state) => state.bookmarks.data);

  return useMemo(() => bookmarks.includes(movieId), [bookmarks, movieId]);
};
