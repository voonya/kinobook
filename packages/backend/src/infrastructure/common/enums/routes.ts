const BASE_ROUTE = '/api';

enum Routes {
  AUTH = '/auth',
}

enum AuthRoutes {
  LOGIN = '/login',
  REGISTER = '/register',
  REFRESH = '/refresh',
  LOGOUT = '/logout',
}

export { Routes, AuthRoutes, BASE_ROUTE };
