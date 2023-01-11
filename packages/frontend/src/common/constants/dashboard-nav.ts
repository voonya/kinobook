import { DashboardRoutes } from '../enums';
import type { NavLink } from './nav-links';

const dashBoardLinks: NavLink[] = [
  {
    name: 'Movies',
    link: DashboardRoutes.MOVIES,
  },
  {
    name: 'Genres',
    link: DashboardRoutes.GENRES,
  },
  {
    name: 'Actors',
    link: DashboardRoutes.ACTORS,
  },
  {
    name: 'Directors',
    link: DashboardRoutes.DIRECTORS,
  },
  {
    name: 'Countries',
    link: DashboardRoutes.COUNTRIES,
  },
];

export { dashBoardLinks };
