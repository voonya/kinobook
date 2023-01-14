import { SPARoutes } from './routes';

type SPARoutesType = Record<SPARoutes, string>;

export const PageTitle: Partial<SPARoutesType> = {
  [SPARoutes.HOME]: 'KinoBook | Main',
  [SPARoutes.LOGIN]: 'KinoBook | Login',
  [SPARoutes.REGISTER]: 'KinoBook | Register',
  [SPARoutes.PROFILE]: 'KinoBook | Profile',
  [SPARoutes.MOVIE]: 'KinoBook | Movie',
  [SPARoutes.BOOKMARKS]: 'KinoBook | Bookmarks',
  [SPARoutes.CATALOGUE]: 'KinoBook | Catalogue',
  [SPARoutes.VIEWED]: 'KinoBook | Viewed',
  [SPARoutes.CREATE_MOVIE]: 'KinoBook | Create film',
  [SPARoutes.UPDATE_MOVIE]: 'KinoBook | Edit film',
  [SPARoutes.DASHBOARD]: 'KinoBook | Dashboard',
  [SPARoutes.NOT_FOUND]: 'KinoBook | 404',
};
