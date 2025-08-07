import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToast } from "../../slices/toastSlice.js";
import { fixFormatDate } from "../../utils/getFormatDateNow.js";
import Loading from "../../components/Loading.jsx";

function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [appear, setAppear] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cofirmPass, setCofirmPass] = useState("");
  const [dob, setDob] = useState(null);
  const [customerName, setCusomterName] = useState("");
  const [phone, setPhone] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (
      username === "" ||
      password === "" ||
      cofirmPass === "" ||
      dob === null
    ) {
      dispatch(addToast({ message: "Chua du thong tin", type: "failed" }));
      setLoading(false);
      return;
    } else if (password !== cofirmPass) {
      dispatch(addToast({ message: "Nhap lai mat khau", type: "failed" }));
      setLoading(false);
      return;
    } else if (phone.length > 10) {
      dispatch(
        addToast({ message: "So dien thoai khong hop le", type: "failed" })
      );
      setLoading(false);
      return;
    }
    console.log(username);
    console.log(password);
    console.log(customerName);
    console.log(dob);
    console.log(fixFormatDate(dob));
    console.log(phone);
    const res = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/user/createUser`,
      {
        username: username,
        password: password,
        customer_name: customerName,
        dob: fixFormatDate(dob),
        phone: phone,
      }
    );
    console.log(res);
    if (res.status === 200) {
      dispatch(addToast({ message: "Dang ki thanh cong", type: "success" }));
      localStorage.setItem("user", JSON.stringify(res.data.created));
      setLoading(false);
      navigate("/");
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setAppear(true);
    }, 1000);
  }, []);
  return (
    <>
      {loading ? <Loading /> : ""}
      <div className="bg-black text-white flex relative min-h-screen flex-col items-center pt-16 sm:justify-center sm:pt-0">
        {appear ? (
          <Link
            to={`/`}
            className="p-4 absolute top-5 left-5 text-xl bg-white ring-1 ring-white rounded-[15px] text-black transition duration-300 slideDownAnimation hover:bg-black hover:text-white"
          >
            Quay Lai Trang Chu
          </Link>
        ) : (
          ""
        )}
        <a href="#">
          <div className="text-foreground font-semibold text-xl tracking-tighter mx-auto flex items-center gap-2">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672Zm-7.518-.267A8.25 8.25 0 1 1 20.25 10.5M8.288 14.212A5.25 5.25 0 1 1 17.25 10.5"
                />
              </svg>
            </div>
            Register
          </div>
        </a>
        <div className="relative mt-12 w-full lg:max-w-[45%] md:max-w-[60%] sm:mt-10 scaleAnimation">
          <div className="relative -mb-px h-px w-full bg-gradient-to-r from-transparent via-sky-300 to-transparent"></div>
          <div className="mx-5 border dark:border-b-white/50 dark:border-t-white/50 border-b-white/20 sm:border-t-white/20 shadow-[20px_0_20px_20px] shadow-slate-500/10 dark:shadow-white/20 rounded-lg border-white/20 border-l-white/20 border-r-white/20 sm:shadow-sm lg:rounded-xl lg:shadow-none">
            <div className="flex flex-col p-6">
              <h3 className="text-xl font-semibold leading-6 tracking-tighter">
                Register
              </h3>
              <p className="mt-1.5 text-xl font-medium text-white/50">
                Create an account to go beyond the present
              </p>
            </div>
            <div className="p-6 pt-0">
              <form onSubmit={(e) => handleRegister(e)}>
                <div>
                  <div className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                    <div className="flex justify-between">
                      <label className="text-xl font-medium text-muted-foreground group-focus-within:text-white text-gray-400">
                        Ho va ten
                      </label>
                    </div>
                    <input
                      type="text"
                      onChange={(e) => setCusomterName(e.target.value)}
                      placeholder="Ho va Ten Cua Ban"
                      autoComplete="off"
                      className="block w-full border-0 bg-transparent p-0 text-xl file:my-1 file:rounded-full file:border-0 file:bg-accent file:px-4 file:py-2 file:font-medium placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 sm:leading-7 text-foreground"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                    <div className="flex justify-between">
                      <label className="text-xl font-medium text-muted-foreground group-focus-within:text-white text-gray-400">
                        Ngay Sinh
                      </label>
                    </div>
                    <input
                      onChange={(e) => setDob(e.target.value)}
                      type="date"
                      className="block w-full border-0 bg-transparent p-0 text-xl placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 focus:ring-teal-500 sm:leading-7 text-foreground"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                    <div className="flex justify-between">
                      <label className="text-xl font-medium text-muted-foreground group-focus-within:text-white text-gray-400">
                        So Dien Thoai
                      </label>
                    </div>
                    <input
                      onChange={(e) => setPhone(e.target.value)}
                      type="text"
                      placeholder="VD: 0123456789"
                      className="block w-full border-0 bg-transparent p-0 text-xl placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 focus:ring-teal-500 sm:leading-7 text-foreground"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                    <div className="flex justify-between">
                      <label className="text-xl font-medium text-muted-foreground group-focus-within:text-white text-gray-400">
                        Ten Dang Nhap
                      </label>
                    </div>
                    <input
                      onChange={(e) => setUsername(e.target.value)}
                      type="text"
                      name="password"
                      placeholder="Username"
                      className="block w-full border-0 bg-transparent p-0 text-xl placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 focus:ring-teal-500 sm:leading-7 text-foreground"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                    <div className="flex justify-between">
                      <label className="text-xl font-medium text-muted-foreground group-focus-within:text-white text-gray-400">
                        Password
                      </label>
                    </div>
                    <input
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      name="password"
                      placeholder="Password"
                      className="block w-full border-0 bg-transparent p-0 text-xl placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 focus:ring-teal-500 sm:leading-7 text-foreground"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                    <div className="flex justify-between">
                      <label className="text-xl font-medium text-muted-foreground group-focus-within:text-white text-gray-400">
                        Confirm Password
                      </label>
                    </div>
                    <input
                      onChange={(e) => setCofirmPass(e.target.value)}
                      type="password"
                      name="password"
                      placeholder="Confirm Password"
                      className="block w-full border-0 bg-transparent p-0 text-xl placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 focus:ring-teal-500 sm:leading-7 text-foreground"
                    />
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <NavLink
                    className="text-xl font-medium text-foreground underline"
                    to={"/Login"}
                  >
                    Already have an account?
                  </NavLink>
                </div>
                <div className="mt-4 flex items-center justify-end gap-x-2">
                  <button
                    className="font-semibold cursor-pointer hover:bg-black hover:text-white hover:ring hover:ring-white transition duration-300 inline-flex items-center justify-center rounded-md text-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-black h-10 px-4 py-2"
                    type="submit"
                  >
                    Register Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
