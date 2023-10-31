import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequestDto } from './dtos/login-request.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommonResponseDto } from 'src/common/common-response.dto';

@ApiTags('Auth API')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiOperation({ summary: '로그인' })
  @ApiBody({ type: LoginRequestDto })
  async login(@Body() loginRequestDto: LoginRequestDto) {
    const accessToken = await this.authService.login(loginRequestDto);

    return new CommonResponseDto({ accessToken });
  }
}
