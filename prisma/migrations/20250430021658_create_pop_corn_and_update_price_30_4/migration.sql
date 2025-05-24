-- AlterTable
ALTER TABLE "seat" ADD COLUMN     "price" BIGINT NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "popCorn" (
    "popCorn_id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'bap nuoc tam',
    "price" BIGINT NOT NULL DEFAULT 0,
    "booked" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "popCorn_pkey" PRIMARY KEY ("popCorn_id")
);

-- CreateTable
CREATE TABLE "book_popCorn" (
    "popCorn_id" TEXT NOT NULL,
    "book_id" TEXT NOT NULL,

    CONSTRAINT "book_popCorn_pkey" PRIMARY KEY ("popCorn_id","book_id")
);

-- AddForeignKey
ALTER TABLE "book_popCorn" ADD CONSTRAINT "book_popCorn_popCorn_id_fkey" FOREIGN KEY ("popCorn_id") REFERENCES "popCorn"("popCorn_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "book_popCorn" ADD CONSTRAINT "book_popCorn_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "booking"("book_id") ON DELETE CASCADE ON UPDATE NO ACTION;
