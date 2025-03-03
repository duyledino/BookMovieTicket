import { PrismaClient } from "@prisma/client";
import { v4 as uuid } from "uuid";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const getAllUser = async (req, res) => {
  const allUser = await prisma.customer.findMany({
    select: {
      customer_id:true,
      customer_name:true,
      customer_age:true,
      username:true,
    },
  });
  if (allUser.length === 0) return res.json({ Message: "No user found" });
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

  if (existUser) return res.status(400).json({ Message: "User already exists" });

  // Default customer_name to username if empty
  if (!customer_name || customer_name === "") customer_name = username;

  // Ensure customer_age is a valid integer
  const age = parseInt(customer_age);
  if (isNaN(age)) return res.status(400).json({ Message: "Invalid age provided" });

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
  const { username, password, customer_name, customer_age } = req.body;
  if (!username || !password || !customer_name || !customer_age)
    return res.json({ Message: "Missing in4" });
  const existUser = await prisma.customer.findUnique({
    where: { customer_id: id },
  });
  if (!existUser) return res.json({ Message: "User not found" });
  const salt = await bcrypt.genSalt(5);
  const hashPass = await bcrypt.hash(password, salt);
  const age = parseInt(customer_age);
  const updated = await prisma.customer.update({
    data: {
      username: username,
      password: hashPass,
      customer_name: customer_name,
      customer_age: age,
    },
    where: {
      customer_id: id,
    },
  });
  res.json({
    Message: "Update successfully",
    updated: {
      username: updated.username,
      customer_name: updated.customer_name,
      customer_age: updated.customer_age,
    },
  });
};

const deleteAUser = async(req,res)=>{
    const{id} = req.params;
    const existUser = await prisma.customer.findUnique({where:{customer_id: id}});
    if(!existUser) return res.json({Message: "User not found"});
    const deleted = await prisma.customer.delete({where: {customer_id: id}});
    res.json({Message: "Delete successfully",deleted: deleted});
}

export { getAllUser, createAUser,updateAUser,deleteAUser};
