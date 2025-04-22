/*
  Warnings:

  - Added the required column `film_id` to the `seat` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "seat_book_id_key";

-- AlterTable
ALTER TABLE "seat" ADD COLUMN     "film_id" TEXT NOT NULL,
ALTER COLUMN "book_id" SET DEFAULT '';

-- CreateTable
CREATE TABLE "seat_film" (
    "film_id" TEXT NOT NULL,
    "seat_id" TEXT NOT NULL,

    CONSTRAINT "seat_film_pkey" PRIMARY KEY ("film_id","seat_id")
);

-- AddForeignKey
ALTER TABLE "seat_film" ADD CONSTRAINT "seat_film_film_id_fkey" FOREIGN KEY ("film_id") REFERENCES "film"("film_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "seat_film" ADD CONSTRAINT "seat_film_seat_id_fkey" FOREIGN KEY ("seat_id") REFERENCES "seat"("seat_id") ON DELETE CASCADE ON UPDATE NO ACTION;
