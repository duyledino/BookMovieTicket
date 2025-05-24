-- DropForeignKey
ALTER TABLE "seat_Calendar" DROP CONSTRAINT "seat_Calendar_book_id_fkey";

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_calendar_id_seat_id_fkey" FOREIGN KEY ("calendar_id", "seat_id") REFERENCES "seat_Calendar"("calendar_id", "seat_id") ON DELETE CASCADE ON UPDATE NO ACTION;
