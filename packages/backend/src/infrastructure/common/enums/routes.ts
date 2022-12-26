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
  VIEWED = '/viewed',
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
  GET_VIEWES = '/:id/views',
}

enum UserRoutes {
  GET_BY_ID = '/:id',
  GET_BOOKMARKS = '/bookmarks',
  DELETE_BOOKMARK = '/bookmarks',
  CREATE_BOOKMARK = '/bookmarks',
  GET_BOOKMARK_IDS = '/bookmarks/ids',
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
enum ViewedRoutes {
  GET_BY_ID = '/:id',
  CREATE = '/',
  UPDATE_BY_ID = '/:id',
  GET_USER_VIEWED = '/',
  DELETE_BY_MOVIE_ID = '/',
  GET_IDS_IN_VIEWED = '/ids',
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
  ViewedRoutes,
};
