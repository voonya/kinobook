import { SPARoutes } from './routes';

type SPARoutesType = Record<SPARoutes, string>;

export const PageTitle: Partial<SPARoutesType> = {
  [SPARoutes.HOME]: 'KinoBook | Головна',
  [SPARoutes.LOGIN]: 'KinoBook | Вхід',
  [SPARoutes.REGISTER]: 'KinoBook | Реєстрація',
  [SPARoutes.PROFILE]: 'KinoBook | Профіль',
  [SPARoutes.MOVIE]: 'KinoBook | Фільм',
  [SPARoutes.BOOKMARKS]: 'KinoBook | Нотатки',
  [SPARoutes.CATALOGUE]: 'KinoBook | Каталог',
  [SPARoutes.VIEWED]: 'KinoBook | Переглянуті',
  [SPARoutes.CREATE_MOVIE]: 'KinoBook | Сторити фільм',
  [SPARoutes.UPDATE_MOVIE]: 'KinoBook | Редагувати фільм',
  [SPARoutes.DASHBOARD]: 'KinoBook | Дашборд',
  [SPARoutes.NOT_FOUND]: 'KinoBook | 404',
};
