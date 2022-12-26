import { SPARoutes, Role } from '@common';

export interface NavLink {
  name: string;
  link: string;
  roles?: Role[];
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
    roles: [Role.USER, Role.MODERATOR, Role.ADMIN],
  },
  {
    name: 'Viewed',
    link: SPARoutes.VIEWED,
    roles: [Role.USER, Role.MODERATOR, Role.ADMIN],
  },
  {
    name: 'Dashboard',
    link: SPARoutes.DASHBOARD,
    roles: [Role.MODERATOR, Role.ADMIN],
  },
];

export { navLinks };
