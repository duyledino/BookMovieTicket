import React from "react";
import { FaCircleUser, FaX } from "react-icons/fa6";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { BiDoorOpen } from "react-icons/bi";
import { addToast } from "../slices/toastSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import Logo from "../images/Logo-removebg-preview.png";

const navLink = [
  { link: "/admin", linkName: "Dashboard", className: "admin" },
  { link: "UserList", linkName: "Users", className: "UserList" },
  { link: "Movies", linkName: "Movies", className: "Movies" },
  { link: "Calendar", linkName: "Calendar", className: "Calendar" },
  { link: "Booking", linkName: "Booking", className: "Booking" },
  { link: "Theater", linkName: "Theater", className: "Theater" },
  { link: "Popcorn", linkName: "Popcorn", className: "Popcorn" },
];

const MobileNavAdmin = ({ isClick, setIsClick }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/user/logout`,
        "",
        { withCredentials: true } // ensure token was sent to server
      );
      if (res.status === 200) {
        console.log(res.data);
        setIsClick(false);
        dispatch(addToast({ message: res.data.Message, type: "success" }));
        localStorage.removeItem("user");
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      dispatch(
        addToast({ message: error.res?.data?.Message, type: "success" })
      );
    }
  };
  console.log("nav is Click", user);
  return (
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
      <div className="flex flex-col w-[95%] items-center mb-5 gap-5">
        <Link to={"/"}>
          <img src={Logo} alt="Logo Here" className="w-24 h-auto"/>
        </Link>
      </div>
      <ul className="flex flex-col w-[95%] mt-3">
        {navLink.map((item, index) => (
          <li
            className="w-full flex justify-center items-center rounded-[4px]"
            key={index}
          >
            <NavLink
              to={`${item.link}`}
              end
              style={({ isActive }) => ({
                background: isActive ? "orange" : "",
                color: isActive ? "black" : "white",
              })}
              className={`p-1 text-xl text-black text-center block w-full h-full rounded-[4px] ${item.className}`}
            >
              {item.linkName}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="flex sm:w-[95%] mt-auto w-fit justify-between gap-5 items-center">
        <Link to={`/Profile`} className="flex justify-center items-center">
          <FaCircleUser className="text-amber-300 text-4xl font-extrabold" />
        </Link>
        <h1 className="text-white text-2xl">{user.username}</h1>
        <BiDoorOpen
          className="text-4xl text-white font-bold cursor-pointer"
          onClick={handleLogout}
        />
      </div>
    </div>
  );
};

export default MobileNavAdmin;
