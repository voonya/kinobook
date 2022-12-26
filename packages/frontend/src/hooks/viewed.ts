import { useAppSelector } from './store';
import { useMemo } from 'react';

export const useInViewed = (movieId: string) => {
  const viewed = useAppSelector((state) => state.viewed.data);

  return useMemo(() => viewed.includes(movieId), [viewed, movieId]);
};
