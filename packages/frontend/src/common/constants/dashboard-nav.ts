import { DashboardRoutes } from '../enums';
import type { NavLink } from './nav-links';

const dashBoardLinks: NavLink[] = [
  {
    name: 'Users',
    link: DashboardRoutes.USERS,
  },
  {
    name: 'Movies',
    link: DashboardRoutes.MOVIES,
  },
  {
    name: 'Genre',
    link: DashboardRoutes.GENRES,
  },
  {
    name: 'Actors',
    link: DashboardRoutes.ACTORS,
  },
  {
    name: 'Writers',
    link: DashboardRoutes.WRITERS,
  },
  {
    name: 'Countries',
    link: DashboardRoutes.COUNTRIES,
  },
];

export { dashBoardLinks };
