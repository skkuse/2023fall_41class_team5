import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Post } from './types/post.type';
import { User } from '@prisma/client';

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}

  async getPostList(currentUser: User) {
    const posts = await this.prismaService.executionInfos.findMany({
      where: {
        userId: currentUser.id,
      },
    });

    const totalCount = await this.prismaService.executionInfos.count({
      where: {
        userId: currentUser.id,
      },
    });

    return { posts, totalCount };
  }

  async getPost(id: number, currentUser: User) {
    const post = await this.prismaService.executionInfos.findUnique({
      where: {
        id,
      },
    });

    if (!post) throw new BadRequestException();
    if (post.userId !== currentUser.id) throw new UnauthorizedException();

    return post;
  }

  // 실행 정보 저장 로직
  async savePost(post: Post) {
    post.name = post.name ? post.name : `${post.userId}_${new Date()}`;

    try {
      return await this.prismaService.$transaction(async (tx) => {
        await tx.executionInfos.create({
          data: {
            userId: post.userId,
            name: post.name,
            code: post.code,
            runTime: post.runTime,
            hostName: post.runTime,
            os: post.os,
            platform: post.platform,
            arch: post.arch,
            version: post.version,
            cores: post.cores,
            cpuName: post.cpuName,
            cpuSpeed: post.cpuSpeed,
            carbonFootprint: post.carbonFootprint,
            energyNeeded: post.energyNeeded,
            PUE: post.PUE,
            PSF: post.PSF,
          },
        });
      });
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException('ERROR');
    }
  }
}
