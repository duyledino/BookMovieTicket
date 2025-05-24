import React from "react";
import MovieBox from "./MovieBox.jsx";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

function OnAirPublic() {
  const [nows, setNows] = useState([]);
  useEffect(() => {
    const fetchFilm = async () => {
      const res = await axios.get(
        `https://bookmovieticket.onrender.com/api/v1/film/getNowFilmLimit4`
      );
      if (res.status === 200) {
        setNows(res.data.NowFilm);
      }
    };
    fetchFilm();
  }, []);
  return (
    <>
      <div className="container w-full mx-auto mb-10 max-w-[80%] ">
        <h1 className="text-yellow-400 uppercase text-center text-4xl mt-10 mb-10">
          phim dang Chieu
        </h1>
        <div className="listFilm flex justify-around gap-4 ">
          {nows.length > 0&&nows.map((c) => (
            <MovieBox key={c.film_id} Type={`Book`} film={c} />
          ))}
          {/* <MovieBox Type={`Book`} />
          <MovieBox Type={`Book`} />
          <MovieBox Type={`Book`} />
          <MovieBox Type={`Book`} /> */}
        </div>
        <Link
          to={`PhimDangChieu`}
          className="w-[300px] pt-3 pb-3 block text-center mx-auto mt-7 rounded-[10px] ring-1 ring-yellow-400 text-yellow-400"
        >
          Xem Them
        </Link>
      </div>
    </>
  );
}

export default OnAirPublic;
