import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaCirclePlay, FaArrowRightFromBracket } from "react-icons/fa6";
import { addDetail } from "../slices/movieDetailSlice";
import { useDispatch, useSelector } from "react-redux";
import { getVideoLength } from "../utils/getVideoLength.js";
import DeleteFromStoreButton from "../components/DeleteFromStoreButton.jsx";

function InnerMovieDetail() {
  const { movieId } = useParams();
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.movieDetail.detail);
  useEffect(() => {
    const fetchFilm = async () => {
      const resFilm = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/film/getAFilm?film_id=${movieId}`
      );
      const dataFilm = await resFilm.json();
      if (dataFilm) {
        const resLanguage = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/language/getLanguagesFromAFilm/${movieId}`
        );
        const dataLanguage = await resLanguage.json();
        const resGenre = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/genre/getGenresFromAFilm/${movieId}`
        );
        const dataGenre = await resGenre.json();
        if (dataFilm && dataLanguage && dataGenre) {
          const data = {
            ...dataFilm.film,
            spoken_languages: dataLanguage.languages,
            genres: dataGenre.genres,
          };
          dispatch(addDetail(data));
        }
      }
    };
    fetchFilm();
  }, []);
  return (
    <>
      {Object.keys(detail).length !== 0 ? (
        <div className="container w-full max-[90%] m-auto">
          <div className="hero flex lg:flex-row flex-col w-full p-2.5 gap-4">
            <div className="leftHero flex flex-col lg:order-none order-2 lg:w-[45%] w-full gap-4 justify-center">
              <div className="logo w-[200px] mb-4">
                <h1 className="font-sans w-full">{detail.tagline}</h1>
              </div>
              <div className="filmOverview ">
                <h1 className="font-bold text-4xl text-white mb-2">
                  {detail.original_title}
                </h1>
                <div className="overview flex gap-3 items-center justify-between max-w-fit">
                  <h2 className="date-release text-gray-300">
                    {detail.release_date}
                  </h2>
                  {detail.adult ? (
                    <>
                      <h2 className="maturity border-l-2 border-r-2 pl-2 pr-2 text-gray-300 ">
                        18+
                      </h2>
                      <h2 className="runtime text-gray-300">
                        {getVideoLength(detail.runtime)}
                      </h2>
                    </>
                  ) : (
                    <h2 className="runtime text-gray-300 border-l-2 pl-2">
                      {getVideoLength(detail.runtime)}
                    </h2>
                  )}
                </div>
                <h3 className="pOverview w-full text-gray-400 mt-2.5 mb-2.5">
                  {detail.overview}
                </h3>
                <div className="genre flex gap-1 text-gray-500">
                  <span>Genre:</span>
                  <p className="text-gray-300 relative before:content[''] before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-amber-300 before:transition-all hover:before:w-full hover:text-amber-300 cursor-pointer">
                    {detail.genres[0].name}
                  </p>
                </div>
              </div>
              <h2 className="vote p-2 bg-amber-800 w-fit text-amber-300">
                {Math.floor(detail.vote_average)}/
                <span className="text-blue-50">10</span>
              </h2>
              <DeleteFromStoreButton />
            </div>
            <div className="rightHero w-[55%] lg:block lg:order-none order-1 lg:mx-0 mx-auto">
              <img
                src={`https://image.tmdb.org/t/p/w500${detail.poster_path}`}
                alt="image"
                className="w-full max-h-[600px] aspect-[2/3] object-contain"
              />
            </div>
          </div>
          <div className="detail mt-20 mb-20">
            <div className="videoDemo mb-16">
              <div className="title flex justify-between gap-1 w-full max-w-fit items-center">
                <h1 className="text-white text-4xl">Video</h1>
                <h2 className="text-gray-300 text-3xl">|</h2>
                <h2 className="text-gray-500 text-3xl w-fit">
                  {detail.original_title}
                </h2>
              </div>
              <div className="video lg:w-[720px] md:w-[500px] w-[350px] mt-8 mb-8 relative cursor-pointer">
                <div className="absolute w-24 h-24 bg-white rounded-[50%] bottom-3 left-3">
                  <FaCirclePlay className="w-full h-full" />
                </div>
                <img
                  src={`https://image.tmdb.org/t/p/w500${detail.backdrop_path}`}
                  alt="image"
                  className="w-full aspect-video object-contain"
                />
              </div>
              <h2 className="text-white text-xl">
                Trailer: {detail.original_title}
              </h2>
            </div>
            <div className="moreDetail">
              <h2 className="text-white md:text-4xl text-2xl mb-6">More Detail</h2>
              <div className="flex lg:flex-row flex-col lg:justify-between text-2xl">
                <div>
                  <h3 className="lg:text-gray-500  text-amber-300">Genres</h3>
                  {detail.genres.map((g) => (
                    <p
                      key={g.genres_id}
                      className="text-gray-300 relative before:content[''] before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-amber-300 before:transition-all hover:before:w-full hover:text-amber-300 cursor-pointer"
                    >
                      {g.name}
                    </p>
                  ))}
                </div>

                <div>
                  <h3 className="lg:text-gray-500  text-amber-300">Audio</h3>
                  {detail.spoken_languages.map((lang) => (
                    <p
                      key={lang.iso_639_1}
                      className="text-gray-300 relative before:content[''] before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-amber-300 before:transition-all hover:before:w-full hover:text-amber-300 cursor-pointer"
                    >
                      {lang.english_name}
                    </p>
                  ))}
                </div>
                <div>
                  <h3 className="lg:text-gray-500  text-amber-300">Tagline</h3>
                  <p className="lg:text-gray-500 text-white">{detail.tagline}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container w-full max-[90%] m-auto">
          <h1>
            No Infomation About This Film. <FaArrowRightFromBracket />
          </h1>
        </div>
      )}
    </>
  );
}

export default InnerMovieDetail;
