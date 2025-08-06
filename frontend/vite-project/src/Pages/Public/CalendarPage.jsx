import React, { useEffect, useState } from "react";
import CalendarPublicComponent from "../../components/public/CalendarPublicComponent";
import SelectCalendarPublic from "../../components/public/SelectCalendarPublic";
import { Outlet, useLocation } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToast } from "../../slices/toastSlice";
import CalendarPublicComponentLoading from "../../components/public/CalendarPublicComponentLoading";

function CalendarPage() {
  const location = useLocation();
  const [isInDetail, setIsInDetail] = useState(false);
  console.log(location.pathname.split("/"));
  const [allFilm, setAllFilm] = useState([]);
  useEffect(() => {
    const tempLocation = location.pathname.split("/");
    if (tempLocation.length === 3 && tempLocation.includes("PublicCalendar")) {
      setIsInDetail(true);
    } else {
      setIsInDetail(false);
    }
  }, [location]);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  useEffect(() => {
    const fetchCalendar = async () => {
      const res = await axios.get(
        "http://localhost:8001/api/v1/film/getAllFilmSortByCalendar"
      );
      console.log(res.data);
      if (res.status === 200) {
        setAllFilm(res.data.allFilm);
      }
    };
    fetchCalendar();
  }, []);
  console.log(allFilm);
  return (
    <>
      <div className="w-full max-w-[80%] m-auto mt-12 mb-12">
        <SelectCalendarPublic />
        {!isInDetail ? (
          <>
            <div className="flex flex-col gap-24">
              {allFilm !== undefined && allFilm?.length > 0 ? (
                allFilm.map((f) => (
                  <CalendarPublicComponent film={f} key={f.film_id} />
                ))
              ) : (
                <CalendarPublicComponentLoading />
              )}
              {/* <CalendarPublicComponent />
              <CalendarPublicComponent /> */}
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
