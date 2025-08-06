import React, { useEffect, useState } from "react";
import ImgTemp from "../../images/StephenChau.jpg";
import { FaAngleLeft, FaCirclePlay, FaFilm } from "react-icons/fa6";
import { FaClock } from "react-icons/fa6";
import { FaEarthAmericas } from "react-icons/fa6";
import { FaUserPlus } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import screen from "../../images/Screen.png";
import popcorn from "../../images/Popcorn.png";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
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
import NavigatePoster from "../../components/public/NavigatePoster.jsx";

function CalendarDetailPage() {
  //calendarId 3546a696-7859-493f-b7c6-fee46024ccca(customer_id) THEATER1B05(seat_id) THEATER1(theater_id)
  // [ { popCorn_id: 'bapnuoc2', book_frequent: 5, total_price: 1000000 } ](popCorn) yyyy-MM-dd HH:mm:ss (time)
  const [searchParams] = useSearchParams();
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const location = useLocation();
  const [film_id, setFilmId] = useState(location.pathname.split("/").at(-1));
  useEffect(() => {
    setFilmId(location.pathname.split("/").at(-1));
  }, [location]);
  const allCalendarTemp = useSelector(
    (state) => state.seatCalendar.seat_Calendar
  );
  const specificCalendars = useSelector(
    (state) => state.seatCalendar.specificCalendars
  );
  useEffect(() => {
    const handleWidth = () => setInnerWidth(window.innerWidth);
    window.addEventListener("resize", handleWidth);
    return () => window.removeEventListener("resize", handleWidth);
  }, []);
  const [current, setCurrent] = useState(0);
  const [bookedPopCorn, setBookedPopCorn] = useState([]);
  const allTheaterInCalendar = useSelector((state) => state.theater.theater);
  const allPopCorn = useSelector((state) => state.popCorn.popCorns);
  const dispatch = useDispatch();
  const [allCalendar, setAllCalendar] = useState([]);
  const [specificCalendar, setSpecificCalendar] = useState(null);
  const [selectDate, setSelectDate] = useState(null);
  const [calendarId, setCalendarId] = useState(null);
  const [film, setFilm] = useState(null);
  const [selectSeat, setSelectSeat] = useState(null);
  const [sum, setSum] = useState(0);
  const [isOpen, setOpen] = useState(false);
  const [isChange, setIsChange] = useState(false);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    if (searchParams.get("calendar_id") !== null) {
      setCalendarId(searchParams.get("calendar_id"));
    }
  }, []);

  const handleClickPopCorn = ({ popCorn, action }) => {
    switch (action) {
      case "+":
        const existsAdd = bookedPopCorn.find(
          (p) => p.popcorn_id === popCorn.popcorn_id
        );
        if (existsAdd !== undefined)
          setBookedPopCorn((prev) =>
            prev.map((p) =>
              p.popcorn_id === existsAdd.popcorn_id
                ? {
                    ...p,
                    book_frequent: p.book_frequent + 1,
                    total_price: (p.book_frequent + 1) * popCorn.price,
                  }
                : p
            )
          );
        else
          setBookedPopCorn((prev) => [
            ...prev,
            {
              popcorn_id: popCorn.popcorn_id,
              name: popCorn.name,
              book_frequent: 1,
              total_price: popCorn.price,
            },
          ]);
        break;
      case "-":
        const existsDel = bookedPopCorn.find(
          (p) => p.popcorn_id === popCorn.popcorn_id
        );
        if (existsDel !== undefined)
          if (Number(existsDel.book_frequent) === 1) {
            setBookedPopCorn((prev) => {
              if (prev.length === 1) {
                return [];
              }
              return prev.filter((p) => p.popcorn_id !== existsDel.popcorn_id);
            });
          } else {
            setBookedPopCorn((prev) =>
              prev.map((p) =>
                p.popcorn_id === existsDel.popcorn_id
                  ? {
                      ...p,
                      book_frequent: p.book_frequent - 1,
                      total_price: (p.book_frequent - 1) * popCorn.price,
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
    setSum(0);
    const fetchCalendar = async () => {
      const resFilm = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/film/getAFilm?film_id=${film_id}`
      );
      const resCalendar = await axios.get(
        `${
          import.meta.env.VITE_SERVER_URL
        }/calendar/getAllCalendarFromASpecificFilm?film_id=${film_id}`
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
        `${import.meta.env.VITE_SERVER_URL}/popCorn/getAllPopCorn`
      );
      if (res.status === 200 && res.data?.fixAllpopcorn?.length > 0) {
        dispatch(setPopCorn(res.data?.fixAllpopcorn));
      }
    };
    fetchCalendar();
    fetchPopCorn();
  }, [isChange, film_id]);
  useEffect(() => {
    if (calendarId !== null) {
      setSelectSeat(null); // restart select seat to null for current state of all seat
      setBookedPopCorn([]); // restart bookedpopcorn to [] for current state (user create a booking)
      const fetchCalendar = async () => {
        const resCalendar = await axios.get(
          `${
            import.meta.env.VITE_SERVER_URL
          }/calendar/getSpecificCalendar?calendar_id=${calendarId}`
        );
        if (resCalendar.status === 200) {
          setSpecificCalendar(resCalendar.data.specificCalendar);
        }
      };
      fetchCalendar();
    }
  }, [calendarId, isChange]);
  useEffect(() => {
    if (selectDate !== null) {
      // setSpecificCalendar(null);
      dispatch(setTheater(allCalendarTemp[selectDate]));
      setSeatCalendar(null);
    }
  }, [selectDate]);
  useEffect(() => {
    if (specificCalendars?.length > 0) {
      const temp = Object.entries(specificCalendars[0]);
      if (searchParams.get("calendar_id") !== null)
        setSelectDate(searchParams.get("calendar_id"));
      else setSelectDate(temp[1][1]);

      setSeatCalendar(null);
    }
  }, [specificCalendars]);
  console.log("bookedPopCorn: &&&&&&&&&&&&&&&&&&", ...bookedPopCorn);
  useEffect(() => {
    if (bookedPopCorn.length === 0) {
      setSum(0);
    }
    if (selectSeat !== null || bookedPopCorn.length > 0) {
      const sumPopCorn = bookedPopCorn?.reduce(
        (pre, cur) => (pre += cur.total_price),
        0
      );
      console.log("sumPopCorn: ^^^^^^^^^^^^^^^^^", sumPopCorn);
      const sumSeat = selectSeat !== null ? selectSeat.price : 0;
      setSum(sumPopCorn + sumSeat);
    }
  }, [selectSeat, bookedPopCorn]);
  console.log("selected Date: ", selectDate);
  console.log("sumL:::::::::::::::::::::::::::::", sum);
  console.log(allPopCorn);
  return (
    <>
      <ModalAddBookingPublic
        OnClose={() => setOpen(false)}
        isOpen={isOpen}
        setIsChange={() => setIsChange((prev) => !prev)}
        film_id={film_id}
        booking={{
          film: film?.film_name,
          calendar: {
            showtime: specificCalendar?.showtime,
            calendar_id: specificCalendar?.calendar_id,
          },
          seat: selectSeat,
          theater: specificCalendar?.theater,
          popCorn: bookedPopCorn,
          sum: sum,
        }}
      />
      <div className="w-full flex lg:flex-row flex-col gap-28 mb-10">
        {film !== null && (
          <>
            <div className="lg:w-[360px] lg:self-start self-center sm:w-[500px] w-full">
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
              <h1 className="font-bold md:text-3xl text-xl text-white mb-2 border-b border-white/30 pb-1">
                {film.film_name || `BIỆT ĐỘI SẤM SÉT* (T13) 2D`}
              </h1>
              <ul className="space-y-5 mb-3">
                <li className="flex items-center gap-2">
                  <FaFilm className="text-white text-2xl" />
                  <span className="text-white md:text-2xl text-[14px]">
                    {film.genres.map((g) => g.name).join(", ") ||
                      `Phiêu Lưu, Hành Động`}
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <FaClock className="text-white text-2xl" />
                  <span className="text-white md:text-2xl text-[14px]">
                    {" "}
                    {getVideoLength(film.runtime) || "100"}
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <FaEarthAmericas className="text-white text-2xl" />
                  <span className="text-white md:text-2xl text-[14px]">
                    {film.language_film.map((g) => g.english_name).join(", ") ||
                      `Khác`}
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <FaUserPlus className="text-white text-2xl" />
                  <span className="text-white md:text-2xl text-[14px]">
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
              <p className="text-white md:text-xl text-[14px]">
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
        <FaCirclePlay className="md:text-7xl text-4xl text-white" />
        <h3 className="md:text-2xl text-xl text-white">Xem Trailer</h3>
      </div>
      <div className="w-full flex flex-col space-y-4 items-center my-10">
        <h1 className="text-white uppercase font-bold md:text-3xl text-2xl text-center">
          lich chieu
        </h1>
        <div className="calendarList flex flex-wrap gap-3">
          {specificCalendars.length > 0 ? (
            <>
              {specificCalendars.map((t, index) => {
                const temp = Object.entries(t);
                const [key, value] = Object.entries(t)[0];
                return (
                  <div
                    key={index}
                    className={`${
                      selectDate === temp[1][1] ? "bg-white" : "bg-black"
                    } lg:py-2 lg:px-6 py-1 px-3 cursor-pointer `}
                    onClick={() => setSelectDate(temp[1][1])}
                  >
                    <h2
                      className={`${
                        selectDate === temp[1][1] ? "text-black" : "text-white"
                      } md:text-2xl text-xl text-center`}
                    >
                      {key}
                    </h2>
                    <h2
                      className={`${
                        selectDate === temp[1][1] ? "text-black" : "text-white"
                      } md:text-2xl text-xl text-center`}
                    >
                      {value}
                    </h2>
                  </div>
                );
              })}
            </>
          ) : (
            <>
              <div className="bg-gray-800 py-2 px-6 cursor-pointer">
                <h2 className="text-white text-2xl text-center">26/04</h2>
                <h2 className="text-white text-2xl text-center">Monday</h2>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="w-full mb-20">
        <h1 className="mb-3 text-white uppercase font-bold lg:text-3xl text-xl">
          danh sach rap
        </h1>
        <ul className="w-full bg-[#400C0C]">
          <li className="py-2 px-4 cursor-pointer w-full flex justify-end">
            <FaAngleRight className="text-white text-2xl rotate-90" />
          </li>
          {Object.entries(allTheaterInCalendar).length > 0 ? (
            Object.entries(allTheaterInCalendar).map((c, index) => (
              <>
                <li className="flex flex-col gap-5 py-2 px-4 mb-5" key={index}>
                  <h1 className="text-yellow-400 md:text-2xl text-xl font-bold">
                    {c[0]}
                  </h1>
                  <h2 className="text-white md:text-xl sm:text-[18px] text-[14px]">
                    Địa chỉ: Lorem ipsum dolor sit, amet consectetur adipisicing
                    elit. Magnam atque vitae expedita minus perferendis aliquam.
                    ({c[0]})
                  </h2>
                  <h1 className="text-white text-2xl font-bold">
                    {getFormatTheaterName(c[0]) === "VIP" ? "VIP" : "Standard"}
                  </h1>
                  <div className="flex gap-3 mb-4">
                    {c[1].map((t, index) => (
                      <>
                        <div
                          key={index}
                          className={`text-white text-xl border border-white/50 px-3 py-2 ${
                            calendarId === t.calendar_id ? "bg-black" : ""
                          } hover:bg-white/50 hover:text-black cursor-pointer`}
                          onClick={() => setCalendarId(t.calendar_id)}
                        >
                          {getFormatTime(t.showtime)}
                        </div>
                      </>
                    ))}
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
        <img src={screen} alt="" className="sm:w-full sm:h-full w-80 h-auto" />
        <div className="grid grid-cols-10 lg:gap-8 sm:gap-12 gap-7 w-fit relative">
          {specificCalendar === null ? (
            <>
              <h1 className="text-white text-2xl text-center w-full absolute left-[50%] translate-x-[-50%] top-0">
                Chon Lich Chieu De Chon Ghe
              </h1>
            </>
          ) : (
            <>
              {specificCalendar?.seat_calendar?.map((seat) => {
                const bgColor =
                  seat.seat.seat_id === selectSeat?.seat_id
                    ? "bg-amber-300"
                    : seat.available_seat
                    ? "bg-white text-black"
                    : "bg-gray-600 text-gray-800";
                return (
                  <div
                    key={seat.seat.seat_id}
                    className={` py-2 ${
                      seat.available_seat
                        ? "hover:bg-amber-300 cursor-pointer"
                        : "cursor-not-allowed"
                    }   transition-all sm:text-xl text-[10px] flex justify-center items-center sm:rounded-[10px] rounded-[6px] lg:w-12 lg:h-10 sm:w-12 sm:h-10 w-6 h-5 font-bold ${bgColor}`}
                    onClick={
                      seat.available_seat ? () => setSelectSeat(seat.seat) : ""
                    }
                  >
                    {seat.seat.seat_name}
                  </div>
                );
              })}
            </>
          )}
        </div>
        <div className="w-[60%] flex lg:flex-row flex-col justify-center lg:justify-between lg:items-center lg:gap-0 gap-3 mt-8">
          <div className="flex gap-3 items-center`">
            <div className="bg-white w-12 h-5 rounded-[4px]"></div>
            <h3 className="text-white sm:text-xl text-[12px] ">Ghe Thuong</h3>
          </div>
          <div className="flex gap-3 items-center`">
            <div className="bg-amber-300 w-12 h-5 rounded-[4px]"></div>
            <h3 className="text-white sm:text-xl text-[12px] ">Ghe Chon</h3>
          </div>
          <div className="flex gap-3 items-center`">
            <div className="bg-gray-600 w-12 h-5 rounded-[4px]"></div>
            <h3 className="text-white sm:text-xl text-[12px] ">Ghe Da Dat</h3>
          </div>
        </div>
      </div>

      <div className="my-20 mb-24 mx-auto lg:static relative">
        <h1 className="mb-10 text-white uppercase font-bold text-3xl text-center">
          chon bap nuoc
        </h1>
        <ul className="lg:w-full sm:w-[80%] w-full lg:mx-0 mx-auto flex lg:gap-7 gap-0 gap-y-20 overflow-x-hidden lg:justify-center">
          {allPopCorn.length > 0 ? (
            allPopCorn.map((p) => (
              <li
                className="flex lg:justify-normal justify-center gap-2 lg:min-w-fit min-w-full p-2 transition-all"
                key={p.popcorn_id}
                style={
                  innerWidth < 1024
                    ? { transform: `translateX(-${current * 100}%)` }
                    : undefined
                }
              >
                <img src={p.base64Image||popcorn} alt="" className="object-contain"/>
                <div className="flex flex-col justify-between">
                  <div>
                    <h2 className="text-2xl text-amber-300">{p.name}</h2>
                    <h2 className="text-white text-2xl">
                      {p.price.toLocaleString("vi-VN")}VND
                    </h2>
                  </div>
                  <div className="flex">
                    {bookedPopCorn.find(
                      (b) => b.popcorn_id === p.popcorn_id
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
                        (b) => b.popcorn_id === p.popcorn_id
                      ) !== undefined
                        ? bookedPopCorn.find(
                            (b) => b.popcorn_id === p.popcorn_id
                          ).book_frequent
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
              <li className="flex gap-2 lg:w-fit w-full">
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
        <FaAngleLeft
          className="lg:hidden block cursor-pointer absolute z-[1] top-[50%] md:left-0 -left-10 translate-y-[-50%] text-8xl text-amber-300"
          onClick={() =>
            setCurrent((prev) => {
              if (prev === 0) return allPopCorn.length - 1;
              return prev - 1;
            })
          }
        />
        <FaAngleRight
          className="lg:hidden block cursor-pointer absolute z-[1] top-[50%] md:right-0 -right-10 translate-y-[-50%] text-8xl text-amber-300"
          onClick={() =>
            setCurrent((prev) => {
              if (prev === allPopCorn.length - 1) return 0;
              return prev + 1;
            })
          }
        />
        <NavigatePoster
          className={`!-bottom-15`}
          current={current}
          setCurrent={setCurrent}
          lastestFilms={allPopCorn}
        />
      </div>

      <div className="flex lg:flex-row flex-col justify-between py-8 px-5 items-center lg:gap-0 gap-3 bg-gradient-to-r from-[#000000] to-[#400C0C]">
        <div className="space-y-5">
          <h1 className="text-white font-bold md:text-3xl text-xl text-center">
            {specificCalendar?.film.film_name}
          </h1>
          <h1 className="text-white font-bold md:text-2xl text-xl text-center">
            {specificCalendar?.theater.theater_name}
          </h1>
        </div>
        <div className="flex lg:justify-between gap-7 lg:w-[30%] w-full justify-center">
          <div className="sm:px-6 px-3 flex flex-col justify-center bg-amber-300 lg:space-y-1 space-y-0 rounded-[15px]">
            <p className="text-black font-bold">Thoi gian giu ve</p>
            <p className="text-black font-bold">{getFormatTime(new Date())}</p>
          </div>
          <div className="flex flex-col items-center justify-between gap-2">
            <div className="flex justify-between gap-3">
              <p className="text-white text-xl">Tam tinh</p>
              <p className="text-white font-bold text-xl">
                {sum.toLocaleString("vi-VN")} VND
              </p>
            </div>
            <button
              className="uppercase text-black bg-amber-300 text-center font-bold py-3 cursor-pointer w-full max-w-[200px]"
              onClick={() => setOpen(true)}
            >
              dat ve
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CalendarDetailPage;
