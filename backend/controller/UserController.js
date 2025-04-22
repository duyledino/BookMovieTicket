import { PrismaClient } from "@prisma/client";
import { v4 as uuid } from "uuid";
import bcrypt from "bcryptjs";
import { createToken } from "../middleware/authentication.js";

const prisma = new PrismaClient();

const getAllUser = async (req, res) => {
  const allUser = await prisma.customer.findMany({
    select: {
      customer_id: true,
      customer_name: true,
      customer_age: true,
      username: true,
      isAdmin: true,
    },
  });
  if (allUser.length === 0) return res.json({ Message: "No user found",allUser:allUser });
  res.json({ allUser: allUser });
};

const createAUser = async (req, res) => {
  let { username, password, customer_name, customer_age } = req.body;

  // Validate required fields
  if (!username || !password || !customer_age)
    return res.status(400).json({
      Message: "username, password, or customer age is undefined",
    });

  // Check if user already exists
  const existUser = await prisma.customer.findUnique({
    where: { username }, // This should work now since 'username' is unique
  });

  if (existUser)
    return res.status(400).json({ Message: "User already exists" });

  // Default customer_name to username if empty
  if (!customer_name || customer_name === "") customer_name = username;

  // Ensure customer_age is a valid integer
  const age = parseInt(customer_age);
  if (isNaN(age))
    return res.status(400).json({ Message: "Invalid age provided" });

  // Hash password
  const genSalt = await bcrypt.genSalt(5);
  const hashPass = await bcrypt.hash(password, genSalt);

  // Create new user
  const created = await prisma.customer.create({
    data: {
      customer_id: uuid(),
      customer_age: age,
      customer_name,
      username,
      password: hashPass,
    },
  });

  const token = createToken(created, res);

  res.status(201).json({
    Message: "User created successfully",
    created: {
      customer_id: created.customer_id,
      customer_name: created.customer_name,
      customer_age: created.customer_age,
      username: created.username,
    },
  });
};

const updateAUser = async (req, res) => {
  const { id } = req.params;
  const { username, password, customer_name, customer_age, isAdmin } = req.body;
  console.log(username, password, customer_name, customer_age, isAdmin);
  if (!username || !customer_name || !customer_age || isAdmin===undefined) {
    return res
      .status(400)
      .json({
        Message: "Missing in4",
        in4: { username, password, customer_name, customer_age, isAdmin },
      });
  }
  const existUser = await prisma.customer.findUnique({
    where: { customer_id: id },
  });
  if (!existUser) return res.json({ Message: "User not found" });
  const age = parseInt(customer_age);
  let update;
  if (!password) {
    update = await prisma.customer.update({
      data: {
        username: username,
        customer_name: customer_name,
        customer_age: age,
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
        customer_age: age,
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
      customer_age: update?.customer_age,
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
  if (!existUser) res.json({ Message: "User Not Found" });
  const check = await bcrypt.compare(password, existUser.password);
  console.log(check);
  if (!check) res.json({ Message: "Username or Password is Wrong" });
  const token = createToken(existUser, res);
  res.json({ Message: "Login successfully" });
};

const logoutUser = async (req, res) => {
  res.cookie("token", {
    //res.cookie() only modifies headers, it does not send the response.
    expires: new Date(0),
  });
  res.clearCookie("token");
  res.json({ Message: "Logout successfully" });
};

export {
  getAllUser,
  createAUser,
  updateAUser,
  deleteAUser,
  loginUser,
  logoutUser,
};
