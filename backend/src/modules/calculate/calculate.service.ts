import { Injectable } from '@nestjs/common';
import * as childProcess from 'child_process';
import * as fs from 'fs';

@Injectable()
export class CalculateService {

  async executeCodeAndGetTime(javaCode: string): Promise<number> {
    const className = this.extractClassName(javaCode);
    const fileName = `${className}.java`;
    const folderPath = './code';
    
    if(!fs.existsSync(folderPath)){
      fs.mkdirSync(folderPath);
    }
    fs.writeFileSync(`./code/${fileName}`, javaCode);

    var isCPSuccess = false;
    const result = await this.executeJavaCode(fileName);
    const executionTime = this.converTimeFormatToSeconds(result);
    isCPSuccess = true;
   
    // ./code 안에 생성된 파일 모두 삭제
    this.deleteFilesInDirectory('./code');
    
    return executionTime;
  }

  private async executeJavaCode(fileName: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const process = childProcess.spawn('javac', [`./code/${fileName}`]);
  
      process.on('close', (code) => {
        if (code === 0) {
          const javaExecutionCommand = `sh -c 'time timeout 10s java ./code/${fileName}'`;
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
