import type { User } from '@domain/models';
import type {
  ITokensResponse,
  ILoginDto,
  IRegisterDto,
} from '@domain/contracts';
import type {
  IAuthService,
  IBcryptService,
  IJwtService,
} from '@domain/services';
import type { IAuthRepository, IUserRepository } from '@domain/repository';
import {
  AlreadyLogoutError,
  NotLoginedError,
  IncorrectUsernameOrPasswordError,
  EmailTakenError,
  UsernameTakenError,
  TokenExpiredError,
} from '@application/exeptions';

class AuthService implements IAuthService {
  constructor(
    private authRepository: IAuthRepository,
    private userRepository: IUserRepository,
    private bcryptService: IBcryptService,
    private jwtService: IJwtService,
  ) {}

  async login(data: ILoginDto): Promise<ITokensResponse> {
    const { email, password } = data;
    const user = await this.userRepository.getByEmail(email);
    if (!user) {
      throw new IncorrectUsernameOrPasswordError();
    }

    const isCorrectPassword = await this.bcryptService.comparePasswords(
      user.password,
      password,
    );

    if (!isCorrectPassword) {
      throw new IncorrectUsernameOrPasswordError();
    }

    const tokens = await this.registerNewEntry(user);

    return tokens;
  }

  async register(data: IRegisterDto): Promise<ITokensResponse> {
    const { email, username, password } = data;
    const userByEmail = await this.userRepository.getByEmail(email);
    if (userByEmail) {
      throw new EmailTakenError();
    }

    const userByUsername = await this.userRepository.getByUsername(username);
    if (userByUsername) {
      throw new UsernameTakenError();
    }

    const hashPassword = await this.bcryptService.hash(password);

    const user = await this.userRepository.create({
      email,
      username,
      password: hashPassword,
    });

    const tokens = await this.registerNewEntry(user);

    return tokens;
  }

  async logout(userId: string, refreshToken: string): Promise<void> {
    const row = await this.authRepository.getByUserIdAndRefreshToken(
      userId,
      refreshToken,
    );

    if (!row) {
      throw new AlreadyLogoutError();
    }

    await this.authRepository.deleteById(row.id);
  }

  async refresh(refreshToken: string): Promise<ITokensResponse> {
    const row = await this.authRepository.getByRefreshToken(refreshToken);

    if (!row) {
      throw new NotLoginedError();
    }

    // check if token expired;
    const decoded = await this.jwtService.parseToken(
      row.refreshToken,
      process.env.JWT_REFRESH_SECRET,
    );

    // if expired
    if (!decoded) {
      await this.authRepository.deleteById(row.id);

      throw new TokenExpiredError();
    }

    const user = await this.userRepository.getById(decoded.id);

    await this.authRepository.deleteById(row.id);

    const tokens = await this.registerNewEntry(user);

    return tokens;
  }

  private createRefreshToken(user: User): string {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;

    return this.jwtService.createToken(
      userWithoutPassword,
      process.env.JWT_REFRESH_SECRET,
      process.env.JWT_REFRESH_EXPIRES,
    );
  }

  private createAccessToken(user: User): string {
    // eslint-disable-next-line
    const { password, ...userWithoutPassword } = user;

    return this.jwtService.createToken(
      userWithoutPassword,
      process.env.JWT_ACCESS_SECRET,
      process.env.JWT_ACCESS_EXPIRES,
    );
  }

  private createTokens(user: User): ITokensResponse {
    const accessToken = this.createAccessToken(user);
    const refreshToken = this.createRefreshToken(user);

    return { accessToken, refreshToken };
  }

  private async registerNewEntry(user: User): Promise<ITokensResponse> {
    const tokens = this.createTokens(user);

    await this.authRepository.create(user.id, tokens.refreshToken);

    return tokens;
  }
}

export { AuthService };
