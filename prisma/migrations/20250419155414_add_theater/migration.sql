/*
  Warnings:

  - Added the required column `theater_id` to the `calendar` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "calendar" ADD COLUMN     "theaterTheater_id" TEXT,
ADD COLUMN     "theater_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "calendar" ADD CONSTRAINT "calendar_theaterTheater_id_fkey" FOREIGN KEY ("theaterTheater_id") REFERENCES "Theater"("theater_id") ON DELETE SET NULL ON UPDATE CASCADE;
