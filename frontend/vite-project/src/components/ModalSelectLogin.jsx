import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToast } from "../slices/toastSlice";

function ModalSelectLogin({ isOpen, onClose, user }) {
  if (!isOpen) return null;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    const res = await axios.post(`http://localhost:8000/api/v1/user/logout`);
    if (res.status === 200) {
        console.log(res.data);
      dispatch(addToast({ message: res.data.Message, type: "success" }));
      localStorage.removeItem("user");
      navigate("/");
    }
  };
  const handleEnterProfile = () => {
    dispatch(addToast({ message: "Coming soon", type: "failed" }));
  };
  return (
    <>
      <div className="absolute top-12 left-[-10px] p-0.5 bg-white max-w-2xs max-h-60 scaleAnimation">
        <div className="w-full flex flex-col gap-0.5">
          <button
            className={`text-yellow-400 font-bold text-xl bg-black cursor-pointer`}
            onClick={() => handleEnterProfile()}
          >
            {user ? "Edit Profile" : "Login"}
          </button>
          <button
            className={`${
              user ? "text-red-500" : "text-yellow-400"
            } font-bold text-xl bg-black cursor-pointer`}
            onClick={() => handleLogout()}
          >
            {user ? "Logout" : "Register"}
          </button>
        </div>
      </div>
    </>
  );
}

export default ModalSelectLogin;
