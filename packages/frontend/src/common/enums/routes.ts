export enum SPARoutes {
  HOME = '/',
  LOGIN = '/login',
  REGISTER = '/register',
  PROFILE = '/profile/:id',
  MOVIE = '/movie/:id',
  CREATE_MOVIE = '/movie/create',
  UPDATE_MOVIE = '/movie/:id/update',
  BOOKMARKS = '/bookmarks',
  CATALOGUE = '/catalogue',
  VIEWED = '/viewed',
  DASHBOARD = '/dashboard',

  NOT_FOUND = '/404',
}

export enum DashboardRoutes {
  MOVIES = 'movies',
  ACTORS = 'actors',
  WRITERS = 'writers',
  COUNTRIES = 'countries',
  GENRES = 'genres',
}
