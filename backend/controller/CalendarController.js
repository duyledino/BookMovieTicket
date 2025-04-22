import { PrismaClient } from "@prisma/client";
import { v4 as uuid } from "uuid";

const prisma = new PrismaClient();

const getAllCalendar = async (req, res) => {
  const allCalendar = await prisma.calendar.findMany({
    include: {
      film: {
        select: {
          film_name: true,
          poster_path: true,
        },
      },
      Theater:{
        select:{
          theater_name:true
        }
      }
    },
    orderBy:{
      showtime:'desc'
    }
  });
  if (allCalendar.length === 0)
    return res.json({ Message: "No calendar found",allCalendar:allCalendar });
  res.json({ allCalendar: allCalendar });
};

const getSpecificCalendar = async (req, res) => {
  const { calendar_id } = req.query;
  console.log(calendar_id);
  const specificCalendar = await prisma.calendar.findFirst({
    where:{
      calendar_id: calendar_id
    },
    select: {
      showtime: true,
      calendar_id:true,
      Theater:{
        select:{
          theater_name:true
        }
      },
      film: {
        select: {
          film_name: true,
          poster_path: true,
          film_id: true
        },
      },
      seat_Calendar:{
        select:{
          available_Seat: true,
          seat:{
            select:{
              seat_name: true,
            }
          }
        },
        orderBy:{
          seat_id: 'asc'
        }
      }
    },
  });
  if (!specificCalendar)
    return res.status(404).json({ Message: "Calendar not found." });
  console.log(specificCalendar);
  return res
    .status(200)
    .json({
      Message: "Get Calendar successfully.",
      specificCalendar: specificCalendar,
    });
};

const createACalendar = async (req, res) => {
  const { showtime, film_id, available_sit, total_sit,theater_id } = req.body;
  if (!film_id) res.json({ Message: "Film_id is undefined." });
  const existFilm = await prisma.film.findUnique({
    where: { film_id: film_id },
  });
  if (!existFilm)
    return res.json({
      Message: "Film already exist so cannot create calendar",
    });
  const parseShowtime = new Date(showtime).toISOString();
  const calendar_id = uuid();
  const available_seat = parseInt(available_sit);
  const total_seat = parseInt(total_sit);
  const created = await prisma.calendar.create({
    data: {
      calendar_id: calendar_id,
      available_seat: available_seat,
      film_id: film_id,
      showtime: parseShowtime,
      total_seat: total_seat,
      theater_id: theater_id
    },
  });
  res.json({ Message: "Create calendar successfully", Calendar: created });
};

const updateACalendar = async (req, res) => {
  const { id } = req.params;
  const { film_id, available_sit, showtime } = req.body;
  const existCalendar = await prisma.calendar.findUnique({
    where: { calendar_id: id },
  });
  const existFilm = await prisma.film.findUnique({
    where: { film_id: film_id },
  });
  if (!existCalendar || !existFilm)
    return res.json({ Message: "Calendar or film not found" });
  const sit = parseInt(available_sit);
  const parseShowtime = new Date(showtime).toISOString();
  const updated = await prisma.calendar.update({
    data: {
      film_id: film_id,
      available_sit: sit,
      showtime: parseShowtime,
    },
    where: {
      calendar_id: id,
    },
  });
  res.json({ Message: "Update calendar successfully", calendar: updated });
};

const deleteACalendar = async (req, res) => {
  const { id } = req.params;

  // 🛠️ Check if the record exists
  const existingCalendar = await prisma.calendar.findUnique({
    where: { calendar_id: id },
  });

  if (!existingCalendar) {
    return res.status(404).json({ Message: "Calendar not found." }); // RETURN to prevent further execution
  }

  // 🛠️ Delete the record
  const deleted = await prisma.calendar.delete({ where: { calendar_id: id } });

  res.json({ Message: "Delete calendar successfully", deleted: deleted });
};

export {
  getAllCalendar,
  createACalendar,
  updateACalendar,
  deleteACalendar,
  getSpecificCalendar,
};
