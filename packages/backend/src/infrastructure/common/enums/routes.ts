const BASE_ROUTE = '/api';

enum Routes {
  AUTH = '/auth',
  MOVIES = '/movie',
  USER = '/user',
  FILE = '/file',
  GENRES = '/genre',
  ACTORS = '/actor',
  WRITERS = '/writer',
  COUNTRIES = '/country',
}

enum AuthRoutes {
  LOGIN = '/login',
  REGISTER = '/register',
  REFRESH = '/refresh',
  LOGOUT = '/logout',
  GET_CURRENT = '/user',
}

enum MovieRoutes {
  GET_BY_ID = '/:id',
  CREATE = '/',
  UPDATE_BY_ID = '/:id',
  DELETE_BY_ID = '/:id',
  GET_ALL = '/',
}

enum UserRoutes {
  GET_BY_ID = '/:id',
}

enum FileRoutes {
  GET_BY_ID = '/:id',
}

enum GenreRoutes {
  GET_ALL = '/',
  CREATE = '/',
  UPDATE_BY_ID = '/:id',
  DELETE_BY_ID = '/:id',
}

enum ActorRoutes {
  GET_ALL = '/',
  CREATE = '/',
  UPDATE_BY_ID = '/:id',
  DELETE_BY_ID = '/:id',
}

enum WriterRoutes {
  GET_ALL = '/',
  CREATE = '/',
  UPDATE_BY_ID = '/:id',
  DELETE_BY_ID = '/:id',
}

enum CountryRoutes {
  GET_ALL = '/',
  CREATE = '/',
  UPDATE_BY_ID = '/:id',
  DELETE_BY_ID = '/:id',
}

export {
  BASE_ROUTE,
  Routes,
  AuthRoutes,
  MovieRoutes,
  UserRoutes,
  FileRoutes,
  GenreRoutes,
  ActorRoutes,
  WriterRoutes,
  CountryRoutes,
};
