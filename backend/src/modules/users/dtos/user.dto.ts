import { User } from '@prisma/client';

export class UserDto {
  id: number;
  name: string;
  email: string;
  loginId: string;
  birthDay: string;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.loginId = user.loginId;
    this.birthDay = user.birthDay.toISOString().substring(0, 10);
  }
}
