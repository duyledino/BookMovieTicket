import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { shorten } from "../utils/shortenTitle.js";
import { useDispatch, useSelector } from "react-redux";
import { addPage } from "../slices/pageSlice.js";
import { addMoviesInPage } from "../slices/movieSlice.js";
import AddToStoreButton from "../components/AddToStoreButton.jsx";
import { addToast } from "../slices/toastSlice.js";

function MovieOutter() {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleWidth = () => setInnerWidth(window.innerWidth);
    window.addEventListener("resize", handleWidth);
    return () => window.removeEventListener("resize", handleWidth);
  }, []);
  const dispatch = useDispatch();
  const page = useSelector((state) => state.pages.page);
  const allFilm = useSelector((state) => state.movies.myMovies);
  useEffect(() => {
    const fetchFilm = async () => {
      try {
        const res = await fetch(
          `${
            import.meta.env.VITE_SERVER_URL
          }/FilmOutside/getFilmOutside?page=${page}`,
          { credentials: "include" }
        );
        if (res.status === 203) {
          dispatch(addToast({ message: res.data.Message, type: "failed" }));
          localStorage.removeItem("user");
          navigate("/404NotFound");
        }
        const data = await res.json();
        dispatch(addMoviesInPage(data.listFilm));
      } catch (error) {
        console.error("Failed to fetch film.");
      }
    };
    const scrollHandle = () => {
      if (
        document.documentElement.scrollHeight <=
        window.scrollY + window.innerHeight + 1
      ) {
        dispatch(addPage());
      }
    };
    fetchFilm();

    window.addEventListener("scroll", scrollHandle);
    return () => window.removeEventListener("scroll", scrollHandle);
  }, [dispatch, page]);
  return (
    <>
      <div className="containerOutterFilm w-full max-w-[85%] m-auto">
        <ul className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4 list-none">
          {allFilm &&
            allFilm.map((film) => (
              <li
                className=" shadow-boundary p-3.5  hover:ring-2 ring-amber-300 transition-all"
                key={film.id}
              >
                <Link to={`${film.id}`} className="flex flex-col gap-2">
                  <div className="w-full flex justify-center">
                    <img
                      src={"https://image.tmdb.org/t/p/w500" + film.poster_path}
                      alt="Film title"
                      className="poster w-[220px] aspect-[3/4] object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="info flex justify-between items-center">
                      {innerWidth < 1024 ? (
                        <h2 className="title font-bold text-2xl ">
                          {film.title}
                        </h2>
                      ) : (
                        <h2 className="title font-bold text-2xl ">
                          {shorten(film.title)}
                        </h2>
                      )}
                      <p className="text-white">
                        <span className="text-amber-300">
                          {Math.floor(film.vote_average)}
                        </span>
                        /10
                      </p>
                    </div>
                    <AddToStoreButton />
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
