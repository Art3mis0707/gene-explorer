// routes/extendedGeneRoutes.js
const express = require('express');
const router = express.Router();
const pool = require('../db'); // adjust the path as needed

// GET /api/genes/related-diseases
router.get('/related-diseases', async (req, res) => {
  try {
    // Get all gene sequences from the existing table
    const genesResult = await pool.query(`
      SELECT id, name, sequence
      FROM gene_sequences
      ORDER BY id
    `);

    // Get all diseases from the diseases table
    const diseasesResult = await pool.query(`
      SELECT id, gene_id, name, description
      FROM diseases
      ORDER BY id
    `);

    // Return both arrays in one JSON object
    res.json({
      genes: genesResult.rows,
      diseases: diseasesResult.rows
    });
  } catch (err) {
    console.error("Error fetching extended gene data:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
