import { useDispatch, useSelector } from "react-redux";
import { getFormatDateNow, getFormatTime } from "../../utils/getFormatDateNow";
import { addToast } from "../../slices/toastSlice";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import axios from "axios";
import { setBookingToStore } from "../../slices/bookingSlice";
import { useEffect, useState } from "react";

function ModalAddBookingPublic({
  setIsChange,
  film_id,
  OnClose,
  isOpen,
  booking,
}) {
  if (!isOpen) return null;
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onCreate = async () => {
    console.log(user);
    if (user === undefined || user === null) {
      dispatch(
        addToast({
          message: "Hay dang nhap de thuc hien thao tac nay",
          type: "failed",
        })
      );
      navigate("/Login");
      return;
    }
    if (!booking.seat) {
      dispatch(addToast({ message: "Chua Chon ghe", type: "failed" }));
      return;
    }
    const book_id = uuid();
    const object = {
      book_id: book_id,
      customer_id: user?.customer_id || undefined,
      calendar_id: booking.calendar.calendar_id || undefined,
      seat_id: booking.seat.seat_id || undefined,
      theater_id: booking.theater.theater_id || undefined,
      time: getFormatDateNow(),
      popcorn: booking.popCorn,
    };
    console.log(object);
    dispatch(setBookingToStore(object));
    localStorage.setItem("myBookingObject", JSON.stringify(object));
    const res = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/payment/create_payment_url`,
      {
        amount: booking.sum,
        book_id: book_id,
        film_id: film_id,
      }
    );
    if (res.status === 200) {
      window.open(res.data, "_blank");
    }
  };
  console.log(
    "payment status ------------------: ",
    JSON.parse(localStorage.getItem("paymentStatus"))?.paymentStatus
  );
  useEffect(() => {
    const handleLocalStorage = (e) => {
      if (
        e.key === "paymentStatus" &&
        JSON.parse(localStorage.getItem("paymentStatus")).paymentStatus === "ok"
      ) {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        setIsChange();
        localStorage.removeItem("paymentStatus");
        OnClose();
      }
    };
    window.addEventListener("storage", handleLocalStorage);
    return () => window.removeEventListener("storage", handleLocalStorage);
  }, []);
  console.log("my current booking: ", booking);
  return (
    <>
      <div className="fixed inset-0 bg-black/55 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg w-[800px] max-h-[90vh] overflow-y-hidden scaleAnimation">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Đặt Lịch Chiếu</h2>
            <button
              className="cursor-pointer text-gray-500 hover:text-gray-700"
              onClick={() => OnClose()}
            >
              ✕
            </button>
          </div>

          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-3 w-full">
              <div className="text-xl w-[27%]">Chọn Phim</div>
              <div className="w-full p-2 bg-gray-100 rounded">
                {booking.film}
              </div>
            </div>

            <div className="flex items-center gap-3 w-full">
              <div className="text-xl w-[27%]">Username</div>
              <div className="w-full p-2 bg-gray-100 rounded">
                {user?.username || "Khong tim thay"}
              </div>
            </div>

            <div className="flex items-center gap-3 w-full">
              <div className="text-xl w-[27%]">Suất Chiếu</div>
              <div className="w-full p-2 bg-gray-100 rounded text-amber-700 text-xl">
                {getFormatTime(booking.calendar?.showtime)}
              </div>
            </div>

            <div className="flex items-center gap-3 w-full">
              <div className="text-xl w-[27%]">Rạp</div>
              <div className="w-full p-2 bg-gray-100 rounded font-bold">
                {booking.theater?.theater_name || "Chưa chọn lịch chiếu"}
              </div>
            </div>

            <div className="flex items-center gap-3 w-full">
              <div className="text-xl w-[27%]">Ghế</div>
              <div className="w-full p-2 bg-gray-100 rounded font-bold">
                {booking.seat
                  ? booking.seat?.seat_id +
                      ` = ` +
                      booking.seat?.price.toLocaleString('vi-VN') +
                      " VND" || ""
                  : "Chua Chọn ghế"}
              </div>
            </div>

            <div className="flex items-center gap-3 w-full">
              <div className="text-xl w-[27%]">Bắp</div>
              <div className="w-full p-2 bg-gray-100 rounded flex flex-col items-center justify-between">
                {booking.popCorn?.length > 0
                  ? booking.popCorn.map((p) => (
                      <>
                        <div className="text-black font-bold">
                          {p.name} x {p.book_frequent} = {p.total_price.toLocaleString('vi-VN')} VND
                        </div>
                      </>
                    ))
                  : "Không chọn"}
              </div>
            </div>
            <div className="flex items-center gap-3 w-full">
              <div className="text-xl w-[27%]">Tong</div>
              <div className="w-full p-2 font-bold bg-gray-100 text-red-400 text-xl rounded flex flex-col items-center justify-between">
                {booking.sum.toLocaleString('vi-VN')} VND
              </div>
            </div>
            <div className="pt-4 flex justify-center">
              <button
                className="p-4 cursor-pointer bg-amber-600 hover:bg-amber-700 transition text-xl text-white rounded-[10px]"
                onClick={() => onCreate()}
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalAddBookingPublic;
