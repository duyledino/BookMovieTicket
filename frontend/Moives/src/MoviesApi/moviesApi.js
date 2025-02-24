import axios from "axios";

const moviesApi = async (page) => {
  try {
    const res = await axios.get("http://localhost:5000/api/v1/movies/popular", {
      params: { page },
    });
    return res.data.results;
  } catch (error) {
    console.error(error);
  }
};

export const postFavourite = async (movie) => {
  try {
    const { id, original_title, poster_path } = movie;
    await axios.post("http://localhost:5000/api/v1/movies/saveFavourite", {
      id,
      original_title,
      poster_path,
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getFavourite = async () => {
  try {
    const allFavourite = await axios.get(
      "http://localhost:5000/api/v1/movies/getFavourite"
    );
    return allFavourite.data.movie;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteFavourite = async (movie) => {
  try {
    const { id } = movie;
    await axios.delete(
      `http://localhost:5000/api/v1/movies/deleteFavourite?movieId=${id}`
    );
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export default moviesApi;
