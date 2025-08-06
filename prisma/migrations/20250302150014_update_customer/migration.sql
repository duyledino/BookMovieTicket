/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `customer` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "customer_customer_name_key";

-- AlterTable
ALTER TABLE "customer" ALTER COLUMN "customer_name" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "customer_username_key" ON "customer"("username");
