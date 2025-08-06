import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa6";
import { fixFormatDateRespone } from "../utils/getFormatDateNow.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToast } from "../slices/toastSlice.js";

const BookingSpecificCalendar = () => {
  const [calendars, setCalendars] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [isActiveCalendarId, setIsActiveCalendarId] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const checkExistsCalendarId = (calendar_id) => {
    console.log(calendar_id, isActiveCalendarId.length);
    const exists = isActiveCalendarId.some(
      (calendarId) => calendarId === calendar_id
    );
    console.log(exists);
    return exists;
  };
  const handleClick = async (calendar_id) => {
    const exists = checkExistsCalendarId(calendar_id);

    setIsActiveCalendarId(
      exists
        ? isActiveCalendarId.filter((calendarId) => calendarId !== calendar_id)
        : [...isActiveCalendarId, calendar_id]
    );
    if (exists) {
      return;
    }
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/booking/getAllBookOfSpecificCalendar/${calendar_id}`,
        { withCredentials: true }
      );
      console.log(res);
      if (res.status === 200) {
        setBookings([...bookings, res.data.allBookingOfExistCalendar]);
      } else if (res.status === 203) {
        dispatch(addToast({ message: res.data.Message, type: "failed" }));
        localStorage.removeItem("user");
        navigate("/404NotFound");
      } else {
        dispatch(addToast({ message: res.data.Message, type: "failed" }));
      }
    } catch (error) {
      console.error(error);
    }
  };
  const getBooking = (calendar_id) => {
    const book = bookings.find((book) =>
      book.find((b) => b.calendar_id === calendar_id)
    );
    return book;
  };
  useEffect(() => {
    const fetchCalendar = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/calendar/getAllCalendar`,
        { withCredentials: true }
      );
      if (res.status === 200) {
        setCalendars(res.data.allCalendar);
      } else if (res.status === 203) {
        dispatch(addToast({ message: res.data.Message, type: "failed" }));
        localStorage.removeItem("user");
        navigate("/404NotFound");
      } else {
        dispatch(addToast({ message: res.data.Message, type: "failed" }));
      }
    };
    fetchCalendar();
  }, []);
  return (
    <>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-800 text-amber-500">
            <th className="px-6 py-3 border-b text-left">Calendar ID</th>
            <th className="px-6 py-3 border-b text-left">Film Name</th>
            <th className="px-6 py-3 border-b text-left">Show Time</th>
            <th className="px-6 py-3 border-b text-center">Total Seat</th>
            <th className="px-6 py-3 border-b text-center">Available Seat</th>
            <th className="px-6 py-3 border-b text-center"></th>
          </tr>
        </thead>
        <tbody>
          {calendars.length > 0 &&
            calendars.map((calendar, i) => (
              <>
                <tr
                  onClick={() => handleClick(calendar.calendar_id)}
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
                  <td className="px-6 py-4 border-b">
                    {fixFormatDateRespone(calendar.showtime)}
                  </td>
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
                  <td>
                    <FaAngleRight
                      className={`transition-all ${
                        checkExistsCalendarId(calendar.calendar_id)
                          ? "rotate-90"
                          : ""
                      }`}
                    />
                  </td>
                </tr>
                {checkExistsCalendarId(calendar.calendar_id) &&
                getBooking(calendar.calendar_id) &&
                getBooking(calendar.calendar_id).length > 0 ? (
                  <tr className="transition-all delay-300 duration-300">
                    <td colSpan="7" className="px-6 py-4 bg-gray-900">
                      <table className="min-w-full bg-white border border-gray-300">
                        <thead>
                          <tr className="bg-gray-800 text-amber-500">
                            <th className="px-6 py-3 border-b text-left">
                              Book ID
                            </th>
                            <th className="px-6 py-3 border-b text-left">
                              Calendar ID
                            </th>
                            <th className="px-6 py-3 border-b text-left">
                              Customer ID
                            </th>
                            <th className="px-6 py-3 border-b text-left">
                              Username
                            </th>
                            <th className="px-6 py-3 border-b text-center">
                              Seat_Name
                            </th>
                            <th className="px-6 py-3 border-b text-center">
                              Theater_ID
                            </th>
                            <th className="px-6 py-3 border-b text-center">
                              Book Time
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {getBooking(calendar.calendar_id).map(
                            (booking, i) => (
                              <tr
                                // onClick={() => navigate(`/Calendar/${booking.book_id}`)}
                                key={booking.book_id}
                                className={`cursor-pointer transition-all ${
                                  (i + 1) % 2 === 0
                                    ? "bg-gray-700"
                                    : "bg-gray-800"
                                } text-white hover:bg-amber-500 hover:text-black`}
                              >
                                <td className="px-6 py-4 border-b text-center">
                                  {booking.book_id}
                                </td>
                                <td className="px-6 py-4 border-b text-center">
                                  {booking.calendar_id}
                                </td>
                                {
                                  //TODO: Fix showtime format
                                }
                                <td className="px-6 py-4 border-b text-center">
                                  {booking.customer.customer_id}
                                </td>
                                <td className="px-6 py-4 border-b text-center">
                                  {booking.customer.username}
                                </td>
                                <td className="px-6 py-4 border-b text-center">
                                  {booking.seat_calendar.seat.seat_name}
                                </td>
                                <td
                                  className={`px-6 py-4 border-b text-center `}
                                >
                                  {booking.seat_calendar.seat.theater_id}
                                </td>
                                <td className="px-6 py-4 border-b text-center">
                                  {fixFormatDateRespone(booking.book_time)}
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                ) : (
                  ""
                )}
              </>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default BookingSpecificCalendar;
