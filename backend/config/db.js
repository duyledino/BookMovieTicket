import pkg from 'pg';
import env from 'dotenv'

env.config();

const {Pool} = pkg;

// export const pool = new Pool({
//     user: process.env.USER,
//     host: process.env.HOST,
//     port: process.env.PG_PORT,
//     database: process.env.DATABASE,
//     password: process.env.PASSWORD
// });

    const user= process.env.USER;
    const host= process.env.HOST;
    const port= process.env.PG_PORT;
    const database= process.env.DATABASE;
    const password= process.env.PASSWORD;

export const pool = new Pool({
    connectionString: `postgresql://${user}:${password}@${host}:${port}/${database}`,
    ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
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