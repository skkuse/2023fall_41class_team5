import { Module } from '@nestjs/common';
import { CalculateController } from './calculate.controller';
import { CalculateService } from './calculate.service';
import { PostModule } from '../post/post.module';

@Module({
  controllers: [CalculateController],
  providers: [CalculateService],
  imports: [PostModule]
})
export class CalculateModule {}
