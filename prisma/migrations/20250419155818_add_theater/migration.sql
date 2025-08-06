/*
  Warnings:

  - You are about to drop the column `theaterTheater_id` on the `calendar` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "calendar" DROP CONSTRAINT "calendar_theaterTheater_id_fkey";

-- AlterTable
ALTER TABLE "calendar" DROP COLUMN "theaterTheater_id";

-- AddForeignKey
ALTER TABLE "calendar" ADD CONSTRAINT "calendar_theater_id_fkey" FOREIGN KEY ("theater_id") REFERENCES "Theater"("theater_id") ON DELETE RESTRICT ON UPDATE CASCADE;
