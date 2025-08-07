import React from "react";
import MovieBox from "../../components/public/MovieBox";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Loading from "../../components/Loading";

function OnAirPage() {
  const [loading, setLoading] = useState(false);
  const [nows, setNows] = useState([]);
  useEffect(() => {
    const fetchFilm = async () => {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/film/getAllNowFilm`
      );
      console.log(res);
      if (res.status === 200) {
        setLoading(false);
        setNows(res.data.allNowFilm);
      }
    };
    fetchFilm();
  }, []);
  return (
    <>
      {loading ? <Loading /> : ""}
      <div className="container w-full mx-auto mb-10 max-w-[80%] mt-4">
        <h1 className="text-yellow-400 uppercase text-center text-4xl mt-10 mb-10">
          phim dang Chieu
        </h1>
        <div className="listFilm flex justify-around gap-5 flex-wrap">
          {nows !== undefined
            ? nows.length > 0 &&
              nows.map((c) => <MovieBox Type={`Book`} film={c} />)
            : "Chua co phim dang chieu"}
        </div>
      </div>
    </>
  );
}

export default OnAirPage;
