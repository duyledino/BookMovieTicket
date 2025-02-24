import pkg from 'pg';
import env from 'dotenv'

env.config();

const {Pool} = pkg;

export const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    port: process.env.PG_PORT,
    database: process.env.DATABASE,
    password: process.env.PASSWORD
});

const connectDB = ()=>{
    try {
        pool.connect();
        console.log("Connect to database successfully.");
    } catch (error) {
        console.error(error);
    }
}

export default connectDB;