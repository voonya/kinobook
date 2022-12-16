import type { ILoginRequest, IRegisterRequest } from '@common';
import { getApiRoute, http } from 'src/helpers';
import { ApiRoutes, AuthRoutes } from '@common';

export function login(data: ILoginRequest) {
  const route = getApiRoute(ApiRoutes.AUTH, AuthRoutes.LOGIN);

  return http.post(route, data);
}

export function register(data: IRegisterRequest) {
  const route = getApiRoute(ApiRoutes.AUTH, AuthRoutes.REGISTER);

  return http.post(route, data);
}

export function refresh() {
  const route = getApiRoute(ApiRoutes.AUTH, AuthRoutes.REFRESH);

  return http.post(route);
}

export function logout() {
  const route = getApiRoute(ApiRoutes.AUTH, AuthRoutes.LOGOUT);

  return http.post(route);
}

export function getCurrentUser() {
  const route = getApiRoute(ApiRoutes.AUTH, AuthRoutes.GET_CURRENT_USER);

  return http.get(route);
}

export function saveAccessToken(token: string) {
  localStorage.setItem('accessToken', token);
}

function getCookie(cookieName: string) {
  const cookie: Record<string, unknown> = {};
  document.cookie.split(';').forEach((el) => {
    const [key, value] = el.split('=');
    cookie[key.trim()] = value;
  });

  return cookie[cookieName];
}

export function getAccessToken() {
  return getCookie('accessToken');
}
