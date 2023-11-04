import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export type User = {
  userId: number;
  username: string;
  password: string;
};

@Injectable()
export class AuthService {
  private readonly users: User[] = [
    {
      userId: 1,
      username: 'viktor',
      password: 'qwerty',
    },
  ];

  constructor(private jwtService: JwtService) {}

  async signIn(username, pass) {
    const user = this.users.find((u) => u.username === username);
    if (!user || user.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.userId, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
