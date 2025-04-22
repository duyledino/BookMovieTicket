import { Route, Routes, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboards from "./Pages/Dashboards";
import User from "./Pages/User";
import UserDetail from "./Pages/UserDetail";
import MovieList from "./Pages/MovieList";
import MovieDetail from "./Pages/MovieDetail";
import Error404 from "./Pages/Error404";
import Booking from "./Pages/Booking";
import BookingDetail from "./Pages/BookingDetail";
import MovieInner from "./Pages/MovieInner";
import MovieOutter from "./Pages/MovieOutter";
import Calendar from "./Pages/Calendar";
import { useDispatch, useSelector } from "react-redux";
import { resetDetail } from "./slices/movieDetailSlice";
import { useEffect } from "react";
import InnerMovieDetail from "./Pages/InnerMovieDetail";
import { resetUser } from "./slices/userDetail";
import CalendarDetail from "./Pages/CalendarDetail";
import BookingList from "./Pages/BookingList";
import BookingSpecificCalendar from "./Pages/BookingSpecificCalendar";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      !location.pathname.includes("MovieOutter/") &&
      !location.pathname.includes("MovieInner/")
    ) {
      dispatch(resetDetail());
    }
    if (!location.pathname.includes("UserList")) dispatch(resetUser());
  }, [location.pathname, dispatch]);
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Dashboards />} />
          <Route path="UserList" element={<User />}>
            <Route path=":userId" element={<UserDetail />} />
          </Route>
          <Route path="Movies" element={<MovieList />}>
            <Route index element={<MovieInner />} />
            <Route path="MovieInner/:movieId" element={<InnerMovieDetail />} />
            <Route path="MovieOutter" element={<MovieOutter />} />
            <Route path="MovieOutter/:movieId" element={<MovieDetail />} />
          </Route>
          <Route path="Booking" element={<BookingList />}>
            <Route index element={<Booking/>}/>
            <Route path="BookingSpecificCalendar" element={<BookingSpecificCalendar/>}/>
            <Route path=":bookingId" element={<BookingDetail/>} />
          </Route>
          <Route path="Calendar" element={<Calendar />}>
            <Route path=":calendarId" element={<CalendarDetail/>}/>
          </Route>
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
}

export default App;
