import React from "react";
import { FaFacebook } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();
  return (
    <>
      <div className="h-96 bg-black flex justify-around items-center">
        <div className="flex flex-col gap-5">
          <h2 className="text-3xl font-bold text-white">HAO QUANG</h2>
          <div className="w-full flex justify-between items-center ">
            <FaFacebook className="text-white text-3xl" />
            <FaYoutube className="text-white text-3xl" />
            <FaTiktok className="text-white text-3xl" />
          </div>
        </div>
        <div className="flex flex-col gap-5 ">
          <h2 className="text-3xl font-bold text-white">Tai Khoan</h2>
          <h2 className="text-white text-2xl cursor-pointer" onClick={()=>navigate("/Login")}>Dang Nhap</h2>
          <h2 className="text-white text-2xl cursor-pointer" onClick={()=>navigate("Register")}>Dang Ki</h2>
        </div>
        <div className="flex flex-col gap-5">
          <h2 className="text-3xl font-bold text-white">HAO QUANG</h2>
          <h2 className="text-white text-2xl">Gioi Thieu</h2>
          <h2 className="text-white text-2xl">Lien He</h2>
        </div>
        <div className="flex flex-col gap-5">
          <h2 className="text-3xl font-bold text-white">Xem Phim</h2>
          <h2 className="text-white text-2xl">Phim Dang Chieu</h2>
          <h2 className="text-white text-2xl">Phim Sap Chieu</h2>
        </div>
      </div>
    </>
  );
}

export default Footer;
