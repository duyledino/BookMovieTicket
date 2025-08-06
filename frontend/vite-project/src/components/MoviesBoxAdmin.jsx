import React from "react";
import { Link } from "react-router-dom";
import { shorten } from "../utils/shortenTitle.js";
import ModelDel from "../components/ModelDel.jsx";
import axios from "axios";
import { addToast } from "../slices/toastSlice.js";
import DeleteFromStoreButton from "./DeleteFromStoreButton.jsx";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { useDispatch } from "react-redux";

function MoviesBoxAdmin({ setIsChange, film }) {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleWidth = () => setInnerWidth(window.innerWidth);
    window.addEventListener("resize", handleWidth);
    return () => window.removeEventListener("resize", handleWidth);
  }, []);
  const dispatch = useDispatch();
  const {
    film_id = "",
    film_name = "",
    poster_path = "",
    backdrop_path = "",
    overview = "",
    vote_average = 0,
    book_frequency = 0,
    adult = false,
    tagline = "",
    runtime = 0,
    release_date = "",
    active = false,
  } = film || {};
  const hasMouted = useRef(false); //the value not change after render (useState) !!!
  const [activeCheck, setActiveCheck] = useState(active);
  const updateFilm = async () => {
    const res = await axios.patch(
      `${import.meta.env.VITE_SERVER_URL}/film/updateFilm/${film_id}`,
      {
        film_name: film_name,
        active: activeCheck,
      },
      { withCredentials: true }
    );
    if (res.status === 200) {
      dispatch(addToast({ message: res.data.Message, type: "success" }));
      setIsChange();
    } else {
      dispatch(addToast({ message: res.data.Message, type: "failed" }));
    }
  };
  useEffect(() => {
    if (hasMouted.current) {
      updateFilm();
    } else {
      hasMouted.current = true;
    }
  }, [activeCheck]);
  return (
    <div>
      <li
        className=" shadow-boundary p-3.5  hover:ring-2 ring-amber-300 transition-all relative"
        key={film_id}
      >
        <label class="inline-flex items-center cursor-pointer absolute top-5 right-5">
          <input
            type="checkbox"
            class="sr-only peer"
            checked={activeCheck}
            onChange={() => setActiveCheck((old) => !old)}
          />
          <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>{" "}
        </label>
        <Link
          to={`/admin/Movies/MovieInner/${film_id}`}
          className="flex flex-col gap-2"
        >
          <div className="w-full flex justify-center">
            <img
              src={"https://image.tmdb.org/t/p/w500" + poster_path}
              alt="Film title"
              className="poster w-[220px] aspect-[3/4] object-cover"
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="info flex justify-between items-center">
              {innerWidth < 1024 ? (
                <h2 className="title font-bold text-2xl ">{film_name}</h2>
              ) : (
                <h2 className="title font-bold text-2xl ">
                  {shorten(film_name)}
                </h2>
              )}
              <p className="text-white">
                <span className="text-amber-300">
                  {Math.floor(vote_average)}
                </span>
                /10
              </p>
            </div>
            <DeleteFromStoreButton />
          </div>
        </Link>
      </li>
    </div>
  );
}

export default MoviesBoxAdmin;
