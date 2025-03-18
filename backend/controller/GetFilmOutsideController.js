import getAll from "../utils/getAPI.js";

const GetAllFilmController = async(req,res)=>{
    const allFilmOutside = await getAll();
    if(!allFilmOutside.data) return res.json({Message: "No film found."});
    return res.json({Message: "Fetch film successfully.",listFilm: allFilmOutside.data.results});
}

export default GetAllFilmController