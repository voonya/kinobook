import type { AuthModel } from '@domain/models';

export interface IAuthRepository {
  create(userId: string, refreshToken: string): Promise<AuthModel>;

  getByUserIdAndRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<AuthModel>;

  getByRefreshToken(refreshToken: string): Promise<AuthModel>;

  deleteById(id: string): Promise<AuthModel>;

  updateRefreshTokenById(
    id: string,
    newRefreshToken: string,
  ): Promise<AuthModel>;
}
