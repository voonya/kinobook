import { getApiRoute } from 'src/helpers';
import { ApiRoutes, WritersRoutes } from '@common';
import { http } from 'src/helpers';

export function createWriter(name: string, surname: string) {
  const route = getApiRoute(ApiRoutes.WRITER);

  return http.post(route, { name, surname });
}

export function updateWriter(id: string, name: string, surname: string) {
  const route = getApiRoute(
    ApiRoutes.WRITER,
    WritersRoutes.UPDATE_BY_ID,
  ).replace(':id', id);

  return http.put(route, { name, surname });
}

export function deleteWriter(id: string) {
  const route = getApiRoute(
    ApiRoutes.WRITER,
    WritersRoutes.DELETE_BY_ID,
  ).replace(':id', id);

  return http.delete(route);
}

export function getAllWriters() {
  const route = getApiRoute(ApiRoutes.WRITER, WritersRoutes.GET_ALL);

  return http.get(route);
}
