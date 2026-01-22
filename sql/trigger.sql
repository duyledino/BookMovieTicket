-- generate_seat_after_insert_theater
CREATE OR REPLACE FUNCTION GENERATE_SEAT_AFTER_INSERT_THEATER () RETURNS TRIGGER AS $$
declare
	theaterId text;
	seatId text;
	seatChar char;
	seatPrice bigint;
	seatName text;
begin
	theaterId := new.theater_id;
	if theaterId like 'VIP%' then
		seatPrice := 50000;
	else 
		seatPrice := 40000;
	end if;
	for i in 1..3 loop
		if i = 1 then
			seatChar := 'A';
			seatPrice := seatPrice + seatPrice * 0.1;
		elsif i = 2 then 
			seatChar := 'B';
			seatPrice := seatPrice + seatPrice * 0.15;
		else 
			seatChar := 'C';
			seatPrice := seatPrice + seatPrice * 0.2;
		END IF;
		for j in 1..10 loop
			if j < 10 then
				seatName := seatChar || '0' || j::text;
				seatId := theaterId || seatName;
			else 
				seatName := seatChar || j::text;
				seatId := theaterID || seatName;
			end if;
				
			insert into seat values(seatId,seatName,theaterId, seatPrice);
		end loop;
	end loop;
	RETURN NULL;
end;
$$ LANGUAGE PLPGSQL;

create or replace trigger GENERATE_SEAT_AFTER_INSERT_THEATER_TRG
after insert on theater for each row
execute function GENERATE_SEAT_AFTER_INSERT_THEATER();

-- generate seat after insert calendar
-- SELECT
-- 	*
-- FROM
-- 	CALENDAR;
-- SELECT
-- 	*
-- FROM
-- 	SEAT_CALENDAR
-- SELECT
-- 	*
-- FROM
-- 	SEAT;

CREATE OR REPLACE FUNCTION GENERATE_SEAT_AND_UPDATE_TOTAL_SEAT_AFTER_INSERT_CALENDAR () RETURNS TRIGGER AS $$
Declare 
	cur cursor for select * from seat where theater_id = new.theater_id;
	seatId text;
	calendarId text;
	totalSeat integer;
Begin
	select count(seat_id) into totalSeat from seat where theater_id = new.theater_id;
	calendarId := new.calendar_id;
	raise notice '%',totalSeat;
    Open cur;
    Loop
    	Fetch cur into seatId;
     	Exit when not found;
      	Insert into seat_calendar(calendar_id,seat_id,time_id) values(calendarId,seatId,'NO BOOK YET');
     End loop ;
     Close cur;
	 update calendar set total_seat = 0, available_seat= totalSeat where calendar_id = calendarId;
Return null;
End ;
$$ LANGUAGE PLPGSQL;

-- SELECT
-- 	*
-- FROM
-- 	FILM
-- SELECT
-- 	*
-- FROM
-- 	THEATER
-- INSERT INTO
-- 	CALENDAR
-- VALUES
-- 	('123', '1119878', NOW(), 0, 0, 'THEATER01')
CREATE OR REPLACE TRIGGER GENERATE_SEAT_AFTER_INSERT_CALENDAR_TRG
AFTER INSERT ON CALENDAR FOR EACH ROW
EXECUTE FUNCTION GENERATE_SEAT_AND_UPDATE_TOTAL_SEAT_AFTER_INSERT_CALENDAR ();

-- delete_all_seat_calendar_after_delete_calendar
CREATE OR REPLACE FUNCTION DELETE_ALL_SEAT_CALENDAR_AFTER_DELETE_CALENDAR () RETURNS TRIGGER AS $$
Declare calendarId text;
Begin
      calendarId := old.calendar_id;
       delete from seat_calendar where calendar_id = calendarId;
      Return old;
End
$$ LANGUAGE PLPGSQL;

CREATE OR REPLACE TRIGGER DELETE_ALL_SEAT_CALENDAR_AFTER_DELETE_CALENDAR_TRG
AFTER DELETE ON CALENDAR FOR EACH ROW
EXECUTE FUNCTION DELETE_ALL_SEAT_CALENDAR_AFTER_DELETE_CALENDAR ();

-- DELETE FROM CALENDAR
-- WHERE
-- 	CALENDAR_ID = '123'
	--
-- update_seat_calendar_and_calendar_after_insert_booking

select * from booking;
select * from seat_calendar;
select * from calendar;
create or replace function update_seat_calendar_and_calendar_after_insert_booking()
returns trigger as $$
declare 
	calendarId text;
	bookId text;
	timeId text;
	seatId text;
	currentTotal integer;
begin
	bookId := new.book_id;
	calendarId := new.calendar_id;
	timeId := cast(new.book_time as text); -- or new.book_time::text
	seatId := new.seat_id;
	update seat_calendar set time_id = timeId, book_id = bookId, available_seat = false where seat_id = seatId;
	select count(seat_id) into currentTotal from seat_calendar where calendar_id = calendarId;
	update calendar set available_seat = currentTotal where calendar_id = calendarId;
	return null;
end
$$ language plpgsql;

create or replace trigger update_seat_calendar_and_calendar_after_insert_booking_trg
after insert on booking
for each row
execute function update_seat_calendar_and_calendar_after_insert_booking();

-- select * from seat
-- select * from customer
-- insert into booking values('4312','123','cus_002',now(),'THEATER01A01','THEATER01','1000000')

-- -- update_popcorn_after_insert_book_popcorn
-- select * from book_popCorn
-- select * from popcorn

-- select * from booking;
-- insert into popcorn values('POPCORN01','Coca And Corn',20000,0,0);
-- insert into popcorn values('POPCORN02','Sprite And Chocolate Corn',40000,0,0);
-- insert into book_popCorn values('POPCORN02','4312',80000,2);

create or replace function update_popcorn_after_insert_book_popcorn()
returns trigger as $$
declare
	bookFrequent integer;
	totalPrice bigint;
	popcornId text;
begin
	popcornId := new.popcorn_id;
	bookFrequent := new.book_frequent;
	totalPrice := new.total_price;
	update popcorn set booked = booked + bookFrequent,total = total + totalPrice where popcorn.popcorn_id = popcornId;
	return null;
end
$$ language plpgsql;

create or replace trigger update_popcorn_after_insert_book_popcorn_trg
after insert on book_popcorn
for each row 
execute function update_popcorn_after_insert_book_popcorn();

-- select * from calendar;
-- delete from calendar where calendar.calendar_id = '17f6f855-e730-46ad-a2ac-8635ee062629';
