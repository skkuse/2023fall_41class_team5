import { Injectable } from '@nestjs/common';
import { PostService } from '../post/post.service';
import { User } from '@prisma/client';
import { ResultDto } from './dtos/result.dto';
import { TYPE_PUE, TYPE_PSF, TYPE_SPEC, TYPE_CI, TYPE_REF } from './type/calculate.type';
import { Post } from '../post/types/post.type';
import * as childProcess from 'child_process';
import * as fs from 'fs';


@Injectable()
export class CalculateService {
  constructor(private readonly postService: PostService) {}

  public getResult(javaCode: string, executionTime: number, currentUser: User){
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

    if(executionTime > 0){
      kWh = this.getEnergyNeeded(executionTime, coreType, cpuType, n_cpu, cpuUsage, gpuType, n_gpu, gpuUsage, memAvailable, provider);
      gCo2 = this.getCarbonFootprint(kWh, location);
      treeMonths = this.getTreeMonths(gCo2);
      driving = this.getDriving(gCo2);
      flight = this.getFlight(gCo2);   
    }

    if(!currentUser){
      console.log("not defined");
    }

    if(currentUser){
      let post: Post;
      post.userId = currentUser.id;
      post.name = `${post.userId}_${new Date()}`;
      post.code = javaCode;
      post.runTime = executionTime.toString();
      post.hostName = 'localhost';
      post.os = 'Windows';
      post.platform = 'win32';
      post.arch = 'x64';
      post.version = '10.0.10';
      post.cores = n_cpu.toString();
      post.cpuName = cpuType;
      post.cpuSpeed = '2.0GHz';
      post.carbonFootprint = gCo2.toString() + 'g';
      post.energyNeeded = kWh.toString() + 'KWh';
      post.PUE = this.getPUEByProvider(provider).toString();
      post.PSF = this.getPSF().toString();

      this.postService.savePost(post);
    }

    const ret = new ResultDto(executionTime, coreType, cpuType, n_cpu, cpuUsage, gpuType, n_gpu, gpuUsage, memAvailable, provider, location, kWh, gCo2, treeMonths, driving, flight);

    return ret;
  }

  /*return energy needed in kWh*/
  private getEnergyNeeded(executionTime: number, coreType: string, cpuType: string, n_cpu: number, cpuUsage: number, gpuType: string, n_gpu: number, gpuUsage: number, memAvailable: number, provider: string): number{
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

  private getCarbonFootprint(energyNeeded: number, location: string){
    const carbonIntensity = this.getCarbonIntensity(location);
    return energyNeeded * carbonIntensity;
  }

  private getTreeMonths(gCo2: number){
    const refValue = this.getRefVal('tree_month');
    return gCo2 * refValue;
  }

  private getDriving(gCo2: number){
    const refValue = this.getRefVal('passengerCar_US_perkm');
    return gCo2 * refValue;
  }

  private getFlight(gCo2: number){
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
