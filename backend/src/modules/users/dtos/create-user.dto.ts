import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: '홍길동' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'Roaddong@example.com' })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '2000-01-01' })
  @IsNotEmpty()
  @IsString()
  birthDay: Date;

  @ApiProperty({ example: 'Road-dong' })
  @IsNotEmpty()
  @IsString()
  loginId: string;

  @ApiProperty({ example: '1234' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
