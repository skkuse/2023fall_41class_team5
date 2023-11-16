import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { JwtGuard } from '../auth/guards/jwt.guard';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from '@prisma/client';
import { PostDto, PostListDto } from './dtos/post.dto';
import { CommonResponseDto } from 'src/common/dtos/common-response.dto';

@Controller('post')
@UseGuards(JwtGuard)
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: '계산 결과 리스트로 조회',
  })
  @ApiUnauthorizedResponse({
    description: '접근 권한 없음',
  })
  @ApiInternalServerErrorResponse({
    description: '서버 내부 오류',
  })
  async getPostList(@CurrentUser() currentUser: User) {
    const { posts, totalCount } = await this.postService.getPostList(
      currentUser,
    );

    const results = new PostListDto(
      posts.map((post) => {
        return new PostDto(post);
      }),
      totalCount,
    );

    return new CommonResponseDto(results);
  }

  @Get(':id')
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: '하나의 계산 결과 조회',
  })
  @ApiUnauthorizedResponse({
    description: '접근 권한 없음',
  })
  @ApiBadRequestResponse({
    description: '조회 결과 존재하지 않음',
  })
  @ApiBadRequestResponse({})
  @ApiInternalServerErrorResponse({
    description: '서버 내부 오류',
  })
  async getPost(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() currentUser: User,
  ) {
    const post = await this.postService.getPost(id, currentUser);

    return new CommonResponseDto(new PostDto(post));
  }
}
