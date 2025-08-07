import React from "react";
import { FaFacebook } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Logo from "../../images/Logo-removebg-preview.png";


function Footer() {
  const navigate = useNavigate();
  return (
    <>
      <div className="h-96 bg-black flex flex-wrap md:justify-around justify-evenly gap-3 items-center">
        <div className="flex flex-col items-center gap-5">
          {/* <h2 className="md:text-3xl text-2xl font-bold text-white">HAO QUANG</h2> */}
          <img src={Logo} alt="Logo Here" className="w-28 h-auto"/>
          <div className="w-[150px] flex justify-between items-center ">
            <FaFacebook className="text-white text-3xl" />
            <FaYoutube className="text-white text-3xl" />
            <FaTiktok className="text-white text-3xl" />
          </div>
        </div>
        <div className="flex flex-col gap-5 ">
          <h2 className="md:text-3xl text-[14px] font-bold text-white">Tai Khoan</h2>
          <h2 className="text-white sm:text-2xl  text-[14px] cursor-pointer" onClick={()=>navigate("/Login")}>Dang Nhap</h2>
          <h2 className="text-white sm:text-2xl  text-[14px] cursor-pointer" onClick={()=>navigate("Register")}>Dang Ki</h2>
        </div>
        <div className="flex flex-col gap-5">
          <h2 className="md:text-3xl text-[14px] font-bold text-white">HAO QUANG</h2>
          <h2 className="text-white sm:text-2xl text-[14px] ">Gioi Thieu</h2>
          <h2 className="text-white sm:text-2xl text-[14px] ">Lien He</h2>
        </div>
        <div className="flex flex-col gap-5">
          <h2 className="md:text-3xl text-[14px] font-bold text-white">Xem Phim</h2>
          <h2 className="text-white sm:text-2xl text-[14px] ">Phim Dang Chieu</h2>
          <h2 className="text-white sm:text-2xl text-[14px] ">Phim Sap Chieu</h2>
        </div>
      </div>
    </>
  );
}

export default Footer;
