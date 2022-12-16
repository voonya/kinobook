import { BASE_ROUTE } from '@infrastructure/common';

export const getPath = (...pathes: string[]): string =>
  BASE_ROUTE + pathes.join('');
