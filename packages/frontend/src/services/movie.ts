import { getApiRoute, http } from 'src/helpers';
import { ApiRoutes, MovieRoutes } from '@common';

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

export function getAllMovies() {
  const route = getApiRoute(ApiRoutes.MOVIE, MovieRoutes.GET_ALL);

  return http.get(route);
}
