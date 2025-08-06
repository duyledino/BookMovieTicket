import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAll } from "../slices/innerMovieSlice";
import ModelVerify from "./ModelVerify";
import { getFormatDateNow,fixFormatDate } from "../utils/getFormatDateNow.js";
import { addToast } from "../slices/toastSlice.js";

function ModalAddCalendar({ isOpen, onClose,setIsChange }) {
  if (!isOpen) {
    return null;
  }
  const [openModel, setOpenModel] = useState(false);
  const allFilm = useSelector((state) => state.innerMovies.innerMovie);
  const dispatch = useDispatch();
  const [filmId, setFilmId] = useState("");
  // const []
  const [showTime,setShowTime] = useState(()=>getFormatDateNow());
  const [seatNumber, setSeatNumber] = useState(0);
  const [theaterId, setTheaterId] = useState("");
  const [theaters, setTheaters] = useState([]);
  const handleChange = (e) => {
    const tempId = e.target.value;
    const number = theaters.find((t) => t.theater_id === tempId)._count.seat;
    setTheaterId(tempId);
    setSeatNumber(number);
  };
  console.log(showTime,typeof showTime);
  const onCreate = async () => {
    if(!theaterId||!filmId||!showTime){
        dispatch(addToast({message:"Info is missing.",type:"failed"}));
        return;
    }
    console.log(showTime);
    const res = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/calendar/createACalendar`,
      {
        showtime:fixFormatDate(showTime) ,
        film_id: filmId,
        available_sit: seatNumber,
        total_sit: "0",
        theater_id: theaterId,
      },{withCredentials: true}
    );
    return res;
  };
  useEffect(() => {
    const fetchFilm = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/film/getAllNowFilm`
      );
      if (res.status === 200) {
        dispatch(addAll(res.data.allNowFilm));
      }
    };
    const fetchTheater = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/theater/getAllTheater`,{withCredentials: true}
      );
      console.log(res);
      if (res.status === 200)
        setTheaters((old) => [...old, ...res.data.allTheater]);
    };
    fetchFilm();
    fetchTheater();
  }, []);
  console.log(theaters);
  return (
    <>
      <ModelVerify
        isOpen={openModel}
        onCloseModal={() => {setOpenModel(false)}}
        onClose={()=>onClose()}
        onCreate={onCreate}
        setIsChange={setIsChange}
      />
      <div className="fixed inset-0 bg-black/55 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg w-[500px] max-h-[90vh] overflow-y-hidden">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Them Lich Chieu</h2>
            <button
              onClick={onClose}
              className="cursor-pointer text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          <form
            className="flex w-full flex-col gap-1.5"
            onSubmit={(e) => {
              e.preventDefault();
              setOpenModel(true);
            }}
          >
            <div className="flex items-center gap-3 w-full">
              <label htmlFor="ID" className="text-xl w-[27%]">
                Lua phim{" "}
              </label>
              {/* <input
              type="text"
              name=""
              value={customer_id}
              readOnly
              id="ID"
              className="cursor-pointer w-full p-2 ring rounded-xs border-none outline-0 transition-all focus:ring-blue-600 focus:ring-3"
            /> */}
              <select
                value={filmId}
                onChange={(e) => setFilmId(e.target.value)}
                className="cursor-pointer w-full p-2 ring rounded-xs border-none outline-0 transition-all focus:ring-blue-600 focus:ring-3"
              >
                <option value="">Chọn phim nào</option>
                {allFilm.map((film) => (
                  <option key={film.film_id} value={film.film_id}>
                    {film.film_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-3 w-full">
              <label htmlFor="name" className="text-xl w-[27%]">
                Chon phong xem phim{" "}
              </label>
              {/* <input
              type="text"
              value={name}
              id="name"
              className=" w-full p-2 ring rounded-xs border-none outline-0 transition-all focus:ring-blue-600 focus:ring-3"
              onChange={(e) => setName(e.target.value)}
            /> */}
              <select
                value={theaterId}
                onChange={handleChange}
                className="cursor-pointer w-full p-2 ring rounded-xs border-none outline-0 transition-all focus:ring-blue-600 focus:ring-3"
              >
                <option value="">Chọn phòng phim nào</option>
                {theaters.map((theater) => {
                  return (
                    <option key={theater.theater_id} value={theater.theater_id}>
                      {theater.theater_name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="flex items-center gap-3 w-full">
              <label htmlFor="Age" className="text-xl w-[27%]">
                Tong ghe{" "}
              </label>
              <input
                type="text"
                value={seatNumber}
                id="Age"
                className=" w-full p-2 ring rounded-xs border-none outline-0 bg-gray-300 transition-all focus:ring-blue-600 focus:ring-3 cursor-pointer"
                readOnly={true}
              />
            </div>
            <div className="flex items-center gap-3 w-full">
              <label htmlFor="username" className="text-xl w-[27%]">
                Cho ngoi con trong{" "}
              </label>
              <input
                type="text"
                value={0}
                id="username"
                className=" w-full p-2 ring rounded-xs border-none outline-0 transition-all bg-gray-300 focus:ring-blue-600 focus:ring-3 cursor-pointer"
                readOnly={true}
                // onChange={(e) => setUsernameState(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-3 w-full">
              <label htmlFor="ADMIN" className="text-xl w-[20%]">
                Lich Chieu{" "}
              </label>
              <input
                type="datetime-local"
                value={showTime}
                id="ADMIN"
                className=" w-fit p-2 border-none  transition-all"
                onChange={(e) => setShowTime(e.target.value)}
              />
            </div>
            <input
              type="submit"
              value="Xác nhận Them"
              className="p-4 cursor-pointer bg-amber-600 self-center text-xl text-white rounded-[10px]"
            />
          </form>
        </div>
      </div>
    </>
  );
}

export default ModalAddCalendar;
