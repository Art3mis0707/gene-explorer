// routes/diseasesDataRoutes.js
const express = require('express');
const router = express.Router();
const pool = require('../db'); // adjust the path if necessary

// GET /api/diseases-data/all
router.get('/all', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id, name, category, risk, symptoms, cause, prevention, treatment
      FROM diseases_data
      ORDER BY id
    `);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching diseases data:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
