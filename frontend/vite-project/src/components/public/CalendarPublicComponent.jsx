import React from "react";
import ImgTemp from "../../images/StephenChau.jpg";
import { FaFilm } from "react-icons/fa6";
import { FaClock } from "react-icons/fa6";
import { FaEarthAmericas } from "react-icons/fa6";
import { FaUserPlus } from "react-icons/fa6";
import { getVideoLength } from "../../utils/getVideoLength.js";
import { getFormatCalendar } from "../../utils/getFormatDateNow.js";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function CalendarPublicComponent({ film }) {
  const {
    film_id,
    film_name,
    genres,
    calendar,
    adult,
    language_film,
    poster_path,
    runtime,
  } = film;
  console.log(
    "my film :",
    film_id,
    film_name,
    genres,
    calendar,
    adult,
    language_film,
    poster_path,
    runtime
  );
  const [theater, setTheater] = useState([]);
  useEffect(() => {
    if (calendar !== undefined && calendar.length > 0) {
      const temp = [];
      calendar.forEach((c) => {
        if (!temp.find((t) => t.theater_id === c.theater.theater_id))
          temp.push({
            theater_id: c.theater.theater_id,
            theater_name: c.theater.theater_name,
          });
      });
      setTheater(temp);
    }
  }, [calendar]);
  return (
    <div className="w-full flex lg:flex-row flex-col gap-28" key={film_id}>
      <div className="lg:w-[360px] self-center w-96 h-auto">
        <img
          alt="Thunderbolts movie poster featuring a group of six characters in dark costumes standing in a smoky background"
          className="w-full h-auto object-cover"
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
        />
      </div>
      <div className="flex-1 text-[14px] leading-relaxed" key={film_id}>
        <h1 className="font-bold md:text-3xl text-2xl text-white mb-2 border-b border-white/30 pb-1">
          {film_name}
        </h1>
        <ul className="space-y-5 mb-3">
          <li className="flex items-center gap-2">
            <FaFilm className="text-white text-2xl" />
            <span className="text-white sm:text-2xl text-[14px]">
              {genres.map((g) => g.name).join(", ")}{" "}
            </span>
          </li>
          <li className="flex items-center gap-2">
            <FaClock className="text-white text-2xl" />
            <span className="text-white sm:text-2xl text-[14px]">
              {getVideoLength(runtime)}
            </span>
          </li>
          <li className="flex items-center gap-2">
            <FaEarthAmericas className="text-white text-2xl" />
            <span className="text-white sm:text-2xl text-[14px]">
              {language_film.map((l) => l.english_name).join(", ")}
            </span>
          </li>
          <li className="flex items-center gap-2">
            <FaUserPlus className="text-white text-2xl" />
            <span className="text-white sm:text-2xl text-[14px]">
              {adult
                ? "Phim dành cho khán giả từ đủ 18 tuổi trở lên (18+)"
                : "Phim dành cho khán giả từ đủ 13 tuổi trở lên (13+)"}
            </span>
          </li>
        </ul>
        {theater.length > 0 && calendar !== undefined && calendar.length > 0 ? (
          theater.map((t) => (
            <>
              <p
                className="mb-3 text-white uppercase font-bold text-2xl"
                key={t.theater_id}
              >
                {t.theater_name}
              </p>
              <div className="flex gap-3 mb-4">
                {calendar
                  .filter((c) => c.theater.theater_id === t.theater_id)
                  .map((c) => (
                    <div
                      className="text-white text-xl border border-white/50 px-1 py-[2px] hover:bg-white/50 hover:text-black cursor-pointer"
                      key={c.calendar_id}
                    >
                      <Link to={`${film_id}?calendar_id=${c.calendar_id}`}>{getFormatCalendar(c.showtime)}</Link>
                    </div>
                  ))}
              </div>
            </>
          ))
        ) : (
          <>
            <p className="mb-3 text-white uppercase font-bold text-2xl">
              Standard
            </p>
            <div className="flex gap-3 mb-4">
              <div className="text-white text-xl border border-white/50 px-1 py-[2px] hover:bg-white/50 hover:text-black cursor-pointer">
                13:30
              </div>
            </div>
            <p className="mb-3 text-white uppercase font-bold text-2xl">
              Standard
            </p>
            <div className="flex gap-3 mb-4">
              <div className="text-white text-xl border border-white/50 px-1 py-[2px] hover:bg-white/50 hover:text-black cursor-pointer">
                15:45
              </div>
              <div className="text-white text-xl border border-white/50 px-1 py-[2px] hover:bg-white/50 hover:text-black cursor-pointer">
                18:15
              </div>
              <div className="text-white text-xl border border-white/50 px-1 py-[2px] hover:bg-white/50 hover:text-black cursor-pointer">
                20:45
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CalendarPublicComponent;
