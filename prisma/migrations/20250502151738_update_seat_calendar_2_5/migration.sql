/*
  Warnings:

  - Added the required column `time_id` to the `seat_Calendar` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "booking" DROP CONSTRAINT "booking_seat_id_fkey";

-- DropIndex
DROP INDEX "seat_Calendar_seat_id_key";

-- AlterTable
ALTER TABLE "seat_Calendar" ADD COLUMN     "time_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "seat_Calendar" ADD CONSTRAINT "seat_Calendar_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "booking"("book_id") ON DELETE CASCADE ON UPDATE NO ACTION;
