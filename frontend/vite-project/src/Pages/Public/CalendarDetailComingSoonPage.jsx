import React, { useEffect, useState } from "react";
import ImgTemp from "../../images/StephenChau.jpg";
import { FaCirclePlay, FaFilm } from "react-icons/fa6";
import { FaClock } from "react-icons/fa6";
import { FaEarthAmericas } from "react-icons/fa6";
import { FaUserPlus } from "react-icons/fa6";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { getVideoLength } from "../../utils/getVideoLength.js";
import Loading from "../../components/Loading.jsx";

function CalendarDetailComingSoonPage() {
  const location = useLocation();
  const film_id = location.pathname.split("/").at(-1);
  const [loading, setLoading] = useState(false);

  const [film, setFilm] = useState(null);

  console.log(film_id);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    const fetchCalendar = async () => {
      setLoading(true);
      const resFilm = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/film/getAFilm?film_id=${film_id}`
      );

      if (resFilm.status === 200) {
        setLoading(false);
        setFilm(resFilm.data.film);
      }
    };
    fetchCalendar();
  }, []);

  return (
    <>
      {loading ? <Loading /> : ""}
      <div className="w-full flex lg:flex-row flex-col gap-28 mb-10">
        {film !== null && (
          <>
            <div className="sm:w-[360px] w-full lg:self-start self-center">
              <img
                alt="Thunderbolts movie poster featuring a group of six characters in dark costumes standing in a smoky background"
                className="w-full h-auto object-cover"
                src={
                  `https://image.tmdb.org/t/p/w500${film.poster_path}` ||
                  tempImg
                }
              />
            </div>
            <div className="flex-1 text-[14px] leading-relaxed">
              <h1 className="font-bold text-3xl text-white mb-2 border-b border-white/30 pb-1">
                {film.film_name || `BIỆT ĐỘI SẤM SÉT* (T13) 2D`}
              </h1>
              <ul className="space-y-5 mb-3">
                <li className="flex items-center gap-2">
                  <FaFilm className="text-white text-2xl" />
                  <span className="text-white md:text-2xl text-[14px]">
                    {film.genres.map((g) => g.name).join(", ") ||
                      `Phiêu Lưu, Hành Động`}
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <FaClock className="text-white text-2xl" />
                  <span className="text-white md:text-2xl text-[14px]">
                    {" "}
                    {getVideoLength(film.runtime) || "100"}
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <FaEarthAmericas className="text-white text-2xl" />
                  <span className="text-white md:text-2xl text-[14px]">
                    {film.language_film.map((g) => g.english_name).join(", ") ||
                      `Khác`}
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <FaUserPlus className="text-white text-2xl" />
                  <span className="text-white md:text-2xl text-[14px]">
                    <b>T{film.adult ? `18` : `13`}: </b>
                    Phim dành cho khán giả từ đủ{" "}
                    {film.adult
                      ? `18 tuổi trở lên (18+)`
                      : `13 tuổi trở lên (13+)`}
                  </span>
                </li>
              </ul>

              <h1 className="mb-3 text-white uppercase font-bold text-3xl">
                Noi Dung Phim
              </h1>
              <p className="text-white md:text-xl text-[14px]">
                {film.overview ||
                  `Bộ đôi Tiến Luật và Ngọc Kiên Huy, vị nghệ sĩ “độc lạ” hứa hẹn
                sẽ lái xe cứu thương, họ mang đến những tình huống trớ trêu
                không cho khán giả qua hành trình tìm xác đầu tiên của điện ảnh
                Việt. Như cơ sự của cuộc đời, lẽ không chỉ diễn biến quanh nhân
                vật chính mà thường xuyên làm khán giả cảm thấy “đau khổ đối
                diện” trước những tình huống “khó nhằn” hay gãy gánh phim...`}
              </p>
            </div>
          </>
        )}
      </div>
      <div className="w-full max-w-fit mx-auto mb-6 gap-3 flex items-center justify-between cursor-pointer">
        <FaCirclePlay className="text-7xl text-white " />
        <h3 className="text-2xl text-white">Xem Trailer</h3>
      </div>
    </>
  );
}

export default CalendarDetailComingSoonPage;
