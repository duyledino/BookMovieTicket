import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";

const BookingList = () => {
  const location = useLocation();
  const isActive = location.pathname.includes("BookingSpecificCalendar");
  return (
    <>
      <div className="flex sm:flex-row flex-col justify-between text-[24px] font-bold w-[30rem] ml-7 mb-10">
        <NavLink
          to="/admin/Booking"
          className={isActive ? "text-[#565E6C]" : "active"}
        >All Booking</NavLink>
        <NavLink
          to="/admin/Booking/BookingSpecificCalendar"
          className={isActive ? "active" : "text-[#565E6C]"}
        >Booking Specific Calendar</NavLink>
      </div>
      <div className="container m-auto overflow-y-auto">
        <Outlet />
      </div>
    </>
  );
};

export default BookingList;
