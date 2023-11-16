import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UsersModule } from './modules/users/users.module';
import { InformationModule } from './modules/information/information.module';
import { PostModule } from './modules/post/post.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
    InformationModule,
    PostModule,
  ],
})
export class AppModule {}
