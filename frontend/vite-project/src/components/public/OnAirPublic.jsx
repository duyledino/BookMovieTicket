import React from "react";
import MovieBox from "./MovieBox.jsx";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import NavigatePoster from "./NavigatePoster";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

function OnAirPublic() {
  const [nows, setNows] = useState([]);
  const [current, setCurrent] = useState(0);
  const [innerWidth,setInnerWidth] = useState(window.innerWidth);
  useEffect(()=>{
    const handleWidth = ()=>setInnerWidth(window.innerWidth);
    window.addEventListener("resize",handleWidth);
    return () => window.removeEventListener("resize",handleWidth);
  },[])
  useEffect(() => {
    const fetchFilm = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/film/getNowFilmLimit4`
      );
      if (res.status === 200) {
        setNows(res.data.NowFilm);
      }
    };
    fetchFilm();
  }, []);
  return (
    <>
      <div className="container lg:static relative w-full mx-auto mb-10 max-w-[80%] ">
        <h1 className="text-yellow-400 uppercase text-center text-4xl mt-10 mb-10">
          phim dang Chieu
        </h1>
        <div className="listFilm flex lg:justify-around lg:mx-0 mx-auto overflow-x-hidden lg:w-full md:w-[500px] lg:gap-4 gap-0">
          {nows && nows.length > 0 &&
            nows.map((c) => (
              <MovieBox key={c.film_id} Type={`Book`} film={c} style={innerWidth < 1024 ? { transform: `translateX(-${current * 100}%)` } : undefined} />
            ))}
          {/* <MovieBox Type={`Book`} />
          <MovieBox Type={`Book`} />
          <MovieBox Type={`Book`} />
          <MovieBox Type={`Book`} /> */}
        </div>
        <Link
          to={`PhimDangChieu`}
          className="md:w-[300px] w-full pt-3 pb-3 block text-center mx-auto mt-7 rounded-[10px] ring-1 ring-yellow-400 text-yellow-400"
        >
          Xem Them
        </Link>
        <FaAngleLeft
          className="lg:hidden block cursor-pointer absolute z-[1] top-[50%] left-0 translate-y-[-50%] text-8xl text-amber-300"
          onClick={() => setCurrent((prev) => {
            if(prev === 0) return nows.length - 1;
            return prev - 1;
          })}
        />
        <FaAngleRight
          className="lg:hidden block cursor-pointer absolute z-[1] top-[50%] right-0 translate-y-[-50%] text-8xl text-amber-300"
          onClick={() => setCurrent((prev) => {
            if(prev === nows.length - 1) return 0;
            return prev + 1;
          })}
        />
        <NavigatePoster className={`!bottom-15`} current={current} setCurrent={setCurrent} lastestFilms={nows}/>
      </div>
    </>
  );
}

export default OnAirPublic;
