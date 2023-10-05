import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function seed() {
  const users = [
    {
      loginId: 'test01',
      password: await bcrypt.hash('1234', 10),
    },
    {
      loginId: 'test02',
      password: await bcrypt.hash('1234', 10),
    },
    {
      loginId: 'test03',
      password: await bcrypt.hash('test', 10),
    },
  ];

  const infos = [
    {
      name: "test01's execution",
      code: 'public class HelloWorld {public static void main(String[] args) {System.out.println("Hello, World!");}}',
      runTime: '100ms',
      hostName: 'localhost',
      os: 'Windows',
      platform: 'win32',
      arch: 'x64',
      version: '10.0.10',
      cores: '8',
      cpuName: 'AMD',
      cpuSpeed: '2.0 GHz',
      carbonFootprint: '0.87 Kg',
      energyNeeded: '10',
      userId: 1,
    },
  ];

  await prisma.user.createMany({
    data: users,
  });

  await prisma.executionInfos.createMany({
    data: infos,
  });
}

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect;
  });
