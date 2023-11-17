import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { CalculateService } from './calculate.service';
import { CodeDto } from './dtos/code.dto';
import { ResultDto } from './dtos/result.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from '@prisma/client';

@Controller('calculate')
export class CalculateController {
    constructor(private readonly calculateService: CalculateService){}

    @Post()
    @ApiOperation({ summary: '비 로그인 사용자 탄소 배출량 계산' })
    async calculate(@CurrentUser() currentUser: User, @Body() codeDto: CodeDto): Promise<ResultDto> {
        /**
         * javaCode     : 입력받은 자바 코드
         * coreType     : cpu, gpu, both
         * cpuType      : cpu 모델명
         * n_cpu        : cpu core 개수
         * cpuUsage     : 유저가 입력한 값 or 1
         * gpuType      : gpu 모델명
         * n_gpu        : gpu core 개수
         * gpuUsage     : 유저가 입력한 값 or 1
         * memAvailable : 가용가능한 메모리
         * provider     : local, personal 이면 Unknown이고 이외에 gcp, aws, azure가 있음, defaults_PUE.csv 참고
         * location     : CI_aggregated.csv 참고
        */
        const javaCode = codeDto.javaCode;
        const coreType = 'cpu';
        const cpuType = 'Core i7-8700K'
        const n_cpu = 8;
        const cpuUsage = 1;
        const gpuType = '';
        const n_gpu = 0;
        const gpuUsage = 0;
        const memAvailable = 64;
        const provider = 'Local server';
        const location = 'KR';
        let kWh = 0;
        let gCo2 = 0;
        let treeMonths = 0;
        let driving = 0;
        let flight = 0;

        const executionTime = await this.calculateService.executeCodeAndGetTime(javaCode);
        if(executionTime > 0){
            kWh = this.calculateService.getEnergyNeeded(executionTime, coreType, cpuType, n_cpu, cpuUsage, gpuType, n_gpu, gpuUsage, memAvailable, provider);
            gCo2 = this.calculateService.getCarbonFootprint(kWh, location);
            treeMonths = this.calculateService.getTreeMonths(gCo2);
            driving = this.calculateService.getDriving(gCo2);
            flight = this.calculateService.getFlight(gCo2);   
        }
        
        const ret = new ResultDto(executionTime, coreType, cpuType, n_cpu, cpuUsage, gpuType, n_gpu, gpuUsage, memAvailable, provider, location, kWh, gCo2, treeMonths, driving, flight);
        
        if(currentUser)await this.calculateService.saveData(currentUser, javaCode, ret);
        
        return ret;
    }
}
