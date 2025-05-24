import React from "react";
import bgImg from "../../images/Film-photo-via-Canva-Pro.png";
import ImgTemp from "../../images/StephenChau.jpg";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useRef } from "react";

function HeroPublic() {
  const [lastestFilms, setLastestFilm] = useState([]);
  const [background, setBackground] = useState("");
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [isHover, setIsHover] = useState(null);
  const current = useRef(0); //not reset each time render
  const intervalID = useRef(null); //not reset each time render
  // let timeoutID = setTimeout(()=>{
  //   setSelectedFilm(lastestFilms[current].poster_path);
  //   setBackground(lastestFilms[current].backdrop_path);
  // },3000);
  useEffect(() => {
    const fetchFilm = async () => {
      const res = await axios.get(
        `https://bookmovieticket.onrender.com/api/v1/film/getLastestFilm`
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
    if (isHover === null && lastestFilms.length > 0) {
      intervalID.current = setInterval(() => {
        current.current = (current.current + 1) % lastestFilms.length;
        setSelectedFilm(lastestFilms[current.current].poster_path);
        setBackground(lastestFilms[current.current].backdrop_path);
      }, 2000);
    }

    return () => clearInterval(intervalID.current); // Cleanup on unmount or when hover changes
  }, [isHover, lastestFilms]);
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
  return (
    <>
      <div className="w-full h-[790px] relative overflow-y-hidden">
        <img
          key={background} //tell React this is a different img so React can render appearAnimation each time it appear 
          src={`https://image.tmdb.org/t/p/original${background}`}
          className="w-full h-full object-cover aspect-video appearAnimation"
        />
        <div className="absolute bottom-0 left-0 w-full flex justify-center">
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
          {/* <img src={ImgTemp} className='w-40 h-auto translate-y-[25px]' alt="" />
            <img src={ImgTemp} className='w-40 h-auto translate-y-[25px]' alt="" />
            <img src={ImgTemp} className='w-40 h-auto ' alt="" />
            <img src={ImgTemp} className='w-40 h-auto translate-y-[25px]' alt="" />
            <img src={ImgTemp} className='w-40 h-auto translate-y-[25px]' alt="" />
            <img src={ImgTemp} className='w-40 h-auto translate-y-[25px]' alt="" />
            <img src={ImgTemp} className='w-40 h-auto translate-y-[25px]' alt="" /> */}
        </div>
      </div>
    </>
  );
}

export default HeroPublic;
