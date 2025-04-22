import axios from "axios";
import React, { useEffect, useState } from "react";

const BookingTable = () => {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `http://localhost:8000/api/v1/booking/getAllBooking`
      );
      if (res.status === 200) setBookings(res.data.allBooking);
    };
    fetchData();
  }, []);
  console.log(bookings);
  return (
    <>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-800 text-amber-500">
              <th className="px-6 py-3 border-b text-left">Book ID</th>
              <th className="px-6 py-3 border-b text-left">Calendar ID</th>
              <th className="px-6 py-3 border-b text-left">Customer ID</th>
              <th className="px-6 py-3 border-b text-center">Book Time</th>
              <th className="px-6 py-3 border-b text-center">Seat_ID</th>
              <th className="px-6 py-3 border-b text-center">Theater_ID</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 &&
              bookings.map((booking, i) => (
                <tr
                  // onClick={() => navigate(`/Calendar/${booking.book_id}`)}
                  key={booking.book_id}
                  className={`cursor-pointer transition-all ${
                    (i + 1) % 2 === 0 ? "bg-gray-700" : "bg-gray-800"
                  } text-white hover:bg-amber-500 hover:text-black`}
                >
                  <td className="px-6 py-4 border-b">{booking.book_id}</td>
                  <td className="px-6 py-4 border-b">{booking.calendar_id}</td>
                  {
                    //TODO: Fix showtime format
                  }
                  <td className="px-6 py-4 border-b">{booking.customer_id}</td>
                  <td className={`px-6 py-4 border-b text-center `}>
                    {booking.theater_id}
                  </td>
                  <td className="px-6 py-4 border-b text-center">
                    {booking.seat_id}
                  </td>
                  <td className="px-6 py-4 border-b text-center">
                    {booking.book_time}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
    </>
  );
};

export default BookingTable;
