const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get comments for a specific post
router.get('/:postId', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM comments WHERE post_id = $1 ORDER BY created_at DESC',
      [req.params.postId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a comment to a post
router.post('/', async (req, res) => {
  const { post_id, name, email, rating, text, image_url } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO comments (post_id, name, email, rating, text, image_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [post_id, name, email, rating, text, image_url]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
