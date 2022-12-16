import { API_BASE_ROUTE } from '@common';

export const getApiRoute = (...routes: string[]) =>
  API_BASE_ROUTE + routes.join('');
