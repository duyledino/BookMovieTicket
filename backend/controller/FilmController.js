import { PrismaClient } from "@prisma/client";
import axios, { all } from "axios";

const prisma = new PrismaClient();

const createAFilm = async (req, res) => {
  const {
    film_id,
    film_name,
    poster_path,
    backdrop_path,
    overview,
    vote_average,
    adult,
    tagline,
    release_date,
    runtime,
  } = req.body;
  const existFilm = await prisma.film.findFirst({
    where: {
      film_id: film_id,
    },
  });
  if (existFilm) {
    return res.status(202).json({ Message: "Film exists" });
  }
  const film = await prisma.film.create({
    data: {
      film_id,
      film_name,
      poster_path,
      backdrop_path,
      overview,
      vote_average,
      adult,
      tagline,
      release_date,
      runtime,
    },
  });

  res.status(200).json({ Message: "Create successfully", film: film });
};

const getTopMoive = async (req, res) => {
  const topMovie =
    await prisma.$queryRaw`select cf.film_id,cf.film_name,sum(sb.price) as total from
  (select c.calendar_id,f.film_id,f.film_name from calendar c join film f on c.film_id = f.film_id) cf join ((select booking.calendar_id,sc.price,booking.book_id,booking.book_time from booking join (select "seat_calendar".book_id,seat.price from seat join "seat_calendar" on seat.seat_id = "seat_calendar".seat_id) sc on booking.book_id = sc.book_id)) sb
  on sb.calendar_id = cf.calendar_id
  group by cf.film_id,cf.film_name
  order by total DESC limit 3`;
  if (topMovie.length === 0)
    return res.json({ Message: "No Film found.", topMovie: topMovie });
  const fixTopMovie = topMovie.map((row) => ({
    film_id: row.film_id,
    film_name: row.film_name,
    total: Number(row.total),
  }));
  return res.json({ fixTopMovie: fixTopMovie });
};

const getLastestFilm = async (req, res) => {
  const latestFilm = await prisma.film.findMany({
    select: {
      film_id: true,
      backdrop_path: true,
      poster_path: true,
    },
    orderBy: {
      release_date: "desc",
    },
    take: 8,
  });
  if (latestFilm.length === 0)
    return res
      .status(202)
      .json({ Message: "No Film found.", latestFilm: latestFilm });
  return res.status(200).json({ latestFilm: latestFilm });
};

const getComingSoonFilmLimit4 = async (req, res) => {
  const comingSoon = await prisma.film.findMany({
    include: {
      language_film: true,
      genres: true,
    },
    where: {
      active: false,
    },
    orderBy: {
      release_date: "desc",
    },
    take: 4,
  });
  if (comingSoon.length === 0)
    return res.status(202).json({ Message: "No Film found." });
  return res.status(200).json({ ComingSoon: comingSoon });
};

const getAllComingSoonFilm = async (req, res) => {
  const allComingSoon = await prisma.film.findMany({
    include: {
      language_film: true,
      genres: true,
    },
    where: {
      active: false,
    },
    orderBy: {
      release_date: "desc",
    },
  });
  if (allComingSoon.length === 0)
    return res.status(202).json({ Message: "No Film found." });
  return res.status(200).json({ allComingSoon: allComingSoon });
};

const getNowFilmLimit4 = async (req, res) => {
  const NowFilm = await prisma.film.findMany({
    include: {
      language_film: true,
      genres: true,
    },
    where: {
      active: true,
    },
    orderBy: {
      release_date: "desc",
    },
    take: 4,
  });
  if (NowFilm.length === 0)
    return res.status(202).json({ Message: "No Film found." });
  return res.status(200).json({ NowFilm: NowFilm });
};

const getAllNowFilm = async (req, res) => {
  const allNowFilm = await prisma.film.findMany({
    include: {
      language_film: true,
      genres: true,
    },
    where: {
      active: true,
    },
    orderBy: {
      release_date: "desc",
    },
  });
  if (allNowFilm.length === 0)
    return res.status(202).json({ Message: "No Film found." });
  return res.status(200).json({ allNowFilm: allNowFilm });
};

const getAFilm = async (req, res) => {
  const { film_id } = req.query;
  if (film_id) {
    const film = await prisma.film.findUnique({
      include: {
        genres: true,
        language_film: true,
      },
      where: { film_id: film_id },
    });
    if (getAFilm) {
      return res.status(200).json({ Message: "Found Film", film: film });
    } else return res.status(404).json({ Message: "Film not found" });
  }
  return res.status(404).json({ Message: "Film not found" });
};

const getAllFilm = async (req, res) => {
  const allFilm = await prisma.film.findMany();
  if (allFilm.length === 0) res.status(404).json({ Message: "No film found." });
  res.status(200).json({ allFilm: allFilm });
};

const updateAFilm = async (req, res) => {
  const { id } = req.params;
  const { film_name, active } = req.body;
  console.log(film_name, active);
  if (!film_name || active === undefined)
    return res.status(202).json({ Message: "Error Request" });
  const existFilm = await prisma.film.findUnique({
    where: {
      film_id: id,
    },
  });
  if (!existFilm) return res.status(202).json({ Message: "Not Found" });
  // const parseBook = parseInt(book_frequency);
  const updateFilm = await prisma.film.update({
    data: {
      film_name: film_name,
      active: active,
    },
    where: {
      film_id: existFilm.film_id,
    },
  });
  res
    .status(200)
    .json({ Message: "Update Film successfully", updated: updateFilm });
};

const deleteAFilm = async (req, res) => {
  const { id } = req.params;
  if (
    !(await prisma.film.findUnique({
      where: {
        film_id: id,
      },
    }))
  )
    res.status(202).json({ Message: "Film Not Found" });
  const deleted = await prisma.film.delete({ where: { film_id: id } });
  res.status(200).json({ Message: "Deleted successfully" });
};

const getAllActiveFilmWithSorttedCalendar = async (req, res) => {
  const allFilm = await prisma.film.findMany({
    select: {
      film_id: true,
      film_name: true,
      genres: {
        select: {
          genres_id: true,
          name: true,
        },
      },
      runtime: true,
      language_film: {
        select: {
          iso_639_1: true,
          english_name: true,
        },
      },
      adult: true,
      poster_path: true,
      calendar: {
        select: {
          calendar_id: true,
          showtime: true,
          theater: true,
        },
      },
    },
    where: {
      active: true,
    },
  });
  if (allFilm.length === 0) {
    return res.status(200).json("No Film Found");
  }
  const date = new Date();
  // allFilm.forEach(f=>(
  // f.calendar.sort((a,b)=>{
  //   const diffA = Math.floor(Math.abs(date - a.showtime));
  //   const diffB = Math.floor(Math.abs(date - b.showtime));
  //   return diffA - diffB;
  // })
  // ))
  // or
  const getAllActiveFilmWithSorttedCalendar = allFilm.map((f) => ({
    ...f,
    calendar: f.calendar.sort((a, b) => {
      const diffA = Math.floor(Math.abs(date - a.showtime));
      const diffB = Math.floor(Math.abs(date - b.showtime));
      return diffA - diffB;
    }),
  }));
  
  return res.status(200).json({ allFilm: getAllActiveFilmWithSorttedCalendar });
};

export {
  createAFilm,
  getAllFilm,
  updateAFilm,
  deleteAFilm,
  getAFilm,
  getTopMoive,
  getLastestFilm,
  getNowFilmLimit4,
  getAllComingSoonFilm,
  getComingSoonFilmLimit4,
  getAllNowFilm,
  getAllActiveFilmWithSorttedCalendar,
};
