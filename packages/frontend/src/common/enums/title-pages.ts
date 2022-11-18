import { SPARoutes } from './routes';

type SPARoutesType = Record<SPARoutes, string>;

export const PageTitle: SPARoutesType = {
  [SPARoutes.HOME]: 'KinoBook | Home',
  [SPARoutes.LOGIN]: 'KinoBook | Login',
  [SPARoutes.REGISTER]: 'KinoBook | Register',
  [SPARoutes.NOT_FOUND]: 'KinoBook | 404',
};
export {};
