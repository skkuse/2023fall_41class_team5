import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  loginId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}
