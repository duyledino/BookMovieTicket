import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const favorites = useSelector(state=>state.favourites.favourites);
  return (
    <>
      <div className="containerHeader w-full flex gap-x-16 font-bold text-4xl pl-14 text-blue-700 mt-7">
        <Link to="/">Home</Link>
        <Link to="/movies/Favourite" className="">Favourite</Link>
      </div>
    </>
  );
}

export default Header;
