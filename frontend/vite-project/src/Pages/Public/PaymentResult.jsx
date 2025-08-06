import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { addToast } from "../../slices/toastSlice";

export default function PaymentResult() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const object = JSON.parse(localStorage.getItem("myBookingObject"));
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("pending");
  const [message, setMessage] = useState("");
  console.log(searchParams, "-----------------------", object);
  useEffect(() => {
    const responseCode = searchParams.get("vnp_ResponseCode");
    const txnRef = searchParams.get("vnp_TxnRef");
    const amount = searchParams.get("vnp_Amount");
    const film_id = searchParams.get("film_id");
    const createNow = async () => {
      if (responseCode === "00") {
        const res = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/booking/createBooking`,
          object,
          { withCredentials: true }
        );
        if (res.status === 200) {
          setStatus("success");
          setMessage(
            `Payment successful for Order #${txnRef} - Amount: ${
              amount / 100
            } VND`
          );
          localStorage.removeItem("myBookingObject");
          localStorage.setItem("paymentStatus",JSON.stringify({paymentStatus: "ok"}));
          dispatch(addToast({ message: res.data.Message, type: "success" }));
          dispatch(addToast({ message: "Hãy quay lại trang cũ để xem cập nhật", type: "success" }));
        } else {
          dispatch(addToast({ message: res.data.Message, type: "failed" }));
          setMessage(`Payment failed: ${res.data.Message}`);
        }
      } else {
        setStatus("failed");
        const errorMsg = getErrorMessage(responseCode);
        setMessage(`Payment failed: ${errorMsg}`);
      }
    };
    createNow();
  }, [searchParams]);

  const getErrorMessage = (code) => {
    switch (code) {
      case "01":
        return "Transaction already exists";
      case "02":
        return "Merchant not registered with VNPAY";
      case "04":
        return "Insufficient balance";
      case "05":
        return "Incorrect account";
      case "06":
        return "Transaction timed out";
      case "07":
        return "Transaction canceled";
      case "09":
        return "Card/Account not registered for Internet Banking";
      default:
        return "Unknown error";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <div className="p-6 rounded-xl shadow-lg bg-white w-full max-w-md text-center">
        {status === "pending" ? (
          <h2 className="text-xl font-semibold text-gray-700">
            Processing payment result...
          </h2>
        ) : status === "success" ? (
          <>
            <h2 className="text-2xl font-bold text-green-600">
              🎉 Payment Successful
            </h2>
            <p className="mt-2 text-gray-600">{message}</p>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-red-600">
              ❌ Payment Failed
            </h2>
            <p className="mt-2 text-gray-600">{message}</p>
          </>
        )}
      </div>
    </div>
  );
}
