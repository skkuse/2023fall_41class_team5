// calculate.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { CalculateService } from './calculate.service';
import * as fs from 'fs';
import * as childProcess from 'child_process';

describe('CalculateService', () => {
  let service: CalculateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CalculateService],
    }).compile();

    service = module.get<CalculateService>(CalculateService);
  });

  it('should execute Java code and return execution time', async () => {
    const javaCode = 'public class HelloWorld { public static void main(String[] args) {System.out.println("Hello, World!");}}';

    const capturedOutput = await service.executeCodeAndGetTime(javaCode);
  
    // 여기에서 모의 Java 코드 실행 결과를 확인
    expect(capturedOutput).toBeDefined();
    expect(capturedOutput).toBeGreaterThanOrEqual(0);
  });
});
