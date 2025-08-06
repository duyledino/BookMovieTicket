import { PrismaClient } from "@prisma/client";
import { v4 as uuid } from "uuid";
import { DateTime } from "luxon";

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
      theater: {
        select: {
          theater_name: true,
        },
      },
    },
    orderBy: [
      {
        film: {
          film_name: "asc",
        },
      },
      {
        showtime: "asc",
      },
    ],
  });
  if (allCalendar.length === 0)
    return res.json({ Message: "No calendar found", allCalendar: allCalendar });
  res.json({ allCalendar: allCalendar });
};

const getAllCalendarFromASpecificFilm = async (req, res) => {
  const { film_id } = req.query;
  console.log(film_id);
  const specificCalendar = await prisma.calendar.findMany({
    select: {
      calendar_id: true,
      showtime: true,
      available_seat: true,
      total_seat: true,
      theater: true,
      seat_calendar: {
        select: {
          book_id: true,
          seat: {
            select: {
              seat_id: true,
              price: true,
            },
          },
        },
      },
    },
    orderBy: {
      showtime: "asc",
    },
    where: {
      film_id: film_id,
    },
  });
  if (specificCalendar.length === 0) {
    return res.status(200).json({ Message: "No calendar found" });
  }
  const fixSpecificCalendar = specificCalendar.map((c) => ({
    calendar_id: c.calendar_id,
    showtime: c.showtime,
    available_seat: c.available_seat,
    total_seat: c.total_seat,
    theater: c.theater,
    seat_calendar: c.seat_calendar.map((sc) => ({
      book_id: sc.book_id,
      seat: {
        seat_id: sc.seat.seat_id,
        price: Number(sc.seat.price),
      },
    })),
  }));
  return res.status(200).json({ fixSpecificCalendar: fixSpecificCalendar });
};

const getSpecificCalendar = async (req, res) => {
  const { calendar_id } = req.query;
  console.log(calendar_id);
  const rawCalendar = await prisma.calendar.findFirst({
    where: {
      calendar_id: calendar_id,
    },
    select: {
      showtime: true,
      calendar_id: true,
      theater: {
        select: {
          theater_id: true,
          theater_name: true,
        },
      },
      film: {
        select: {
          film_name: true,
          poster_path: true,
          film_id: true,
        },
      },
      seat_calendar: {
        select: {
          available_seat: true,
          seat: {
            select: {
              price: true,
              seat_id: true,
              seat_name: true,
            },
          },
        },
        orderBy: {
          seat_id: "asc",
        },
      },
    },
  });
  const specificCalendar = {
    ...rawCalendar,
    seat_calendar: rawCalendar.seat_calendar.map((s) => ({
      ...s,
      seat: {
        ...s.seat,
        price: Number(s.seat.price),
      },
    })),
  };
  if (!specificCalendar)
    return res.status(404).json({ Message: "Calendar not found." });
  // console.log(specificCalendar);
  return res.status(200).json({
    Message: "Get Calendar successfully.",
    specificCalendar: specificCalendar,
  });
};

const createACalendar = async (req, res) => {
  const { showtime, film_id, available_sit, total_sit, theater_id } = req.body;
  console.log(showtime, film_id, available_sit, total_sit, theater_id);
  if (!film_id) res.json({ Message: "Film_id is undefined." });
  const existFilm = await prisma.film.findUnique({
    where: { film_id: film_id },
  });
  if (!existFilm)
    return res.status(400).json({
      Message: "Film already exist so cannot create calendar",
    });
  const parseShowtime = DateTime.fromFormat(showtime, "yyyy-MM-dd HH:mm:ss", {
    zone: "UTC",
  })
    .toUTC()
    .toJSDate();
  console.log(showtime, parseShowtime);
  const calendar_id = uuid();
  const available_seat = parseInt(available_sit);
  const total_seat = parseInt(total_sit);
  console.log(calendar_id);
  //TODO: check same theater_id and showtime
  //TODO: Check number theater === number of theater have same showtime if number theater === number of theater have same showtime ? stop create: continue
  // const count = prisma.
  // const existsTimeAndTheater1 = await prisma.calendar.findFirst({
  //   select:{
  //     calendar_id: true
  //   },
  //   where:{
  //     showtime: showtime
  //   }
  // })
  //check same theater_id and showtime
  const existsTimeAndTheater2 = await prisma.calendar.findFirst({
    select: {
      calendar_id: true,
    },
    where: {
      theater_id: theater_id,
      showtime: parseShowtime,
    },
  });
  console.log(existsTimeAndTheater2);
  if (existsTimeAndTheater2 !== null) {
    console.log("found exists");
    return res
      .status(202)
      .json({ Message: "Da ton tai lich chieu va phong phim nay roi" });
  }
  const created = await prisma.calendar.create({
    data: {
      calendar_id: calendar_id,
      available_seat: available_seat,
      film_id: film_id,
      showtime: parseShowtime,
      total_seat: total_seat,
      theater_id: theater_id,
    },
  });
  return res.status(200).json({
    Message: "Create calendar successfully",
    Calendar: created,
  });
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
  getAllCalendarFromASpecificFilm,
};
