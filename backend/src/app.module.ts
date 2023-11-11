import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UsersModule } from './modules/users/users.module';
import { CalculateModule } from './modules/calculate/calculate.module';

@Module({
  imports: [PrismaModule, AuthModule, UsersModule],
})
export class AppModule {}
