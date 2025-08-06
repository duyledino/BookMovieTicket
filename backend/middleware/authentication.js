import jwt from "jsonwebtoken";
import env from "dotenv";

env.config();

const createToken = (user, res) => {
  const { customer_id, username, customer_name,isAdmin } = user;
  const payload = {
    customer_name: customer_name,
    customer_id: customer_id,
    username: username,
    isAdmin: isAdmin
    // customer_age: customer_age,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.cookie("token", token, {
    httpOnly: true, // Prevents client-side access
    secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    secure: false,
    sameSite: "Lax", // Helps with CSRF protection
    maxAge: 7 * 24 * 60 * 60 * 1000, // optional: cookie expiry
  });
  return token;
};

const authenticateUser = (req, res, next) => {
  console.log(req.cookies);
  if (!req.cookies || !req.cookies.token)
    return res.status(203).json({ Message: "No Token" });
  const token = req.cookies.token;
  const decode = jwt.verify(token, process.env.JWT_SECRET);
  console.log(decode);
  if (!decode) return res.status(203).json({ Message: "Expire or wrong token" });
  req.user = decode;
  next();
};

const authenticateAdmin = (req, res, next) => {
  const isAdmin = req.user.isAdmin;
  if (!isAdmin) return res.status(203).json({ Message: "Expire or wrong token" });
  next();
};

export { authenticateUser, createToken, authenticateAdmin };
