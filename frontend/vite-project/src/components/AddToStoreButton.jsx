import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {addToast} from '../slices/toastSlice'

function AddToStoreButton() {
  const detail = useSelector((state) => state.movieDetail.detail);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = async () => {
    if (Object.keys(detail).length !== 0) {
      const {
        id,
        title,
        poster_path,
        backdrop_path,
        overview,
        vote_average,
        adult,
        tagline,
        genres,
        spoken_languages,
        runtime,
        release_date,
      } = detail;
      const data = {
        film_id: id.toString(),
        film_name: title,
        poster_path: poster_path,
        backdrop_path: backdrop_path,
        overview: overview,
        vote_average: vote_average,
        adult: adult,
        tagline: tagline,
        runtime: runtime,
        release_date: release_date,
      };
      const resFilm = await fetch(
        "http://localhost:8001/api/v1/film/createFilm",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
          credentials: "include"
        }
      );
      if (resFilm.status !== 400) {
        genres.forEach(async (g) => {
          const dataG = { genres_id: g.id.toString(), genres_name: g.name };
          const resG = await fetch(
            "http://localhost:8001/api/v1/genre/createGenre",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(dataG),
            }
          );
          const genres_film = {
            film_id: data.film_id,
            genres_id: dataG.genres_id,
            name: dataG.genres_name,
          };
          await fetch("http://localhost:8001/api/v1/genre/createAGenreFilm", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(genres_film),
          });
        });
        spoken_languages.forEach(async (l) => {
          const dataL = {
            iso_639_1: l.iso_639_1,
            english_name: l.english_name,
          };
          const resL = await fetch(
            "http://localhost:8001/api/v1/language/createLanguage",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(dataL),
            }
          );
          const languages_film = {
            film_id: data.film_id,
            iso_639_1: dataL.iso_639_1,
            english_name: dataL.english_name,
          };
          await fetch(
            "http://localhost:8001/api/v1/language/createALanguageFilm",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(languages_film),
            }
          );
        });
      }
      if (resFilm.status === 200) {
        dispatch(addToast({message:"Add film to store successfully.",type:"success"}));
        navigate("/admin/Movies");
      } else if (resFilm.status === 400) {
        dispatch(addToast({message:"Đã có film này rồi !",type:"Failed."}));
        navigate("/admin/Movies/MovieOutter");
      }
    }
  };
  return (
    <>
      <button
        className={`bg-amber-400 text-amber-50 p-2 hover:rounded-xl transition-all cursor-pointer ${
          Object.keys(detail).length === 0
            ? "w-full m-auto max-w-[300px]"
            : "max-w-[300px]"
        }`}
        onClick={handleClick}
      >
        Add To Store
      </button>
    </>
  );
}

export default AddToStoreButton;
