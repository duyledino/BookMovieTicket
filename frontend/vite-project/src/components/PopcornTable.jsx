import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToast } from "../slices/toastSlice";
import axios from "axios";
import ModelDel from "./ModelDel";
import ModalAddPopCorn from "./ModalAddPopCorn";
import Popcorn from "./Popcorn";

const PopcornTable = () => {
  const [loading, setLoading] = useState(false);
  const [popCorn, setPopCorn] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isDelOpen, setIsDelOpen] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const [isClick, setIsClick] = useState(undefined);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/popCorn/getAllPopCorn`,
          { withCredentials: true }
        );
        console.log("popcorn ", res.data);

        if (res.status === 200) {
          setPopCorn(res.data.fixAllpopcorn);
          setLoading(false);
        } else if (res.status === 203) {
          dispatch(addToast({ message: res.data.Message, type: "failed" }));
          localStorage.removeItem("user");
          setLoading(false);
          navigate("/404NotFound");
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
        dispatch(
          addToast({ message: error.response?.data?.Message, type: "failed" })
        );
      }
    };
    fetchData();
  }, [isChange]);
  const handleClick = (theaterID) => {
    if (isClick !== undefined) {
      if (isClick === theaterID) setIsClick(undefined);
      else setIsClick(theaterID);
      return;
    }
    setIsClick(theaterID);
  };
  const onDelete = async (entityID) => {
    try {
      setLoading(true);
      const res = await axios.delete(
        `${
          import.meta.env.VITE_SERVER_URL
        }/popCorn/deleteAPopCorn?id=${entityID}`,
        { withCredentials: true }
      );
      setLoading(false);
      return res;
    } catch (error) {
      setLoading(false);
      dispatch(
        addToast({ message: error.response?.data?.Message, type: "failed" })
      );
    }
  };
  return (
    <>
      <ModelDel
        entityID={isClick}
        isOpen={isDelOpen}
        onClose={() => setIsDelOpen(false)}
        onDelete={onDelete}
        setIsChange={setIsChange}
      />
      <ModalAddPopCorn
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        setIsChange={setIsChange}
      />
      <div className="min-w-full flex justify-end mb-6 gap-4">
        <button
          className="p-3 bg-amber-500 rounded-[10px] cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          Tao rap phim
        </button>
        <button
          className="p-3 bg-amber-500 rounded-[10px] cursor-pointer"
          onClick={() => setIsDelOpen(true)}
        >
          Xoa rap phim
        </button>
      </div>
      <div className="flex flex-wrap lg:flex-row flex-col lg:justify-normal justify-center items-center gap-3.5 min-w-full p-2">
        {popCorn !== undefined && popCorn.length > 0
          ? popCorn.map((item, index) => (
              <Popcorn
                isClick={isClick}
                handleClick={handleClick}
                popCornId={item.popcorn_id}
                key={item.popcorn_id}
                booked={item.booked}
                name={item.name}
                price={item.price}
                total={item.total}
                base64Image={item.base64Image}
              />
            ))
          : ""}
      </div>
    </>
  );
};

export default PopcornTable;
