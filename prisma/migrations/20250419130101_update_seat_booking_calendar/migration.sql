/*
  Warnings:

  - You are about to drop the `seat_film` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "seat_film" DROP CONSTRAINT "seat_film_film_id_fkey";

-- DropForeignKey
ALTER TABLE "seat_film" DROP CONSTRAINT "seat_film_seat_id_fkey";

-- DropTable
DROP TABLE "seat_film";

-- CreateTable
CREATE TABLE "seat_Calendar" (
    "calendar_id" TEXT NOT NULL,
    "seat_id" TEXT NOT NULL,
    "book_id" TEXT NOT NULL DEFAULT 'No Customer Booked',

    CONSTRAINT "seat_Calendar_pkey" PRIMARY KEY ("calendar_id","seat_id")
);

-- AddForeignKey
ALTER TABLE "seat_Calendar" ADD CONSTRAINT "seat_Calendar_calendar_id_fkey" FOREIGN KEY ("calendar_id") REFERENCES "calendar"("calendar_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "seat_Calendar" ADD CONSTRAINT "seat_Calendar_seat_id_fkey" FOREIGN KEY ("seat_id") REFERENCES "seat"("seat_id") ON DELETE CASCADE ON UPDATE NO ACTION;
