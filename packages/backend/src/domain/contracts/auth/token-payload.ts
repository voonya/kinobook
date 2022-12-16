import type { UserWithoutPassword } from '@domain/models';

// export interface ITokenPayload {
//   user: UserWithoutPassword,
//   createdAt: Date
// }

export type ITokenPayload = UserWithoutPassword;
