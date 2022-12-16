import { getApiRoute } from 'src/helpers';
import { ApiRoutes, GenreRoutes } from '@common';
import { http } from 'src/helpers';

export function createGenre(name: string) {
  const route = getApiRoute(ApiRoutes.GENRE);

  return http.post(route, { name });
}

export function updateGenre(id: string, name: string) {
  const route = getApiRoute(ApiRoutes.GENRE, GenreRoutes.UPDATE_BY_ID).replace(
    ':id',
    id,
  );

  return http.put(route, { name });
}

export function deleteGenre(id: string) {
  const route = getApiRoute(ApiRoutes.GENRE, GenreRoutes.DELETE_BY_ID).replace(
    ':id',
    id,
  );

  return http.delete(route);
}

export function getAllGenres() {
  const route = getApiRoute(ApiRoutes.GENRE, GenreRoutes.GET_ALL);

  return http.get(route);
}
