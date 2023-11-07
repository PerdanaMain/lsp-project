/*
  Warnings:

  - You are about to drop the column `transactionId` on the `products` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `products` DROP FOREIGN KEY `Products_transactionId_fkey`;

-- AlterTable
ALTER TABLE `products` DROP COLUMN `transactionId`;

-- CreateTable
CREATE TABLE `TransactionsOnProducts` (
    `transactionOnProductId` INTEGER NOT NULL AUTO_INCREMENT,
    `assignedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `productId` INTEGER NOT NULL,
    `transactionId` INTEGER NOT NULL,

    PRIMARY KEY (`transactionOnProductId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TransactionsOnProducts` ADD CONSTRAINT `TransactionsOnProducts_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Products`(`product_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TransactionsOnProducts` ADD CONSTRAINT `TransactionsOnProducts_transactionId_fkey` FOREIGN KEY (`transactionId`) REFERENCES `Transactions`(`transaction_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
