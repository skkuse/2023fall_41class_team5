// calculate.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { CalculateService } from './calculate.service';

jest.setTimeout(30000);

describe('CalculateService', () => {
  let service: CalculateService;
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CalculateService],
    }).compile();

    service = module.get<CalculateService>(CalculateService);
  });
  
  it('should execute Java code and return execution time', async () => {
    /*
    1. public class 하나 있는 제대로 동작하는 코드
    2. 그냥 class 하나 있는 제대로 동작하는 코드
    3. public class, class 섞여 있는 제대로 동작하는 코드
    */
    const testJavaCode1 = 'public class aaaa { public static void main(String[] args) {System.out.println("Hello, World!");}}';
    const testJavaCode2 = 'class bbbb { public static void main(String[] args) {System.out.println("Hello, World!");}}';
    const testJavaCode3 = 'class cccc { public static void main(String[] args) {System.out.println("Hello, World!");}} public class aaaa { public static void main(String[] args) {System.out.println("Hello, World!");}}';    

    const capturedOutput1 = await service.executeCodeAndGetTime(testJavaCode1);
    const capturedOutput2 = await service.executeCodeAndGetTime(testJavaCode2);
    const capturedOutput3 = await service.executeCodeAndGetTime(testJavaCode3);

    expect(capturedOutput1).toBeDefined();
    expect(capturedOutput1).toBeGreaterThanOrEqual(0);
    expect(capturedOutput2).toBeDefined();
    expect(capturedOutput2).toBeGreaterThanOrEqual(0);
    expect(capturedOutput3).toBeDefined();
    expect(capturedOutput3).toBeGreaterThanOrEqual(0);
  });

  it('compile failure and should return -1', async() => {
    const testJavaCode = 'public class cccc { public static void main(String[] args) {System.out.println("Hello, World!")}}';
    const capturedOutput = await service.executeCodeAndGetTime(testJavaCode);

    expect(capturedOutput).toBeDefined();
    expect(capturedOutput).toEqual(-1);
  });

  it('too long execution and should return -2', async() => {
    const testJavaCode = 'public class cccc { public static void main(String[] args) {while(true);}}';
    const capturedOutput = await service.executeCodeAndGetTime(testJavaCode);

    expect(capturedOutput).toBeDefined();
    expect(capturedOutput).toEqual(-2);
  });

  it('run time error and should return -3', async() => {
    const testJavaCode = 'class bbbb { public static void main(String[] args) {String str = null; System.out.println(str.length());}}';
    const capturedOutput = await service.executeCodeAndGetTime(testJavaCode);

    expect(capturedOutput).toBeDefined();
    expect(capturedOutput).toEqual(-3);
  });
});
