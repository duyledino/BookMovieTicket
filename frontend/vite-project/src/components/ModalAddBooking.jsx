import React, { useEffect, useState } from "react";
import ModelVerify from "./ModelVerify";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUsers } from "../slices/usersSlice";
import { setCalendars } from "../slices/calendarsSlice";
import { setPopCorn } from "../slices/popcornSlice";
import {getFormatDateNow} from '../utils/getFormatDateNow.js'
import {v4 as uuid} from 'uuid'

function ModalAddBooking({ isOpen, onClose, setIsChange }) {
  if (!isOpen) {
    return null;
  }
  const [openModel, setOpenModel] = useState(false);
  const dispatch = useDispatch();
  const [allFilm, setAllFilm] = useState([]);
  const [numberPopCorn, setNumberPopCorn] = useState(0);
  const [filmID, setFilmID] = useState("");
  const [calendarID, setCalendarID] = useState("");
  const [seat, setSeat] = useState([]);
  const [seatID, setSeatID] = useState("");
  const [theater, setTheater] = useState(null); //theater is unique when calendar is selected
  const [customerID, setCustomerID] = useState("");
  const [cornID, setCornID] = useState("");
  const [popCornBook, setPopCornBook] = useState([]);
  const calendars = useSelector((state) => state.calendars.calendars);
  const users = useSelector((state) => state.users.users);
  const popCorns = useSelector((state) => state.popCorn.popCorns);
  const handleBookPopCorn = (e) => {
    const cornTemp = e.target.value;
    console.log(cornTemp);
    setCornID(cornTemp);
    const exists = popCornBook.find((pop) => pop.popcorn_id === cornTemp);
    console.log(cornTemp);
    if(cornTemp===""){
      setPopCornBook([]);
      return;
    }
    console.log("my popcornbook: ",popCornBook);
    console.log("my popcorn: ",popCorns)
    console.log("exist popcorn",exists);
    if (exists===undefined) {
      console.log(popCorns);
      const bookedPopCorn = popCorns.find((pop) => pop.popcorn_id === cornTemp);
      console.log("after select",bookedPopCorn);
      setPopCornBook((old) => [...old, bookedPopCorn]);
    }
  };
  useEffect(() => {
    const fetchFilm = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/film/getAllNowFilm`
      );
      if (res.status === 200 && res.data.allNowFilm.length > 0) {
        setAllFilm((old) => [...old, ...res.data.allNowFilm]);
      }
    };
    const fetchUser = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/user/getAllUser`,{withCredentials: true}
      );
      if (res.status === 200 && res.data.allUser.length > 0) {
        dispatch(setUsers(res.data.allUser));
      }
    };
    const fetchPopCorn = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/popCorn/getAllPopCorn`
      );
      if (res.status === 200 && res.data.fixAllpopcorn.length > 0) {
        // console.log(res.data.fixAllPopCorn);
        dispatch(setPopCorn(res.data.fixAllpopcorn));
      }
    };
    fetchUser();
    fetchFilm();
    fetchPopCorn();
  }, []);
  useEffect(() => {
    const fetchCalendar = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/calendar/getAllCalendarFromASpecificFilm?film_id=${filmID}`
      );
      console.log(res);
      if (res.status === 200 && res.data.fixSpecificCalendar.length > 0) {
        dispatch(setCalendars(res.data.fixSpecificCalendar));
      }
    };
    console.log(filmID);
    if (filmID !== "") {
      dispatch(setCalendars([]));
      setTheater(null);
      setSeat([]);
      fetchCalendar();
    }else{
      dispatch(setCalendars([]));
      setTheater(null);
      setSeat([]);
    }
  }, [filmID]);
  useEffect(() => {
    if (calendarID !== "") {
      const selectedCalendar = calendars.find(
        (cal) => cal.calendar_id === calendarID
      );
      setTheater(selectedCalendar.theater);
      setSeat((old) => [...old, ...selectedCalendar.seat_calendar]);
      setSeatID(selectedCalendar.seat_calendar[0].seat.seat_id);
    }else{
      setTheater(null);
      setSeat([]);
      setSeatID("");
    }
  }, [calendarID]);
  const onCreate = () => {
    const object ={
      book_id: uuid(),
      customer_id: customerID,
      calendar_id: calendarID,
      seat_id: seatID,
      theater_id: theater.theater_id,
      time: getFormatDateNow(),
      popcorn: popCornBook.length===0?[]:popCornBook.map((pop) => ({
        popcorn_id: pop.popcorn_id,
        book_frequent: Number(numberPopCorn),
        total_price: Number(pop.price) * Number(numberPopCorn),
      })),
    }
    console.log(object);
    const res = axios.post(
      `${import.meta.env.VITE_SERVER_URL}/booking/createBooking`,object
      ,{withCredentials:true}
    );
    return res;
  };
  return (
    <>
      <ModelVerify
        isOpen={openModel}
        onCloseModal={() => {
          setOpenModel(false);
        }}
        onClose={()=>onClose()}
        onCreate={onCreate}
        setIsChange={setIsChange}
      />
      <div className="fixed inset-0 bg-black/55 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg w-[500px] max-h-[90vh] overflow-y-hidden">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Create New Booking</h2>
            <button
              className="cursor-pointer text-gray-500 hover:text-gray-700"
              onClick={onClose}
            >
              ✕
            </button>
          </div>
          <form
            className="flex w-full flex-col gap-2.5"
            onSubmit={(e) => {e.preventDefault();setOpenModel(true);}}
          >
            <div className="flex items-center gap-3 w-full">
              <label htmlFor="customer" className="text-xl w-[27%]">
                Chon Phim
              </label>
              <select
                id="customer"
                className="cursor-pointer w-full p-2 ring rounded-xs border-none outline-0 transition-all focus:ring-blue-600 focus:ring-3"
                value={filmID}
                onChange={(e) => setFilmID(e.target.value)}
              >
                <option value="">Select Film</option>
                {allFilm.length > 0 &&
                  allFilm.map((film) => (
                    <option value={film.film_id}>{film.film_name}</option>
                  ))}
                {/* Customers will be loaded from DB */}
              </select>
            </div>
            <div className="flex items-center gap-3 w-full">
              <label htmlFor="customer" className="text-xl w-[27%]">
                Customer
              </label>
              <select
                id="customer"
                className="cursor-pointer w-full p-2 ring rounded-xs border-none outline-0 transition-all focus:ring-blue-600 focus:ring-3"
                value={customerID}
                onChange={(e) => setCustomerID(e.target.value)}
              >
                <option value="">Select Customer</option>
                {users.length > 0 &&
                  users.map((user) => (
                    <option value={user.customer_id} key={user.customer_id}>{user.username}</option>
                  ))}
                {/* Customers will be loaded from DB */}
              </select>
            </div>
            <div className="flex items-center gap-3 w-full">
              <label htmlFor="calendar" className="text-xl w-[27%]">
                Showtime
              </label>
              <select
                id="calendar"
                className="cursor-pointer w-full p-2 ring rounded-xs border-none outline-0 transition-all focus:ring-blue-600 focus:ring-3"
                value={calendarID}
                onChange={(e) => setCalendarID(e.target.value)}
              >
                <option value="">Select Showtime</option>
                {/* Showtimes will be loaded from DB */}
                {calendars.length > 0 &&
                  calendars.map((calendar) => (
                    <option value={calendar.calendar_id}>
                      {calendar.showtime}
                    </option>
                  ))}
              </select>
            </div>
            <div className="flex items-center gap-3 w-full">
              <label htmlFor="theater" className="text-xl w-[27%]">
                Theater
              </label>
              <input
                type="text"
                id="theater"
                className="cursor-pointer w-full p-2 ring rounded-xs border-none outline-0 transition-all focus:ring-blue-600 focus:ring-3"
                value={theater!==null?theater.theater_name:""}
                placeholder="Chua chon lich chieu"
              />
            </div>
            <div className="flex items-center gap-3 w-full">
              <label htmlFor="seat" className="text-xl w-[27%]">
                Seat
              </label>
              <select
                id="seat"
                className="cursor-pointer w-full p-2 ring rounded-xs border-none outline-0 transition-all focus:ring-blue-600 focus:ring-3"
                value={seatID}
                onChange={(e) => setSeatID(e.target.value)}
              >
                {/* Seats will be loaded from DB */}
                {(seat !== undefined &&
                  seat.length > 0) ?
                  seat.map((s) => (
                    <option value={s.seat.seat_id}>
                      {
                        <>
                          {s.seat.seat_id} || {s.book_id} || {s.seat.price}
                        </>
                      }
                    </option>
                  )):<option value="">Select Seat</option>}
              </select>
            </div>
            <div className="flex items-center gap-3 w-full">
              <label htmlFor="popcorn" className="text-xl w-[27%]">
                Popcorn
              </label>
              <select
                id="popcorn"
                className="cursor-pointer w-full p-2 ring rounded-xs border-none outline-0 transition-all focus:ring-blue-600 focus:ring-3"
                value={cornID}
                onChange={handleBookPopCorn}
              >
                <option value="">Select Popcorn</option>
                {/* Popcorn options will be loaded from DB */}
                {popCorns.length > 0 &&
                  popCorns.map((popCorn) => (
                    <option value={popCorn.popcorn_id}>
                      {popCorn.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="flex items-center gap-3 w-full">
              <label htmlFor="popcorn" className="text-xl w-[27%]">
                So Luong
              </label>
              <input
                type="number"
                value={numberPopCorn}
                onChange={(e) => setNumberPopCorn(e.target.value)}
                readOnly={popCornBook.length===0}
              />
            </div>
            <input
              type="submit"
              value="Confirm Booking"
              className="p-4 cursor-pointer bg-amber-600 self-center text-xl text-white rounded-[10px]"
            />
          </form>
        </div>
      </div>
    </>
  );
}

export default ModalAddBooking;
