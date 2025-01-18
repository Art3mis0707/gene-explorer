// server.js
const app = require('./app');
const pool = require('./db');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  // Optional: Test database connectivity
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('Connected to PostgreSQL at:', res.rows[0].now);
  } catch (error) {
    console.error('Error connecting to PostgreSQL:', error);
  }
});
