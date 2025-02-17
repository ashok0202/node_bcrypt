const { Pool } = require("pg");
require("dotenv").config();


const pool = new Pool({
  user: process.env.DB_USER || "postgres", 
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "mydatabase",
  password: process.env.DB_PASSWORD || "yourpassword",
  port: process.env.DB_PORT || 5432, 
});

// Check if the connection is working
pool.connect()
  .then(() => console.log("✅ Connected to PostgreSQL successfully!"))
  .catch(err => console.error("❌ Connection error:", err));

module.exports = pool;
