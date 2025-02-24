import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Loading } from "./Loading";
import Header from "./Header";

function Favourite() {
  const favorites = useSelector((state) => state.favourites.favourites);
  const [isLoad, setIsLoad] = useState(true);
  useEffect(() => {
    setIsLoad(false);
  }, []);
  return (
    <>
      <Header />
      <div className="moviesContainer">
        <h1 className="text-white w-full max-w-3xl m-auto font-bold text-6xl text-center mb-6">
          Favourite List
        </h1>
        <ul className="flex flex-wrap justify-center gap-3.5">
          {favorites.length > 0
            ? favorites.map((m) => (
                <li
                  key={m.movieid}
                  className="card"
                  onDoubleClick={() => handleDoubleclick(m)}
                >
                  <img
                    className="w-full h-75 object-cover"
                    src={`https://image.tmdb.org/t/p/w500${m.movieimglink}`}
                    alt={m.moviename}
                  />
                  <div className="flex items-center justify-between h-full">
                    <h2 className="p-4">{m.moviename}</h2>
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

export default Favourite;
