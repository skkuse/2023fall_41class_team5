import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as childProcess from 'child_process';
import * as fs from 'fs';

@Injectable()
export class CalculateService {
  //constructor(private readonly prismaService: PrismaService) {}

  async executeCodeAndGetTime(javaCode: string): Promise<number> {
    const className = this.extractClassName(javaCode) || 'temp';
    const fileName = `${className}.java`;
    const gclassName = `${className}.class`;

    fs.writeFileSync(fileName, javaCode);

    var isSuccess = 0;
    const startTime = Date.now();
    try{
      const result = await this.executeJavaCode(fileName);
      isSuccess = 1;
      const endTime = Date.now();
      const executionTime = endTime - startTime;
      /////////////////////////////
      //db에 executionTime, source code 저장




      /////////////////////////////
      return executionTime;
    } catch (error) {
        console.error(`Error executing Java code: ${error}`);
        throw new Error('Java code compilation failed. Please check your code and try again.');
    } finally {
        // 임시 java file 삭제
        if (isSuccess === 1){
          fs.unlinkSync(gclassName);
        }
        fs.unlinkSync(fileName);
        return 0;
    }
  }

  private extractClassName(javaCode: string): string | null {
    const classNameMatch = javaCode.match(/class\s+(\w+)/);
    return classNameMatch ? `${classNameMatch[1]}` : null;
  }

  private async executeJavaCode(fileName: string): Promise<string> {
    // Java 코드 실행 로직 구현
    // 예시: childProcess.spawn을 사용하여 Java 코드 실행
    // 이 부분은 사용하는 Java 실행 방식에 따라 구현해야 합니다.
    // 자세한 구현은 Java 실행 방식 및 환경에 따라 다를 수 있습니다.

    // 예시로 stdout에 결과를 리턴하도록 설정
    return new Promise<string>((resolve, reject) => {
      const process = childProcess.spawn('javac', [fileName]);

      process.on('close', (code) => {
        if (code === 0) {
          const javaExecution = childProcess.spawn('java', [fileName]);

          let result = '';

          javaExecution.stdout.on('data', (data) => {
            result += data;
          });

          javaExecution.on('close', () => {
            resolve(result);
          });
        } else {
          reject(`Java compilation failed with code ${code}`);
        }
      });
    });
  }
}
