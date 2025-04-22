/*
  Warnings:

  - Added the required column `name` to the `genres_film` table without a default value. This is not possible if the table is not empty.
  - Added the required column `english_name` to the `language_film` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "genres_film" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "language_film" ADD COLUMN     "english_name" TEXT NOT NULL;
