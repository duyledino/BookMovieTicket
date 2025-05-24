import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import active from "../utils/activeClass.js";
import ModalSelectLogin from "./ModalSelectLogin.jsx";

function Navbar() {
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
        <NavLink to={"/"} className="logo text-amber-300 font-bold text-4xl">Logo</NavLink>
        <ul className="menu flex list-none justify-between items-center w-[30rem] text-xl font-bold">
          <li>
            <NavLink to="/admin" className="admin">
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="UserList" className="UserList">
              Users
            </NavLink>
          </li>
          <li>
            <NavLink to="Movies" className="Movies">
              Movies
            </NavLink>
          </li>
          <li>
            <NavLink to="Calendar" className="Calendar">
              Calendar
            </NavLink>
          </li>
          <li>
            <NavLink to="Booking" className="Booking">
              Booking
            </NavLink>
          </li>
        </ul>
        <div className="profile relative  p-3" onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={()=>setIsOpen(false)}>
          {/* <div className="adminProfile w-[60px] h-[60px] rounded-[50%] bg-yellow-400"></div> */}
          <>
            {user && (
              <p
                className="text-yellow-400 text-2xl cursor-pointer"
                
              >
                {user?.username}
              </p>
            )}
            <ModalSelectLogin onClose={()=>setIsOpen(false)} isOpen={isOpen} user={user}/>
          </>
        </div>
      </div>
    </>
  );
}

export default Navbar;
