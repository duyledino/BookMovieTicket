import { PrismaClient } from "@prisma/client";
import { v4 as uuid } from "uuid";
import bcrypt from "bcryptjs";
import { createToken } from "../middleware/authentication.js";
import { DateTime } from "luxon";

const prisma = new PrismaClient();

const getAllUser = async (req, res) => {
  const allUser = await prisma.customer.findMany({
    select: {
      customer_id: true,
      customer_name: true,
      DateOfBirth: true,
      username: true,
      isAdmin: true,
      createDate: true,
    },
  });
  if (allUser.length === 0)
    return res.status(400).json({ Message: "No user found", allUser: allUser });
  res.status(200).json({ allUser: allUser });
};

const getAUser = async (req, res) => {
  const customer_id = req.query.customerId;
  console.log(customer_id);
  const user = await prisma.customer.findFirst({
    select: {
      customer_id: true,
      username: true,
      customer_name: true,
      phone: true,
      createDate: true,
      DateOfBirth: true,
      booking: {
        select: {
          book_id: true,
          book_time: true,
          seat_id: true,
          theater: {
            select: {
              theater_name: true,
            },
          },
          calendar: {
            select: {
              film: {
                select: {
                  film_name: true,
                },
              },
              showtime: true,
            },
          },
          total_price_book: true,
        },
      },
    },
    where: {
      customer_id: customer_id,
    },
  });
  if (!user) {
    return res.status(202).json({ Message: "User not found" });
  }
  const fixBooking = user.booking.map((b) => ({
    book_time: b.book_time,
    book_id: b.book_id,
    seat_id: b.seat_id,
    theater: b.theater,
    calendar: b.calendar,
    total_price_book: Number(b.total_price_book),
  }));
  user.booking = fixBooking;
  return res.status(200).json({ user: user });
};

const getNumberOfUserByMonth = async (req, res) => {
  const getCount = await prisma.$queryRaw`SELECT
	EXTRACT(
		MONTH
		FROM
			CUSTOMER."createDate"
	) AS MONTH, COUNT(CUSTOMER_ID) as count FROM CUSTOMER GROUP BY MONTH order by month asc;`;
  const fixGetCount = getCount.map((row) => ({
    month: row.month,
    count: Number(row.count),
  }));
  if (getCount.length === 0)
    return res.json({ Message: "No user found", fixGetCount });
  return res.json({ fixGetCount });
};

const createAUser = async (req, res) => {
  let { username, password, customer_name, dob, phone } = req.body;
  // Validate required fields
  console.log(username, password, customer_name, dob, phone);
  if (!username || !password || !dob)
    return res.status(202).json({
      Message: "username, password, or customer age is undefined",
    });

  // Check if user already exists
  const existUser = await prisma.customer.findUnique({
    where: { username }, // This should work now since 'username' is unique
  });

  if (existUser)
    return res.status(202).json({ Message: "Username already exists" });

  // Default customer_name to username if empty
  if (!customer_name || customer_name === "") customer_name = username;

  // Ensure customer_age is a valid integer
  // const age = parseInt(customer_age);
  // if (isNaN(age))
  //   return res.status(400).json({ Message: "Invalid age provided" });
  const timeDOB = DateTime.fromFormat(dob, "yyyy-MM-dd HH:mm:ss", {
    zone: "UTC",
  });
  // Hash password
  const genSalt = await bcrypt.genSalt(5);
  const hashPass = await bcrypt.hash(password, genSalt);

  // Create new user
  const created = await prisma.customer.create({
    data: {
      customer_id: uuid(),
      DateOfBirth: timeDOB,
      customer_name,
      username: username,
      password: hashPass,
      phone: phone || "0123456789",
    },
  });

  const token = createToken(created, res);

  res.status(200).json({
    Message: "User created successfully",
    created: {
      customer_id: created.customer_id,
      customer_name: created.customer_name,
      DateOfBirth: created.DateOfBirth,
      username: created.username,
    },
  });
};

const updateProfile = async (req, res) => {
  const id = req.query.customer_id;
  const { username, customer_name, dob, phone } = req.body;
  console.log("my update profile ---------",username, customer_name, dob, phone)
  if (!username || !customer_name || !dob) {
    return res
      .status(202)
      .json({ Message: "Missing in4", in4: { username, customer_name, dob } });
  }
  const DateOfBirth = DateTime.fromFormat(dob, "yyyy-MM-dd HH:mm:ss", {
    zone: "UTC",
  });
  console.log(DateOfBirth);
  try {
    const update = await prisma.customer.update({
      data: {
        username: username,
        customer_name: customer_name,
        DateOfBirth: DateOfBirth,
        phone: phone,
      },
      where: {
        customer_id: id,
      },
    });
    return res.status(200).json({ Message: "Update profile successfully" });
  } catch (error) {
    console.error(error);
  }
};

const updateAUserByAdmin = async (req, res) => {
  const { id } = req.params;
  const { username, password, customer_name, dob, isAdmin } = req.body;
  console.log(username, password, customer_name, dob, isAdmin);
  if (!username || !customer_name || !dob || isAdmin === undefined) {
    return res.status(400).json({
      Message: "Missing in4",
      in4: { username, password, customer_name, dob, isAdmin },
    });
  }
  const existUser = await prisma.customer.findUnique({
    where: { customer_id: id },
  });
  if (!existUser) return res.json({ Message: "User not found" });
  let update;
  const DateOfBirth = DateTime.fromFormat(dob, "yyyy-MM-dd HH:mm:ss", {
    zone: "UTC",
  });
  console.log(DateOfBirth);
  if (!password) {
    update = await prisma.customer.update({
      data: {
        username: username,
        customer_name: customer_name,
        DateOfBirth: DateOfBirth,
        isAdmin: isAdmin,
      },
      where: {
        customer_id: id,
      },
    });
  } else {
    const salt = await bcrypt.genSalt(5);
    const hashPass = await bcrypt.hash(password, salt);
    update = await prisma.customer.update({
      data: {
        username: username,
        password: hashPass,
        customer_name: customer_name,
        DateOfBirth: DateOfBirth,
        isAdmin: isAdmin,
      },
      where: {
        customer_id: id,
      },
    });
  }
  res.json({
    Message: "Update successfully",
    updated: {
      username: update?.username,
      customer_name: update?.customer_name,
      DateOfBirth: update?.DateOfBirth,
      admin: update?.isAdmin,
    },
  });
};

const deleteAUser = async (req, res) => {
  const { id } = req.params;
  const existUser = await prisma.customer.findUnique({
    where: { customer_id: id },
  });
  if (!existUser) return res.status(400).json({ Message: "User not found" });
  const deleted = await prisma.customer.delete({ where: { customer_id: id } });
  res.status(200).json({ Message: "Delete successfully", deleted: deleted });
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const existUser = await prisma.customer.findUnique({
    where: { username: username },
  });
  if (!existUser) return res.status(202).json({ Message: "User Not Found" });

  const check = await bcrypt.compare(password, existUser.password);
  if (!check)
    return res.status(202).json({ Message: "Username or Password is Wrong" });

  const token = createToken(existUser, res); // This sets the cookie
  return res.status(200).json({
    Message: "Login successfully",
    user: {
      username: existUser.username,
      isAdmin: existUser.isAdmin,
      customer_id: existUser.customer_id,
    },
  });
};

const logoutUser = async (req, res) => {
  res.cookie("token", {
    //res.cookie() only modifies headers, it does not send the response.
    expires: new Date(0),
  });
  res.clearCookie("token", {
    httpOnly: true, // Prevents client-side access
    secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    sameSite: "None", // Helps with CSRF protection
    path: "/", // ← ensures all routes see the cookie
  });
  res.status(200).json({ Message: "Logout successfully" });
};

export {
  getAllUser,
  createAUser,
  updateAUserByAdmin,
  deleteAUser,
  loginUser,
  logoutUser,
  getNumberOfUserByMonth,
  getAUser,
  updateProfile,
};
