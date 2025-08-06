import axios from "axios";
import React, { useEffect, useState } from "react";
import ModalAddBooking from "./ModalAddBooking";
import ModelDel from "./ModelDel";
import {fixFormatDateRespone} from '../utils/getFormatDateNow.js'
import { useDispatch, useSelector } from "react-redux";
import { addToast } from "../slices/toastSlice.js";
import { useNavigate } from "react-router-dom";
import { setUser } from "../slices/userDetail.js";

const BookingTable = () => {
  const [bookings, setBookings] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isDelOpen, setIsDelOpen] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const [isClick, setIsClick] = useState(undefined);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state=>state.userDetail.user);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/booking/getAllBooking`,{withCredentials: true}
      );
      if (res.status === 200) setBookings(res.data.allBooking);
      else if(res.status === 203) {
        dispatch(addToast({message: res.data.Message,type: "failed"}));
        localStorage.removeItem("user");
        navigate("/404NotFound");
      }
    };
    fetchData();
  }, [isChange]);
  const handleClick = (bookingID) => {
    if (isClick !== undefined) {
      if (isClick === bookingID) setIsClick(undefined);
      else setIsClick(bookingID);
      return;
    }
    setIsClick(bookingID);
  };
  const onDelete = async (entityID) => {
    const res = await axios.delete(
      `${import.meta.env.VITE_SERVER_URL}/booking/deleteABooking/${entityID}`,{withCredentials:true}
    );
    return res;
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
      <ModalAddBooking
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        setIsChange={setIsChange}
      />
      <div className="min-w-full flex justify-end mb-6 gap-4">
        <button
          className="p-3 bg-amber-500 rounded-[10px] cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          Tao ve xem phim
        </button>
        <button
          className="p-3 bg-amber-500 rounded-[10px] cursor-pointer"
          onClick={() => setIsDelOpen(true)}
        >
          Xoa ve xem phim
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-800 text-amber-500">
            <th className="px-6 py-3 border-b text-left">Book ID</th>
            <th className="px-6 py-3 border-b text-left">Calendar ID</th>
            <th className="px-6 py-3 border-b text-left">Username</th>
            <th className="px-6 py-3 border-b text-center">Book Time</th>
            <th className="px-6 py-3 border-b text-center">Seat_ID</th>
            <th className="px-6 py-3 border-b text-center">Theater_ID</th>
          </tr>
        </thead>
        <tbody>
          {bookings !== undefined && bookings.length > 0 ? (
            bookings.map((booking, i) => (
              <tr
                // onClick={() => navigate(`/Calendar/${booking.book_id}`)}
                onClick={() => handleClick(booking.book_id)}
                key={booking.book_id}
                className={`cursor-pointer text-white transition-all ${
                  isClick === booking.book_id
                    ? "bg-amber-500"
                    : (i + 1) % 2 === 0
                    ? "bg-gray-700"
                    : "bg-gray-800"
                }  hover:bg-amber-500 hover:text-black `}
              >
                <td className="px-6 py-4 border-b">{booking.book_id}</td>
                <td className="px-6 py-4 border-b">{booking.calendar_id}</td>
                {
                  //TODO: Fix showtime format
                }
                <td className="px-6 py-4 border-b">{booking.customer_id}</td>
                <td className="px-6 py-4 border-b text-center">
                  {fixFormatDateRespone(booking.book_time)}
                </td>
                <td className={`px-6 py-4 border-b text-center `}>
                  {booking.theater_id}
                </td>
                <td className="px-6 py-4 border-b text-center">
                  {booking.seat_id}
                </td>
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
              {
                //TODO: Fix showtime format
              }
              <td className="px-6 py-4 border-b">N/A</td>
              <td className={`px-6 py-4 border-b text-center `}>N/A</td>
              <td className="px-6 py-4 border-b text-center">N/A</td>
              <td className="px-6 py-4 border-b text-center">N/A</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default BookingTable;
