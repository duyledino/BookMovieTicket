import { PrismaClient } from "@prisma/client";
import { v4 as uuid } from "uuid";
import { DateTime } from "luxon";

const prisma = new PrismaClient();

const getAllRevenueWeekDay = async (req, res) => {
  const getTotal = await prisma.$queryRaw`select EXTRACT(
		day
		FROM
			book_time
	) AS day,EXTRACT(
		month
		FROM
			book_time
	) AS month ,EXTRACT(
		year
		FROM
			book_time
	) AS year ,sum(total_price_book) total from booking group by day,month,year
	order by year desc,month desc,day desc limit 7`;
  const fixGetTotalWeekDay = getTotal.map((row) => ({
    day: row.day,
    month: row.month,
    year: row.year,
    total: Number(row.total),
  }));
  if (getTotal.length === 0)
    return res.json({
      Message: "No Revenue Found",
      fixGetTotalWeekDay: fixGetTotalWeekDay,
    });
  return res.json({ fixGetTotalWeekDay: fixGetTotalWeekDay });
};

const getAllRevenue = async (req, res) => {
  const getTotal = await prisma.$queryRaw`select EXTRACT(
		MONTH
		FROM
			book_time
	) AS MONTH,EXTRACT(
		year
		FROM
			book_time
	) AS year ,sum(total_price_book) as total from booking group by month,year
	order by year desc,month desc limit 4`;
  const fixGetTotal = getTotal.map((row) => ({
    month: row.month,
    year: row.year,
    total: Number(row.total),
  }));
  if (getTotal.length === 0)
    return res.json({ Message: "No Revenue Found", fixGetTotal: fixGetTotal });
  return res.json({ fixGetTotal: fixGetTotal });
};

const getAllBooking = async (req, res) => {
  const allBooking = await prisma.booking.findMany({
    orderBy: {
      book_time: "asc",
    },
  });
  if (allBooking.length === 0) return res.status(202).json({ Message: "No Booking Found" });
  const fixAllBooking = allBooking.map((all) => ({
    book_id: all.book_id,
    calendar_id: all.calendar_id,
    customer_id: all.customer_id,
    theater_id: all.theater_id,
    seat_id: all.seat_id,
    book_time: all.book_time,
    total_price_book: Number(all.total_price_book),
  }));
  return res.status(200).json({ allBooking: fixAllBooking });
};

const getNumberOfBookingByMonth = async (req, res) => {
  const getCount = await prisma.$queryRaw`select 
	extract (month from booking.book_time) as month,count(book_id) as count
	from booking 
	group by month order by month asc;`;
  const fixGetCount = getCount.map((row) => ({
    month: row.month,
    count: Number(row.count),
  }));
  if (getCount.length === 0)
    return res.json({ Message: "No booking found", fixGetCount });
  return res.json({ fixGetCount });
};

const getAllBookOfSpecificCalendar = async (req, res) => {
  const { id } = req.params;
  const existCalendar = await prisma.calendar.findUnique({
    where: { calendar_id: id },
  });
  if (!existCalendar) return res.json({ Message: "Calendar doesn't exist" });
  const allBookingOfExistCalendar = await prisma.booking.findMany({
    where: {
      calendar_id: id,
    },
    select: {
      calendar_id: true,
      book_id: true,
      book_time: true,
      customer: {
        select: {
          customer_id: true,
          username: true,
        },
      },
      seat_calendar: {
        select: {
          seat: {
            select: {
              seat_name: true,
              theater_id: true,
            },
          },
        },
      },
    },
  });
  if (allBookingOfExistCalendar.length === 0)
    return res.status(202).json({
      Message: "No Booking Found",
      allBookingOfExistCalendar: allBookingOfExistCalendar,
    });
  res.status(200).json({ allBookingOfExistCalendar: allBookingOfExistCalendar });
};

//seat_number: pick remain seat, check follow syntax: (A-H)(0-9); done
//check available seat -> get seat's price -> get total price of popCorn in []
//-> sum of seat and popCorn -> create booking and popCorn (nested inside booking)
const createABooking = async (req, res) => {
  //calendar_id customer_id THEATER1B05(seat_id) THEATER1(theater_id) 
  // [ { popCorn_id: 'bapnuoc2', book_frequent: 5, total_price: 1000000 } ](popCorn) yyyy-MM-dd HH:mm:ss (time)
  let { calendar_id,book_id, customer_id, seat_id, theater_id, popcorn, time } =
    req.body;
  console.log(calendar_id, customer_id, seat_id, theater_id, popcorn, time);
  if(customer_id === undefined || customer_id===null){
    return res.status(202).json({Message: "Please login to continue"});
  }
  if (!calendar_id || !seat_id || !theater_id)
    return res.status(202).json({ Message: "Missing in4" });
  const parseTime = DateTime.fromFormat(time, "yyyy-MM-dd HH:mm:ss", {
    zone: "UTC",
  })
    .toUTC()
    .toJSDate();
  const existCalendar = prisma.calendar.findUnique({ where: { calendar_id } });
  if (!existCalendar) return res.json({ Message: "Calendar not found" });
  const existSeat = await prisma.seat_calendar.findUnique({
    select: {
      available_seat: true,
      seat: {
        select: {
          seat_id: true,
          price: true,
        },
      },
    },
    where: {
      calendar_id_seat_id: {
        calendar_id: calendar_id,
        seat_id: seat_id,
      },
    },
  });
  if (!existSeat.available_seat)
    return res.status(202).json({ Message: "Seat number exists" });
  // If customer_id is missing, create a new customer
  // if (!customer_id || customer_id === "") {
  //   customer_id = uuid(); // Generate a new customer ID
  //   // Create new customer
  //   await prisma.customer.create({
  //     data: {
  //       customer_id: customer_id,
  //       customer_name: "temporary customer",
  //       username: `user_${uuid().slice(0, 8)}`,
  //       password: "password123", // virtual customer
  //       createDate: new Date().toISOString(),
  //       DateOfBirth:  new Date().toISOString(),
  //     },
  //   });
  // } else {
  //   // If customer_id exists, check if it exists in the database
  //   const existCustomer = await prisma.customer.findUnique({
  //     where: { customer_id },
  //   });
  //   if (!existCustomer) return res.json({ Message: "Customer not found" });
  // }
  const seat_price = existSeat.seat.price;
  const popCornPrice =
    popcorn.length > 0
      ? popcorn.reduce((pre, cur) => (pre += cur.total_price), 0)
      : 0;
  const totalBook = Number(popCornPrice) + Number(seat_price);
  const created = await prisma.booking.create({
    data: {
      book_id: book_id,
      customer_id: customer_id,
      calendar_id: calendar_id,
      book_time: parseTime,
      seat_id: seat_id,
      theater_id: theater_id,
      total_price_book: totalBook,
      book_popcorn: {
        create:
          popcorn.length > 0
            ? popcorn.map((p) => ({
                book_frequent: p.book_frequent,
                total_price: p.total_price,
                popcorn: {
                  connect: { popcorn_id: p.popcorn_id },
                },
              }))
            : [],
      },
    },
  });
  res.json({ Message: "Create Book Ticket successfully" });
};

//future-todo: update booktime,customer_id aren't real :((. Change if neccessary;
const updateABooking = async (req, res) => {
  const { id } = req.params;
  const existBooking = await prisma.booking.findUnique({
    where: { book_id: id },
  });
  if (!existBooking) return res.json({ Message: "Booking ticket not found" });
  const { customer_id, calendar_id, seat_number } = req.body;
  if (!customer_id || !calendar_id || !seat_number)
    return res.json({ Message: "Missing in4" });
  const existCalendar = await prisma.calendar.findUnique({
    where: { calendar_id },
  });
  const existUser = await prisma.customer.findFirst({ where: { customer_id } });
  if (!existCalendar || !existUser)
    return res.json({ Message: "Calendar or User not found" });
  //key:( Not: {})
  const exist_seat_number = await prisma.booking.findFirst({
    where: {
      calendar_id: calendar_id,
      seat_number: seat_number,
      NOT: { book_id: id }, //ignore current updating book(id)
    },
  });
  if (exist_seat_number) return res.json({ Message: "Exist seat number" });
  const updated = await prisma.booking.update({
    data: {
      customer_id: customer_id,
      calendar_id: calendar_id,
      seat_number: seat_number,
    },
    where: {
      book_id: id,
    },
  });
  res.json({ Message: "update successfully", updated: updated });
};

const deleteABooking = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const existBooking = await prisma.booking.findUnique({
    where: { book_id: id },
  });
  if (!existBooking)
    return res.status(400).json({ Message: "Booking ticket not found" });
  const deleted = await prisma.booking.delete({ where: { book_id: id } });
  if (!deleted)
    return res.status(400).json({ Message: "Failed to delete booking" });
  return res.status(200).json({ Message: "Delete successfully" });
};

export {
  getAllBooking,
  getAllBookOfSpecificCalendar,
  createABooking,
  updateABooking,
  deleteABooking,
  getNumberOfBookingByMonth,
  getAllRevenue,
  getAllRevenueWeekDay,
};
