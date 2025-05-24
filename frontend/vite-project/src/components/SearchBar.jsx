import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

function SearchBar() {
  return (
    <>
      <div className="w-full max-w-[300px] flex items-center justify-between pl-2 pr-2 bg-[#D9D9D9] rounded-4xl">
        <input type="text" className="outline-none w-[90%] p-2" placeholder="tim phim"/>
        <FaMagnifyingGlass/>
      </div>
    </>
  );
}

export default SearchBar;
