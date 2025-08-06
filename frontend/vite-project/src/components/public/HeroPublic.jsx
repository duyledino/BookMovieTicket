import React from "react";
import bgImg from "../../images/Film-photo-via-Canva-Pro.png";
import ImgTemp from "../../images/StephenChau.jpg";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useRef } from "react";
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import NavigatePoster from "./NavigatePoster";

function HeroPublic() {
  const [lastestFilms, setLastestFilm] = useState([]);
  const [background, setBackground] = useState("");
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [isHover, setIsHover] = useState(null);
  const [current1, setCurrent1] = useState(0);
  const current = useRef(0); //not reset each time render
  const intervalID = useRef(null); //not reset each time render
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  //react doesn't track window.innerWidth use addEventListener("resize") instead !
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    const fetchFilm = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/film/getLastestFilm`
      );
      if (res.status === 200) {
        setLastestFilm(res.data.latestFilm);
        setSelectedFilm(res.data.latestFilm[current.current].poster_path);
        setBackground(res.data.latestFilm[current.current].backdrop_path);
      }
    };
    fetchFilm();
  }, []);
  // Auto-slide effect
  useEffect(() => {
    if (isHover === null && lastestFilms.length > 0 && windowWidth > 1024) {
      intervalID.current = setInterval(() => {
        current.current = (current.current + 1) % lastestFilms.length;
        setSelectedFilm(lastestFilms[current.current].poster_path);
        setBackground(lastestFilms[current.current].backdrop_path);
      }, 2000);
    }
    if (windowWidth < 1024) {
      setCurrent1(current.current);
    }
    return () => clearInterval(intervalID.current); // Cleanup on unmount or when hover changes
  }, [isHover, lastestFilms, windowWidth]);
  // Hover effect
  useEffect(() => {
    if (isHover !== null) {
      clearInterval(intervalID.current);
      const film = lastestFilms.find((film) => film.film_id === isHover);
      if (film) {
        setBackground(film.backdrop_path);
        setSelectedFilm(null); // or keep current poster
      }
      current.current = -1;
    }
  }, [isHover]);
  useEffect(() => {
    if (windowWidth < 1024) {
      if (current1 === lastestFilms.length) {
        setSelectedFilm(lastestFilms[0]?.poster_path);
        setBackground(lastestFilms[0]?.poster_path);
        setCurrent1(0);
      } else if (current1 === -1) {
        setSelectedFilm(lastestFilms[lastestFilms.length - 1]?.poster_path);
        setBackground(lastestFilms[lastestFilms.length - 1]?.poster_path);
        setCurrent1(lastestFilms.length - 1);
      } else {
        setSelectedFilm(lastestFilms[current1]?.poster_path);
        setBackground(lastestFilms[current1]?.poster_path);
      }
    }
  }, [current1]);
  useEffect(() => {
    if (lastestFilms.length > 0 && windowWidth < 1024) {
      setBackground(() => {
        if (current.current === -1) {
          current.current = lastestFilms.length - 1;
          setSelectedFilm(lastestFilms[current.current].poster_path);
          return lastestFilms[current.current].backdrop_path;
        } else if (current.current === lastestFilms.length) {
          current.current = 0;
          setSelectedFilm(lastestFilms[current.current].poster_path);
          return lastestFilms[current.current].backdrop_path;
        }
        setSelectedFilm(lastestFilms[current.current].poster_path);
        return lastestFilms[current.current].backdrop_path;
      });
    }
  }, [current.current]);
  return (
    <>
      <div className="w-full h-[700px] relative overflow-y-hidden">
        <img
          key={background} //tell React this is a different img so React can render appearAnimation each time it appear
          src={`https://image.tmdb.org/t/p/original${background}`}
          className="w-full h-full object-cover aspect-video appearAnimation"
        />
        <div className="absolute bottom-0 left-0 w-full lg:flex hidden justify-center">
          {lastestFilms.length > 0 &&
            lastestFilms.map((film) => (
              <img
                onMouseEnter={() => setIsHover(film.film_id)}
                onMouseLeave={() => setIsHover(null)}
                key={film.film_id}
                src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
                className={`w-40 h-auto transition-all backdrop-brightness-95 ${
                  selectedFilm == film.poster_path
                    ? "translate-y-[0]"
                    : "translate-y-[25px] brightness-50"
                } hover:translate-y-[0] hover:brightness-100`}
                alt=""
              />
            ))}
        </div>
        <NavigatePoster
          lastestFilms={lastestFilms}
          current={current1}
          setCurrent={setCurrent1}
        />
        <FaAngleLeft
          className="lg:hidden block cursor-pointer absolute z-[1] top-[50%] left-0 translate-y-[-50%] text-8xl text-amber-300"
          onClick={() => setCurrent1((prev) => prev - 1)}
        />
        <FaAngleRight
          className="lg:hidden block cursor-pointer absolute z-[1] top-[50%] right-0 translate-y-[-50%] text-8xl text-amber-300"
          onClick={() => setCurrent1((prev) => prev + 1)}
        />
      </div>
    </>
  );
}

export default HeroPublic;
