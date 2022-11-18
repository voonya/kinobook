import { SPARoutes } from '@common';

interface NavLink {
  name: string;
  link: string;
  subLinks?: NavLink[];
}

const navLinks: NavLink[] = [
  {
    name: 'Каталог',
    link: SPARoutes.HOME,
  },
  {
    name: 'Нотатки',
    link: SPARoutes.HOME,
  },
  {
    name: 'Переглянуті',
    link: SPARoutes.HOME,
  },
];

export { navLinks };
