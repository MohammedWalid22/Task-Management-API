const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // ssl: { rejectUnauthorized: false } // Uncomment for production (e.g., Heroku, AWS)
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  // Expose pool for transactions
  getPool: () => pool
};