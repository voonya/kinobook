import type { CookieName } from '@web/common';

export interface RefreshTokenRequest {
  [CookieName.REFRESH_TOKEN]: string;
}
