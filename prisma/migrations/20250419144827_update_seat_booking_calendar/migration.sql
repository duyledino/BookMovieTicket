/*
  Warnings:

  - Added the required column `theater_name` to the `seat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "seat" ADD COLUMN     "theater_name" TEXT NOT NULL;
