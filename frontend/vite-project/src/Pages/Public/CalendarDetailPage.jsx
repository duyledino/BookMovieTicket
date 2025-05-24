import React, { useEffect, useState } from "react";
import ImgTemp from "../../images/StephenChau.jpg";
import { FaCirclePlay, FaFilm } from "react-icons/fa6";
import { FaClock } from "react-icons/fa6";
import { FaEarthAmericas } from "react-icons/fa6";
import { FaUserPlus } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import screen from "../../images/Screen.png";
import popcorn from "../../images/Popcorn.png";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { getVideoLength } from "../../utils/getVideoLength.js";
import { getDateRespone, getFormatTime } from "../../utils/getFormatDateNow.js";
import { getFormatTheaterName } from "../../utils/getFormatTheater.js";
import { useDispatch, useSelector } from "react-redux";
import {
  setCalendarDetail,
  setSeatCalendar,
} from "../../slices/seatCalendarSlice.js";
import { setTheater } from "../../slices/theaterSlice.js";
import { setPopCorn } from "../../slices/popcornSlice.js";
import ModalAddBookingPublic from "../../components/public/ModalAddBookingPublic.jsx";
import { DateTime } from "luxon";

function CalendarDetailPage() {
  //calendarId 3546a696-7859-493f-b7c6-fee46024ccca(customer_id) THEATER1B05(seat_id) THEATER1(theater_id)
  // [ { popCorn_id: 'bapnuoc2', bookFrequent: 5, total_price: 1000000 } ](popCorn) yyyy-MM-dd HH:mm:ss (time)
  const location = useLocation();
  const film_id = location.pathname.split("/").at(-1);
  const allCalendarTemp = useSelector(
    (state) => state.seatCalendar.seat_Calendar
  );
  const specificCalendars = useSelector(
    (state) => state.seatCalendar.specificCalendars
  );
  const [bookedPopCorn, setBookedPopCorn] = useState([]);
  const allTheaterInCalendar = useSelector((state) => state.theater.theater);
  const allPopCorn = useSelector((state) => state.popCorn.popCorns);
  const dispatch = useDispatch();
  const [allCalendar, setAllCalendar] = useState([]);
  // const [clickPopCorn,setClickPopCorn] = useState(null);
  const [specificCalendar, setSpecificCalendar] = useState(null);
  const [selectDate, setSelectDate] = useState(null);
  const [calendarId, setCalendarId] = useState(null);
  const [film, setFilm] = useState(null);
  const [selectSeat, setSelectSeat] = useState(null);
  const [sum, setSum] = useState(0);
  console.log(film_id);
  const [isOpen, setOpen] = useState(false);
  const [isChange, setIsChange] = useState(false);
  useEffect(()=>{
    window.scrollTo({
      top:0,
      behavior: "smooth"
    })
  },[])
  const handleClickPopCorn = ({ popCorn, action }) => {
    switch (action) {
      case "+":
        const existsAdd = bookedPopCorn.find(
          (p) => p.popCorn_id === popCorn.popCorn_id
        );
        if (existsAdd !== undefined)
          setBookedPopCorn((prev) =>
            prev.map((p) =>
              p.popCorn_id === existsAdd.popCorn_id
                ? {
                    ...p,
                    bookFrequent: p.bookFrequent + 1,
                    total_price: (p.bookFrequent + 1) * popCorn.price,
                  }
                : p
            )
          );
        else
          setBookedPopCorn((prev) => [
            ...prev,
            {
              popCorn_id: popCorn.popCorn_id,
              bookFrequent: 1,
              total_price: popCorn.price,
            },
          ]);
        break;
      case "-":
        const existsDel = bookedPopCorn.find(
          (p) => p.popCorn_id === popCorn.popCorn_id
        );
        if (existsDel !== undefined)
          if (Number(existsDel.bookFrequent) === 1) {
            setBookedPopCorn((prev) =>
              prev.filter((p) => p.popCorn_id !== existsDel.popCorn_id)
            );
          } else {
            setBookedPopCorn((prev) =>
              prev.map((p) =>
                p.popCorn_id === existsDel.popCorn_id
                  ? {
                      ...p,
                      bookFrequent: p.bookFrequent - 1,
                      total_price: (p.bookFrequent + 1) * popCorn.price,
                    }
                  : p
              )
            );
          }
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    const fetchCalendar = async () => {
      const resFilm = await axios.get(
        `https://bookmovieticket.onrender.com/api/v1/film/getAFilm?film_id=${film_id}`
      );
      const resCalendar = await axios.get(
        `https://bookmovieticket.onrender.com/api/v1/calendar/getAllCalendarFromASpecificFilm?film_id=${film_id}`
      );
      if (resCalendar.status === 200 && resFilm.status === 200) {
        dispatch(setSeatCalendar(resCalendar.data.fixSpecificCalendar));
        dispatch(setCalendarDetail(resCalendar.data.fixSpecificCalendar));
        setAllCalendar(resCalendar.data.fixSpecificCalendar);

        setFilm(resFilm.data.film);
      }
    };
    const fetchPopCorn = async () => {
      const res = await axios.get(
        `https://bookmovieticket.onrender.com/api/v1/popCorn/getAllPopCorn`
      );
      if (res.status === 200 && res.data.fixAllPopCorn.length > 0) {
        dispatch(setPopCorn(res.data.fixAllPopCorn));
      }
    };
    fetchCalendar();
    fetchPopCorn();
  }, [isChange]);
  console.log(isChange);
  useEffect(() => {
    if (calendarId !== null) {
      const fetchCalendar = async () => {
        const resCalendar = await axios.get(
          `https://bookmovieticket.onrender.com/api/v1/calendar/getSpecificCalendar?calendar_id=${calendarId}`
        );
        if (resCalendar.status === 200) {
          setSpecificCalendar(resCalendar.data.specificCalendar);
        }
      };
      fetchCalendar();
    }
  }, [calendarId]);
  // console.log(allCalendarTemp["11 / 5"]);
  // console.log(selectDate);
  // console.log(allTheaterInCalendar);
  // Object.entries(specificCalendars).forEach((t) => {
  //   console.log(t[0]);
  // });
  // console.log(Object.entries(allTheaterInCalendar)[0][1]);
  useEffect(() => {
    if (selectDate !== null) {
      dispatch(setTheater(allCalendarTemp[selectDate]));
    }
  }, [selectDate]);
  useEffect(() => {
    if (Object.entries(specificCalendars).length > 0) {
      setSelectDate(Object.entries(specificCalendars)[0][0]);
    }
  }, [specificCalendars]);
  useEffect(() => {
    if (selectSeat !== null || bookedPopCorn.length > 0) {
      console.log(bookedPopCorn);
      console.log(selectSeat);
      const sumPopCorn = bookedPopCorn?.reduce(
        (pre, cur) => (pre += cur.total_price),
        0
      );
      const sumSeat = selectSeat!==null ? selectSeat.price : 0;
      console.log(sumPopCorn, sumSeat);
      setSum(sumPopCorn + sumSeat);
    }
  }, [selectSeat, bookedPopCorn]);
  console.log(specificCalendar);
  return (
    <>
      <ModalAddBookingPublic
        OnClose={() => setOpen(false)}
        isOpen={isOpen}
        setIsChange={() => setIsChange((prev) => !prev)}
        film_id={film_id}
        booking={{
          film: film?.film_name,
          calendar: {showtime: specificCalendar?.showtime,calendar_id: specificCalendar?.calendar_id},
          seat: selectSeat,
          theater: specificCalendar?.Theater,
          popCorn : bookedPopCorn,
          sum: sum
        }}
      />
      <div className="w-full flex flex-row gap-28 mb-10">
        {film !== null && (
          <>
            <div className="w-[360px]">
              <img
                alt="Thunderbolts movie poster featuring a group of six characters in dark costumes standing in a smoky background"
                className="w-full h-auto object-cover"
                src={
                  `https://image.tmdb.org/t/p/w500${film.poster_path}` ||
                  tempImg
                }
              />
            </div>
            <div className="flex-1 text-[14px] leading-relaxed">
              <h1 className="font-bold text-3xl text-white mb-2 border-b border-white/30 pb-1">
                {film.film_name || `BIỆT ĐỘI SẤM SÉT* (T13) 2D`}
              </h1>
              <ul className="space-y-5 mb-3">
                <li className="flex items-center gap-2">
                  <FaFilm className="text-white text-2xl" />
                  <span className="text-white text-2xl">
                    {film.genres.map((g) => g.name).join(", ") ||
                      `Phiêu Lưu, Hành Động`}
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <FaClock className="text-white text-2xl" />
                  <span className="text-white text-2xl">
                    {" "}
                    {getVideoLength(film.runtime) || "100"}
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <FaEarthAmericas className="text-white text-2xl" />
                  <span className="text-white text-2xl">
                    {film.language_film.map((g) => g.english_name).join(", ") ||
                      `Khác`}
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <FaUserPlus className="text-white text-2xl" />
                  <span className="text-white text-2xl">
                    <b>T{film.adult ? `18` : `13`}: </b>
                    Phim dành cho khán giả từ đủ{" "}
                    {film.adult
                      ? `18 tuổi trở lên (18+)`
                      : `13 tuổi trở lên (13+)`}
                  </span>
                </li>
              </ul>

              <h1 className="mb-3 text-white uppercase font-bold text-3xl">
                Noi Dung Phim
              </h1>
              <p className="text-white text-xl">
                {film.overview ||
                  `Bộ đôi Tiến Luật và Ngọc Kiên Huy, vị nghệ sĩ “độc lạ” hứa hẹn
                sẽ lái xe cứu thương, họ mang đến những tình huống trớ trêu
                không cho khán giả qua hành trình tìm xác đầu tiên của điện ảnh
                Việt. Như cơ sự của cuộc đời, lẽ không chỉ diễn biến quanh nhân
                vật chính mà thường xuyên làm khán giả cảm thấy “đau khổ đối
                diện” trước những tình huống “khó nhằn” hay gãy gánh phim...`}
              </p>
            </div>
          </>
        )}
      </div>
      <div className="w-full max-w-fit mx-auto mb-6 gap-3 flex items-center justify-between">
        <FaCirclePlay className="text-7xl text-white" />
        <h3 className="text-2xl text-white">Xem Trailer</h3>
      </div>
      <div className="w-full flex flex-col space-y-4 items-center my-10">
        <h1 className="text-white uppercase font-bold text-3xl text-center">
          lich chieu
        </h1>
        <div className="calendarList flex gap-3">
          {Object.entries(specificCalendars).length > 0 ? (
            <>
              {Object.entries(specificCalendars).map((t) => (
                <div
                  className={`${
                    selectDate === t[0] ? "bg-white" : "bg-black"
                  } py-2 px-6 cursor-pointer `}
                  onClick={() => setSelectDate(t[0])}
                >
                  <h2
                    className={`${
                      selectDate === t[0] ? "text-black" : "text-white"
                    } text-2xl text-center`}
                  >
                    {t[0]}
                  </h2>
                  <h2
                    className={`${
                      selectDate === t[0] ? "text-black" : "text-white"
                    } text-2xl text-center`}
                  >
                    {t[1]}
                  </h2>
                </div>
              ))}
            </>
          ) : (
            <>
              <div className="bg-gray-800 py-2 px-6 cursor-pointer">
                <h2 className="text-white text-2xl text-center">26/04</h2>
                <h2 className="text-white text-2xl text-center">Monday</h2>
              </div>
            </>
          )}
          {/* {allCalendar ? (
            <>
              {allCalendar.map((c) => (
                <div
                  className="bg-gray-800 py-2 px-6 cursor-pointer"
                  key={c.calendar_id}
                >
                  <h2 className="text-white text-2xl text-center">
                    {getDateRespone(c.showtime)[0]}
                  </h2>
                  <h2 className="text-white text-2xl text-center">
                    {getDateRespone(c.showtime)[1]}
                  </h2>
                </div>
              ))}
            </>
          ) : (
            <>
              <div className="bg-gray-800 py-2 px-6 cursor-pointer">
                <h2 className="text-white text-2xl text-center">26/04</h2>
                <h2 className="text-white text-2xl text-center">Monday</h2>
              </div>
            </>
          )} */}
        </div>
      </div>
      <div className="w-full mb-20">
        <h1 className="mb-3 text-white uppercase font-bold text-3xl">
          danh sach rap
        </h1>
        <ul className="w-full bg-[#400C0C]">
          <li className="py-2 px-4 cursor-pointer w-full flex justify-end">
            <FaAngleRight className="text-white text-2xl rotate-90" />
          </li>
          {Object.entries(allTheaterInCalendar).length > 0 ? (
            Object.entries(allTheaterInCalendar).map((c) => (
              <>
                <li className="flex flex-col gap-5 py-2 px-4 mb-5">
                  <h1 className="text-yellow-400 text-2xl font-bold">{c[0]}</h1>
                  <h2 className="text-white text-xl">
                    Địa chỉ: Lorem ipsum dolor sit, amet consectetur adipisicing
                    elit. Magnam atque vitae expedita minus perferendis aliquam.
                    ({c[0]})
                  </h2>
                  <h1 className="text-white text-2xl font-bold">
                    {getFormatTheaterName(c[0]) === "VIP" ? "VIP" : "Standard"}
                  </h1>
                  <div className="flex gap-3 mb-4">
                    {c[1].map((t) => (
                      <>
                        <div
                          className={`text-white text-xl border border-white/50 px-3 py-2 ${
                            calendarId === t.calendar_id ? "bg-black" : ""
                          } hover:bg-white/50 hover:text-black cursor-pointer`}
                          onClick={() => setCalendarId(t.calendar_id)}
                        >
                          {getFormatTime(t.showtime)}
                        </div>
                      </>
                    ))}

                    {/* <div className="text-white text-xl border border-white/50 px-3 py-2 hover:bg-white/50 hover:text-black cursor-pointer">
                    18:15
                  </div>
                  <div className="text-white text-xl border border-white/50 px-3 py-2 hover:bg-white/50 hover:text-black cursor-pointer">
                    20:45
                  </div> */}
                  </div>
                </li>
              </>
            ))
          ) : (
            <>
              <li className="py-2 px-4 cursor-pointer w-full flex justify-end">
                <FaAngleRight className="text-white text-2xl rotate-90" />
              </li>
              <li className="flex flex-col gap-5 py-2 px-4 mb-">
                <h1 className="text-yellow-400 text-2xl font-bold">Rap 1</h1>
                <h2 className="text-white text-xl">
                  Địa chỉ: Lorem ipsum dolor sit, amet consectetur adipisicing
                  elit. Magnam atque vitae expedita minus perferendis aliquam.
                </h2>
                <h1 className="text-white text-2xl font-bold">Standard</h1>
                <div className="flex gap-3 mb-4">
                  <div className="text-white text-xl border border-white/50 px-3 py-2 hover:bg-white/50 hover:text-black cursor-pointer">
                    15:45
                  </div>
                  <div className="text-white text-xl border border-white/50 px-3 py-2 hover:bg-white/50 hover:text-black cursor-pointer">
                    18:15
                  </div>
                  <div className="text-white text-xl border border-white/50 px-3 py-2 hover:bg-white/50 hover:text-black cursor-pointer">
                    20:45
                  </div>
                </div>
              </li>
              <li className="flex flex-col gap-5 py-2 px-4">
                <h1 className="text-yellow-400 text-2xl font-bold">Rap 1</h1>
                <h2 className="text-white text-xl">
                  Địa chỉ: Lorem ipsum dolor sit, amet consectetur adipisicing
                  elit. Magnam atque vitae expedita minus perferendis aliquam.
                </h2>
                <h1 className="text-white text-2xl font-bold">Standard</h1>
                <div className="flex gap-3 mb-4">
                  <div className="text-white text-xl border border-white/50 px-3 py-2 hover:bg-white/50 hover:text-black cursor-pointer">
                    15:45
                  </div>
                  <div className="text-white text-xl border border-white/50 px-3 py-2 hover:bg-white/50 hover:text-black cursor-pointer">
                    18:15
                  </div>
                  <div className="text-white text-xl border border-white/50 px-3 py-2 hover:bg-white/50 hover:text-black cursor-pointer">
                    20:45
                  </div>
                </div>
              </li>
            </>
          )}
        </ul>
      </div>

      <div className="theaterMap w-full flex flex-col items-center mb-24 space-y-8 ">
        <h1 className="mb-3 text-white uppercase font-bold text-3xl">
          Chon ghe
        </h1>
        <img src={screen} alt="" />
        <div className="grid grid-cols-10 gap-5 w-[50%] relative">
          {specificCalendar !== null ? (
            <>
              {specificCalendar.seat_Calendar.map((seat) => {
                console.log(seat);
                const bgColor =
                  seat.seat.seat_id === selectSeat?.seat_id
                    ? "bg-amber-300"
                    : seat.available_Seat
                    ? "bg-white text-black"
                    : "bg-gray-600 text-gray-800";
                return (
                  <div
                    key={seat.seat.seat_id}
                    className={` py-2 cursor-pointer hover:bg-amber-300  transition-all  flex justify-center items-center rounded-[10px] font-bold ${bgColor}`}
                    onClick={() => setSelectSeat(seat.seat)}
                  >
                    {seat.seat.seat_name}
                  </div>
                );
              })}
            </>
          ) : (
            <h1 className="text-white text-2xl w-fit absolute left-[50%] translate-x-[-50%] top-0">
              Chon Lich Chieu De Chon Ghe
            </h1>
          )}
        </div>
        <div className="w-[60%] flex justify-between items-center mt-8">
          <div className="flex gap-3 items-center`">
            <div className="bg-white w-12 h-5 rounded-[4px]"></div>
            <h3 className="text-white text-xl ">Ghe Thuong</h3>
          </div>
          <div className="flex gap-3 items-center`">
            <div className="bg-amber-300 w-12 h-5 rounded-[4px]"></div>
            <h3 className="text-white text-xl ">Ghe Chon</h3>
          </div>
          <div className="flex gap-3 items-center`">
            <div className="bg-gray-600 w-12 h-5 rounded-[4px]"></div>
            <h3 className="text-white text-xl ">Ghe Da Dat</h3>
          </div>
        </div>
      </div>

      <div className="w-[80%] my-20 mb-24 mx-auto">
        <h1 className="mb-10 text-white uppercase font-bold text-3xl text-center">
          chon bap nuoc
        </h1>
        <ul className="flex gap-7 gap-y-20 flex-wrap justify-center">
          {allPopCorn.length > 0 ? (
            allPopCorn.map((p) => (
              <li className="flex gap-2" key={p.popCorn_id}>
                <img src={popcorn} alt="" />
                <div className="flex flex-col justify-between">
                  <div>
                    <h2 className="text-2xl text-amber-300">{p.name}</h2>
                    <h2 className="text-white text-2xl">{p.price}VND</h2>
                  </div>
                  <div className="flex">
                    {bookedPopCorn.find(
                      (b) => b.popCorn_id === p.popCorn_id
                    ) === undefined ? (
                      ""
                    ) : (
                      <>
                        <button
                          className="bg-amber-300 py-1 px-2 text-2xl font-bold cursor-pointer"
                          onClick={() =>
                            handleClickPopCorn({ popCorn: p, action: "-" })
                          }
                        >
                          {" "}
                          -{" "}
                        </button>
                      </>
                    )}
                    <div className="bg-amber-300 py-1 px-2 text-2xl font-bold">
                      {bookedPopCorn.length > 0 &&
                      bookedPopCorn.find(
                        (b) => b.popCorn_id === p.popCorn_id
                      ) !== undefined
                        ? bookedPopCorn.find(
                            (b) => b.popCorn_id === p.popCorn_id
                          ).bookFrequent
                        : 0}
                    </div>
                    <button
                      className="bg-amber-300 py-1 px-2 text-2xl font-bold cursor-pointer"
                      onClick={() =>
                        handleClickPopCorn({ popCorn: p, action: "+" })
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <>
              <li className="flex gap-2">
                <img src={popcorn} alt="" />
                <div className="flex flex-col justify-between">
                  <div>
                    <h2 className="text-2xl text-amber-300">PopCorn Name</h2>
                    <h2 className="text-white text-2xl">35000VND</h2>
                  </div>
                  <div className="flex">
                    <button className="bg-amber-300 py-1 px-2 text-2xl font-bold cursor-pointer">
                      -
                    </button>
                    <div className="bg-amber-300 py-1 px-2 text-2xl font-bold">
                      0
                    </div>
                    <button className="bg-amber-300 py-1 px-2 text-2xl font-bold cursor-pointer">
                      +
                    </button>
                  </div>
                </div>
              </li>
              <li className="flex gap-2">
                <img src={popcorn} alt="" />
                <div className="flex flex-col justify-between">
                  <div>
                    <h2 className="text-2xl text-amber-300">PopCorn Name</h2>
                    <h2 className="text-white text-2xl">35000VND</h2>
                  </div>
                  <div className="flex">
                    <button className="bg-amber-300 py-1 px-2 text-2xl font-bold cursor-pointer">
                      -
                    </button>
                    <div className="bg-amber-300 py-1 px-2 text-2xl font-bold">
                      0
                    </div>
                    <button className="bg-amber-300 py-1 px-2 text-2xl font-bold cursor-pointer">
                      +
                    </button>
                  </div>
                </div>
              </li>
              <li className="flex gap-2">
                <img src={popcorn} alt="" />
                <div className="flex flex-col justify-between">
                  <div>
                    <h2 className="text-2xl text-amber-300">PopCorn Name</h2>
                    <h2 className="text-white text-2xl">35000VND</h2>
                  </div>
                  <div className="flex">
                    <button className="bg-amber-300 py-1 px-2 text-2xl font-bold cursor-pointer">
                      -
                    </button>
                    <div className="bg-amber-300 py-1 px-2 text-2xl font-bold">
                      0
                    </div>
                    <button className="bg-amber-300 py-1 px-2 text-2xl font-bold cursor-pointer">
                      +
                    </button>
                  </div>
                </div>
              </li>
            </>
          )}
        </ul>
      </div>

      <div className="flex justify-between py-8 px-5 items-center bg-gradient-to-r from-[#000000] to-[#400C0C]">
        <div className="space-y-5">
          <h1 className="text-white font-bold text-3xl text-center">
            {specificCalendar?.film.film_name}
          </h1>
          <h1 className="text-white font-bold text-2xl text-center">
            {specificCalendar?.Theater.theater_name}
          </h1>
        </div>
        <div className="flex justify-between gap-7 w-[30%]">
          <div className="px-6 flex flex-col justify-center bg-amber-300 space-y-1 rounded-[15px]">
            <p className="text-black font-bold">Thoi gian giu ve</p>
            <p className="text-black font-bold">{getFormatTime(new Date())}</p>
          </div>
          <div className="flex flex-col items-center justify-between gap-2">
            <div className="flex justify-between gap-3">
              <p className="text-white text-xl">Tam tinh</p>
              <p className="text-white font-bold text-xl">{sum} VND</p>
            </div>
            <button className="uppercase text-black bg-amber-300 text-center font-bold py-3 cursor-pointer w-full max-w-[200px]" onClick={()=>setOpen(true)}>
              dat ve
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CalendarDetailPage;
