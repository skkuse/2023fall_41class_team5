import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { CalculateService } from './calculate.service';

@Controller('calculate')
export class CalculateController {
    constructor(private readonly calculateService: CalculateService){}

    @Post('execute')
    @ApiOperation({ summary: '탄소 배출량 계산' })
    async executeCode(@Body() code: { javaCode: string }): Promise<number> {
        const result = await this.calculateService.executeCodeAndGetTime(code.javaCode);
        return result;
    }
}
