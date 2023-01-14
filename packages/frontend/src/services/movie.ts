import { getApiRoute, http } from 'src/helpers';
import { ApiRoutes, MovieRoutes } from '@common';
import type { IMoviesFiltes, IPaginationFilter } from '@common';

const convertObjectToQueryParam = (
  data: Record<string, any>,
  keyObj: string,
) => {
  let param = '';

  Object.keys(data).forEach((key) => {
    param += `${keyObj}[${key}]=${data[key]}&`;
  });

  return param.slice(0, -1);
};

export const convertMovieFiltersToQuery = (filters: IMoviesFiltes) => {
  let queryParams = '';
  queryParams = '?';
  Object.keys(filters).forEach((key, i) => {
    const typedKey = key as keyof IMoviesFiltes;
    if (filters[typedKey]) {
      let param = `${key}=`;
      if (Array.isArray(filters[typedKey])) {
        (filters[typedKey] as []).forEach((element) => {
          param += `${element},`;
        });
        param = param.slice(0, -1);
      } else if (typeof filters[typedKey] === 'object' && filters[typedKey]) {
        param = convertObjectToQueryParam(
          filters[typedKey] as Record<string, any>,
          typedKey,
        );
      } else {
        param += `${filters[typedKey]}`;
      }

      param = (i != 0 ? '&' : '') + param;
      queryParams += param;
    }
  });

  return queryParams;
};

export function createMovie(data: FormData) {
  const route = getApiRoute(ApiRoutes.MOVIE);

  return http.post(route, data, 'multipart/form-data');
}

export function updateMovie(id: string, data: FormData) {
  const route = getApiRoute(ApiRoutes.MOVIE, MovieRoutes.UPDATE_BY_ID).replace(
    ':id',
    id,
  );

  return http.put(route, data, 'multipart/form-data');
}

export function getMovie(id: string) {
  const route = getApiRoute(ApiRoutes.MOVIE, MovieRoutes.GET_BY_ID).replace(
    ':id',
    id,
  );

  return http.get(route);
}

export function deleteMovie(id: string) {
  const route = getApiRoute(ApiRoutes.MOVIE, MovieRoutes.DELETE_BY_ID).replace(
    ':id',
    id,
  );

  return http.delete(route);
}

export function getAllMovies(filters?: IMoviesFiltes) {
  let route = getApiRoute(ApiRoutes.MOVIE, MovieRoutes.GET_ALL);

  route += filters ? convertMovieFiltersToQuery(filters) : '';

  return http.get(route);
}

export function getMovieViews(movieId: string, filters: IPaginationFilter) {
  let route = getApiRoute(ApiRoutes.MOVIE, MovieRoutes.GET_VIEWES).replace(
    ':id',
    movieId,
  );

  route += filters ? convertMovieFiltersToQuery(filters) : '';

  return http.get(route);
}

export function getUserRecommendation(filters?: IMoviesFiltes) {
  let route = getApiRoute(ApiRoutes.MOVIE, MovieRoutes.USER_RECOMMENDATIONS);

  route += filters ? convertMovieFiltersToQuery(filters) : '';

  return http.get(route);
}

export function getSimilarMovies(movieId: string, count: number) {
  let route = getApiRoute(ApiRoutes.MOVIE, MovieRoutes.SIMILAR_MOVIES).replace(
    ':id',
    movieId,
  );

  route += `?count=${count}`;

  return http.get(route);
}

export function getPricing(movieId: string) {
  const route = getApiRoute(ApiRoutes.MOVIE, MovieRoutes.PRICING).replace(
    ':id',
    movieId,
  );

  return http.get(route);
}
