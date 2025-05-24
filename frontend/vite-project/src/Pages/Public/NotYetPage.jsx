import React from 'react'
import MovieBox from '../../components/public/MovieBox'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

function NotYetPage() {
const [comingSoons, setComingSoons] = useState([]);
  useEffect(() => {
    const fetchFilm = async () => {
      const res = await axios.get(
        `http://localhost:8000/api/v1/film/getAllComingSoonFilm`
      );
      if (res.status === 200) {
        setComingSoons(res.data.allComingSoon);
      }
    };
    fetchFilm();
  }, []);
  return (
    <>
      <div className="container w-full m-auto max-w-[80%] mt-4 mb-4">
        <h1 className="text-yellow-400 uppercase text-center text-4xl mt-10 mb-10 cursor-pointer">phim sap chieu</h1>
        <div className="listFilm flex justify-around gap-5 flex-wrap">
          {comingSoons!==undefined?comingSoons.length > 0&&comingSoons.map((c) => (
            <MovieBox Type={`FindMore`} film={c} />
          )):'Chua co phim sap chieu'}
        </div>
      </div>
    </>
  )
}

export default NotYetPage
