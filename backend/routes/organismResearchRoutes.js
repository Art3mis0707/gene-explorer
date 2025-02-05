const express = require("express");
const router = express.Router();
const pool = require("../db"); // Make sure this path points to your PostgreSQL connection file

// GET /api/organism-research
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id, title, author, year, abstract, full_content
      FROM organism_research
      ORDER BY id
    `);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching research articles:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
