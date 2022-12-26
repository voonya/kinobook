const API_BASE_ROUTE = 'http://localhost:8080/api';

enum ApiRoutes {
  AUTH = '/auth',
  USER = '/user',
  MOVIE = '/movie',
  GENRE = '/genre',
  COUNTRY = '/country',
  ACTOR = '/actor',
  WRITER = '/writer',
  FILE = '/file',
  VIEWED = '/viewed',
}

enum AuthRoutes {
  LOGIN = '/login',
  REGISTER = '/register',
  LOGOUT = '/logout',
  REFRESH = '/refresh',
  GET_CURRENT_USER = '/user',
}

enum UserRoutes {
  GET_BY_ID = '/:id',
  GET_BOOKMARKS = '/bookmarks',
  DELETE_BOOKMARK = '/bookmarks',
  CREATE_BOOKMARK = '/bookmarks',
  GET_BOOKMARK_IDS = '/bookmarks/ids',
}

enum MovieRoutes {
  GET_BY_ID = '/:id',
  UPDATE_BY_ID = '/:id',
  DELETE_BY_ID = '/:id',
  GET_ALL = '/',
  GET_VIEWES = '/:id/views',
}

enum GenreRoutes {
  UPDATE_BY_ID = '/:id',
  GET_ALL = '/',
  DELETE_BY_ID = '/:id',
  CREATE = '/',
}

enum CountriesRoutes {
  UPDATE_BY_ID = '/:id',
  GET_ALL = '/',
  DELETE_BY_ID = '/:id',
  CREATE = '/',
}

enum ActorsRoutes {
  UPDATE_BY_ID = '/:id',
  GET_ALL = '/',
  DELETE_BY_ID = '/:id',
  CREATE = '/',
}

enum WritersRoutes {
  UPDATE_BY_ID = '/:id',
  GET_ALL = '/',
  DELETE_BY_ID = '/:id',
  CREATE = '/',
}

enum ViewedRoutes {
  GET_BY_ID = '/:id',
  CREATE = '/',
  UPDATE_BY_ID = '/:id',
  GET_USER_VIEWED = '/',
  DELETE_BY_MOVIE_ID = '/',
  GET_IDS_IN_VIEWED = '/ids',
}

enum FileRoutes {
  GET_BY_ID = '/:id',
}

export {
  API_BASE_ROUTE,
  ApiRoutes,
  AuthRoutes,
  UserRoutes,
  MovieRoutes,
  GenreRoutes,
  CountriesRoutes,
  ActorsRoutes,
  WritersRoutes,
  FileRoutes,
  ViewedRoutes,
};
