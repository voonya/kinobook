import { useAppSelector } from './store';

export const useEntitiesLoading = () => {
  const actorsLoading = useAppSelector((state) => state.actors.loading);
  const genresLoading = useAppSelector((state) => state.genres.loading);
  const countriesLoading = useAppSelector((state) => state.countries.loading);
  const directorsLoading = useAppSelector((state) => state.directors.loading);

  return actorsLoading || genresLoading || countriesLoading || directorsLoading;
};
