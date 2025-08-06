-- AlterTable
ALTER TABLE "book_popCorn" ADD COLUMN     "total_price" BIGINT NOT NULL DEFAULT 0,
ALTER COLUMN "book_frequent" SET DEFAULT 0;
