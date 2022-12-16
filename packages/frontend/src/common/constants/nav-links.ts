import { SPARoutes } from '@common';

export interface NavLink {
  name: string;
  link: string;
  subLinks?: NavLink[];
}

const navLinks: NavLink[] = [
  {
    name: 'Catalogue',
    link: SPARoutes.CATALOGUE,
  },
  {
    name: 'Bookmarks',
    link: SPARoutes.BOOKMARKS,
  },
  {
    name: 'Viewed',
    link: SPARoutes.HOME,
  },
  {
    name: 'Dashboard',
    link: SPARoutes.DASHBOARD,
  },
];

export { navLinks };
