/*
  Warnings:

  - Added the required column `book_frequent` to the `book_popCorn` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "book_popCorn" ADD COLUMN     "book_frequent" INTEGER NOT NULL;
