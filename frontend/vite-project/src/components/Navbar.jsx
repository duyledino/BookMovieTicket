import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import active from "../utils/activeClass.js";
import ModalSelectLogin from "./ModalSelectLogin.jsx";
import { FaBarsStaggered } from "react-icons/fa6";
// import Logo from "";
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

function Navbar({setIsClick}) {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const links = [...document.querySelectorAll("li a")];
    const currentLink = location.pathname.split("/").at(-1);

    const findActive = links.find((link) => link.classList.contains("active"));
    const findCurrent = links.find((link) =>
      link.classList.contains(currentLink)
    );
    if (findActive) {
      findActive.classList.remove("active");
    }

    if (findCurrent) {
      findCurrent.classList.add("active");
    }
  }, [location]);

  return (
    <>
      <div className="w-full h-[100px] bg-black text-[#565E6C] flex justify-between items-center p-2.5 shadow-underline mb-8">
        <NavLink to={"/"} className="logo text-amber-300 font-bold text-4xl">
          <img src={Logo} alt="Logo Here" className="w-14 h-auto"/>
        </NavLink>
        <ul className="menu lg:flex hidden flex-wrap list-none justify-evenly items-center w-[33rem] gap-x-14 gap-y-2 text-xl font-bold">
          {navLink.map((item, index) => (
            <li key={index}>
              <NavLink to={item.link} className={item.className}>
                {item.linkName}
              </NavLink>
            </li>
          ))}
        </ul>
        <FaBarsStaggered onClick={()=>setIsClick(prev=>!prev)} className={`cursor-pointer lg:hidden inline-block text-4xl text-amber-300 font-extrabold`}/>
        <div
          className="profile relative p-3 lg:block hidden"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          {/* <div className="adminProfile w-[60px] h-[60px] rounded-[50%] bg-yellow-400"></div> */}
            {user && (
              <p className="text-yellow-400 text-2xl cursor-pointer">
                {user?.username}
              </p>
            )}
            <ModalSelectLogin
              onClose={() => setIsOpen(false)}
              isOpen={isOpen}
              user={user}
            />
        </div>
      </div>
    </>
  );
}

export default Navbar;
