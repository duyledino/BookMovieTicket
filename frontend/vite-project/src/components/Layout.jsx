import React, { useState } from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import MobileNavAdmin from "./MobileNavAdmin";

function Layout() {
  const [isClick, setIsClick] = useState(false);
  return (
    <>
      <Navbar setIsClick={setIsClick} />
      <Outlet />
      <MobileNavAdmin setIsClick={setIsClick} isClick={isClick} />
    </>
  );
}

export default Layout;
