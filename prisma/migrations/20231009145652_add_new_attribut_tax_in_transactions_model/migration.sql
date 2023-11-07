/*
  Warnings:

  - Added the required column `transaction_shipping` to the `Transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `transactions` ADD COLUMN `transaction_shipping` INTEGER NOT NULL;
