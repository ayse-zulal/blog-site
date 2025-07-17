const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get all homepage images
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM images ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Upload a new image
router.post('/', async (req, res) => {
  const { url, caption, uploaded_by } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO images (url, caption, uploaded_by) VALUES ($1, $2, $3) RETURNING *',
      [url, caption, uploaded_by]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
