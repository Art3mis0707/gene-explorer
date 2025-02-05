// server.js
const app = require('./app');
const pool = require('./db');
require('dotenv').config();

const PORT = 5001;

require("./db/mongo");

// Mount your routes (for example, your article routes, etc.)
const articleRoutes = require("./routes/articleRoutes"); // if you have them
app.use("/api/articles", articleRoutes);



app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('Connected to PostgreSQL at:', res.rows[0].now);
  } catch (error) {
    console.error('Error connecting to PostgreSQL:', error);
  }
});
