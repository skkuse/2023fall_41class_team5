import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { LoginRequestDto } from './dtos/login-request.dto';
import { User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginRequestDto: LoginRequestDto) {
    const { loginId, password } = loginRequestDto;

    const user: User = await this.prismaService.user.findUnique({
      where: {
        loginId,
      },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('로그인 정보를 확인해주세요');
    }

    return this.jwtService.sign({
      id: user.id,
      email: user.email,
    });
  }
}
