import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import NavPublic from "./NavPublic";
import Footer from "./Footer";
import ContactBot from "./contactBot";
import MobileNavPublic from "./MobileNavPublic";

function LayoutPublic() {
  const [isClick,setIsClick] = useState(false);
  const location = useLocation();
  const [isInclude, setIsInclude] = useState(false);
  const [inClient, setInClient] = useState(false);
  useEffect(() => {
    if (
      location.pathname.includes("Register") ||
      location.pathname.includes("Login") ||
      location.pathname.includes("Payment")
    ) {
      setIsInclude(true);
    } else setIsInclude(false);
    if (location.pathname.includes("admin")) setInClient(false);
    else setInClient(true);
  }, [location]);
  return (
    <>
      {inClient ? <ContactBot /> : ""}
      {isInclude ? (
        ""
      ) : (
        <>
          <NavPublic setIsClick={setIsClick}/>
          <MobileNavPublic isClick={isClick} setIsClick={setIsClick}/>
        </>
      )}
      <Outlet />
      {isInclude ? "" : <Footer />}
    </>
  );
}

export default LayoutPublic;
