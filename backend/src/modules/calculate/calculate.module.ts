import { Module } from '@nestjs/common';
import { CalculateController } from './calculate.controller';
import { CalculateService } from './calculate.service';
import { PostModule } from '../post/post.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [CalculateController],
  providers: [CalculateService, JwtService],
  imports: [PostModule],
})
export class CalculateModule {}
