const express = require('express');
const db = require('../config/db');
const router = express.Router();

router.get('/health', async (req, res) => {
  try {
    await db.query('SELECT 1');
    res.status(200).json({
      status: 'OK',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      database: 'Connected'
    });
  } catch (err) {
    res.status(503).json({
      status: 'Error',
      database: 'Disconnected',
      error: 'Service unavailable'
    });
  }
});

module.exports = router;