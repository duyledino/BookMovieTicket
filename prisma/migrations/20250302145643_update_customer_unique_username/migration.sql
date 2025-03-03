/*
  Warnings:

  - A unique constraint covering the columns `[customer_name]` on the table `customer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "customer_customer_name_key" ON "customer"("customer_name");
