/*
  Warnings:

  - You are about to drop the `executioninfos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `executioninfos` DROP FOREIGN KEY `ExecutionInfos_userId_fkey`;

-- DropTable
DROP TABLE `executioninfos`;

-- CreateTable
CREATE TABLE `execution_infos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `code` TEXT NOT NULL,
    `runTime` VARCHAR(191) NOT NULL,
    `hostName` VARCHAR(191) NOT NULL,
    `os` VARCHAR(191) NOT NULL,
    `platform` VARCHAR(191) NOT NULL,
    `arch` VARCHAR(191) NOT NULL,
    `version` VARCHAR(191) NOT NULL,
    `cores` VARCHAR(191) NOT NULL,
    `cpuName` VARCHAR(191) NOT NULL,
    `cpuSpeed` VARCHAR(191) NOT NULL,
    `carbonFootprint` VARCHAR(191) NOT NULL,
    `energyNeeded` VARCHAR(191) NOT NULL,
    `PUE` VARCHAR(191) NOT NULL DEFAULT '1.67',
    `PSF` VARCHAR(191) NOT NULL DEFAULT '1',
    `userId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `execution_infos` ADD CONSTRAINT `execution_infos_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `user` RENAME INDEX `User_loginId_key` TO `user_loginId_key`;
