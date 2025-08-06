/*
  Warnings:

  - You are about to drop the column `book_frequent` on the `book_popcorn` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "book_popcorn" DROP COLUMN "book_frequent",
ADD COLUMN     "book_frequent" INTEGER NOT NULL DEFAULT 0;
