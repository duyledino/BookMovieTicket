import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCalendars } from "../slices/calendarsSlice";
import { useNavigate } from "react-router-dom";
import ModalAddCalendar from "./ModalAddCalendar";
import ModelDel from "./ModelDel";
import {fixFormatDateRespone} from '../utils/getFormatDateNow.js'
import { addToast } from "../slices/toastSlice.js";

const CalendarTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isDelOpen, setIsDelOpen] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const [isClick, setIsClick] = useState(undefined);
  const [calendars,setCalendars] = useState([]);
  
  useEffect(() => {
    const getCalendars = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/calendar/getAllCalendar`,{withCredentials:true}
      );
      if(res.status===203){
        dispatch(addToast({message: res.data.Message,type: "failed"}));
        localStorage.removeItem("user");
        navigate("/404NotFound");
      }
      dispatch(setCalendars(res.data.allCalendar));
    };
    getCalendars();
  }, [isChange]);
  console.log(calendars);
  const onDelete = async (enetityID) => {
    const res = await axios.delete(
      `${import.meta.env.VITE_SERVER_URL}/calendar/deleteACalendar/${enetityID}`,{withCredentials: true}
    );
    return res;
  };
  const handleClick = (calendarId) => {
    if (isClick !== undefined) {
      if (isClick === calendarId) setIsClick(undefined);
      else setIsClick(calendarId);
      return;
    }
    setIsClick(calendarId);
  };

  return (
    <>
      <ModalAddCalendar
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        setIsChange={setIsChange}
      />
      <ModelDel
        isOpen={isDelOpen}
        onClose={() => setIsDelOpen(false)}
        entityID={isClick}
        onDelete={onDelete}
        setIsChange={() => setIsChange((old) => !old)}
      />
      <div className="overflow-x-auto">
        <div className="min-w-full flex justify-end mb-6 gap-4">
          <button
            className="p-3 bg-amber-500 rounded-[10px] cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            Them Lich Chieu
          </button>
          <button
            className="p-3 bg-amber-500 rounded-[10px] cursor-pointer"
            onClick={() => setIsDelOpen(true)}
          >
            Xoa Lich Chieu
          </button>
        </div>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-800 text-amber-500">
              <th className="px-6 py-3 border-b text-left">Calendar ID</th>
              <th className="px-6 py-3 border-b text-left">Film Name</th>
              <th className="px-6 py-3 border-b text-left">Show Time</th>
              <th className="px-6 py-3 border-b text-center">Theater</th>
              <th className="px-6 py-3 border-b text-center">Total Seat</th>
              <th className="px-6 py-3 border-b text-center">Available Seat</th>
            </tr>
          </thead>
          <tbody>
            {calendars.length > 0 &&
              calendars.map((calendar, i) => (
                <>
                  <tr
                    onDoubleClick={() =>
                      navigate(`/admin/Calendar/${calendar.calendar_id}`)
                    }
                    onClick={() => handleClick(calendar.calendar_id)}
                    key={calendar.calendar_id}
                    className={`cursor-pointer text-white transition-all ${
                      isClick === calendar.calendar_id
                        ? "bg-amber-500"
                        : (i + 1) % 2 === 0
                        ? "bg-gray-700"
                        : "bg-gray-800"
                    }  hover:bg-amber-500 hover:text-black `}
                  >
                    <td className="px-6 py-4 border-b">
                      {calendar.calendar_id}
                    </td>
                    <td className="px-6 py-4 border-b">
                      {calendar.film.film_name}
                    </td>
                    {
                      //TODO: Fix showtime format
                    }
                    <td className="px-6 py-4 border-b">{fixFormatDateRespone(calendar.showtime)}</td>
                    <td className="px-6 py-4 border-b">{calendar.theater.theater_name}</td>
                    <td
                      className={`px-6 py-4 border-b text-center ${
                        calendar.total_seat < calendar.available_seat
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {calendar.total_seat}
                    </td>
                    <td className="px-6 py-4 border-b text-center">
                      {calendar.available_seat}
                    </td>
                  </tr>
                </>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CalendarTable;
