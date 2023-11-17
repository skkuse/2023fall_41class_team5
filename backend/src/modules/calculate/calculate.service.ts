import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as childProcess from 'child_process';
import * as fs from 'fs';
import { TYPE_PUE, TYPE_PSF, TYPE_SPEC, TYPE_CI, TYPE_REF } from './type/calculate.type';
import { User } from '@prisma/client';
import { ResultDto } from './dtos/result.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CalculateService {
  constructor(private readonly prismaService: PrismaService) {}

  async saveData(currentUser: User, javaCode: string, result: ResultDto){
    const userId  = currentUser.id;  
    const name = this.extractClassName(javaCode);
    
    try {
      await this.prismaService.$transaction(async (tx) => {
        await tx.executionInfos.create({
          data: {
            userId: userId,
            name: name,
            code: javaCode,
            runTime: result.executionTime.toString() + 's',
            hostName: 'localhost',
            os: 'Windows',
            platform: 'win32',
            arch: 'x64',
            version: '10.0.10',
            cores: (result.n_cpu+result.n_gpu).toString(),
            cpuName: result.cpuType,
            cpuSpeed: '2.0 GHz',
            carbonFootprint: result.gCo2.toString() + 'g',
            energyNeeded: result.kWh.toString() + 'KWh',
            PUE: this.getPUEByProvider(result.provider).toString(),
            PSF: this.getPSF().toString(),
          },
        });
      });
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }

  /*return energy needed in kWh*/
  public getEnergyNeeded(executionTime: number, coreType: string, cpuType: string, n_cpu: number, cpuUsage: number, gpuType: string, n_gpu: number, gpuUsage: number, memAvailable: number, provider: string): number{
    let powerNeededGpu = 0;
    let powerNeededCpu = 0;
    let cpuPower = 0;
    let gpuPower = 0;
    let PUE = this.getPUEByProvider(provider);
    let PSF = this.getPSF();

    if(coreType === 'cpu'){
      cpuPower = this.getCpuPowerByModel(cpuType);
    }
    else if(coreType === 'gpu'){
      gpuPower = this.getGpuPowerByModel(gpuType);
    }
    else{
      cpuPower = this.getCpuPowerByModel(cpuType);
      gpuPower = this.getGpuPowerByModel(gpuType);
    }
    
    powerNeededCpu = PUE * n_cpu * cpuPower * cpuUsage;
    powerNeededGpu = PUE * n_gpu * gpuPower * gpuUsage;

    executionTime = this.secondsToHours(executionTime);

    const powerNeededCore = powerNeededGpu + powerNeededCpu;
    const powerNeededMem = memAvailable * 0.3725;
    const powerNeeded = powerNeededCore + powerNeededMem;

    const energyNeeded = executionTime * powerNeeded * PSF / 1000

    return energyNeeded;
  }

  public getCarbonFootprint(energyNeeded: number, location: string){
    const carbonIntensity = this.getCarbonIntensity(location);
    return energyNeeded * carbonIntensity;
  }

  public getTreeMonths(gCo2: number){
    const refValue = this.getRefVal('tree_month');
    return gCo2 * refValue;
  }

  public getDriving(gCo2: number){
    const refValue = this.getRefVal('passengerCar_US_perkm');
    return gCo2 * refValue;
  }

  public getFlight(gCo2: number){
    const refValue = this.getRefVal('flight_economy_perkm');
    return gCo2 * refValue;
  }

  async executeCodeAndGetTime(javaCode: string): Promise<number> {
    const className = this.extractClassName(javaCode);
    const fileName = `${className}.java`;
    const folderPath = './code';
    
    if(!fs.existsSync(folderPath)){
      fs.mkdirSync(folderPath);
    }
    fs.writeFileSync(`./code/${fileName}`, javaCode);

    const timeoutLimit = 10;
    const result = await this.executeJavaCode(fileName, timeoutLimit);
    const executionTime = this.converTimeFormatToSeconds(result);
   
    // ./code 안에 생성된 파일 모두 삭제
    this.deleteFilesInDirectory('./code');
    
    return executionTime;
  }

  private async executeJavaCode(fileName: string, timeoutLimit: number): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const process = childProcess.spawn('javac', [`./code/${fileName}`]);
  
      process.on('close', (code) => {
        if (code === 0) {
          const javaExecutionCommand = `sh -c 'time timeout ${timeoutLimit}s java ./code/${fileName}'`;
          const javaExecution = childProcess.spawn(javaExecutionCommand, { shell: true });

          let result = '';

          // 자바 코드 실행 결과 수집
          javaExecution.stdout.on('data', (data) => {
            result += data.toString();
          });
  
          // 자바 코드 실행 시간 (time)
          javaExecution.stderr.on('data', (error) => {
            result += error.toString();
          });
  
          javaExecution.on('close', (exitCode) => {
            if (exitCode === 0) { // 정상적으로 실행
              resolve(result);
            } 
            else if (exitCode === 124){  // too long execution시 -2을 converTimeFormatToSeconds로 전달
              resolve('-2'); 
            }
            else {  // run time error 발생 시 -3을 converTimeFormatToSeconds로 전달
              resolve('-3'); 
            }
          });
        } else {
          resolve('-1');
        }
      });
    });
  }  

  private getCpuPowerByModel(model: string): number{
    const filePath = '../json/TDP_cpu.json';
  
    const data: TYPE_SPEC[] = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  
    const matchedProvider = data.find((entry) => entry.model === model);
  
    return parseFloat(matchedProvider.TDP_per_core);
  }

  private getGpuPowerByModel(model: string): number{
    const filePath = '../json/TDP_gpu.json';
  
    const data: TYPE_SPEC[] = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  
    const matchedProvider = data.find((entry) => entry.model === model);
  
    return parseFloat(matchedProvider.TDP_per_core);
  }

  private getPUEByProvider(provider: string): number{
    const filePath = '../json/defaults_PUE.json';
  
    const data: TYPE_PUE[] = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    
    if(provider === 'Local server' || provider === 'Personal computer'){
      provider = 'Unknown';
    }
    const matchedProvider = data.find((entry) => entry.provider === provider);
  
    return parseFloat(matchedProvider.PUE);
  }

  private getPSF(): number{
    const filePath = '../json/PSF.json';
  
    const jsonData: TYPE_PSF = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    
    return jsonData.data;
  }

  private getCarbonIntensity(location: string): number{
    const filePath = '../json/CI_aggregated.json';
  
    const data: TYPE_CI[] = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  
    const matchedProvider = data.find((entry) => entry.location === location);
  
    return parseFloat(matchedProvider.carbonIntensity);
  }

  private getRefVal(refVal: string): number{
    const filePath = '../json/referenceValues.json';
    let ret = 0;
    const data: TYPE_REF[] = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    
    const matchedProvider = data.find((entry) => entry.variable === refVal);
  
    return parseFloat(matchedProvider.value);
  }

  private secondsToHours(seconds: number): number {
    return seconds / 3600;
  }

  private extractClassName(javaCode: string): string | null {
    const classNameMatch = javaCode.match(/public\s+class\s+(\w+)/);
    return classNameMatch ? classNameMatch[1] : 'temp';
  }

  private converTimeFormatToSeconds(timeString: string): number | null{
    const match = timeString.match(/(\d+\.\d+)s/);
    if(match)return parseFloat(match[1]);
    else if(timeString === '-1')return -1; //compile failure
    else if(timeString === '-2')return -2; //too long execution
    else if(timeString === '-3')return -3; //run time error
  }

  private deleteFilesInDirectory(directoryPath: string): void {
    const files = fs.readdirSync(directoryPath);

    for (const file of files) {
      const filePath = `${directoryPath}/${file}`;
      fs.unlinkSync(filePath);
    }
  }
}
