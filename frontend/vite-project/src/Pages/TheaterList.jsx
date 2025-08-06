import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";

const TheaterList = () => {
  const location = useLocation();
  const isActive = location.pathname.includes("Theater");
  return (
    <>
      <div className="container m-auto overflow-y-auto">
        <Outlet />
      </div>
    </>
  );
};

export default TheaterList;
