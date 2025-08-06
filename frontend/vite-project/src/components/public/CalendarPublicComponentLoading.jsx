import React from "react";
import ImgTemp from "../../images/StephenChau.jpg";
import { FaFilm } from "react-icons/fa6";
import { FaClock } from "react-icons/fa6";
import { FaEarthAmericas } from "react-icons/fa6";
import { FaUserPlus } from "react-icons/fa6";

function CalendarPublicComponentLoading() {
  return (
    <>
      <div className="w-full flex flex-row gap-28">
        <div className="w-[360px]">
          <img
            alt="Thunderbolts movie poster featuring a group of six characters in dark costumes standing in a smoky background"
            className="w-full h-auto object-cover"
            src={ImgTemp}
          />
        </div>
        <div className="flex-1 text-[14px] leading-relaxed">
          <h1 className="font-bold text-3xl text-white mb-2 border-b border-white/30 pb-1">
            BIỆT ĐỘI SẤM SÉT* (T13) 2D
          </h1>
          <ul className="space-y-5 mb-3">
            <li className="flex items-center gap-2">
              <FaFilm classNameName="text-white text-2xl" />
              <span classNameName="text-white text-2xl">
                Phiêu Lưu, Hành Động
              </span>
            </li>
            <li className="flex items-center gap-2">
              <FaClock classNameName="text-white text-2xl" />
              <span classNameName="text-white text-2xl"> 126</span>
            </li>
            <li className="flex items-center gap-2">
              <FaEarthAmericas classNameName="text-white text-2xl" />
              <span classNameName="text-white text-2xl">Khác</span>
            </li>
            <li className="flex items-center gap-2">
              <FaUserPlus classNameName="text-white text-2xl" />
              <span classNameName="text-white text-2xl">
                <b>T13:</b>
                Phim dành cho khán giả từ đủ 13 tuổi trở lên (13+)
              </span>
            </li>
          </ul>
          <p className="mb-3 text-white uppercase font-bold text-2xl">
            Standard
          </p>
          <div className="flex gap-3 mb-4">
            <div className="text-white text-xl border border-white/50 px-1 py-[2px] hover:bg-white/50 hover:text-black cursor-pointer">
              13:30
            </div>
          </div>
          <p className="mb-3 text-white uppercase font-bold text-2xl">
            Standard
          </p>
          <div className="flex gap-3 mb-4">
            <div className="text-white text-xl border border-white/50 px-1 py-[2px] hover:bg-white/50 hover:text-black cursor-pointer">
              15:45
            </div>
            <div className="text-white text-xl border border-white/50 px-1 py-[2px] hover:bg-white/50 hover:text-black cursor-pointer">
              18:15
            </div>
            <div className="text-white text-xl border border-white/50 px-1 py-[2px] hover:bg-white/50 hover:text-black cursor-pointer">
              20:45
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CalendarPublicComponentLoading;
