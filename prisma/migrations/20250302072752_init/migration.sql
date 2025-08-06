-- CreateTable
CREATE TABLE "booking" (
    "book_id" TEXT NOT NULL,
    "calendar_id" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,
    "book_time" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "seat_number" INTEGER NOT NULL,

    CONSTRAINT "booking_pkey" PRIMARY KEY ("book_id")
);

-- CreateTable
CREATE TABLE "calendar" (
    "calendar_id" TEXT NOT NULL,
    "available_sit" INTEGER NOT NULL,
    "film_id" TEXT NOT NULL,
    "showtime" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "calendar_pkey" PRIMARY KEY ("calendar_id")
);

-- CreateTable
CREATE TABLE "customer" (
    "customer_id" TEXT NOT NULL,
    "customer_name" TEXT NOT NULL,
    "customer_age" INTEGER NOT NULL,

    CONSTRAINT "customer_pkey" PRIMARY KEY ("customer_id")
);

-- CreateTable
CREATE TABLE "film" (
    "film_id" TEXT NOT NULL,
    "film_name" TEXT NOT NULL,
    "book_frequency" INTEGER NOT NULL,

    CONSTRAINT "film_pkey" PRIMARY KEY ("film_id")
);

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_calendar_id_fkey" FOREIGN KEY ("calendar_id") REFERENCES "calendar"("calendar_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("customer_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "calendar" ADD CONSTRAINT "calendar_film_id_fkey" FOREIGN KEY ("film_id") REFERENCES "film"("film_id") ON DELETE CASCADE ON UPDATE NO ACTION;