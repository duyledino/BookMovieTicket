import React, { useState } from "react";
import { FaCirclePlay } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { shorten } from "../../utils/shortenTitle.js";
import tempImg from "../../images/StephenChau.jpg";
import { getVideoLength } from "../../utils/getVideoLength.js";

// complete const {film_id,film_name,poster_path, language_film,genres,runtime} = film || {film_id: '','',''};
function MovieBox({ Type, film,...props }) {
  const [isHover, setIsHover] = useState(false);
  const {
  film_id = '',
  film_name = '',
  poster_path = '',
  backdrop_path = '',
  overview = '',
  vote_average = 0,
  book_frequency = 0,
  adult = false,
  tagline = '',
  runtime = 0,
  release_date = '',
  active = false,
  language_film = [],
  genres = []
} = film || {};

  return (
    <>
      <div className={`transition-all lg:w-64 lg:min-w-64 min-w-full`} {...props}>
        <div
          className="overflow-y-hidden relative flex justify-center"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <img src={poster_path !== undefined?`https://image.tmdb.org/t/p/w500${poster_path}`:tempImg} className="lg:w-full w-96 h-auto object-contain" alt="" />
          <div className={`absolute flex gap-3 flex-col p-2 w-full h-full z-1 inset-0 bg-black opacity-85 transition-all ${isHover?'translate-y-[0]':'translate-y-[100%]'}`}>
            <h1 className="text-yellow-400 text-2xl uppercase ">Ten Phim: {film_name || ''}</h1>
            <h1 className="text-white"><span className="text-yellow-400">The Loai</span>: {genres.length>0?genres.map(l=>l.name).join(', '):''}</h1>
            <h1 className="text-white"><span className="text-yellow-400">Thoi Luong</span>: {getVideoLength(runtime)||''}</h1>
            <h1 className="text-white"><span className="text-yellow-400">Phu De</span>: {language_film.length>0?language_film.map(l=>l.english_name).join(', '):''}</h1>
          </div>
          {/* <img src={tempImg} alt="" />
          <div
            className={`absolute flex gap-3 flex-col p-2 w-full h-full z-1 inset-0 bg-black opacity-85 transition-all ${
              isHover ? "translate-y-[0]" : "translate-y-[100%]"
            }`}
          >
            <h1 className="text-yellow-400 text-2xl uppercase ">Ten Phim: </h1>
            <h1 className="text-white">The Loai: </h1>
            <h1 className="text-white">Thoi Luong: </h1>
            <h1 className="text-white">Phu De: </h1>
          </div> */}
        </div>
        <div className="detail flex flex-col gap-2">
          <h2 className="lg:block hidden text-white w-full mt-2 text-2xl">
            {shorten(film_name)}
          </h2>
          <h2 className="lg:hidden block text-white w-full mt-2 text-2xl">
            {film_name}
          </h2>
          <Link
            to={active===true?`/PublicCalendar/${film_id}`:`/PhimSapChieu/${film_id}`}
            className="flex justify-between items-center gap-2 cursor-pointer"
          >
            <FaCirclePlay className="text-3xl text-white" />
            <h3 className="text-[15px] underline text-white">Xem Trailer</h3>
            <button className="text-white bg-black p-2 border-1 cursor-pointer">
              {Type === "FindMore" ? `Tim Hieu Them` : `Dat Ve`}
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default MovieBox;
