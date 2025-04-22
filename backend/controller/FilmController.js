import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createAFilm = async (req, res) => {
  const {film_id,
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
      film_id: film_id
    }
  })
  if(existFilm){
    return res.status(400).json({Message: "Film exists"});
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

const getAFilm = async(req,res)=>{
  const {film_id} = req.query;
  if(film_id){
    const film = await prisma.film.findUnique({where:{film_id: film_id}});
    if(getAFilm){
      return res.status(200).json({Message: "Found Film",film: film});
    }else return res.status(404).json({Message: "Film not found"});
  }
  return res.status(404).json({Message: "Film not found"});
}

const getAllFilm = async (req, res) => {
  const allFilm = await prisma.film.findMany();
  if (allFilm.length === 0) res.status(404).json({ Message: "No film found." });
  res.status(200).json({ allFilm: allFilm });
};

const updateAFilm = async (req, res) => {
  const { id } = req.params;
  const { film_name, book_frequency } = req.body;
  if (!film_name || !book_frequency)
    res.json(400).json({ Message: "Error Request" });
  const existFilm = await prisma.film.findUnique({
    where: {
      film_id: id,
    },
  });
  if (!existFilm) res.json({ Message: "Not Found" });
  const parseBook = parseInt(book_frequency);
  const updateFilm = await prisma.film.update({
    data: {
      film_name: film_name,
      book_frequency: parseBook,
    },
    where: {
      film_id: existFilm.film_id,
    },
  });
  res.json({ Message: "Update successfully", updated: updateFilm });
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
    res.json({ Message: "Film Not Found" });
  const deleted = await prisma.film.delete({ where: { film_id: id } });
  res.json({ Message: "Deleted successfully" });
};

export { createAFilm, getAllFilm, updateAFilm, deleteAFilm, getAFilm };
