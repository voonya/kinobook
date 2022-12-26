import { getApiRoute } from 'src/helpers';
import { ApiRoutes, UserRoutes } from '@common';
import { http } from 'src/helpers';
import { convertMovieFiltersToQuery } from './movie';
import type { IMoviesFiltes } from '@common';

export function getMoviesIdsInBookmarks() {
  const route = getApiRoute(ApiRoutes.USER, UserRoutes.GET_BOOKMARK_IDS);

  return http.get(route);
}

export function getMoviesInBookmarks(filters: IMoviesFiltes) {
  let route = getApiRoute(ApiRoutes.USER, UserRoutes.GET_BOOKMARKS);

  route += filters && convertMovieFiltersToQuery(filters);

  return http.get(route);
}

export function createBookmark(movieId: string) {
  const route = getApiRoute(ApiRoutes.USER, UserRoutes.CREATE_BOOKMARK);

  return http.post(route, { movieId });
}

export function deleteBookmark(movieId: string) {
  const route = getApiRoute(ApiRoutes.USER, UserRoutes.DELETE_BOOKMARK);

  return http.delete(route, { movieId });
}
