// routes/proteinDetRoutes.js
const express = require('express');
const router = express.Router();
const pool = require('../db'); // Adjust the path to your database connection file

// GET /api/proteins-det/related-proteins-det
router.get('/related-proteins-det', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id, name, function, category, stability, hydrophobicity, activity, structure_type, details
      FROM proteins_det
      ORDER BY id
    `);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching protein details:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
