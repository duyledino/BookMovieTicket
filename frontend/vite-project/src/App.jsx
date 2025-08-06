import { Route, Router, Routes, useLocation } from "react-router-dom";
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
import { useDispatch } from "react-redux";
import { resetDetail } from "./slices/movieDetailSlice";
import { useEffect } from "react";
import InnerMovieDetail from "./Pages/InnerMovieDetail";
import { resetUser } from "./slices/userDetail";
import CalendarDetail from "./Pages/CalendarDetail";
import BookingList from "./Pages/BookingList";
import BookingSpecificCalendar from "./Pages/BookingSpecificCalendar";
import ToastContainer from "./components/ToastContainer";
import LayoutPublic from "./components/public/LayoutPublic";
import HomePage from "./Pages/Public/HomePage";
import NotYetPage from "./Pages/Public/NotYetPage";
import OnAirPage from "./Pages/Public/OnAirPage";
import LoginPage from "./Pages/Public/LoginPage";
import RegisterPage from "./Pages/Public/RegisterPage";
import CalendarDetailPage from "./Pages/Public/CalendarDetailPage";
import CalendarPage from "./Pages/Public/CalendarPage";
import CalendarDetailComingSoonPage from "./Pages/Public/CalendarDetailComingSoonPage";
import PaymentResult from "./Pages/Public/PaymentResult";
import Profile from "./Pages/Public/Profile";
import Theater from "./Pages/Theater";
import TheaterList from "./Pages/TheaterList";
import PopcornList from "./components/PopcornList";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  console.log(document.cookie);
  useEffect(() => {
    const body = document.querySelector("body");
    if (location.pathname.includes("admin")) {
      if (body.classList.contains("bgGradient")) {
        body.classList.remove("bgGradient");
        body.classList.add("bgBlack");
      } else if (!body.classList.contains("bgBlack")) {
        body.classList.add("bgBlack");
      }
    } else if (!location.pathname.includes("admin")) {
      if (body.classList.contains("bgBlack")) {
        body.classList.remove("bgBlack");
        body.classList.add("bgGradient");
      } else if (!body.classList.contains("bgGradient")) {
        body.classList.add("bgGradient");
      }
    }
  }, [location.pathname]);
  useEffect(() => {
    if (
      !location.pathname.includes("MovieOutter/") &&
      !location.pathname.includes("MovieInner/")
    ) {
      dispatch(resetDetail());
    }
  }, [location.pathname, dispatch]);
  return (
    <>
      <ToastContainer />
      <Routes>
        {/* public Router */}
        <Route path="/" element={<LayoutPublic />}>
          <Route index element={<HomePage />} />
          <Route path="Profile" element={<Profile />} />
          <Route path="PhimSapChieu" element={<NotYetPage />}>
            <Route path=":movieId" element={<CalendarDetailComingSoonPage />} />
          </Route>
          <Route path="PhimDangChieu" element={<OnAirPage />}>
            <Route path=":movieId" />
          </Route>
          <Route path="PublicCalendar" element={<CalendarPage />}>
            <Route path=":movieId" element={<CalendarDetailPage />} />
          </Route>
          <Route path="Payment/payment_result" element={<PaymentResult />} />
          <Route path="Login" element={<LoginPage />} />
          <Route path="Register" element={<RegisterPage />} />
        </Route>
        {/* admin router */}
        <Route path="admin" element={<Layout />}>
          <Route index element={<Dashboards />} />
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
            <Route index element={<Booking />} />
            <Route
              path="BookingSpecificCalendar"
              element={<BookingSpecificCalendar />}
            />
            <Route path=":bookingId" element={<BookingDetail />} />
          </Route>
          <Route path="Calendar" element={<Calendar />}>
            <Route path=":calendarId" element={<CalendarDetail />} />
          </Route>
          <Route path="Theater" element={<TheaterList />}>
            <Route index element={<Theater />} />
          </Route>
          <Route path="Popcorn" element={<PopcornList/>}/>
        </Route>
        {/* 404 router */}
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
}

export default App;
