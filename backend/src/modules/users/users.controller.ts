import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { CommonResponseDto } from 'src/common/dtos/common-response.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from '@prisma/client';
import { UserDto } from './dtos/user.dto';

@ApiTags('Users API')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: '회원가입' })
  @ApiBody({ type: CreateUserDto })
  async createUser(@Body() createUserDto: CreateUserDto) {
    await this.usersService.createUser(createUserDto);
    return new CommonResponseDto();
  }

  @UseGuards(JwtGuard)
  @Get('/me')
  @ApiOperation({ summary: '본인 정보 조회' })
  async getMe(@CurrentUser() currentUser: User) {
    const user = new UserDto(currentUser);
    return new CommonResponseDto(user);
  }
}
