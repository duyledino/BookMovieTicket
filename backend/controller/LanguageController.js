import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createALanguage = async (req, res) => {
  const { iso_639_1, english_name } = req.body;
  const existLanguage = await prisma.language.findFirst({
    where: { iso_639_1 },
  });

  if (existLanguage) {
    return res.status(202).json({ Message: "Language already exists" });
  }

  const language = await prisma.language.create({
    data: { iso_639_1, english_name },
  });

  res.status(200).json({ Message: "Created successfully", language });
};

const getAllLanguages = async (req, res) => {
  const languages = await prisma.language.findMany();
  if (languages.length === 0)
    return res.json({ Message: "No languages found." });
  res.json({ languages });
};

const deleteALanguage = async (req, res) => {
  const { id } = req.params;

  const existLanguage = await prisma.language.findUnique({
    where: { iso_639_1: id },
  });

  if (!existLanguage) return res.json({ Message: "Language not found" });

  await prisma.language.delete({ where: { iso_639_1: id } });

  res.json({ Message: "Deleted successfully" });
};

const getLanguagesFromAFilm = async (req, res) => {
  const { film_id } = req.params;
  const existFilm = await prisma.film.findUnique({
    where: { film_id: film_id },
  });
  if (existFilm) {
    const languages = await prisma.language_film.findMany({
      where: {
        film_id: film_id,
      },
    });
    return res
      .status(200)
      .json({ Message: "Found Languages", languages: languages });
  }
  return res.status(400).json({ Message: "Film not found." });
};

const createALanguageFilm = async (req, res) => {
  const { iso_639_1, film_id,english_name } = req.body;
  const exist = await prisma.language_film.findUnique({
    where: {
      iso_639_1_film_id: {
        iso_639_1: iso_639_1,
        film_id: film_id,
      },
    },
  });
  if (exist) {
    console.log("createALanguageFilm========>", exist.iso_639_1, exist.film_id);
  }
  if (!exist) {
    const add = await prisma.language_film.create({
      data: {
        film_id: film_id,
        iso_639_1: iso_639_1,
        english_name: english_name,

      },
    });
    return res
      .status(200)
      .json({ Message: "Create detail language_film successfully", add: add });
  }
};

export {
  createALanguage,
  getAllLanguages,
  deleteALanguage,
  getLanguagesFromAFilm,
  createALanguageFilm,
};
