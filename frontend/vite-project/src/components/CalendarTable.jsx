import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCalendars } from "../slices/calendarsSlice";
import { useNavigate } from "react-router-dom";

const CalendarTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const getCalendars = async () => {
      const res = await axios.get(
        `http://localhost:8000/api/v1/calendar/getAllCalendar`
      );
      dispatch(setCalendars(res.data.allCalendar));
    };
    getCalendars();
  }, []);
  const calendars = useSelector((state) => state.calendars.calendars);
  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-800 text-amber-500">
              <th className="px-6 py-3 border-b text-left">Calendar ID</th>
              <th className="px-6 py-3 border-b text-left">Film Name</th>
              <th className="px-6 py-3 border-b text-left">Show Time</th>
              <th className="px-6 py-3 border-b text-center">Total Seat</th>
              <th className="px-6 py-3 border-b text-center">Available Seat</th>
            </tr>
          </thead>
          <tbody>
            {calendars.length > 0 &&
              calendars.map((calendar, i) => (
                <tr
                  onClick={() => navigate(`/Calendar/${calendar.calendar_id}`)}
                  key={calendar.calendar_id}
                  className={`cursor-pointer transition-all ${
                    (i + 1) % 2 === 0 ? "bg-gray-700" : "bg-gray-800"
                  } text-white hover:bg-amber-500 hover:text-black`}
                >
                  <td className="px-6 py-4 border-b">{calendar.calendar_id}</td>
                  <td className="px-6 py-4 border-b">
                    {calendar.film.film_name}
                  </td>
                  {
                    //TODO: Fix showtime format
                  }
                  <td className="px-6 py-4 border-b">{calendar.showtime}</td>
                  <td className={`px-6 py-4 border-b text-center ${calendar.total_seat<calendar.available_seat?"text-green-500":"text-red-500"}`}>{calendar.total_seat}</td>
                  <td className="px-6 py-4 border-b text-center">
                    {calendar.available_seat}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CalendarTable;
