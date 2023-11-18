import { Body, Controller, Post, Req, UseInterceptors } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { CalculateService } from './calculate.service';
import { CodeDto } from './dtos/code.dto';
import { ResultDto } from './dtos/result.dto';
import { CalculateInterceptor } from './interceptors/calculate.interceptor';

@Controller('calculate')
export class CalculateController {
  constructor(private readonly calculateService: CalculateService) {}

  @Post()
  @UseInterceptors(CalculateInterceptor)
  @ApiOperation({ summary: '로그인 사용자 탄소 배출량 계산' })
  async calculate(
    @Body() codeDto: CodeDto,
    @Req() request,
  ): Promise<ResultDto> {
    const executionTime = await this.calculateService.executeCodeAndGetTime(
      codeDto.javaCode,
    );
    const result = this.calculateService.getResult(
      codeDto.javaCode,
      executionTime,
      request,
    );

    return result;
  }
}
