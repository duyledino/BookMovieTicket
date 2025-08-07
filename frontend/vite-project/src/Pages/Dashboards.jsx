import React, { useEffect, useState } from "react";
import { Chart, scales } from "chart.js/auto";
import { Bar, Pie, Line } from "react-chartjs-2";
import axios from "axios";
import logoTemp from "../images/logo.jpg";
import {
  standardMonthUser,
  standardCount,
  getMax,
  getSum,
} from "../utils/standardUser.js";
import {
  standardCountBooking,
  getMaxBooking,
  standardMonthBooking,
  getSumBooking,
} from "../utils/standardBooking.js";
import {
  standardMonthRevenue,
  standardTotalRevenue,
  sumRevenue,
} from "../utils/standardRevenue.js";
import {
  standardWeekDay,
  getSaleDetail,
} from "../utils/standardWeekDayRevenue.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToast } from "../slices/toastSlice.js";
import Loading from "../components/Loading.jsx";
function Dashboards() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [monthUser, setMonthUser] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [monthBooking, setMonthBooking] = useState([]);
  const [revenue, setRevenue] = useState([]);
  const [monthRevenue, setMonthRevenue] = useState([]);
  const [topMovie, setTopMovie] = useState([]);
  const [weekDaySale, setWeekDaySale] = useState([]);
  const [saleDetail, setSaleDetail] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchWeekDayRevenue = async () => {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/booking/GetTotalWeekDay`,
        { withCredentials: true }
      );
      console.log(res);
      if (res.status === 200) {
        setLoading(false);
        const weekDay = res.data.fixGetTotalWeekDay.map((m) => ({
          day: m.day,
          month: m.month,
          year: m.year,
        }));
        const totalDay = res.data.fixGetTotalWeekDay.map((m) => m.total);
        setWeekDaySale((old) => [...old, ...standardWeekDay()]);
        setSaleDetail((old) => [...old, ...getSaleDetail(weekDay, totalDay)]);
      } else if (res.status === 203) {
        setLoading(false);
        dispatch(addToast({ message: res.data.Message, type: "failed" }));
        localStorage.removeItem("user");
        navigate("/404NotFound");
      }
    };
    fetchWeekDayRevenue();
  }, []);
  useEffect(() => {
    const fetchRevenue = async () => {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/booking/getTotalRevenue`,
        { withCredentials: true }
      );
      console.log(res);

      if (res.status === 200) {
        setLoading(false);
        const monthArr = res.data.fixGetTotal.map((f) => ({
          month: f.month,
          year: f.year,
        }));
        const totalArr = res.data.fixGetTotal.map((f) => f.total);
        console.log(totalArr);
        setMonthRevenue((old) => [...old, ...standardMonthRevenue()]);
        const myRevenue = standardTotalRevenue(monthArr, totalArr);
        console.log(myRevenue);
        setRevenue((old) => [...old, ...myRevenue]);
      }
    };
    fetchRevenue();
  }, []);
  useEffect(() => {
    const fetchBooking = async () => {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/booking/getCountBooking`,
        { withCredentials: true }
      );
      if (res.status === 200) {
        console.log(res.data.fixGetCount);
        const monthArr = res.data.fixGetCount.map((f) => f.month);
        const totalArr = res.data.fixGetCount.map((f) => f.count);
        setMonthBooking((old) => [...old, ...standardMonthBooking()]);
        setBookings((old) => [
          ...old,
          ...standardCountBooking(monthArr, totalArr),
        ]);
        setLoading(false);
      }
    };
    fetchBooking();
  }, []);
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/user/getCountUser`,
        { withCredentials: true }
      );
      if (res.status === 200) {
        setLoading(false);
        const totalMonthUser = res.data.fixGetCount.map((m) => m.month);
        const totalUser = res.data.fixGetCount.map((m) => m.count);
        setMonthUser((old) => [...old, ...standardMonthUser()]);
        setUsers((old) => standardCount(totalMonthUser, totalUser));
      }
    };
    fetchUsers();
  }, []);
  useEffect(() => {
    const fetchTopMovie = async () => {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/film/topSellingMovie`,
        { withCredentials: true }
      );
      if (res.status === 200 && res.data.fixTopMovie !== undefined) {
        setTopMovie((old) => [...old, ...res.data.fixTopMovie]);
        setLoading(false);
      }
    };
    fetchTopMovie();
  }, []);
  const saleDetailData = {
    labels:
      weekDaySale !== undefined
        ? weekDaySale
        : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "", // No label in legend
        data:
          saleDetail !== undefined
            ? saleDetail
            : [50, 70, 120, 90, 150, 200, 180], // Ticket sales data
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: true,
        tension: 0.4, // Smooth line
      },
    ],
  };
  // Data for allCurrentMovieWithIncome (Pie Chart)
  const currentMoviesData = {
    labels:
      topMovie !== undefined
        ? [...topMovie.map((top) => top.film_name)]
        : ["Movie A", "Movie B", "Movie C"],
    datasets: [
      {
        label: "", // No label in legend
        data:
          topMovie !== undefined
            ? [...topMovie.map((top) => top.total)]
            : [50000, 40000, 30000], // Revenue data in dollars
        backgroundColor: [
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(255, 205, 86, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(255, 205, 86, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Data for allCustomer (Line Chart)
  const customerData = {
    labels:
      monthUser !== undefined
        ? monthUser
        : ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Customers",
        data:
          users !== undefined
            ? users
            : [350, 400, 380, 360, 390, 420, 410, 450],
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const bookingsData = {
    labels:
      monthBooking !== undefined
        ? monthBooking
        : ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Total Bookings",
        data:
          users !== undefined
            ? bookings
            : [350, 400, 380, 360, 390, 420, 410, 450],
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const revenueData = {
    labels:
      monthRevenue !== undefined ? monthRevenue : ["Jan", "Feb", "Mar", "Apr"],
    // ["Jan", "Feb", "Mar", "Apr"],
    datasets: [
      {
        label: "Revunue",
        data:
          revenue !== undefined
            ? revenue
            : [15000, 18000, 22000, 20000, 24000, 21000], // Revenue data in dollars
        // [15000, 18000, 22000, 20000, 24000, 21000],
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      {loading ? <Loading /> : ""}
      <div className="container max-w-[85%] m-auto">
        <div className="saleDetailAndTotalRevenue mb-9 min-w-full h-auto p-3 flex lg:flex-row flex-col gap-x-3 lg:gap-y-0 gap-y-3 ring-1 ring-white justify-between overflow-y-auto rounded-xl">
          <div className="saleDetail Line flex flex-col lg:w-[65%] w-full p-3 h-auto ring-1 ring-white">
            <div className="w-full flex justify-between items-center">
              <h2 className="text-3xl font-bold w-full">Sale Detail</h2>
              <img src={logoTemp} alt="" className="object-cover w-10 h-10" />
            </div>
            <Line
              data={saleDetailData}
              options={{
                scales: {
                  y: {
                    beginAtZero: true, // Start y-axis at 0
                  },
                },
                plugins: {
                  legend: {
                    display: false, // Hide legend
                  },
                },
              }}
            />
          </div>
          <div className="totalRevenue lg:w-[35%] w-full flex flex-col p-3 ring-1 ring-white">
            <div className="w-full mb-24">
              <h2 className="text-3xl font-bold w-full">Total Revenue</h2>
              <h2 className="w-25% text-3xl text-blue-700 text-center">
                {sumRevenue(revenue).toLocaleString("vi-VN")} VNĐ
              </h2>
            </div>
            <Bar
              className="h-full"
              data={revenueData}
              options={{
                scales: {
                  y: {
                    display: false,
                    beginAtZero: true, // Start y-axis at 0
                  },
                },
                plugins: {
                  legend: {
                    display: false, // Hide legend
                  },
                },
              }}
            />
          </div>
        </div>
        <div className="userAndBook p-3 mb-9 min-w-full h-auto flex lg:flex-row flex-col ring-1 ring-white gap-x-3 lg:gap-y-0 gap-y-3 justify-between overflow-y-auto rounded-xl">
          <div className="totalBookings p-2 h-auto lg:w-1/2 w-full ring-1 ring-white">
            <div className="title w-full flex justify-between items-center">
              <h2 className="text-3xl font-bold w-full">Total Bookings</h2>
              <img src={logoTemp} alt="" className="object-cover w-10 h-10" />
            </div>
            <div className="w-full flex flex-col justify-between items-center">
              <h2 className="text-3xl text-blue-700">
                {getSumBooking(bookings)}
              </h2>
              <Line
                className="w-full"
                data={bookingsData}
                options={{
                  scales: {
                    y: {
                      beginAtZero: true, // Ensures y-axis starts at 0
                    },
                    x: {
                      ticks: {
                        display: false, // Hide x-axis labels
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
          <div className="customer p-2 h-auto lg:w-1/2 w-full ring-1 ring-white">
            <div className="title w-full flex justify-between items-center">
              <h2 className="text-3xl font-bold w-full">Total Users</h2>
              <img src={logoTemp} alt="" className="object-cover w-10 h-10" />
            </div>
            <div className="w-full flex flex-col justify-between items-center">
              <h2 className="text-3xl text-blue-700">{getSum(users)}</h2>
              <div className="w-full">
                <Line
                  data={customerData}
                  options={{
                    scales: {
                      y: {
                        beginAtZero: true, // Ensures y-axis starts at 0
                      },
                      x: {
                        ticks: {
                          display: false, // Hide x-axis labels
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>
          {/* TODO: add a chart totalBookings in 4 months */}
          {/* <div className="totalBookings p-2 w-4/12 ring-1 ring-white">
          <div className="title w-full flex justify-between items-center">
            <h2 className="text-3xl font-bold w-full">Total Bookings </h2>
            <img src={logoTemp} alt="" className="object-cover w-10 h-10" />
          </div>
          <div className="w-full flex justify-between items-center">
            <div className="chart w-75%"></div>
            <h2 className="w-25% text-3xl text-blue-700">2345</h2>
          </div>
        </div> */}
        </div>
        <div className="TopSellingMovies mb-9 lg:w-[40%] w-full flex p-3 flex-col ring-1 ring-white overflow-y-auto rounded-xl">
          <div className="w-full flex flex-col gap-5  ring-1 ring-white p-3">
            <h2 className="text-3xl font-bold w-full">Total Selling Movies</h2>
            <Pie
              data={currentMoviesData}
              options={{
                plugins: {
                  legend: {
                    display: true,
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboards;
