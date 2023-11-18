import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { AppConfigModule } from './config/config.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UsersModule } from './modules/users/users.module';
import { InformationModule } from './modules/information/information.module';
import { PostModule } from './modules/post/post.module';
import { CalculateModule } from './modules/calculate/calculate.module';

@Module({
  imports: [
    AppConfigModule,
    PrismaModule,
    AuthModule,
    UsersModule,
    InformationModule,
    PostModule,
    CalculateModule,
  ],
})
export class AppModule {}
