import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { PostService } from 'src/modules/post/post.service';
import { Post } from 'src/modules/post/types/post.type';

@Injectable()
export class CalculateInterceptor implements NestInterceptor {
  constructor(private readonly postService: PostService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap(async (data) => {
        if (data.userId) {
          const post: Post = {
            userId: data.userId,
            code: data.javaCode,
            runTime: data.executionTime.toString(),
            hostName: 'localhost',
            os: 'Windows',
            platform: 'win32',
            arch: 'x64',
            version: '10.0.10',
            cores: data.n_cpu.toString(),
            cpuName: data.cpuType,
            cpuSpeed: '2.4GHz',
            carbonFootprint: data.gCo2.toString() + 'g',
            energyNeeded: data.kWh.toString() + 'kWh',
            PUE: data.PUE,
            PSF: data.PSF,
          };
          await this.postService.savePost(post);
        }
      }),
    );
  }
}
