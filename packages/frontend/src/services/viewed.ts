import { getApiRoute, http } from 'src/helpers';
import { ApiRoutes, ViewedRoutes } from '@common';
import type { ICreateViewed } from 'src/common/dto/viewed';
import type { IMoviesFiltes } from '@common';
import { convertMovieFiltersToQuery } from './movie';

export function getViewById(viewId: string) {
  const route = getApiRoute(ApiRoutes.VIEWED, ViewedRoutes.GET_BY_ID).replace(
    ':id',
    viewId,
  );

  return http.get(route);
}

export function getUserViews(filters?: IMoviesFiltes) {
  let route = getApiRoute(ApiRoutes.VIEWED, ViewedRoutes.GET_USER_VIEWED);

  route += filters ? convertMovieFiltersToQuery(filters) : '';

  return http.get(route);
}

export function getMoviesIdInViewed() {
  const route = getApiRoute(ApiRoutes.VIEWED, ViewedRoutes.GET_IDS_IN_VIEWED);

  return http.get(route);
}

export function createViewed(data: ICreateViewed) {
  const route = getApiRoute(ApiRoutes.VIEWED, ViewedRoutes.CREATE);

  return http.post(route, data);
}

export function updateViewed(viewId: string, data: ICreateViewed) {
  const route = getApiRoute(
    ApiRoutes.VIEWED,
    ViewedRoutes.UPDATE_BY_ID,
  ).replace(':id', viewId);

  return http.post(route, data);
}

export function deleteViewed(movieId: string) {
  const route = getApiRoute(ApiRoutes.VIEWED, ViewedRoutes.DELETE_BY_MOVIE_ID);

  return http.delete(route, { movieId });
}
