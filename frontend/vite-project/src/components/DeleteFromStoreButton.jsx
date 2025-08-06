import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModelDel from "./ModelDel";
import { setChange } from "../slices/globalVariableSlice.js";
import { addToast } from "../slices/toastSlice.js";
import { useNavigate } from "react-router-dom";

function DeleteFromStoreButton() {
  const detail = useSelector(state => state.movieDetail.detail);  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen,setIsOpen] = useState(false);
  const onDelete = async (entityID)=>{
    const res = await axios.delete(`${import.meta.env.VITE_SERVER_URL}/film/deleteFilm/${entityID}`,{withCredentials: true});
    return res;
  }
  return (
    <>
      <ModelDel entityID={detail.film_id} isOpen={isOpen} onDelete={onDelete} onClose={()=>setIsOpen(false)} setIsChange={()=>{dispatch(setChange())}}/> 
      <button
        className={`bg-red-500 text-amber-50 p-2 hover:rounded-xl transition-all cursor-pointer max-w-[300px] ${Object.keys(detail).length===0?"w-full m-auto":"max-w-[300px]"}`}
        onClick={()=>setIsOpen(true)}
      >
        Delete From Store
      </button>
    </>
  );
}

export default DeleteFromStoreButton;
