import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

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
