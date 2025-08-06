import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addToast } from "../slices/toastSlice";
import axios from "axios";

function ModalSelectLogin({ isOpen, onClose, user }) {
  if (!isOpen) return null;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    const res = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/user/logout`,
      "",
      { withCredentials: true } // ensure token was sent to server
    );
    if (res.status === 200) {
      console.log(res.data);
      dispatch(addToast({ message: res.data.Message, type: "success" }));
      localStorage.removeItem("user");
      navigate("/");
    }
  };
  return (
    <>
      {user && (
        <div className="absolute top-12 left-[-10px] p-0.5 bg-white max-w-2xs max-h-60 scaleAnimation">
          <div className="w-full flex flex-col gap-0.5">
            <button
              className={`text-yellow-400 font-bold text-xl bg-black cursor-pointer`}
            >
              <Link to={`Profile?customer_id=${user.customer_id}`}>Edit Profile</Link>
            </button>
            <button
              className={`text-red-500 font-bold text-xl bg-black cursor-pointer`}
              onClick={() => handleLogout()}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ModalSelectLogin;
