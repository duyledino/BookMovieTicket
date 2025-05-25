import { getAll, getDetail } from "../utils/getAPI.js";

const GetAllFilmController = async (req, res) => {
  const {page} = req.query;
  const allFilmOutside = await getAll(page);

  if (!allFilmOutside.data) return res.status(202).json({ Message: "No film found." });
  return res.status(200).json({
    Message: "Fetch film successfully.",
    listFilm: allFilmOutside.data.results,
  });
};

const getDetailFilm = async (req, res) => {
  const {id} = req.params;
  console.log(id);
  if (id === "") return res.status(202).json({ Message: "Id is empty." });
  const detailFilm = await getDetail(id);
  if (!detailFilm.data) return res.status(202).json({ Message: "No film found." });
  return res.status(200).json({Message: "Fetch film successfully.",film: detailFilm.data});
};

export { GetAllFilmController,getDetailFilm };
