/*
  Warnings:

  - Added the required column `theater_id` to the `seat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "seat" ADD COLUMN     "theater_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Theater" (
    "theater_id" TEXT NOT NULL,
    "theater_name" TEXT NOT NULL,

    CONSTRAINT "Theater_pkey" PRIMARY KEY ("theater_id")
);

-- AddForeignKey
ALTER TABLE "seat" ADD CONSTRAINT "seat_theater_id_fkey" FOREIGN KEY ("theater_id") REFERENCES "Theater"("theater_id") ON DELETE CASCADE ON UPDATE NO ACTION;
