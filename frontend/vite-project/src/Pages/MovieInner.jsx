import React, { useEffect } from "react";
import DeleteFromStoreButton from "../components/DeleteFromStoreButton";
import { addAll } from "../slices/innerMovieSlice.js";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {shorten} from "../utils/shortenTitle.js";

function MovieInner() {
  const dispatch = useDispatch();
  const allFilm = useSelector((state) => state.innerMovies.innerMovie);
  useEffect(() => {
    const fetchFilm = async () => {
      const res = await fetch("http://localhost:8000/api/v1/film/getAllFilm");
      if (res.status === 200) {
        const data = await res.json();
        dispatch(addAll(data.allFilm));
      }
    };
    fetchFilm();
  }, [dispatch]);
  return (
    <>
      <div className="containerOutterFilm w-full max-w-[85%] m-auto">
        <ul className="grid grid-cols-4 gap-4 list-none">
          {allFilm.length > 0 &&
            allFilm.map((film) => (
              <li
                className=" shadow-boundary p-3.5  hover:ring-2 ring-amber-300 transition-all"
                key={film.film_id}
              >
                <Link to={`/Movies/MovieInner/${film.film_id}`} className="flex flex-col gap-2">
                  <div className="w-full flex justify-center">
                    <img
                      src={"https://image.tmdb.org/t/p/w500" + film.poster_path}
                      alt="Film title"
                      className="poster w-[220px] aspect-[3/4] object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="info flex justify-between items-center">
                      <h2 className="title font-bold text-2xl ">
                        {shorten(film.original_title)}
                      </h2>
                      <p className="text-white">
                        <span className="text-amber-300">
                          {Math.floor(film.vote_average)}
                        </span>
                        /10
                      </p>
                    </div>
                    <DeleteFromStoreButton />
                  </div>
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}

export default MovieInner;
