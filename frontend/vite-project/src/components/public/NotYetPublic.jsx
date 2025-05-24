import React, { useEffect, useState } from "react";
import MovieBox from "./MovieBox.jsx";
import { Link } from "react-router-dom";
import axios from "axios";

function NotYetPublic() {
  const [comingSoons, setComingSoons] = useState([]);
  useEffect(() => {
    const fetchFilm = async () => {
      const res = await axios.get(
        `https://bookmovieticket.onrender.com/api/v1/film/getComingSoonFilmLimit4`
      );
      if (res.status === 200) {
        setComingSoons(res.data.ComingSoon);  
      }
    };
    fetchFilm();
  }, []);
  return (
    <>
      <div className="container w-full m-auto max-w-[80%]">
        <h1 className="text-yellow-400 uppercase text-center text-4xl mt-10 mb-10">
          phim sap chieu
        </h1>
        <div className="listFilm flex justify-around gap-4">
          {comingSoons.length > 0&&comingSoons.map((c) => (
            <MovieBox Type={`FindMore`} film={c} />
          ))}
          {/* <MovieBox Type={`FindMore`} />
          <MovieBox Type={`FindMore`} />
          <MovieBox Type={`FindMore`} /> */}
        </div>
        <Link
          to={`PhimSapChieu`}
          className="w-[300px] pt-3 pb-3 block text-center mx-auto mt-7 rounded-[10px] ring-1 ring-yellow-400 text-yellow-400"
        >
          Xem Them
        </Link>
      </div>
    </>
  );
}

export default NotYetPublic;
