export class ResultDto {
  executionTime: number;
  coreType: string;
  cpuType: string;
  n_cpu: number;
  cpuUsage: number;
  gpuType: string;
  n_gpu: number;
  gpuUsage: number;
  memAvailable: number;
  provider: string;
  location: string;
  kWh: number;
  gCo2: number;
  treeMonths: number;
  driving: number;
  flight: number;
  memCo2: number;
  cpuCo2: number;
  userId: number;
  javaCode: string;
  PUE: string;
  PSF: string;

  constructor(
    executionTime: number,
    coreType: string,
    cpuType: string,
    n_cpu: number,
    cpuUsage: number,
    gpuType: string,
    n_gpu: number,
    gpuUsage: number,
    memAvailable: number,
    provider: string,
    location: string,
    kWh: number,
    gCo2: number,
    treeMonths: number,
    driving: number,
    flight: number,
    memCo2: number,
    cpuCo2: number,
    userId: number,
    javaCode: string,
    PUE: string,
    PSF: string,
  ) {
    this.executionTime = executionTime;
    this.coreType = coreType;
    this.cpuType = cpuType;
    this.n_cpu = n_cpu;
    this.cpuUsage = cpuUsage;
    this.gpuType = gpuType;
    this.n_gpu = n_gpu;
    this.gpuUsage = gpuUsage;
    this.memAvailable = memAvailable;
    this.provider = provider;
    this.location = location;
    this.kWh = kWh;
    this.gCo2 = gCo2;
    this.treeMonths = treeMonths;
    this.driving = driving;
    this.flight = flight;
    this.memCo2 = memCo2;
    this.cpuCo2 = cpuCo2;
    this.userId = userId;
    this.javaCode = javaCode;
    this.PUE = PUE;
    this.PSF = PSF
  }
}
