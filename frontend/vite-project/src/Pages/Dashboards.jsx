import React, { useEffect, useState } from "react";
import { Chart } from "chart.js/auto";
import { Bar, Pie, Line } from "react-chartjs-2";
import axios from "axios";

function Dashboards() {
  // Data for BestMovies (Bar Chart)
  const [users,setUsers] = useState([]);
  useEffect(()=>{
    const fetchUsers = async ()=>{
      const res = await axios.get(`http://localhost:8000/api/v1/user/getAllUser`);
      if(res.status===200)
          setUsers(res.data.allUser);
    }
    fetchUsers();
  },[])
  const bestMoviesData = {
    labels: ["Movie A", "Movie B", "Movie C", "Movie D"],
    datasets: [
      {
        label: "Income (USD)",
        data: [12000, 9000, 15000, 7000],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Data for allCurrentMovieWithIncome (Pie Chart)
  const currentMoviesData = {
    labels: ["Movie X", "Movie Y", "Movie Z"],
    datasets: [
      {
        label: "Income Share (USD)",
        data: [5000, 3000, 2000],
        backgroundColor: [
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Data for allCustomer (Line Chart)
  const customerData = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "New Customers",
        data: [0, 0, 0, users.length, 350, 400, 380, 360, 390, 420, 410, 450],
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Data for allTheaterWithFrequenceBook (Bar Chart)
  const theaterData = {
    labels: ["Theater 1", "Theater 2", "Theater 3", "Theater 4"],
    datasets: [
      {
        label: "Bookings",
        data: [50, 80, 60, 45],
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        borderColor: "rgba(255, 159, 64, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container m-auto">
      <div className="MovieDash p-3 min-w-full flex flex-col ring-1 ring-white gap-y-7 overflow-y-auto rounded-xl">
        <div className="allIncome Line ring-1 ring-white w-full h-80">
          <Line
            data={{
              labels: [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ],
              datasets: [
                {
                  label: "Monthly Income (USD)",
                  data: [
                    3000, 3200, 3500, 3300, 4000, 4200, 3800, 3900, 4100,
                    4500, 4300, 4700,
                  ],
                  borderColor: "rgba(75, 192, 192, 1)",
                  backgroundColor: "rgba(75, 192, 192, 0.2)",
                  fill: true,
                  tension: 0.4,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                title: { display: true, text: "Monthly Income" },
                tooltip: {
                  callbacks: {
                    label: (context) => `$${context.parsed.y}`,
                  },
                },
              },
              scales: {
                y: { beginAtZero: true, title: { display: true, text: "Income (USD)" } },
                x: { title: { display: true, text: "Month" } },
              },
            }}
          />
        </div>
        <div className="flex gap-6 min-w-full overflow-y-auto">
          <div className="BestMovies Bar w-[50%] h-96 border-2 border-amber-100">
            <Bar
              data={bestMoviesData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  title: { display: true, text: "Top Movies by Income" },
                  tooltip: {
                    callbacks: {
                      label: (context) => `$${context.parsed.y}`,
                    },
                  },
                },
                scales: {
                  y: { beginAtZero: true, title: { display: true, text: "Income (USD)" } },
                  x: { title: { display: true, text: "Movie" } },
                },
              }}
            />
          </div>
          <div className="allCurrentMovieWithIncome w-[50%] h-96 border-2 border-amber-100">
            <Pie
              data={currentMoviesData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  title: { display: true, text: "Income Share of Current Movies" },
                  tooltip: {
                    callbacks: {
                      label: (context) => `$${context.parsed}`,
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
      <div className="CustomerDash min-w-full flex ring-1 ring-white overflow-y-auto rounded-xl">
        <div className="allCustomer Line w-full h-48">
          <Line
            data={customerData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                title: { display: true, text: "New Customers per Month" },
              },
              scales: {
                y: { beginAtZero: true, title: { display: true, text: "Customers" } },
                x: { title: { display: true, text: "Month" } },
              },
            }}
          />
        </div>
      </div>
      <div className="TheaterDash min-w-full flex ring-1 ring-white overflow-y-auto rounded-xl">
        <div className="allTheaterWithFrequenceBook Bar w-full h-48">
          <Bar
            data={theaterData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                title: { display: true, text: "Theater Booking Frequency" },
                tooltip: {
                  callbacks: {
                    label: (context) => `${context.parsed.y} bookings`,
                  },
                },
              },
              scales: {
                y: { beginAtZero: true, title: { display: true, text: "Bookings" } },
                x: { title: { display: true, text: "Theater" } },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboards;