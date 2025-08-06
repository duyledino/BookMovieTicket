/*
  Warnings:

  - You are about to drop the column `seat_number` on the `booking` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[seat_id]` on the table `booking` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `seat_id` to the `booking` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "booking" DROP CONSTRAINT "booking_calendar_id_fkey";

-- DropForeignKey
ALTER TABLE "booking" DROP CONSTRAINT "booking_customer_id_fkey";

-- DropIndex
DROP INDEX "booking_seat_number_key";

-- AlterTable
ALTER TABLE "booking" DROP COLUMN "seat_number",
ADD COLUMN     "seat_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "seat" (
    "seat_id" TEXT NOT NULL,
    "seat_name" TEXT NOT NULL,
    "book_id" TEXT NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "seat_pkey" PRIMARY KEY ("seat_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "seat_book_id_key" ON "seat"("book_id");

-- CreateIndex
CREATE UNIQUE INDEX "booking_seat_id_key" ON "booking"("seat_id");

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_seat_id_fkey" FOREIGN KEY ("seat_id") REFERENCES "seat"("seat_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_calendar_id_fkey" FOREIGN KEY ("calendar_id") REFERENCES "calendar"("calendar_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("customer_id") ON DELETE CASCADE ON UPDATE CASCADE;
