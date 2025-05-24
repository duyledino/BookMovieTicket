import React from "react";
import { Link } from "react-router-dom";
import { FaTicket } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { FaGlassWater } from "react-icons/fa6";
import SearchBar from "../SearchBar";
import LoginButton from "../LoginButton";

function NavPublic() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <>
      <nav className="w-full mt-5 bg-black p-7 sticky top-0 left-0 z-20">
        <div className="w-full m-auto max-w-[85%] flex justify-between items-center mb-4">
          <div className="flex justify-between gap-2">
            <Link
              to={``}
              className="bg-[#4B0D0D] flex items-center gap-2 p-2 rounded"
            >
              <FaTicket className="text-white" />
              <h3 className="uppercase text-white">đặt vé ngay</h3>
            </Link>
            <Link to={``} className="bg-[#4B0D0D] flex items-center gap-2 p-2 rounded">
              <FaGlassWater className="text-white"/>
              <h3 className="uppercase text-white">dat bap nuoc</h3>
            </Link>
          </div>
          <SearchBar />
          <LoginButton user={user}/>
        </div>
        <div className="flex items-center justify-between w-full max-w-[10%]">
          <FaLocationDot className="text-white text-xl"/>
          <Link className="text-white text-xl uppercase" to={`PublicCalendar`}>Lich Chieu</Link>
        </div>
      </nav>
    </>
  );
}

export default NavPublic;
