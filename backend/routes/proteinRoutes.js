// routes/proteinRoutes.js
const express = require('express');
const router = express.Router();
const pool = require('../db'); // Adjust path if necessary

// GET /api/proteins/related-proteins
router.get('/related-proteins', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id, name, related_gene, function, structure, details
      FROM proteins
      ORDER BY id
    `);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching proteins:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
