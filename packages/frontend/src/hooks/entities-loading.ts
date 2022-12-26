import { useAppSelector } from './store';

export const useEntitiesLoading = () => {
  const actorsLoading = useAppSelector((state) => state.actors.loading);
  const genresLoading = useAppSelector((state) => state.genres.loading);
  const countriesLoading = useAppSelector((state) => state.countries.loading);
  const writersLoading = useAppSelector((state) => state.writers.loading);

  return actorsLoading || genresLoading || countriesLoading || writersLoading;
};
