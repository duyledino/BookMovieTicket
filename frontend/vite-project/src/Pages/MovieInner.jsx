import React, { useEffect, useState } from "react";
import DeleteFromStoreButton from "../components/DeleteFromStoreButton";
import { addAll, resetAll } from "../slices/innerMovieSlice.js";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { shorten } from "../utils/shortenTitle.js";
import ModelDel from "../components/ModelDel.jsx";
import axios from "axios";
import { addToast } from "../slices/toastSlice.js";
import MoviesBoxAdmin from "../components/MoviesBoxAdmin.jsx";
import Loading from "../components/Loading.jsx";

function MovieInner() {
  const [loading, setLoading] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const dispatch = useDispatch();
  const allFilm = useSelector((state) => state.innerMovies.innerMovie);
  // const change = useSelector(state=>state.globalVariable.globalChange);
  const fetchFilm = async () => {
    setLoading(true);
    const res = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/film/getAllFilm`,
      { credentials: "include" }
    );
    if (res.status === 200) {
      setLoading(false);
      const data = await res.json();
      dispatch(addAll(data.allFilm));
    } else if (res.status === 203) {
      setLoading(false);
      dispatch(addToast({ message: res.data.Message, type: "failed" }));
      localStorage.removeItem("user");
      navigate("/404NotFound");
    }
  };

  useEffect(() => {
    fetchFilm();
  }, [isChange]);
  // useEffect(() => {
  //   if(location.state?.refresh) {
  //     console.log(location.state.refresh);
  //     fetchFilm();
  //   }
  // }, [location.state]);
  return (
    <>
      {loading ? <Loading /> : ""}
      <div className="containerOutterFilm w-full max-w-[85%] m-auto">
        <ul className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4 list-none">
          {allFilm && allFilm.length > 0 &&
            allFilm.map((film) => (
              // <li
              //   className=" shadow-boundary p-3.5  hover:ring-2 ring-amber-300 transition-all relative"
              //   key={film.film_id}
              //   >
              //   <input type="checkbox" className="absolute top-5 right-5 z-20" value={active} onChange={()=> setActive(!active)}/>
              //   <Link
              //     to={`/admin/Movies/MovieInner/${film.film_id}`}
              //     className="flex flex-col gap-2"
              //   >
              //     <div className="w-full flex justify-center">
              //       <img
              //         src={"https://image.tmdb.org/t/p/w500" + film.poster_path}
              //         alt="Film title"
              //         className="poster w-[220px] aspect-[3/4] object-cover"
              //       />
              //     </div>
              //     <div className="flex flex-col gap-2">
              //       <div className="info flex justify-between items-center">
              //         <h2 className="title font-bold text-2xl ">
              //           {shorten(film.original_title)}
              //         </h2>
              //         <p className="text-white">
              //           <span className="text-amber-300">
              //             {Math.floor(film.vote_average)}
              //           </span>
              //           /10
              //         </p>
              //       </div>
              //       <DeleteFromStoreButton />
              //     </div>
              //   </Link>
              // </li>
              <MoviesBoxAdmin
                setIsChange={() => setIsChange(!isChange)}
                film={film}
              />
            ))}
        </ul>
      </div>
    </>
  );
}

export default MovieInner;
