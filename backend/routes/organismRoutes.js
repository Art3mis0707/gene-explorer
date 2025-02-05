// routes/organismRoutes.js
const express = require("express");
const router = express.Router();
const pool = require("../db"); // Adjust the path to your PostgreSQL connection file

// GET /api/organisms
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id, name, genes, key_genes, initial_description, details
      FROM organism_genes
      ORDER BY id
    `);
    // Optionally, parse the JSONB field if needed (PostgreSQL returns JSON as objects)
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching organism genes:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
