export type Post = {
  userId: number;
  name?: string;
  code: string;
  runTime: string;
  hostName: string;
  os: string;
  platform: string;
  arch: string;
  version: string;
  cores: string;
  cpuName: string;
  cpuSpeed: string;
  carbonFootprint: string;
  energyNeeded: string;
  PUE: string;
  PSF: string;
};

export type ExtendedPost = Post & {
  id: number;
};
