/*
  Warnings:

  - Added the required column `popcorn_image` to the `popcorn` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "popcorn" ADD COLUMN     "popcorn_image" BYTEA NOT NULL;
