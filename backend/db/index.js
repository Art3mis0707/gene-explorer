// db/index.js
const { Pool } = require('pg');
require('dotenv').config();  // Make sure to create a .env file

const pool = new Pool({
  user:  'postgres',
  host: 'localhost',
  database: 'gene_explorer',
  password:'gayatri0707',
  port:5432,
});

pool.on('connect', () => {
  console.log('Connected to PostgreSQL');
});

module.exports = pool;
