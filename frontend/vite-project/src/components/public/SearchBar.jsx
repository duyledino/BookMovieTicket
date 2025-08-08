import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { toCapital } from "../../utils/toCapital";
import { useDispatch } from "react-redux";
import { addToast } from "../../slices/toastSlice";

function SearchBar() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [founded, setFounded] = useState([]);
  const [query,setQuery] = useState("");
  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  // debounce technique: only fetch api when user stop typing a while after 500ms (optimize) 
  useEffect(()=>{
    const timer = setTimeout(()=>{
      setQuery(search);
    },500);
    return ()=>clearTimeout(timer);
  },[search])
  useEffect(() => {
    setFounded([]);
    const fetchSearch = async () => {
      if (query !== "") {
        try {
          console.log("search query: ",query);
          const res = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/search/searchFilm?q=${query}`
        );
        if (res.status === 200 && res.data.length > 0) setFounded(res.data);
        } catch (error) {
          console.log(error);
          dispatch(addToast({message: error,type:'failed'}));
        }
      }
    };
    fetchSearch();
  }, [query]);
  return (
    <>
      <div className="w-full max-w-[300px] relative">
        <div
          className={`w-full flex flex-col items-center pl-2 pr-2 bg-[#D9D9D9] ${
            founded.length === 0 ? "rounded-4xl" : "rounded-t-xl"
          } `}
        >
          <div className="w-full flex justify-between items-center">
            <input
              onChange={handleChange}
              type="text"
              className="outline-none w-[90%] p-2"
              placeholder="Tìm phim"
            />
            <FaMagnifyingGlass />
          </div>
        </div>
        <ul className="w-full flex flex-col gap-1 rounded-b-sm bg-white absolute top-[100%]">
          {founded?.length > 0 &&
            founded.map((f) => (
              <li className="w-full px-3 hover:bg-black/30" key={f.film_id}>
                <Link
                  className="w-full block"
                  to={
                    f.active === true
                      ? `/PublicCalendar/${f.film_id}`
                      : `/PhimSapChieu/${f.film_id}`
                  }
                >
                  {toCapital(f.film_name)}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}

export default SearchBar;
