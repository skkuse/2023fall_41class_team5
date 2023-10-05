-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `loginId` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_loginId_key`(`loginId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ExecutionInfos` (
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
ALTER TABLE `ExecutionInfos` ADD CONSTRAINT `ExecutionInfos_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
