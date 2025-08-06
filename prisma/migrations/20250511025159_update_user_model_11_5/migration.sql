/*
  Warnings:

  - You are about to drop the column `customer_age` on the `customer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "customer" DROP COLUMN "customer_age",
ADD COLUMN     "DateOfBirth" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "phone" TEXT NOT NULL DEFAULT '0123456789';
