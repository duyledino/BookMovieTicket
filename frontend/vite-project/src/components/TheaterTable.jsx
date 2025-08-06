import axios from "axios";
import React, { useEffect, useState } from "react";
import ModelDel from "./ModelDel";
import { useDispatch, useSelector } from "react-redux";
import { addToast } from "../slices/toastSlice.js";
import { useNavigate } from "react-router-dom";
import ModalAddTheater from "./ModalAddTheater.jsx";
import { toCapital } from "../utils/toCapital.js";

const TheaterTable = () => {
  const [theater, setTheater] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isDelOpen, setIsDelOpen] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const [isClick, setIsClick] = useState(undefined);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/theater/getAllTheater`,
          { withCredentials: true }
        );
        console.log(res.data);
        if (res.status === 200) setTheater(res.data.allTheater);
        else if (res.status === 203) {
          dispatch(addToast({ message: res.data.Message, type: "failed" }));
          localStorage.removeItem("user");
          navigate("/404NotFound");
        }
      } catch (error) {
        console.log(error);
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
      const res = await axios.delete(
        `${
          import.meta.env.VITE_SERVER_URL
        }/theater/deleteATheater?id=${entityID}`,
        { withCredentials: true }
      );
      return res;
    } catch (error) {
      dispatch(addToast({ message: error.response?.data?.Message, type: "failed" }));
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
      <ModalAddTheater
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
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-800 text-amber-500">
            <th className="px-6 py-3 border-b text-left">Theater ID</th>
            <th className="px-6 py-3 border-b text-left">Theater Name</th>
            <th className="px-6 py-3 border-b text-left">Số chỗ Ngồi</th>
          </tr>
        </thead>
        <tbody>
          {theater !== undefined && theater.length > 0 ? (
            theater.map((theater, i) => (
              <tr
                // onClick={() => navigate(`/Calendar/${booking.book_id}`)}
                onClick={() => handleClick(theater.theater_id)}
                key={theater.theater_id}
                className={`cursor-pointer text-white transition-all ${
                  isClick === theater.theater_id
                    ? "bg-amber-500"
                    : (i + 1) % 2 === 0
                    ? "bg-gray-700"
                    : "bg-gray-800"
                }  hover:bg-amber-500 hover:text-black `}
              >
                <td className="px-6 py-4 border-b">{theater.theater_id}</td>
                <td className="px-6 py-4 border-b">{toCapital(theater.theater_name)}</td>
                <td className="px-6 py-4 border-b">{theater.number_of_seat}</td>
                {
                  //TODO: Fix showtime format
                }
              </tr>
            ))
          ) : (
            <tr
              // onClick={() => navigate(`/Calendar/${booking.book_id}`)}
              key={`N/A`}
              className={`cursor-pointer transition-all
                 bg-gray-700 text-white hover:bg-amber-500 hover:text-black`}
            >
              <td className="px-6 py-4 border-b">N/A</td>
              <td className="px-6 py-4 border-b">N/A</td>
              <td className="px-6 py-4 border-b">N/A</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default TheaterTable;
