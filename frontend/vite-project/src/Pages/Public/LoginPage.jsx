import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToast } from "../../slices/toastSlice";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../../slices/userDetail";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [appear, setAppear] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;
    const res = await axios.post(
      `https://bookmovieticket.onrender.com/api/v1/user/login`,
      {
        username: username,
        password: password,
      }
    );
    console.log(res.data);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    if (res.status === 200) {
      dispatch(setUser(res.data.user));
      localStorage.setItem("user", JSON.stringify(res.data.user));
      dispatch(addToast({ message: res.data.Message, type: "success" }));
      if (res.data.user.isAdmin === true) {
        dispatch(
          addToast({
            message: `Chao mung tro lai sep ${username}`,
            type: "success",
          })
        );
        setTimeout(() => {
          navigate("/admin");
        }, 2000);
        return;
      }
      navigate("/");
    } else {
      dispatch(addToast({ message: res.data.Message, type: "failed" }));
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setAppear(true);
    }, 1000);
  }, []);
  return (
    <>
      <div className="bg-black relative text-white flex min-h-screen flex-col items-center pt-16 sm:justify-center sm:pt-0">
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
                xmlns="www.w3.org/2000/svg"
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
            LOGIN
          </div>
        </a>
        <div className="relative mt-12 w-full max-w-[32%] sm:mt-10">
          <div className="relative -mb-px h-px w-full bg-gradient-to-r from-transparent via-sky-300 to-transparent"></div>
          <div className="mx-5 border dark:border-b-white/50 dark:border-t-white/50 border-b-white/20 sm:border-t-white/20 shadow-[20px_0_20px_20px] shadow-slate-500/10 dark:shadow-white/20 rounded-lg border-white/20 border-l-white/20 border-r-white/20 sm:shadow-sm lg:rounded-xl lg:shadow-none">
            <div className="flex flex-col p-6">
              <h3 className="text-xl font-semibold leading-6 tracking-tighter">
                Login
              </h3>
              <p className="mt-1.5 text-xl font-medium text-white/50">
                Welcome back, enter your credentials to continue.
              </p>
            </div>
            <div className="p-6 pt-0">
              <form onSubmit={handleSubmit}>
                <div>
                  <div className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                    <div className="flex justify-between">
                      <label className="text-xl font-medium text-muted-foreground group-focus-within:text-white text-gray-400">
                        Username
                      </label>
                      <div className="absolute right-3 translate-y-2 text-green-200">
                        <svg
                          xmlns="www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            fillRule="evenodd"
                            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                    <input
                      type="text"
                      name="username"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      autoComplete="off"
                      className="block w-full border-0 bg-transparent p-0 text-xl file:my-1 file:rounded-full file:border-0 file:bg-accent file:px-4 file:py-2 file:font-medium placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 sm:leading-7 text-foreground"
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
                    <div className="flex items-center">
                      <input
                        type="password"
                        name="password"
                        placeholder="Your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="block w-full border-0 bg-transparent p-0 text-xl file:my-1 placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 focus:ring-teal-500 sm:leading-7 text-foreground"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="remember"
                      className="outline-none focus:outline focus:outline-sky-300"
                    />
                    <span className="text-xl">Remember me</span>
                  </label>
                  <a
                    className="text-xl font-medium text-foreground underline"
                    href="/forgot-password"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="mt-4 flex items-center justify-end gap-x-2">
                  <Link
                    className="inline-flex items-center justify-center rounded-md text-xl font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:ring hover:ring-white h-10 px-4 py-2 duration-200"
                    to={`/Register`}
                  >
                    Register
                  </Link>
                  <button
                    className="font-semibold cursor-pointer hover:bg-black hover:text-white hover:ring hover:ring-white transition duration-300 inline-flex items-center justify-center rounded-md text-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-black h-10 px-4 py-2"
                    type="submit"
                  >
                    Log in
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

export default LoginPage;
