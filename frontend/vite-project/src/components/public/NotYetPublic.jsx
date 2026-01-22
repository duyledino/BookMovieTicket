import React, { useEffect, useState } from "react";
import MovieBox from "./MovieBox.jsx";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import NavigatePoster from "./NavigatePoster.jsx";

function NotYetPublic() {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [comingSoons, setComingSoons] = useState([]);
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const fetchFilm = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/film/getComingSoonFilmLimit4`
      );
      if (res.status === 200) {
        setComingSoons(res.data.ComingSoon);
      }
    };
    fetchFilm();
  }, []);
  useEffect(() => {
    const handleResize = () => setInnerWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      <div className="container lg:static relative w-full m-auto max-w-[80%]">
        <h1 className="text-yellow-400 uppercase text-center text-4xl mt-10 mb-10">
          phim sap chieu
        </h1>
        <div className="flex overflow-x-hidden lg:mx-0 mx-auto lg:justify-around lg:w-full md:w-[500px] w-full gap-4">
          {comingSoons && comingSoons.length > 0 &&
            comingSoons.map((c, index) => (
              <MovieBox key={index} Type={`FindMore`} film={c} style={innerWidth < 1024 ? { transform: `translateX(-${current * 100}%)` } : undefined}/>
            ))}
        </div>
        <Link
          to={`PhimSapChieu`}
          className="md:w-[300px] w-full pt-3 pb-3 block text-center mx-auto mt-7 rounded-[10px] ring-1 ring-yellow-400 text-yellow-400"
        >
          Xem Them
        </Link>
        <FaAngleLeft
          className="lg:hidden block cursor-pointer absolute z-[1] top-[50%] left-0 translate-y-[-50%] text-8xl text-amber-300"
          onClick={() =>
            setCurrent((prev) => {
              if (prev === 0) return comingSoons.length - 1;
              return prev - 1;
            })
          }
        />
        <FaAngleRight
          className="lg:hidden block cursor-pointer absolute z-[1] top-[50%] right-0 translate-y-[-50%] text-8xl text-amber-300"
          onClick={() =>
            setCurrent((prev) => {
              if (prev === comingSoons.length - 1) return 0;
              return prev + 1;
            })
          }
        />
        <NavigatePoster
          className={`!bottom-15`}
          current={current}
          setCurrent={setCurrent}
          lastestFilms={comingSoons}
        />
      </div>
    </>
  );
}

export default NotYetPublic;
