import React from "react";
import { NavLink } from "react-router-dom";
import active from '../utils/activeClass.js'

function Navbar() {
  return (
    <>
      <div className="w-full h-[100px] bg-black text-[#565E6C] flex justify-between items-center p-2.5 shadow-underline mb-8">
        <div className="logo text-amber-300 font-bold text-4xl">Logo</div>
        <ul className="menu flex list-none justify-between items-center w-[30rem] text-xl font-bold">
          <li>
            <NavLink to="/" className={active}>Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="UserList" className={active}>Users</NavLink>
          </li>
          <li>
            <NavLink to="Movies" className={active}>Movies</NavLink>
          </li>
          <li>
            <NavLink to="Calendar" className={active}>Calendar</NavLink>
          </li>
          <li>
            <NavLink to="Booking" className={active}>Booking</NavLink>
          </li>
        </ul>
        <div className="profile">
            <div className="adminProfile w-[60px] h-[60px] rounded-[50%] bg-yellow-400"></div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
