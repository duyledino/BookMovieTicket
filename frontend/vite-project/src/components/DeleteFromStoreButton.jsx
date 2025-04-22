import React from "react";
import { useSelector } from "react-redux";

function DeleteFromStoreButton() {
  const detail = useSelector(state => state.movieDetail.detail);
  console.log(detail);
  return (
    <>
      <button
        className={`bg-red-500 text-amber-50 p-2 hover:rounded-xl transition-all cursor-pointer max-w-[300px] ${Object.keys(detail).length===0?"w-full m-auto":"max-w-[300px]"}`}
        //onClick={handleClick}
      >
        Delete From Store
      </button>
    </>
  );
}

export default DeleteFromStoreButton;
