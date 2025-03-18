import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { shorten } from "../utils/shortenTitle.js";

function MovieOutter() {
  const [allFilm, setAllFilm] = useState([]);
  useEffect(() => {
    const fetchFilm = async () => {
      try {
        const res = await fetch(
          "http://localhost:8000/api/v1/FilmOutside/getFilmOutside"
        );
        const data = await res.json();
        setAllFilm(data.listFilm);
      } catch (error) {
        console.error("Failed to fetch film.");
      }
    };
    fetchFilm();
  }, []);
  return (
    <>
      <div className="containerOutterFilm w-full max-w-[85%] m-auto">
        <ul className="grid grid-cols-4 gap-4 list-none">
          {allFilm &&
            allFilm.map((film) => (
              <li
                className=" shadow-boundary p-3.5  hover:ring-2 ring-amber-300 transition-all"
                key={film.id}
              >
                <Link
                  to={"/MovieOutter/" + film.id}
                  className="flex flex-col gap-2"
                >
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
                    <button className="bg-amber-400 text-amber-50 p-2 hover:rounded-xl transition-all">
                      Add To Store
                    </button>
                  </div>
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}

export default MovieOutter;
