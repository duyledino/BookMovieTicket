/*
  Warnings:

  - You are about to drop the column `available_sit` on the `calendar` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[seat_number]` on the table `booking` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `available_seat` to the `calendar` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "calendar" DROP COLUMN "available_sit",
ADD COLUMN     "available_seat" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "booking_seat_number_key" ON "booking"("seat_number");
