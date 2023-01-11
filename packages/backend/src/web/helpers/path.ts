import { BASE_ROUTE } from '@web/common';

export const getPath = (...pathes: string[]): string =>
  BASE_ROUTE + pathes.join('');
