import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createAGenre = async (req, res) => {
  const { genres_id, genres_name } = req.body;
  const existGenre = await prisma.genre.findUnique({
    where: { genres_id: genres_id },
  });

  if (existGenre) {
    return res.status(202).json({ Message: "Genre already exists" });
  }

  const genre = await prisma.genre.create({
    data: { genres_id: genres_id, genres_name: genres_name },
  });

  res.status(200).json({ Message: "Created successfully", genre });
};

const getAllGenres = async (req, res) => {
  const genres = await prisma.genre.findMany();
  if (genres.length === 0) return res.json({ Message: "No genres found." });
  res.json({ genres });
};

const getGenresFromAFilm = async (req, res) => {
  const { film_id } = req.params;
  const existFilm = await prisma.film.findUnique({
    where: { film_id: film_id },
  });
  if (existFilm) {
    const genres = await prisma.genres_film.findMany({
      where: {
        film_id: film_id,
      },
    });
    return res.status(200).json({ Message: "Found Genres", genres: genres });
  }
  return res.status(202).json({ Message: "Film not found." });
};

const createAGenreFilm = async (req, res) => {
  const { film_id, genres_id, name } = req.body;
  const exist = await prisma.genres_film.findUnique({
    where: {
      film_id_genres_id: {
        film_id: film_id,
        genres_id: genres_id,
      },
    },
  });
  if (!exist) {
    const add = await prisma.genres_film.create({
      data: {
        film_id: film_id,
        genres_id: genres_id,
        name: name,
      },
    });
    return res
      .status(200)
      .json({ Message: "Create detail genres_film successfully", add: add });
  }
};

const deleteAGenre = async (req, res) => {
  const { id } = req.params;

  const existGenre = await prisma.genre.findUnique({
    where: { genres_id: id },
  });

  if (!existGenre) return res.json({ Message: "Genre not found" });

  await prisma.genre.delete({ where: { genres_id: id } });

  res.json({ Message: "Deleted successfully" });
};

export {
  createAGenre,
  getAllGenres,
  deleteAGenre,
  getGenresFromAFilm,
  createAGenreFilm,
};
