import { Route, Routes } from "react-router-dom";
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

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Dashboards />} />
          <Route path="UserList" element={<User />}>
            <Route path=":userId" element={<UserDetail />} />
          </Route>
          <Route path="Movies" element={<MovieList />}>
            <Route index element={<MovieInner/>}/>
            <Route path="MovieOutter" element={<MovieOutter/>}/>
            <Route path=":movieId" element={<MovieDetail />} />
          </Route>
          <Route path="Booking" element={<Booking />}>
            <Route path=":movieId" element={<BookingDetail />} />
          </Route>
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
}

export default App;
