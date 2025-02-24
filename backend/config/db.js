import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

// Use different names to avoid conflicts
const USER = process.env.USER;
const PG_PORT = process.env.PG_PORT;
const PG_DATABASE = process.env.DATABASE;
const PG_PASSWORD = process.env.PASSWORD;

console.log("🔍 PG_HOST:", PG_HOST);
console.log("🔍 PG_USER:", USER);
console.log("🔍 PG_DATABASE:", PG_DATABASE);

// Ensure all required variables are defined
if (!PG_USER || !PG_HOST || !PG_PORT || !PG_DATABASE || !PG_PASSWORD) {
    throw new Error("❌ Missing required environment variables for database connection!");
}

export const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

const connectDB = async () => {
    try {
        await pool.connect();
        console.log("✅ Connected to PostgreSQL successfully.");
    } catch (error) {
        console.error("❌ Database connection error:", error);
    }
};

export default connectDB;
