import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { CalculateService } from './calculate.service';
import { CodeDto } from './dtos/code.dto';
import { ResultDto } from './dtos/result.dto';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { User } from '@prisma/client';

@Controller('calculate')
export class CalculateController {
    constructor(private readonly calculateService: CalculateService){}

    @Post()
    @ApiOperation({ summary: '로그인 사용자 탄소 배출량 계산' })
    async calculate(@CurrentUser() currentUser: User, @Body() codeDto: CodeDto): Promise<ResultDto> {
        const executionTime = await this.calculateService.executeCodeAndGetTime(codeDto.javaCode);
        const result = this.calculateService.getResult(codeDto.javaCode, executionTime, currentUser);
        
        return result;
    }
}
