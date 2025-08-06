import pg from "pg";
import env from "dotenv";

env.config();

const poolConfig = {
  host: process.env.host,
  port: process.env.postgres_port,
  user: process.env.user,
  password: process.env.postgres_password,
  database: process.env.database,
};

const pool = new pg.Pool(poolConfig);

const testPool = () => {
  pool.connect((err, client, release) => {
    if (err) {
      return console.error("❌ Error connecting to PostgreSQL:", err.stack);
    }
    client.query("select now()", (err, result) => {
      release();
      if (err) {
        return console.error("❌ Query failed:", err.stack);
      }
      console.log("✅ PostgreSQL connected! Server time:", result.rows[0].now);
    });
  });
};

export { pool,testPool };
