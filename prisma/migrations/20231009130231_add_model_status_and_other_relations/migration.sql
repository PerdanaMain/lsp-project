/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Banks` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Banks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transactionId` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `statusId` to the `Transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transaction_quantity` to the `Transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transaction_total` to the `Transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `banks` ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `products` ADD COLUMN `transactionId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `transactions` ADD COLUMN `statusId` INTEGER NOT NULL,
    ADD COLUMN `transaction_quantity` INTEGER NOT NULL,
    ADD COLUMN `transaction_total` INTEGER NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Status` (
    `status_id` INTEGER NOT NULL AUTO_INCREMENT,
    `status_desc` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Status_status_desc_key`(`status_desc`),
    PRIMARY KEY (`status_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Banks_userId_key` ON `Banks`(`userId`);

-- AddForeignKey
ALTER TABLE `Banks` ADD CONSTRAINT `Banks_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Products` ADD CONSTRAINT `Products_transactionId_fkey` FOREIGN KEY (`transactionId`) REFERENCES `Transactions`(`transaction_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transactions` ADD CONSTRAINT `Transactions_statusId_fkey` FOREIGN KEY (`statusId`) REFERENCES `Status`(`status_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transactions` ADD CONSTRAINT `Transactions_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
