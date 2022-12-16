import { getApiRoute } from 'src/helpers';
import { ApiRoutes, ActorsRoutes } from '@common';
import { http } from 'src/helpers';

export function createActor(name: string, surname: string) {
  const route = getApiRoute(ApiRoutes.ACTOR);

  return http.post(route, { name, surname });
}

export function updateActor(id: string, name: string, surname: string) {
  const route = getApiRoute(ApiRoutes.ACTOR, ActorsRoutes.UPDATE_BY_ID).replace(
    ':id',
    id,
  );

  return http.put(route, { name, surname });
}

export function deleteActor(id: string) {
  const route = getApiRoute(ApiRoutes.ACTOR, ActorsRoutes.DELETE_BY_ID).replace(
    ':id',
    id,
  );

  return http.delete(route);
}

export function getAllActors() {
  const route = getApiRoute(ApiRoutes.ACTOR, ActorsRoutes.GET_ALL);

  return http.get(route);
}
