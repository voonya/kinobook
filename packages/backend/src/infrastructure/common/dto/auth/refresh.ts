import type { CookieName } from '@infrastructure/common/enums';

export interface RefreshTokenRequest {
  [CookieName.REFRESH_TOKEN]: string;
}
