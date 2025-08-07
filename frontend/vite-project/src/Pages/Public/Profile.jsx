import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  fixFormatDate,
  fixFormatDateRespone,
} from "../../utils/getFormatDateNow.js";
import { shorten } from "../../utils/shortenTitle.js";
import { useDispatch } from "react-redux";
import { addToast } from "../../slices/toastSlice.js";
import Loading from "../../components/Loading.jsx";

function Profile() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [customer_id, setCustomerID] = useState(
    searchParams.get("customer_id")
  );
  console.log(customer_id);
  const [loading, setLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [username, setUsername] = useState("");
  const [customername, setCustomername] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState(null);
  const [isExistsUsername, setIsExistsUsername] = useState(false);
  console.log(searchParams);
  const [user, setUser] = useState([]);
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (newUsername === "" || customername === "" || newUsername.length <= 5) {
      dispatch(
        addToast({
          message:
            "Username hoặc tên khách hàng không được trống username phải có độ dài lớn hơn 5",
          type: "failed",
        })
      );
      setLoading(false);
      return;
    }
    if (isExistsUsername === true) {
      dispatch(
        addToast({
          message: "Username đã tồn tại",
          type: "failed",
        })
      );
      setLoading(false);
      return;
    }
    //TODO: add phoneRegex
    if (phone.length < 10 || phone.length > 10) {
      dispatch(
        addToast({ message: "Số điện thoại không đúng", type: "failed" })
      );
      setLoading(false);
      return;
    }
    const temp = new Date(dob);
    console.log("", now.getFullYear() - temp.getFullYear());
    if (now.getFullYear() - temp.getFullYear() < 18) {
      dispatch(addToast({ message: "Tuổi phải lớn hơn 18", type: "failed" }));
      setLoading(false);
      return;
    }
    const res = await axios.patch(
      `${
        import.meta.env.VITE_SERVER_URL
      }/user/updateProfile?customer_id=${customer_id}`,
      {
        username,
        customer_name: customername,
        phone,
        dob: fixFormatDate(dob),
      },
      { withCredentials: true }
    );
    console.log(res);
    if (res.status === 200) {
      dispatch(addToast({ message: res.data.Message, type: "success" }));
      setIsUpdate(true);
      setLoading(false);
    } else {
      dispatch(addToast({ message: res.data.Message, type: "failed" }));
      setLoading(false);
    }
  };
  const now = new Date();
  console.log(now.getFullYear());
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    // console.log(customer_id);
    const fetchUser = async () => {
      setLoading(true);
      const res = await axios.get(
        `${
          import.meta.env.VITE_SERVER_URL
        }/user/getAUser?customerId=${customer_id}`,
        { withCredentials: true }
      );
      if (res.status === 200) {
        setUser(
          Object.entries(res.data.user).map(([key, value]) => ({ key, value }))
        );
        setLoading(false);
      }
    };
    if (
      (customer_id !== undefined && customer_id !== "") ||
      isUpdate === true
    ) {
      fetchUser();
      setIsUpdate(false);
    }
  }, [searchParams, isUpdate]);
  useEffect(() => {
    if (user !== undefined && user.length > 0) {
      setNewUsername(user?.at(1).value);
      setUsername(user?.at(1).value);
      setCustomername(user?.at(2).value);
      setPhone(user?.at(3).value);
      setDob(new Date(user?.at(5).value).toISOString().split("T")[0]);
    }
  }, [user]);
  console.log(user);
  console.log("DOB: ", dob);
  const handleUserName = async (e) => {
    setIsExistsUsername(false);
    setNewUsername(e.target.value);
  };
  useEffect(() => {
    const checkUserName = async () => {
      console.log("newUsername: ", newUsername, "username: ", username);
      if (newUsername === "") return;
      if (newUsername === username) return;
      const res = await axios.get(
        `${
          import.meta.env.VITE_SERVER_URL
        }/search/searchUsername?username=${newUsername}`
      );
      console.log(res);
      if (res.status === 200) {
        if (res.data === newUsername) {
          setIsExistsUsername(true);
          dispatch(
            addToast({ message: "Username đã tồn tại", type: "failed" })
          );
        }
      }
    };
    checkUserName();
  }, [newUsername]);
  return (
    <>
      {loading ? <Loading /> : ""}
      <div className="w-full max-w-[90%] m-auto p-3">
        {user?.length > 0 && (
          <>
            <form className="w-full p-2 flex flex-col gap-3">
              <div className="w-full flex justify-between items-center">
                <label htmlFor="userid" className="text-white">
                  USER ID:
                </label>{" "}
                <input
                  type="text"
                  id="userid"
                  className={`outline-none cursor-no-drop p-1 text-xl bg-gray-400 font-mono w-[80%]`}
                  value={user?.at(0).value}
                  readOnly
                />
              </div>
              <div className="w-full flex justify-between items-center">
                <label htmlFor="username" className="text-white">
                  USERNAME:
                </label>{" "}
                <input
                  type="text"
                  id="username"
                  className={`outline-none p-1 text-xl ${
                    isExistsUsername ? "bg-red-400" : "bg-white"
                  } font-mono w-[80%] `}
                  value={newUsername}
                  onChange={handleUserName}
                />
              </div>
              <div className="w-full flex justify-between items-center">
                <label htmlFor="customername" className="text-white">
                  Customer name:
                </label>{" "}
                <input
                  type="text"
                  id="customername"
                  className={`outline-none p-1 text-xl bg-white font-mono w-[80%]`}
                  value={customername}
                  onChange={(e) => setCustomername(e.target.value)}
                />
              </div>
              <div className="w-full flex justify-between items-center">
                <label htmlFor="phone" className="text-white">
                  Phone:
                </label>{" "}
                <input
                  type="text"
                  id="phone"
                  className={`outline-none p-1 text-xl bg-white font-mono w-[80%]`}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="w-full flex justify-between items-center">
                <label htmlFor="dob" className="text-white">
                  Ngay Sinh:
                </label>{" "}
                <input
                  type="date"
                  id="dob"
                  className={`outline-none p-1 text-xl bg-white font-mono w-[80%]`}
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />
              </div>
              <div className="w-full flex justify-between items-center">
                <label htmlFor="createDate" className="text-white">
                  Create Date:
                </label>{" "}
                <input
                  type="text"
                  id="createDate"
                  className={`outline-none p-1 text-xl bg-white font-mono w-[80%]`}
                  value={
                    fixFormatDateRespone(user?.at(4).value) + "\t(YYYY-MM-DD)"
                  }
                  readOnly
                />
              </div>
              <input
                type="submit"
                value={"Sửa thông tin"}
                className="p-3 bg-amber-500 w-fit font-semibold self-end hover:bg-amber-400 transition-all"
                onClick={handleSubmit}
              />
              {/* <label htmlFor="username" className="text-white">USERNAME:</label> <input type="text" id="username" className={`outline-none p-1 bg-white font-mono`}/>
                <label htmlFor="user" className="text-white">USER ID:</label> <input type="text" id="user" className={`outline-none p-1 bg-white font-mono`}/> */}
            </form>
            <div className="w-full">
              <h1 className="text-center text-amber-500 text-3xl mb-5 ">
                Các vé đã book
              </h1>
              <table className="min-w-full bg-white border border-gray-300">
                <thead className="w-full">
                  <tr className="bg-gray-800 text-amber-500">
                    <th className="px-6 py-3 border-b text-center">Book ID</th>
                    <th className="px-6 py-3 border-b text-center">
                      Thời gian book
                    </th>
                    <th className="px-6 py-3 border-b text-center">Tên Phim</th>
                    <th className="px-6 py-3 border-b text-center">
                      Lịch Chiếu
                    </th>
                    <th className="px-6 py-3 border-b text-center">Mã Ghế</th>
                    <th className="px-6 py-3 border-b text-center">Rạp</th>
                    <th className="px-6 py-3 border-b text-center">
                      Tổng Giá Vé
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {user?.at(6) !== undefined && user?.at(5).value.length > 0 ? (
                    user?.at(6).value.map((booking, i) => (
                      <tr
                        // onClick={() => navigate(`/Calendar/${booking.book_id}`)}
                        key={booking.book_id}
                        className={`cursor-pointer text-white bg-gray-700 transition-all   hover:bg-amber-500 hover:text-black `}
                      >
                        <td className="px-6 py-4 border-b text-center">
                          {shorten(booking.book_id)}
                        </td>
                        {
                          //TODO: Fix showtime format
                        }
                        <td className="px-6 py-4 border-b text-center">
                          {fixFormatDateRespone(booking.book_time)}
                        </td>
                        <td className="px-6 py-4 border-b text-center">
                          {shorten(booking.calendar.film.film_name)}
                        </td>
                        <td className={`px-6 py-4 border-b text-center `}>
                          {fixFormatDateRespone(booking.calendar.showtime)}
                        </td>
                        <td className="px-6 py-4 border-b text-center">
                          {booking.seat_id}
                        </td>
                        <td className="px-6 py-4 border-b text-center">
                          {booking.theater.theater_name}
                        </td>
                        <td className="px-6 py-4 border-b text-center">
                          {booking.total_price_book}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr
                      // onClick={() => navigate(`/Calendar/${booking.book_id}`)}
                      key={`N/A`}
                      className={`cursor-pointer transition-all
                 bg-gray-700 text-white hover:bg-amber-500 hover:text-black`}
                    >
                      <td
                        className="px-6 py-4 border-b text-center"
                        colSpan={6}
                      >
                        Chưa có book vé nào
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Profile;
