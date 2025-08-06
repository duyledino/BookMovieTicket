/*
  Warnings:

  - You are about to drop the column `theater_name` on the `seat` table. All the data in the column will be lost.
  - Added the required column `theater_id` to the `booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "booking" ADD COLUMN     "theater_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "seat" DROP COLUMN "theater_name";

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_theater_id_fkey" FOREIGN KEY ("theater_id") REFERENCES "Theater"("theater_id") ON DELETE RESTRICT ON UPDATE CASCADE;
