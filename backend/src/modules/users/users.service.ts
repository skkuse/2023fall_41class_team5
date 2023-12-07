import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(createUserDto: CreateUserDto) {
    const { loginId, password, email, name, birthDay } = createUserDto;

    if (await this.isDuplicatedLoginId(loginId)) {
      throw new BadRequestException('해당 아이디는 사용하실 수 없습니다');
    }

    if (await this.isDuplicatedEmail(email)) {
      throw new BadRequestException('해당 이메일은 사용하실 수 없습니다');
    }

    try {
      await this.prismaService.$transaction(async (tx) => {
        await tx.user.create({
          data: {
            loginId,
            password: await bcrypt.hash(password, 10),
            email,
            name,
            birthDay: new Date(birthDay),
          },
        });
      });
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }

  private async isDuplicatedLoginId(loginId: string) {
    const user: User = await this.prismaService.user.findUnique({
      where: {
        loginId,
      },
    });

    return user ? true : false;
  }

  private async isDuplicatedEmail(email: string) {
    const user: User = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    return user ? true : false;
  }
}
