import React from "react";
import { Link } from "react-router-dom";
import { FaTicket } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { FaGlassWater } from "react-icons/fa6";
import SearchBar from "./SearchBar";
import { FaBarsStaggered } from "react-icons/fa6";
import LoginButton from "../LoginButton";

function NavPublic({setIsClick}) {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <>
      <nav className="w-full mt-5 bg-black p-7 sticky top-0 left-0 z-20">
        <div className="w-full m-auto lg:max-w-[85%] max-w-[95%] order-0 sm:order-none flex flex-wrap justify-center gap-5 md:gap-0 sm:justify-between items-center mb-4">
          <div className="lg:flex hidden justify-between gap-2">
            <Link
              to={``}
              className="flex bg-[#4B0D0D] items-center gap-2 p-2 rounded"
            >
              <FaTicket className="text-white" />
              <h3 className="uppercase text-white">đặt vé ngay</h3>
            </Link>
          </div>
          <FaBarsStaggered onClick={()=>setIsClick(true)} className={`cursor-pointer order-1 sm:order-none lg:hidden inline-block text-4xl text-white font-extrabold`}/>
          <SearchBar />
          <LoginButton user={user}/>
        </div>
        <div className="lg:flex hidden items-center justify-between w-full max-w-[10%]">
          <FaLocationDot className="text-white text-xl"/>
          <Link className="text-white text-xl uppercase" to={`PublicCalendar`}>Lich Chieu</Link>
        </div>
      </nav>
    </>
  );
}

export default NavPublic;
