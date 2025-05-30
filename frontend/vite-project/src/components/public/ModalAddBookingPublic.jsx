import { useDispatch } from "react-redux";
import { getFormatDateNow, getFormatTime } from "../../utils/getFormatDateNow";
import { addToast } from "../../slices/toastSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

    const object = {
      customer_id: user?.customer_id || undefined,
      calendar_id: booking.calendar.calendar_id || undefined,
      seat_id: booking.seat.seat_id || undefined,
      theater_id: booking.theater.theater_id || undefined,
      time: getFormatDateNow(),
      popCorn: booking.popCorn,
    };
    console.log(object);
    const res = await axios.post(
      `https://bookmovieticket.onrender.com/api/v1/booking/createBooking`,
      object,{withCredentials: true}
    );
    if (res.status === 200) {
      dispatch(addToast({ message: res.data.Message, type: "success" }));
      OnClose();
      setIsChange();
      navigate(`/PublicCalendar/${film_id}`);
    } else {
      dispatch(addToast({ message: res.data.Message, type: "failed" }));
    }
  };
  return (
    <>
      <div className="fixed inset-0 bg-black/55 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg w-[800px] max-h-[90vh] overflow-y-hidden">
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
                {booking.seat?.seat_id + ` = ` + booking.seat?.price || ""}
              </div>
            </div>

            <div className="flex items-center gap-3 w-full">
              <div className="text-xl w-[27%]">Bắp</div>
              <div className="w-full p-2 bg-gray-100 rounded flex flex-col items-center justify-between">
                {booking.popCorn?.length > 0
                  ? booking.popCorn.map((p) => (
                      <>
                        <div className="text-black font-bold">
                          {p.popCorn_id} x {p.bookFrequent} = {p.total_price}{" "}
                          VND
                        </div>
                      </>
                    ))
                  : "Không chọn"}
              </div>
            </div>
            <div className="flex items-center gap-3 w-full">
              <div className="text-xl w-[27%]">Tong</div>
              <div className="w-full p-2 font-bold bg-gray-100 text-red-400 text-xl rounded flex flex-col items-center justify-between">
                {booking.sum} VND
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
