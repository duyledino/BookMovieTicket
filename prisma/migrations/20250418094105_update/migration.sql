/*
  Warnings:

  - Added the required column `total_seat` to the `calendar` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "calendar" ADD COLUMN     "total_seat" INTEGER NOT NULL;
