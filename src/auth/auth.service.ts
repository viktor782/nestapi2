import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export type User = {
  userId: number;
  username: string;
  password: string;
  email: string;
};

@Injectable()
export class AuthService {
  private readonly users: User[] = [
    {
      userId: 1,
      username: 'viktor',
      password: 'qwerty',
      email: 'qwer@gmail.com',
    },
  ];

  constructor(private jwtService: JwtService) {}

  async signUp(
    username: string,
    email: string,
    password: string,
  ): Promise<User> {
    const existingUser = this.users.find(
      (u) => u.email === email || u.username === username,
    );

    if (existingUser) {
      throw new UnauthorizedException(
        'Користувач з таким email або username вже існує',
      );
    }

    const newUser: User = {
      userId: this.users.length + 1,
      username,
      email,
      password,
    };

    this.users.push(newUser);

    return newUser;
  }

  async signIn(usernameOrEmail: string, pass: string) {
    const user = this.users.find(
      (u) => u.username === usernameOrEmail || u.email === usernameOrEmail,
    );
    if (!user || user.password !== pass) {
      throw new UnauthorizedException('Неправильний логін або пароль');
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
