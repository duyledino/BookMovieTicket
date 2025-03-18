import jwt from "jsonwebtoken";
import env from "dotenv";

env.config();

const createToken = (user, res) => {
  const { customer_id, username, customer_age, customer_name } = user;
  const payload = {
    customer_name: customer_name,
    customer_id: customer_id,
    username: username,
    customer_age: customer_age,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.cookie("token", token, {
    httpOnly: true, // Prevents client-side access
    secure: process.env.NODE_ENV !== "production", // Use secure cookies in production
    sameSite: "Strict", // Helps with CSRF protection
  });
  return token;
};

const authenticateUser = (req, res, next) => {
  if (!req.cookies || !req.cookies.token)
    return res.json({ Message: "No token" });
  const token = req.cookies.token;
  const user = jwt.verify(token, process.env.JWT_SECRET);
  if (!user) return res.json({ Message: "Expire or wrong token" });
  req.user = user;
  next();
};

const authticateAdmin = (req, res, next) => {
  const isAdmin = req.cookies.token.isAdmin;
  if (!isAdmin) res.json({ Message: "Authenticate Failed." });
  next();
};

export { authenticateUser, createToken, authticateAdmin };
