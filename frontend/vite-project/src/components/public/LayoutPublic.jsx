import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import NavPublic from "./NavPublic";
import Footer from "./Footer";

function LayoutPublic() {
  const location = useLocation();
  const [isInclude, setIsInclude] = useState(false);
  useEffect(() => {
    if (
      location.pathname.includes("Register") ||
      location.pathname.includes("Login")
    ) {
      setIsInclude(true);
    }else setIsInclude(false);
  }, [location]);
  return (
    <>
      {isInclude ? "" : <NavPublic />}
      <Outlet />
      {isInclude ? "" : <Footer />}
    </>
  );
}

export default LayoutPublic;
