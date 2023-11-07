/*
  Warnings:

  - Added the required column `transaction_slip` to the `Transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `transactions` ADD COLUMN `transaction_slip` VARCHAR(191) NOT NULL;
