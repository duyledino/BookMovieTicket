import React from "react";

const NavigatePoster = ({ lastestFilms = [], current, setCurrent, className }) => {
  return (
    <div className={`lg:hidden w-fit absolute translate-x-[-50%] justify-between bottom-5 left-[50%] flex gap-1 items-center ${className}`}>
      {lastestFilms.map((item, index) => (
        <div
        onClick={()=>setCurrent(index)}
          key={index}
          className={`transition-all cursor-pointer backdrop-blur-xl  h-3 ${
            index === current ? "w-14 rounded-[12px] bg-gray-100" : "bg-gray-100/35 w-3 rounded-[50%]"
          }`}
        ></div>
      ))}
    </div>
  );
};

export default NavigatePoster;
