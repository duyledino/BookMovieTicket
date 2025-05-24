import React from "react";
import CalendarTable from "../components/CalendarTable";
import {useLocation,useParams} from 'react-router-dom';
import CalendarDetail from "./CalendarDetail";

function Calendar() {
  const location = useLocation();
  const exists = location.pathname.split('/').at(location.pathname.split('/').length-1);
  const {calendarId} = useParams();
  return (
    <div className="container mx-auto p-4">
      {
        
        (exists && calendarId && exists===calendarId)? <CalendarDetail/> :<CalendarTable />
      }
    </div>
  );
}

export default Calendar;
