import { getApiRoute } from 'src/helpers';
import { ApiRoutes, DirectorsRoutes } from '@common';
import { http } from 'src/helpers';

export function createDirector(name: string, surname: string) {
  const route = getApiRoute(ApiRoutes.DIRECTOR);

  return http.post(route, { name, surname });
}

export function updateDirector(id: string, name: string, surname: string) {
  const route = getApiRoute(
    ApiRoutes.DIRECTOR,
    DirectorsRoutes.UPDATE_BY_ID,
  ).replace(':id', id);

  return http.put(route, { name, surname });
}

export function deleteDirector(id: string) {
  const route = getApiRoute(
    ApiRoutes.DIRECTOR,
    DirectorsRoutes.DELETE_BY_ID,
  ).replace(':id', id);

  return http.delete(route);
}

export function getAllDirectors() {
  const route = getApiRoute(ApiRoutes.DIRECTOR, DirectorsRoutes.GET_ALL);

  return http.get(route);
}
