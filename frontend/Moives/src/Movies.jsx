import React, { useEffect, useState } from "react";
import moviesApi from "./MoviesApi/moviesApi.js";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import {
  postFavourite,
  deleteFavourite,
  getFavourite,
} from "./MoviesApi/moviesApi.js";
import { Loading } from "./Loading.jsx";
import { useDispatch, useSelector } from "react-redux";
import { storeFavourite, clearFavourite } from "./redux/favouriteSlice.js";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [isLoad, setIsLoad] = useState(true);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const favourites = useSelector((state) => state.favourites.favourites);
  const handleDoubleclick = async (movie) => {
    debugger
    try {
      let updatedFavourites;
      const temp = favourites[0].movieid;
      if (favourites.some((f) => f.movieid == movie.id)) {
        if (await deleteFavourite(movie)) {
          updatedFavourites = favourites.filter((f) => f.movieid != movie.id);
          dispatch(storeFavourite(updatedFavourites));
        }
      } else {
        if (await postFavourite(movie)) {
          console.log(movie);
          updatedFavourites = [
            ...favourites,
            {
              movieid: movie.id,
              moviename: movie.original_title,
              movieimglink: movie.poster_path,
            },
          ];
          console.log(updatedFavourites);
          const uniqueFavourites = Array.from(
            new Map(updatedFavourites.map((fav) => [fav.movieid, fav])).values()
          );
          dispatch(storeFavourite(uniqueFavourites));
        }
      }
    } catch (error) {
      console.error("Error updating favorite:", error);
    }
  };

  useEffect(() => {
    const fetchFav = async () => {
      try {
        const data = await getFavourite();
        dispatch(storeFavourite(data || [])); // Store in Redux instead of local state
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };
    fetchFav();
  }, [dispatch]); // Ensure Redux gets updated with favorite data

  useEffect(() => {
    const fetchMovies = async () => {
      const dataMovies = await moviesApi(page);
      setMovies(dataMovies);
      setIsLoad(false);
    };
    fetchMovies();
  }, []);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      if (!isLoad) {
        setIsLoad(true);
        setPage((prevPage) => prevPage + 1);
        setIsLoad(false);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoad]);

  useEffect(() => {
    const fetch = async () => {
      const data = await moviesApi(page);
      setMovies((prevMovies) => [...prevMovies, ...data]);
    };
    if (movies.length > 0) {
      fetch();
    }
  }, [page]);  
  return (
    <>
      <div className="moviesContainer">
        <h1 className="text-white w-full max-w-3xl m-auto font-bold text-6xl text-center mb-6">
          Movie List
        </h1>
        <ul className="flex flex-wrap justify-center gap-3.5">
          {movies.length > 0
            ? movies.map((m) => (
                <li
                  key={m.id}
                  className="card"
                  onDoubleClick={() => handleDoubleclick(m)}
                >
                  <img
                    className="w-full h-75 object-cover"
                    src={`https://image.tmdb.org/t/p/w500${m.poster_path}`}
                    alt={m.original_title}
                  />
                  <div className="flex items-center justify-between h-full">
                    <h2 className="p-4">{m.original_title}</h2>
                    {favourites.some((fav) => fav.movieid == m.id) ? (
                      <BsHeartFill className="text-red-500 cursor-pointer" />
                    ) : (
                      <BsHeart className="text-blue-800 cursor-pointer" />
                    )}
                  </div>
                </li>
              ))
            : ""}
        </ul>
        {isLoad && <Loading />}
      </div>
    </>
  );
}

export default Movies;
