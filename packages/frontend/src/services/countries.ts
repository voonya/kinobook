import { getApiRoute } from 'src/helpers';
import { ApiRoutes, CountriesRoutes } from '@common';
import { http } from 'src/helpers';

export function createCountry(name: string) {
  const route = getApiRoute(ApiRoutes.COUNTRY);

  return http.post(route, { name });
}

export function updateCountry(id: string, name: string) {
  const route = getApiRoute(
    ApiRoutes.COUNTRY,
    CountriesRoutes.UPDATE_BY_ID,
  ).replace(':id', id);

  return http.put(route, { name });
}

export function deleteCountry(id: string) {
  const route = getApiRoute(
    ApiRoutes.COUNTRY,
    CountriesRoutes.DELETE_BY_ID,
  ).replace(':id', id);

  return http.delete(route);
}

export function getAllCountries() {
  const route = getApiRoute(ApiRoutes.COUNTRY, CountriesRoutes.GET_ALL);

  return http.get(route);
}
