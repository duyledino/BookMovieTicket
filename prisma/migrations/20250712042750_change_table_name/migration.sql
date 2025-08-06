/*
  Warnings:

  - You are about to drop the `Theater` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `book_popCorn` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `popCorn` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `seat_Calendar` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "book_popCorn" DROP CONSTRAINT "book_popCorn_book_id_fkey";

-- DropForeignKey
ALTER TABLE "book_popCorn" DROP CONSTRAINT "book_popCorn_popCorn_id_fkey";

-- DropForeignKey
ALTER TABLE "booking" DROP CONSTRAINT "booking_calendar_id_seat_id_fkey";

-- DropForeignKey
ALTER TABLE "booking" DROP CONSTRAINT "booking_theater_id_fkey";

-- DropForeignKey
ALTER TABLE "calendar" DROP CONSTRAINT "calendar_theater_id_fkey";

-- DropForeignKey
ALTER TABLE "seat" DROP CONSTRAINT "seat_theater_id_fkey";

-- DropForeignKey
ALTER TABLE "seat_Calendar" DROP CONSTRAINT "seat_Calendar_calendar_id_fkey";

-- DropForeignKey
ALTER TABLE "seat_Calendar" DROP CONSTRAINT "seat_Calendar_seat_id_fkey";

-- DropTable
DROP TABLE "Theater";

-- DropTable
DROP TABLE "book_popCorn";

-- DropTable
DROP TABLE "popCorn";

-- DropTable
DROP TABLE "seat_Calendar";

-- CreateTable
CREATE TABLE "popcorn" (
    "popcorn_id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'bap nuoc tam',
    "price" BIGINT NOT NULL DEFAULT 0,
    "booked" INTEGER NOT NULL DEFAULT 0,
    "total" BIGINT NOT NULL DEFAULT 0,

    CONSTRAINT "popcorn_pkey" PRIMARY KEY ("popcorn_id")
);

-- CreateTable
CREATE TABLE "book_popcorn" (
    "popcorn_id" TEXT NOT NULL,
    "book_id" TEXT NOT NULL,
    "book_frequent" INTEGER NOT NULL DEFAULT 0,
    "total_price" BIGINT NOT NULL DEFAULT 0,

    CONSTRAINT "book_popcorn_pkey" PRIMARY KEY ("popcorn_id","book_id")
);

-- CreateTable
CREATE TABLE "seat_calendar" (
    "calendar_id" TEXT NOT NULL,
    "seat_id" TEXT NOT NULL,
    "time_id" TEXT NOT NULL,
    "book_id" TEXT NOT NULL DEFAULT 'No Book Yet',
    "available_Seat" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "seat_calendar_pkey" PRIMARY KEY ("calendar_id","seat_id")
);

-- CreateTable
CREATE TABLE "theater" (
    "theater_id" TEXT NOT NULL,
    "theater_name" TEXT NOT NULL,

    CONSTRAINT "theater_pkey" PRIMARY KEY ("theater_id")
);

-- AddForeignKey
ALTER TABLE "book_popcorn" ADD CONSTRAINT "book_popcorn_popcorn_id_fkey" FOREIGN KEY ("popcorn_id") REFERENCES "popcorn"("popcorn_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "book_popcorn" ADD CONSTRAINT "book_popcorn_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "booking"("book_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "seat" ADD CONSTRAINT "seat_theater_id_fkey" FOREIGN KEY ("theater_id") REFERENCES "theater"("theater_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "seat_calendar" ADD CONSTRAINT "seat_calendar_calendar_id_fkey" FOREIGN KEY ("calendar_id") REFERENCES "calendar"("calendar_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "seat_calendar" ADD CONSTRAINT "seat_calendar_seat_id_fkey" FOREIGN KEY ("seat_id") REFERENCES "seat"("seat_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_calendar_id_seat_id_fkey" FOREIGN KEY ("calendar_id", "seat_id") REFERENCES "seat_calendar"("calendar_id", "seat_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_theater_id_fkey" FOREIGN KEY ("theater_id") REFERENCES "theater"("theater_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "calendar" ADD CONSTRAINT "calendar_theater_id_fkey" FOREIGN KEY ("theater_id") REFERENCES "theater"("theater_id") ON DELETE RESTRICT ON UPDATE CASCADE;
