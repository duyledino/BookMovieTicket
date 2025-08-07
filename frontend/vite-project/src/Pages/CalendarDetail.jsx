import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import tempImg from "../images/Film-photo-via-Canva-Pro.png";
import { fixFormatDateRespone } from "../utils/getFormatDateNow";
import Loading from "../components/Loading";

const CalendarDetail = () => {
  const [loading, setLoading] = useState(false);
  const { calendarId } = useParams();
  const [calendar, setCalendar] = useState(null);
  useEffect(() => {
    const getCalendarDetail = async () => {
      setLoading(true);
      const res = await axios.get(
        `${
          import.meta.env.VITE_SERVER_URL
        }/calendar/getSpecificCalendar?calendar_id=${calendarId}`
      );
      if (res.status === 200) {
        setCalendar(res.data.specificCalendar);
        setLoading(false);
      }
    };
    getCalendarDetail();
  }, []);
  return (
    <>
      {loading ? <Loading /> : ""}
      {calendar !== null ? (
        <>
          <div className="container m-auto overflow-y-auto">
            <div className="w-full p-6">
              <h1 className="text-left mb-6 text-3xl text-white">
                {" "}
                <span className="text-yellow-500 font-bold text-3xl uppercase mr-1">
                  calendar_id:{" "}
                </span>{" "}
                {calendar.calendar_id}
              </h1>
              <div className="flex gap-7">
                <div className="leftSection w-[35%]">
                  <img
                    src={
                      "https://image.tmdb.org/t/p/w500" +
                      calendar.film.poster_path
                    }
                    alt="Film title"
                    className="poster w-full aspect-[3/4] object-cover"
                  />
                </div>
                <div className="rightSection flex flex-col  w-[65%]">
                  <h1 className=" mb-6 text-3xl text-white">
                    {" "}
                    <span className="text-yellow-500 font-bold text-3xl uppercase mr-1">
                      Film id:{" "}
                    </span>
                    {calendar.film.film_id}
                  </h1>
                  <h1 className=" mb-6 text-3xl text-white">
                    {" "}
                    <span className="text-yellow-500 font-bold text-3xl uppercase mr-1">
                      Film name:{" "}
                    </span>
                    {calendar.film.film_name}
                  </h1>
                  <h1 className=" mb-6 text-3xl text-white">
                    {" "}
                    <span className="text-yellow-500 font-bold text-3xl uppercase mr-1">
                      Show time:{" "}
                    </span>
                    {fixFormatDateRespone(calendar.showtime)}
                  </h1>
                </div>
              </div>
              <div className="w-full flex flex-col gap-y-20 items-center mt-14">
                <div className="screen w-full h-[20rem] ring-1 ring-amber-400 flex justify-center items-center text-7xl uppercase text-white">
                  screen
                </div>
                <div className="theater-map grid grid-cols-10 gap-3 w-[55%]">
                  {calendar.seat_calendar.map((s) => (
                    <div
                      key={s.seat.seat_name}
                      className={`w-14 h-14 cursor-pointer ring-1 ring-amber-400 flex justify-center items-center ${
                        s.available_seat ? "bg-black" : "bg-amber-400"
                      } text-white font-bold`}
                    >
                      {s.seat.seat_name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center text-white text-4xl font-bold">
          Calendar not found
        </div>
      )}
    </>
  );
};

export default CalendarDetail;
