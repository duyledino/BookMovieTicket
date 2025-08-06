import { NavLink, Outlet,useLocation } from 'react-router-dom'
import active from '../utils/activeClass.js';

function MovieList() {
  const location = useLocation();
  const isActive = location.pathname.includes("MovieOutter");
  return (
    <>
    <div className="headerSelection flex sm:flex-row flex-col justify-between text-[24px] text-[#565E6C] font-bold w-[20rem] ml-7 mb-10">
      <NavLink to="/admin/Movies" className={isActive?"text-[#565E6C]":"active"}>Inner Movies</NavLink>
      <NavLink to="/admin/Movies/MovieOutter" className={isActive?"active":"text-[#565E6C]"} >Outter Movies</NavLink>
    </div>
     <Outlet/>
    </>
  )
}

export default MovieList

