import { PrismaClient } from "@prisma/client";
import { v4 as uuid } from "uuid";

const prisma = new PrismaClient();

const getAllBooking = async (req, res) => {
  const allBooking = await prisma.booking.findMany();
  if (allBooking.length === 0) return res.json({ Message: "No Booking Found" });
  res.json({ allBooking: allBooking });
};

const getAllBookOfSpecificCalendar = async (req, res) => {
  const { id } = req.params;
  const existCalendar = await prisma.calendar.findUnique({ where: { id } });
  if (!existCalendar) return res.json({ Message: "Calendar doesn't exist" });
  const allBookingOfExistCalendar = await prisma.booking.findMany({
    where: {
      calendar_id: id,
    },
  });
  if (allBookingOfExistCalendar.length === 0)
    return res.json({ Message: "No Booking Found" });
  res.json({ allBookingOfExistCalendar: allBookingOfExistCalendar });
};

//seat_number: pick remain seat, check follow syntax: (A-H)(0-9);
const createABooking = async (req, res) => {
  let { calendar_id, customer_id, seat_number } = req.body;
  if (!calendar_id || !seat_number) return res.json({ Message: "Missing in4" });
  const existCalendar = prisma.calendar.findUnique({ where: { calendar_id } });
  if (!existCalendar) return res.json({ Message: "Calendar not found" });
  const time = new Date().toISOString();
  const book_id = uuid();
  const existSeat = await prisma.booking.findUnique({
    where: {
      calendar_id: calendar_id,
      seat_number: seat_number,
    },
  });
  console.log(existSeat);
  if (existSeat) return res.json({ Message: "Seat number exists" });
  // If customer_id is missing, create a new customer
  if (!customer_id || customer_id === "") {
    customer_id = uuid(); // Generate a new customer ID
    // Create new customer
    await prisma.customer.create({
      data: {
        customer_id: customer_id,
        customer_name: "temporary customer",
        username: `user_${uuid().slice(0, 8)}`,
        password: uuid().slice(0, 8),
        customer_age: 18,
      },
    });
  } else {
    // If customer_id exists, check if it exists in the database
    const existCustomer = await prisma.customer.findUnique({
      where: { customer_id },
    });
    if (!existCustomer) return res.json({ Message: "Customer not found" });
  }
  const created = await prisma.booking.create({
    data: {
      book_id: book_id,
      customer_id: customer_id,
      calendar_id: calendar_id,
      book_time: time,
      seat_number: seat_number,
    },
  });
  res.json({ Message: "Create Book Ticket successfully", created: created });
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
  const existBooking = await prisma.booking.findUnique({ where: { book_id: id } });
  if (!existBooking) return res.json({ Message: "Booking ticket not found" });
  const deleted = await prisma.booking.delete({ where: { book_id:id } });
  res.json({ Message: "Delete successfully", deleted: deleted });
};

export {
  getAllBooking,
  getAllBookOfSpecificCalendar,
  createABooking,
  updateABooking,
  deleteABooking,
};
