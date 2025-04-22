/*
  Warnings:

  - You are about to drop the column `available` on the `seat` table. All the data in the column will be lost.
  - You are about to drop the column `book_id` on the `seat` table. All the data in the column will be lost.
  - You are about to drop the column `book_id` on the `seat_Calendar` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[seat_id]` on the table `seat_Calendar` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "booking" DROP CONSTRAINT "booking_seat_id_fkey";

-- AlterTable
ALTER TABLE "seat" DROP COLUMN "available",
DROP COLUMN "book_id";

-- AlterTable
ALTER TABLE "seat_Calendar" DROP COLUMN "book_id",
ADD COLUMN     "available_Seat" BOOLEAN NOT NULL DEFAULT true;

-- CreateIndex
CREATE UNIQUE INDEX "seat_Calendar_seat_id_key" ON "seat_Calendar"("seat_id");

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_seat_id_fkey" FOREIGN KEY ("seat_id") REFERENCES "seat_Calendar"("seat_id") ON DELETE CASCADE ON UPDATE NO ACTION;
