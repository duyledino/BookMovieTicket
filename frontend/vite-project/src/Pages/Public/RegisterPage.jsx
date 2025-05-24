import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function RegisterPage() {
  const [appear, setAppear] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setAppear(true);
    }, 1000);
  }, []);
  return (
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
      <div className="relative mt-12 w-full max-w-[35%] sm:mt-10">
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
            <form onSubmit={(e)=>e.preventDefault()}>
              <div>
                <div className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                  <div className="flex justify-between">
                    <label className="text-xl font-medium text-muted-foreground group-focus-within:text-white text-gray-400">
                      Ho va ten
                    </label>
                  </div>
                  <input
                    type="text"
                    name="username"
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
                    type="date"
                    name="password"
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
                    type="text"
                    name="password"
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
                    type="password"
                    name="password"
                    placeholder="Confirm Password"
                    className="block w-full border-0 bg-transparent p-0 text-xl placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 focus:ring-teal-500 sm:leading-7 text-foreground"
                  />
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <a
                  className="text-xl font-medium text-foreground underline"
                  href="/forgot-password"
                >
                  Already have an account?
                </a>
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
  );
}

export default RegisterPage;
