import React from 'react'
import MovieBox from '../../components/public/MovieBox'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

function OnAirPage() {
  const [nows, setNows] = useState([]);
    useEffect(() => {
      const fetchFilm = async () => {
        const res = await axios.get(
          `https://bookmovieticket.onrender.com/api/v1/film/getAllNowFilm`
        );
        console.log(res);
        if (res.status === 200) {
          setNows(res.data.allNowFilm);
        }
      };
      fetchFilm();
    }, []);
  return (
    <>
      <div className="container w-full mx-auto mb-10 max-w-[80%] mt-4">
        <h1 className="text-yellow-400 uppercase text-center text-4xl mt-10 mb-10">
          phim dang Chieu
        </h1>
        <div className="listFilm flex justify-around gap-5 flex-wrap">
          { (nows !== undefined) ?  nows.length > 0&&nows.map((c) => (
            <MovieBox Type={`Book`} film={c} />
          )):'Chua co phim dang chieu'}
        </div>
      </div>
    </>
  )
}

export default OnAirPage
