import React, { useEffect, useState } from "react";
import CalendarPublicComponent from "../../components/public/CalendarPublicComponent";
import SelectCalendarPublic from "../../components/public/SelectCalendarPublic";
import { Outlet, useLocation } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToast } from "../../slices/toastSlice";

function CalendarPage() {
  const location = useLocation();
  const[isInDetail, setIsInDetail] = useState(false);
  console.log(location.pathname.split("/"));
  const [allCalendar,setAllCalendar] = useState([]);
  useEffect(() => {
    const tempLocation = location.pathname.split("/");
    if (tempLocation.length === 3 && tempLocation.includes("PublicCalendar")) {
      setIsInDetail(true);
    } else {
      dispatch(addToast({message:"Coming soon",type:"failed"}));
      setIsInDetail(false);
    }
  }, [location]);
  const dispatch = useDispatch();

  // coming soon
  useEffect(()=>{
    // const fetchCalendar= async ()=>{
    //   const res = await axios.get("https://bookmovieticket.onrender.com/api/v1/calendar/getAllCalendar");
    //   console.log(res.data);
    //   if(res.status===200){
    //     setAllCalendar(res.data.allCalendar);
    //   }
    // }
    
  },[])
  return (
    <>
      <div className="w-full max-w-[80%] m-auto mt-12 mb-12">
        <SelectCalendarPublic />
        {!isInDetail ? (
          <>
            <div className="flex flex-col gap-24">
              <CalendarPublicComponent />
              <CalendarPublicComponent />
              <CalendarPublicComponent />
            </div>
          </>
        ) : (
          <Outlet />
        )}
      </div>
    </>
  );
}

export default CalendarPage;
