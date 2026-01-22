import React, { useState } from "react";
import { FaX } from "react-icons/fa6";
import { FaCircleUser } from "react-icons/fa6";
import { Link, NavLink, useLocation } from "react-router-dom";
import { BiDoorOpen } from "react-icons/bi";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToast } from "../../slices/toastSlice";
import Logo from "../../images/Logo-removebg-preview.png";
import Loading from "../Loading";

const navLink = [
  { link: "/", nameLink: "Home" },
  { link: "PublicCalendar", nameLink: "Lịch Chiếu" },
  { link: "PhimSapChieu", nameLink: "Phim Sắp Chiếu" },
  { link: "PhimDangChieu", nameLink: "Phim Đang Chiếu" },
];

const MobileNavPublic = ({ isClick, setIsClick }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handleLogout = async () => {
    setLoading(true);
    const res = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/user/logout`,
      "",
      { withCredentials: true } // ensure token was sent to server
    );
    if (res.status === 200) {
      setLoading(false);
      console.log(res.data);
      setIsClick(false);
      dispatch(addToast({ message: res.data.Message, type: "success" }));
      localStorage.removeItem("user");
      navigate("/");
    }
  };
  const user = JSON.parse(localStorage.getItem("user") == "undefined" ? "null" : localStorage.getItem("user"));
  const { pathname } = useLocation();
  console.log("nav is Click", pathname);
  return (
    <>
      {loading ? <Loading /> : ""}
      <div
        className={`fixed pt-3 pb-5 px-0.5 z-50 lg:hidden flex flex-col items-center top-0 left-0 h-screen w-full sm:w-2xs bg-black transition-all ${
          isClick ? "" : "-translate-x-full"
        }`}
      >
        <div className="w-[95%] h-fit mx-auto flex justify-start p-2 mb-10">
          <FaX
            className="text-2xl text-white font-extrabold cursor-pointer"
            onClick={() => setIsClick(false)}
          />
        </div>
        {user === null || user === undefined ? (
          <div className="flex flex-col w-[95%] items-center mb-5 gap-5">
            <Link to={"/"}>
              <img src={Logo} alt="Logo Here" className="w-32" />
              {/* <h1 className="text-7xl text-amber-300 font-extrabold ">Logo</h1> */}
            </Link>
          </div>
        ) : (
          <div className="flex flex-col w-[95%] items-center gap-5">
            <FaCircleUser className="text-7xl text-amber-300 font-extrabold " />
            <h1 className="text-white text-3xl">{user?.username ?? ""}</h1>
          </div>
        )}

        <ul className="flex flex-col w-[95%] mt-3">
          {navLink.map((item, index) => (
            <li
              className="w-full flex justify-center items-center rounded-[4px]"
              key={index}
            >
              <NavLink
                to={`${item.link}`}
                style={({ isActive }) => ({
                  background: isActive ? "orange" : "",
                  color: isActive ? "black" : "white",
                })}
                className={`p-1 text-xl text-black text-center block w-full h-full rounded-[4px]`}
              >
                {item.nameLink}
              </NavLink>
            </li>
          ))}
          {user === null ? (
            ""
          ) : user.isAdmin ? (
            <li
              className="w-full flex justify-center items-center rounded-[4px]"
              key={navLink.length}
            >
              <NavLink
                to={`admin`}
                style={({ isActive }) => ({
                  background: isActive ? "orange" : "",
                  color: isActive ? "black" : "white",
                })}
                className={`p-1 text-xl text-black text-center block w-full h-full rounded-[4px]`}
              >
                Vào Trang Admin
              </NavLink>
            </li>
          ) : (
            ""
          )}
        </ul>

        {user === null || user === undefined ? (
          <div className="flex sm:w-[95%] mt-auto w-fit justify-center items-center">
            <Link to={`/Login`} className="flex justify-center items-center">
              <h1 className="text-amber-300 text-2xl font-extrabold">
                Đăng nhập ngay
              </h1>
            </Link>
          </div>
        ) : (
          <div className="flex sm:w-[95%] mt-auto w-fit justify-between gap-5 items-center">
            <Link to={`Profile`} className="flex justify-center items-center">
              <FaCircleUser className="text-amber-300 text-4xl font-extrabold" />
            </Link>
            <h1 className="text-white text-2xl">{user.username}</h1>
            <BiDoorOpen
              className="text-4xl text-white font-bold cursor-pointer"
              onClick={handleLogout}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default MobileNavPublic;
