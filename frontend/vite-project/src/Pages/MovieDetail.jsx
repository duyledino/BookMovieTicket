import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import image from "../images/Film-photo-via-Canva-Pro.png"; // This import was not used
import { FaCirclePlay, FaArrowRightFromBracket } from "react-icons/fa6";
import { addDetail } from "../slices/movieDetailSlice"; // Assuming this action and slice exist
import { useDispatch, useSelector } from "react-redux";
import { getVideoLength } from "../utils/getVideoLength.js";
import AddToStoreButton from "../components/AddToStoreButton.jsx";

function MovieDetail() {
  const { movieId } = useParams();
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.movieDetail.detail);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFilm = async () => {
      if (!movieId) {
        setLoading(false);
        // Optionally dispatch an action to clear detail or set to a known empty state
        // For now, we assume if movieId is not present, we show "No Information"
        dispatch(addDetail(null)); // Or dispatch(addDetail({})) if your reducer expects an object
        return;
      }
      setLoading(true);
      try {
        const res = await fetch(
          `https://bookmovieticket.onrender.com/api/v1/FilmOutside/getFilmDetail/${movieId}`, {credentials: "include"}
        );
        if (!res.ok) {
          // Handle HTTP errors (e.g., 404 Not Found, 500 Server Error)
          console.error("API Error:", res.status, await res.text());
          dispatch(addDetail(null)); // Set detail to null to indicate no data
        } else {
          const data = await res.json();
          if (data && data.film) {
            dispatch(addDetail(data.film));
          } else {
            console.warn("Film data not found in API response:", data);
            dispatch(addDetail(null)); // Set detail to null if film data is missing
          }
        }
      } catch (error) {
        console.error("Failed to fetch film details:", error);
        dispatch(addDetail(null)); // Set detail to null on network or other errors
      } finally {
        setLoading(false);
      }
    };

    fetchFilm();

    // Optional: Cleanup if you want to clear details when the component unmounts or movieId changes
    // return () => {
    //   dispatch(addDetail(null)); // Or a specific clear action
    // };
  }, [movieId, dispatch]); // Added movieId and dispatch to dependency array

  if (loading) {
    return (
      <div className="container w-full max-[90%] m-auto text-center py-10 text-white">
        Loading movie details...
      </div>
    );
  }

  // Check if detail is truthy and has keys. This prevents Object.keys(null/undefined)
  const hasData = detail && Object.keys(detail).length > 0;

  return (
    <>
      {hasData ? (
        <div className="container w-full max-[90%] m-auto">
          <div className="hero flex w-full p-2.5 gap-4">
            <div className="leftHero flex flex-col w-[45%] gap-4 justify-center">
              <div className="logo w-[200px] mb-4">
                <h1 className="font-sans w-full">{detail.tagline || "N/A"}</h1>
              </div>
              <div className="filmOverview ">
                <h1 className="font-bold text-4xl text-white mb-2">
                  {detail.original_title || "No Title"}
                </h1>
                <div className="overview flex gap-3 items-center justify-between max-w-fit">
                  <h2 className="date-release text-gray-300">
                    {detail.release_date || "Unknown release date"}
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
                  {detail.overview || "No overview available."}
                </h3>
                <div className="genre flex gap-1 text-gray-500">
                  <span>Genre:</span>
                  {detail.genres && detail.genres.length > 0 && detail.genres[0] ? (
                    <p className="text-gray-300 relative before:content[''] before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-amber-300 before:transition-all hover:before:w-full hover:text-amber-300 cursor-pointer">
                      {detail.genres[0].name}
                    </p>
                  ) : (
                    <p className="text-gray-300">N/A</p>
                  )}
                </div>
              </div>
              <h2 className="vote p-2 bg-amber-800 w-fit text-amber-300">
                {detail.vote_average !== undefined && detail.vote_average !== null
                  ? Math.floor(detail.vote_average)
                  : "N/A"}
                /<span className="text-blue-50">10</span>
              </h2>
              <AddToStoreButton filmDetail={detail} /> {/* Pass detail if button needs it */}
            </div>
            <div className="rightHero w-[55%]">
              {detail.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${detail.poster_path}`}
                  alt={detail.original_title || "Movie poster"}
                  className="w-full max-h-[600px] aspect-[2/3] object-contain"
                />
              ) : (
                <div className="w-full max-h-[600px] aspect-[2/3] bg-gray-700 flex items-center justify-center text-white">
                  No Poster Available
                </div>
              )}
            </div>
          </div>
          <div className="detail mt-20 mb-20">
            <div className="videoDemo mb-16">
              <div className="title flex justify-between gap-1 w-full max-w-fit items-center">
                <h1 className="text-white text-4xl">Video</h1>
                <h2 className="text-gray-300 text-3xl">|</h2>
                <h2 className="text-gray-500 text-3xl w-fit">
                  {detail.original_title || ""}
                </h2>
              </div>
              <div className="video w-[720px] mt-8 mb-8 relative cursor-pointer">
                <div className="absolute w-24 h-24 bg-white rounded-[50%] bottom-3 left-3">
                  <FaCirclePlay className="w-full h-full" />
                </div>
                {detail.backdrop_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${detail.backdrop_path}`}
                    alt={detail.original_title || "Movie backdrop"}
                    className="w-full aspect-video object-contain"
                  />
                ) : (
                  <div className="w-full aspect-video bg-gray-700 flex items-center justify-center text-white">
                    No Backdrop Available
                  </div>
                )}
              </div>
              <h2 className="text-white text-xl">
                Trailer: {detail.original_title || ""}
              </h2>
            </div>
            <div className="moreDetail">
              <h2 className="text-white text-4xl mb-6">More Detail</h2>
              <div className="flex justify-between text-2xl">
                <div>
                  <h3 className="text-white">Genres</h3> {/* Added text-white for visibility */}
                  {detail.genres && detail.genres.length > 0 ? (
                    detail.genres.map((g) => (
                      <p key={g.id} className="text-gray-300 relative before:content[''] before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-amber-300 before:transition-all hover:before:w-full hover:text-amber-300 cursor-pointer">
                        {g.name}
                      </p>
                    ))
                  ) : (
                    <p className="text-gray-400">No genres listed.</p>
                  )}
                </div>

                <div>
                  <h3 className="text-white">Audio</h3> {/* Added text-white for visibility */}
                  {detail.spoken_languages && detail.spoken_languages.length > 0 ? (
                    detail.spoken_languages.map((lang) => (
                      <p key={lang.iso_639_1} className="text-gray-300 relative before:content[''] before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-amber-300 before:transition-all hover:before:w-full hover:text-amber-300 cursor-pointer">
                        {lang.english_name}
                      </p>
                    ))
                  ) : (
                    <p className="text-gray-400">No audio languages listed.</p>
                  )}
                </div>
                <div>
                  <h3 className="text-white">Tagline</h3> {/* Added text-white for visibility */}
                  <p className="text-gray-300">{detail.tagline || "N/A"}</p> {/* Added text-gray-300 for consistency */}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container w-full max-[90%] m-auto text-center py-10 text-white">
          <h1>
            No Information About This Film. <FaArrowRightFromBracket />
          </h1>
        </div>
      )}
    </>
  );
}

export default MovieDetail;