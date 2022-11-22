import type { User } from '@domain/models';
import type { TokensResponse, LoginDto, IRegisterDto } from '@domain/contracts';
import type {
  IAuthService,
  IBcryptService,
  IJwtService,
} from '@domain/services';
import type { IAuthRepository, IUserRepository } from '@domain/repository';
import { BadRequestException } from '@nestjs/common';

class AuthService implements IAuthService {
  constructor(
    private authRepository: IAuthRepository,
    private userRepository: IUserRepository,
    private bcryptService: IBcryptService,
    private jwtService: IJwtService,
  ) {}

  async login(data: LoginDto): Promise<TokensResponse> {
    const { email, password } = data;
    const user = await this.userRepository.getByEmail(email);
    if (!user) {
      throw new BadRequestException('No user with this email!');
    }

    const isCorrectPassword = await this.bcryptService.comparePasswords(
      user.password,
      password,
    );

    if (!isCorrectPassword) {
      throw new BadRequestException('Password is incorrect!');
    }

    const tokens = await this.registerNewEntry(user);

    return tokens;
  }

  async register(data: IRegisterDto): Promise<TokensResponse> {
    const { email, username, password } = data;
    const userByEmail = await this.userRepository.getByEmail(email);
    if (userByEmail) {
      throw new BadRequestException('User with this email already exist!');
    }

    const userByUsername = await this.userRepository.getByUsername(username);
    if (userByUsername) {
      throw new BadRequestException('User with this username already exist!');
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
      throw new BadRequestException('You are already logout!');
    }

    await this.authRepository.deleteById(row.id);
  }

  async refresh(refreshToken: string): Promise<TokensResponse> {
    const row = await this.authRepository.getByRefreshToken(refreshToken);

    if (!row) {
      throw new BadRequestException('You are not logined!');
    }

    // check if token expired;
    const decoded = await this.jwtService.parseToken(
      row.refreshToken,
      process.env.JWT_REFRESH_SECRET,
    );

    // if expired
    if (!decoded) {
      await this.authRepository.deleteById(row.id);

      throw new BadRequestException('Refresh token is expired!');
    }

    const user = await this.userRepository.getById(decoded.id);

    await this.authRepository.deleteById(row.id);

    const tokens = await this.registerNewEntry(user);

    return tokens;
  }

  private createRefreshToken(user: User) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;

    return this.jwtService.createToken(
      userWithoutPassword,
      process.env.JWT_REFRESH_SECRET,
      process.env.JWT_REFRESH_EXPIRES,
    );
  }

  private createAccessToken(user: User) {
    // eslint-disable-next-line
    const { password, ...userWithoutPassword } = user;

    return this.jwtService.createToken(
      userWithoutPassword,
      process.env.JWT_ACCESS_SECRET,
      process.env.JWT_ACCESS_EXPIRES,
    );
  }

  private createTokens(user: User): TokensResponse {
    const accessToken = this.createAccessToken(user);
    const refreshToken = this.createRefreshToken(user);

    return { accessToken, refreshToken };
  }

  private async registerNewEntry(user: User): Promise<TokensResponse> {
    const tokens = this.createTokens(user);

    await this.authRepository.create(user.id, tokens.refreshToken);

    return tokens;
  }
}

export { AuthService };
