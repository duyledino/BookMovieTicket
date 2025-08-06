/*
  Warnings:

  - You are about to drop the column `available_Seat` on the `seat_calendar` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "seat_calendar" DROP COLUMN "available_Seat",
ADD COLUMN     "available_seat" BOOLEAN NOT NULL DEFAULT true;
