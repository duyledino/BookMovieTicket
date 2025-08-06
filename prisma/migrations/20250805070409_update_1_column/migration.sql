/*
  Warnings:

  - You are about to drop the column `popcorn_image` on the `popcorn` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "popcorn" DROP COLUMN "popcorn_image",
ADD COLUMN     "popcorn_image_base64" TEXT NOT NULL DEFAULT '';
