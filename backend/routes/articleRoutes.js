// routes/articleRoutes.js
const express = require("express");
const router = express.Router();
const Article = require("../models/Article");

// GET /api/articles - Retrieve all research articles
router.get("/", async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.json(articles);
  } catch (error) {
    console.error("Error fetching articles:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// POST /api/articles - Create a new research article
router.post("/", async (req, res) => {
  try {
    const { title, excerpt, link } = req.body;
    const newArticle = new Article({ title, excerpt, link });
    await newArticle.save();
    res.status(201).json(newArticle);
  } catch (error) {
    console.error("Error saving article:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
