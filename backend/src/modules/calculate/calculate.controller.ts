import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { CalculateService } from './calculate.service';

@Controller('calculate')
export class CalculateController {
    constructor(private readonly calculateService: CalculateService){}

    @Post('execute')
    @ApiOperation({ summary: '탄소 배출량 계산' })
    async calculateCarbonFootprint(@Body() javaCode: string, coreType: string, cpuType: string, n_cpu: number, cpuUsage: number, gpuType: string, n_gpu: number, gpuUsage: number, memAvailable: number, provider: string, location: string): Promise<number> {
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
        const executionTime = await this.calculateService.executeCodeAndGetTime(javaCode);
        const energyNeeded = this.calculateService.getEnergyNeeded(executionTime, coreType, cpuType, n_cpu, cpuUsage, gpuType, n_gpu, gpuUsage, memAvailable, provider);
        const carbonFootprint = this.calculateService.getCarbonFootprint(energyNeeded, location);
        
        return carbonFootprint;
    }
}
