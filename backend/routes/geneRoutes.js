// routes/geneRoutes.js
const express = require('express');
const router = express.Router();
const pool = require('../db');  // Ensure the path is correct

// GET /api/genes/predefined
router.get('/predefined', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, name, sequence FROM gene_sequences');
    console.log("Fetched predefined genes:", result.rows); // Debug log
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching gene sequences:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
