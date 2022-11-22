import type { CookieName } from '../enums';

export interface RefreshTokenRequest {
  [CookieName.REFRESH_TOKEN]: string;
}
