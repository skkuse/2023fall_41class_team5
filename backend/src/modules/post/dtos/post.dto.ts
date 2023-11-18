import { ExtendedPost } from '../types/post.type';

export class PostDto {
  id: number;
  name: string;
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

  constructor(post: ExtendedPost) {
    this.id = post.id;
    this.name = post.name;
    this.code = post.code;
    this.runTime = post.runTime;
    this.hostName = post.hostName;
    this.os = post.os;
    this.platform = post.platform;
    this.arch = post.arch;
    this.version = post.version;
    this.cores = post.cores;
    this.cpuName = post.cpuName;
    this.cpuSpeed = post.cpuSpeed;
    this.carbonFootprint = post.carbonFootprint;
    this.energyNeeded = post.energyNeeded;
    this.PUE = post.PUE;
    this.PSF = post.PSF;
  }
}

export class PostListDto {
  totalCount: number;
  posts: PostDto[];

  constructor(posts: PostDto[], totalCount: number) {
    this.posts = posts;
    this.totalCount = totalCount;
  }
}
