// calculate.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { CalculateService } from './calculate.service';
import { CalculateController } from './calculate.controller';
import { CodeDto } from './dtos/code.dto';

jest.setTimeout(30000);

describe('CalculateService', () => {
  let service: CalculateService;
  let controller: CalculateController;
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CalculateService, CalculateController],
    }).compile();

    service = module.get<CalculateService>(CalculateService);
    controller = module.get<CalculateController>(CalculateController);
  });
  
  it('get cf', async() => {
      const javaCode = 'public class aaaa { public static void main(String[] args) {System.out.println("Hello, World!")}}';
      const coreType = 'cpu';
      const cpuType = 'Core i7-8700K'
      const n_cpu = 8;
      const cpuUsage = 1;
      const gpuType = '';
      const n_gpu = 0;
      const gpuUsage = 0;
      const memAvailable = 64;
      const provider = 'Unknown';
      const location = 'KR';

      const capturedOutput1 = await service.executeCodeAndGetTime(javaCode);
      const capturedOutput2 = service.getEnergyNeeded(capturedOutput1, coreType, cpuType, n_cpu, cpuUsage, gpuType, n_gpu, gpuUsage, memAvailable, provider);
      const capturedOutput3 = service.getCarbonFootprint(capturedOutput2, location);

      const codeDto = new CodeDto();
      codeDto.javaCode = javaCode;
      const capturedOutput = await controller.calculateCarbonFootprint(codeDto);
    
      expect(capturedOutput1).toBeDefined();
      expect(capturedOutput2).toBeDefined();
      expect(capturedOutput3).toBeDefined();
      console.log(capturedOutput1);
      console.log(capturedOutput2);
      console.log(capturedOutput3);

      expect(capturedOutput).toBeDefined();
      console.log(capturedOutput.executionTime);
      console.log(capturedOutput.coreType);
      console.log(capturedOutput.cpuType);
      console.log(capturedOutput.kWh);
      console.log(capturedOutput.gCo2);
      console.log(capturedOutput.treeMonths);
      console.log(capturedOutput.driving);
      console.log(capturedOutput.flight);
  });

  // it('should execute Java code and return execution time', async () => {
  //   /*
  //   1. public class 하나 있는 제대로 동작하는 코드
  //   2. 그냥 class 하나 있는 제대로 동작하는 코드
  //   3. public class, class 섞여 있는 제대로 동작하는 코드
  //   */
  //   const testJavaCode1 = 'public class aaaa { public static void main(String[] args) {System.out.println("Hello, World!");}}';
  //   const testJavaCode2 = 'class bbbb { public static void main(String[] args) {System.out.println("Hello, World!");}}';
  //   const testJavaCode3 = 'class cccc { public static void main(String[] args) {System.out.println("Hello, World!");}} public class aaaa { public static void main(String[] args) {System.out.println("Hello, World!");}}';    

  //   const capturedOutput1 = await service.executeCodeAndGetTime(testJavaCode1);
  //   const capturedOutput2 = await service.executeCodeAndGetTime(testJavaCode2);
  //   const capturedOutput3 = await service.executeCodeAndGetTime(testJavaCode3);

  //   expect(capturedOutput1).toBeDefined();
  //   expect(capturedOutput1).toBeGreaterThanOrEqual(0);
  //   expect(capturedOutput2).toBeDefined();
  //   expect(capturedOutput2).toBeGreaterThanOrEqual(0);
  //   expect(capturedOutput3).toBeDefined();
  //   expect(capturedOutput3).toBeGreaterThanOrEqual(0);
  // });

  // it('compile failure and should return -1', async() => {
  //   const testJavaCode = 'public class cccc { public static void main(String[] args) {System.out.println("Hello, World!")}}';
  //   const capturedOutput = await service.executeCodeAndGetTime(testJavaCode);

  //   expect(capturedOutput).toBeDefined();
  //   expect(capturedOutput).toEqual(-1);
  // });

  // it('too long execution and should return -2', async() => {
  //   const testJavaCode = 'public class cccc { public static void main(String[] args) {while(true);}}';
  //   const capturedOutput = await service.executeCodeAndGetTime(testJavaCode);

  //   expect(capturedOutput).toBeDefined();
  //   expect(capturedOutput).toEqual(-2);
  // });

  // it('run time error and should return -3', async() => {
  //   const testJavaCode = 'class bbbb { public static void main(String[] args) {String str = null; System.out.println(str.length());}}';
  //   const testJavaCode1 = 'class cccc { public static void main1() {}} class aaaa { public static void main(String[] args) {System.out.println("Hello, World!");}}'
  //   const capturedOutput = await service.executeCodeAndGetTime(testJavaCode);
  //   const capturedOutput1 = await service.executeCodeAndGetTime(testJavaCode1);
    
  //   expect(capturedOutput).toBeDefined();
  //   expect(capturedOutput).toEqual(-3);
  //   expect(capturedOutput1).toBeDefined();
  //   expect(capturedOutput1).toEqual(-3);
  // });
});
